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

    const getBalanceTransactionsList = async (
      created = {
        gte: start_date,
        lt: end_date,
      },
      // time = null,
      results = {
        refunds: {
          amount: 0,
          fees: 0,
          net: 0,
          total: 0,
        },
        payments: {
          amount: 0,
          fees: 0,
          net: 0,
          total: 0,
          fee_details: {},
        },
        data: [],
      },
    ) => {
      try {
        const obj = {
          // type,
          created,
          limit: 100,
        };

        const newResults = { ...results };
        console.log(obj);
        const { data, has_more } = await stripe.balanceTransactions.list(obj);

        newResults.data.push(...data);
        data.forEach(({ amount, fee, net, type, fee_details }) => {
          if (type == 'refund' || type == 'payment_refund') {
            newResults.refunds.amount += amount;
            newResults.refunds.fees += fee;
            newResults.refunds.net += net;
            newResults.refunds.total += 1;

            fee_details.forEach(
              ({ amount: feeAmount, type: feeType, description }) => {
                if (
                  !_.hasIn(newResults, [
                    'refunds',
                    'fee_details',
                    feeType,
                    'credit',
                  ])
                ) {
                  _.set(newResults, ['refunds', 'fee_details', feeType], {
                    credit: feeAmount,
                    description,
                  });
                } else {
                  newResults.refunds.fee_details[feeType].credit += feeAmount;
                }
              },
            );
          }

          if (type == 'charge' || type == 'payment') {
            newResults.payments.amount += amount;
            newResults.payments.fees += fee;
            newResults.payments.net += net;
            newResults.payments.total += 1;

            fee_details.forEach(
              ({ amount: feeAmount, type: feeType, description }) => {
                if (
                  !_.hasIn(newResults, [
                    'payments',
                    'fee_details',
                    feeType,
                    'total',
                  ])
                ) {
                  _.set(newResults, ['payments', 'fee_details', feeType], {
                    total: feeAmount,
                    description,
                  });
                } else {
                  newResults.payments.fee_details[feeType].total += feeAmount;
                }
              },
            );
          }
        });

        if (has_more) {
          const lastTransaction = _.last(data);
          return getBalanceTransactionsList(
            {
              lt: lastTransaction.created,
            },
            newResults,
          );
        }

        return results;
      } catch (error) {
        console.error(error);
      }
    };

    const [balance, stats] = await Promise.all([
      stripe.balance.retrieve(),
      getBalanceTransactionsList(),
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
