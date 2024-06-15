/* eslint-disable import/prefer-default-export */
/* eslint-disable eqeqeq */
import 'dotenv/config';
import Stripe from 'stripe';
import asyncHandler from 'express-async-handler';
import { check, validationResult } from 'express-validator';
import dayjs from 'dayjs';
import Order from '../Models/order.js';
import _, { toPlainObject } from 'lodash';

import logger from '../utils/logger';
import getBalanceTransactionsList from '../utils/getBalanceTransactionsList.js';
const { STRIPE_KEY } = process.env;
const stripe = Stripe(STRIPE_KEY);

export const stripeTransactions = [
  asyncHandler(async (req, res, next) => {
    const date = dayjs('2024-05-16').unix();

    const { start_date, end_date } = req.body;
    const { data: transactions } = await stripe.balanceTransactions.list({
      //   created: {
      //     lte: date,
      //   },
      limit: 20,
    });

    const fetchPromises = [];

    const getSourceObject = async (source) => {
      const first3Letter = source.slice(0, 3);
      if (first3Letter === 'pyr') {
        return stripe.refunds.retrieve(source);
      } else if (first3Letter === 'py_') {
        return stripe.charges.retrieve(source);
      } else if (first3Letter === 'po_') {
        return stripe.payouts.retrieve(source);
      }
    };

    transactions.forEach((element, idx) => {
      const { source } = element;
      const first3Letter = source.slice(0, 3);
      const sourcePromise = getSourceObject(source)
        .then((sourceObject) => {
          element['sourceObject'] = sourceObject;

          const metadata = sourceObject?.metadata;

          if (metadata?.orderNumber || metadata?.order_id) {
            const orderId = metadata?.orderNumber || metadata?.order_id;
            return Order.findById(orderId, null, {
              lean: { toObject: true },
            });
          }
        })
        .then((value) => {
          if (value) {
            element['order'] = value;
          }
        })
        .catch((error) => {
          logger.error(error, error.message);
        });
      fetchPromises.push(sourcePromise);
    });

    // const payments = stripe.balanceTransactions.list({
    //   type: 'payment',
    //   limit: 100,
    // });

    const getBalanceTransactions = async (
      type,
      time = null,
      results = { amount: 0, fees: 0, net: 0 },
    ) => {
      try {
        const obj = {
          type,
          limit: 100,
          created: {
            lte: start_date,
            gte: end_date,
          },
        };

        if (time) {
          obj.created = { lt: time };
        }
        console.log(obj);
        const { data, has_more } = await stripe.balanceTransactions.list(obj);

        data.forEach(({ amount, fee, net }) => {
          results.amount += amount;
          results.fees += fee;
          results.net += net;
        });

        if (has_more) {
          const lastTransaction = _.last(data);
          return await getBalanceTransactions(
            type,
            lastTransaction.created,
            results,
          );
        }

        return results;
      } catch (error) {
        console.error(error);
      }
    };

    const [balance, stats] = await Promise.all([
      stripe.balance.retrieve(),
      getBalanceTransactionsList({ gte: start_date, lt: end_date }),
      ...fetchPromises,
    ]);

    res.send({
      // chargesResult,
      // paymentResult,
      // paymentRefundResult,
      // refundResult,
      stats,
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
    console.log({
      month,
      year,
      createdObj,
      start_date: date.startOf().toISOString(),
    });

    const stats = await getBalanceTransactionsList(createdObj);

    res.status(200).send(stats);
  }),
];
