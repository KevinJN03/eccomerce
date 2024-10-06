/* eslint-disable import/prefer-default-export */
/* eslint-disable eqeqeq */
import 'dotenv/config';
import Stripe from 'stripe';
import asyncHandler from 'express-async-handler';
import { check, validationResult } from 'express-validator';
import dayjs from 'dayjs';
import Order from '../Models/order.js';
import _, { property, toPlainObject } from 'lodash';
import logger from '../utils/logger';
import getBalanceTransactionsList, {
  getSourceObject,
} from '../utils/getBalanceTransactionsList.js';
import { Parser } from 'json2csv';
import fs from 'fs';
import path from 'path';
import Setting from '../Models/setting.js';
import bcrypt from 'bcryptjs';
const { STRIPE_KEY, STRIPE_LIVE_KEY, SALT_ROUNDS } = process.env;
const stripe = Stripe(STRIPE_KEY);
const stripeLive = Stripe(STRIPE_LIVE_KEY);

export const stripeTransactions = [
  asyncHandler(async (req, res, next) => {
    const { start_date, end_date } = req.body;

    const fetchPromises = [];

    const { data: transactions } = await stripe.balanceTransactions.list({
      limit: 100,
    });

    const stripeParams = {
      limit: 100,
      created: { gte: start_date, lt: end_date },
    };

    const [balance, stats] = await Promise.all([
      stripe.balance.retrieve(),
      getBalanceTransactionsList(stripeParams, {
        stripe: 'balanceTransactions',
      }),
    ]);

    transactions.forEach((element) => {
      fetchPromises.push(getSourceObject(element, fetchPromises));
    });

    await Promise.allSettled(fetchPromises);

    // const jsonToCsvParser = new Parser();
    // const csv = jsonToCsvParser.parse(stats.data);

    // fs.writeFileSync('./data.csv', csv);
    res.send({
      stats,
      // refunds,
      // charges,
      // payouts,
      balance,
      transactions,
    });
  }),
];

export const monthlyStatement = [
  check('month').escape().trim().toInt(),
  check('year').escape().trim().toInt(),

  asyncHandler(async (req, res, next) => {
    const { month, year } = req.body;
    const date = dayjs().year(year).month(month);
    const createdObj = {
      gte: date.startOf('month').unix(),
      lt: date.endOf('month').unix(),
    };
    const fetchPromiseArray = [];
    console.log({
      month,
      year,
      createdObj,
      start_date: date.startOf().toISOString(),
    });

    const stats = await getBalanceTransactionsList(
      { created: createdObj, limit: 100 },
      { stripe: 'balanceTransactions' },
    );

    stats.data.forEach((element) => {
      fetchPromiseArray.push(getSourceObject(element));
    });

    await Promise.allSettled(fetchPromiseArray);

    res.status(200).send(stats);
  }),
];

export const generateCsv = [
  check('month').escape().trim().toInt(),
  check('year').escape().trim().toInt(),
  asyncHandler(async (req, res, next) => {
    const { month, year } = req.query;
    const date = dayjs().year(year).month(month);
    const fetchPromiseArray = [];

    const stats = await getBalanceTransactionsList(
      {
        created: {
          gte: date.startOf('month').unix(),
          lt: date.endOf('month').unix(),
        },
        limit: 100,
      },
      { stripe: 'balanceTransactions' },
    );

    stats.data.forEach((element) => {
      fetchPromiseArray.push(getSourceObject(element));
    });

    await Promise.allSettled(fetchPromiseArray);

    const opts = {
      header: true,
      fields: [
        // {
        //   label: 'ID',
        //   value: 'id',
        // },
        {
          label: 'Date',
          value: (record) =>
            dayjs.unix(record.created).format('MMMM DD, YYYY, h:mm:ss A'),
        },
        {
          label: 'TYPE',
          value: 'type',
        },

        {
          label: 'DESCRIPTION',
          value: 'description',
        },

        {
          label: 'AMOUNT',
          value: (record) =>
            new Intl.NumberFormat('en-GB', {
              style: 'currency',
              currency: 'GBP',
            }).format(record.amount / 100),
        },
        {
          label: 'FEES and TAX',
          value: (record) =>
            new Intl.NumberFormat('en-GB', {
              style: 'currency',
              currency: 'GBP',
            }).format(record.fee / 100),
        },
        {
          label: 'NET',
          value: (record) =>
            new Intl.NumberFormat('en-GB', {
              style: 'currency',
              currency: 'GBP',
            }).format(record.net / 100),
        },
        {
          label: 'SOURCE',
          value: 'source',
        },
        {
          label: 'ORDER REFERENCE',
          value: 'order._id',
        },
      ],
    };

    // Stream the file to the client

    const jsonToCsvParser = new Parser(opts);
    const csv = jsonToCsvParser.parse(stats.data);
    const fileName = `${month + 1}-${year}-report.csv`;
    const filePath = path.join(__dirname, fileName);

    res.header('Content-Type', 'text/csv; charset=utf-8');
    res.attachment(fileName);
    res.send('\uFEFF' + csv); // Adding BOM to ensure UTF-8 encoding
  }),
];

