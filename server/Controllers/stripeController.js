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
import { file } from 'pdfkit';
import XLSX from 'xlsx';

const { STRIPE_KEY } = process.env;
const stripe = Stripe(STRIPE_KEY);

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

    const jsonToCsvParser = new Parser();
    const csv = jsonToCsvParser.parse(stats.data);

    fs.writeFileSync('./data.csv', csv);
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
