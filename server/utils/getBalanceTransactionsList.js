import 'dotenv/config';
import _ from 'lodash';
import Stripe from 'stripe';
const { STRIPE_KEY } = process.env;
const stripe = Stripe(STRIPE_KEY);
const getBalanceTransactionsList = async (
  created,
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
        { ...created, lt: lastTransaction.created },
        newResults,
      );
    }

    return results;
  } catch (error) {
    console.error(error);
  }
};

export default getBalanceTransactionsList;