export const add_bank_account = [
  check('account_number', 'Account number is too short.')
    .escape()
    .trim()
    .isLength({ min: 4 }),
  check('routing_number', 'Sort Code is too short.')
    .escape()
    .trim()
    .isLength({ min: 4 }),
  check('account_holder_name', 'Name cannot be empty.')
    .escape()
    .trim()
    .isLength({ min: 1 }),

  // check('sort_code').escape().trim(),
  asyncHandler(async (req, res, next) => {
    try {
      const errors = validationResult(req).formatWith(({ msg }) => msg);

      if (!errors.isEmpty()) {
        return res.status(400).send(errors.mapped());
      }
      const accounts = await stripeLive.accounts.retrieve();
      const externalAccount = await stripeLive.accounts.update(accounts.id, {
        external_account: {
          ...req.body,
          object: 'bank_account',
          currency: req.body?.currency || req.body?.country,
        },
      });

      const hashed_bank_account = await bcrypt.hashSync(
        req.body.account_number,
        parseInt(SALT_ROUNDS),
      );
      await Setting.findOneAndUpdate(
        { name: 'general' },
        { account_number: hashed_bank_account },
      );

      const bankAccount = externalAccount.external_accounts.data[0];

      res.send(bankAccount);
    } catch (error) {
      const { code, param } = error;
      if (param) {
        const findParam = param.split('external_account')[1].slice(1, -1) || '';
        return res.status(400).send({
          [findParam]: `${
            findParam == 'routing_number'
              ? 'Sort code'
              : _.upperFirst(findParam).replace('_', ' ')
          } does not match expected format.`,
        });
      }

      res.status(400).send(error);
    }
  }),
];

export const retrieve_bank_account = [
  asyncHandler(async (req, res, next) => {
    const accounts = await stripeLive.accounts.retrieve();

    const bankAccount = accounts.external_accounts.data[0];

    res.send(bankAccount);
  }),
];

export const verify_bank_account = [
  check(
    'account_number',
    'The account number you entered doesn’t match what we have on file. Try again.',
  )
    .escape()
    .trim()
    .custom(async (value) => {
      const settings = await Setting.findOne(
        { name: 'general' },
        { account_number: 1 },
        { lean: { toObject: true } },
      );

      const match = await bcrypt.compareSync(value, settings.account_number);

      if (match) {
        return true;
      } else {
        throw new Error(
          'The account number you entered doesn’t match what we have on file. Try again.',
        );
      }
    }),
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req).formatWith(({ msg }) => msg);

    if (!errors.isEmpty()) {
      return res.status(400).send(errors.mapped());
    }

    return res.redirect(303, '/api/admin/stripe/bank-account');
  }),
];

export const update_schedule = [
  asyncHandler(async (req, res, next) => {
    const platform_account = await stripeLive.accounts.retrieve();

    const account = await stripeLive.accounts.update(
      platform_account.id, // Replace with your account ID
      {
        settings: {
          payouts: {
            schedule: {
              interval: 'monthly', // Options: 'daily', 'manual', 'weekly', 'monthly'
              // weekly_anchor: 'monday', // Use with 'weekly' interval. Options: 'monday', 'tuesday', etc.
              monthly_anchor: 1, // Use with 'monthly' interval. Day of the month (1-31)
            },
          },
        },
      },
    );
  }),
];
