import 'dotenv/config';
import _ from 'lodash';
import Stripe from 'stripe';
import Order from '../Models/order.js';
import logger from './logger.js';

const { STRIPE_KEY } = process.env;
const stripe = Stripe(STRIPE_KEY);

export const getSourceObject = (element) => {
  const { source } = element;
  const first3Letter = source.slice(0, 3);

  const handleThenCatch = (fetchPromise) => {
    return fetchPromise
      .then((sourceObject) => {
        element['sourceObject'] = sourceObject;
        const metadata = sourceObject?.metadata;

        if (metadata?.orderNumber || metadata?.order_id) {
          const orderId = metadata?.orderNumber || metadata?.order_id;
          return Order.findById(
            orderId,
            { _id: 1, items: 1 },
            {
              lean: { toObject: true },
            },
          );
        }
      })
      .then((value) => {
        if (value) {
          element['order'] = value;
        }
      })
      .catch((error) => {
        //   logger.error(error, error.message);
      });
  };

  // const handleThenCatch = async (fetchPromise) => {
  //   element['sourceObject'] = fetchPromise;
  //   const metadata = fetchPromise?.metadata;

  //   if (metadata?.orderNumber || metadata?.order_id) {
  //     const orderId = metadata?.orderNumber || metadata?.order_id;
  //     element['order'] = await Order.findById(orderId, null, {
  //       lean: { toObject: true },
  //     });
  //   }

  //   // if (value) {
  //   //   element['order'] = value;
  //   // }

  //   // .catch((error) => {
  //   //   //   logger.error(error, error.message);
  //   // });
  // };
  if (first3Letter === 'pyr') {
    return handleThenCatch(stripe.refunds.retrieve(source));
  }
  if (first3Letter === 'py_') {
    return handleThenCatch(stripe.charges.retrieve(source));
  }
  if (first3Letter === 'po_') {
    return handleThenCatch(stripe.payouts.retrieve(source));
  }
};

const getBalanceTransactionsList = async (
  obj,
  property = { stripe: 'balanceTransactions' },
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
    const newResults = { ...results };
    // console.log({ ...obj, ...property });
    const { data, has_more } = await stripe[property.stripe].list(obj);

    newResults.data.push(...data);

    if (property.stripe == 'balanceTransactions') {
      console.log('calculating for balance ');
      data.forEach((element) => {
        const { amount, fee, net, type, fee_details, source } = element;

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
    }

    if (has_more) {
      const lastTransaction = _.last(data);
      return getBalanceTransactionsList(
        { ...obj, created: { ...obj?.created, lt: lastTransaction.created } },
        property,
        newResults,
      );
    }
    return results;
  } catch (error) {
    console.error(error);
  }
};

export default getBalanceTransactionsList;
