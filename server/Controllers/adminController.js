/* eslint-disable import/prefer-default-export */
import User from '../Models/user.js';
import asyncHandler from 'express-async-handler';
import bcrypt from 'bcryptjs';
import { body, check, validationResult } from 'express-validator';
import Order from '../Models/order.js';

import 'dotenv/config.js';

import Stripe from 'stripe';
import dayjs from 'dayjs';
const stripe = Stripe(process.env.STRIPE_KEY);
export const count_all = asyncHandler(async (req, res, next) => {
  const userCount = await User.countDocuments();
  const orderCount = await Order.countDocuments();
  const balance = await stripe.balance.retrieve();
  const orders = await Order.find()
    .populate('items.product')
    .sort({ createdAt: -1 })
    .limit(5)
    .exec();
  const findGBPBalance = balance?.available?.find(
    (item) => item.currency == 'gbp',
  );

  const todayDate = dayjs()
    .set('hour', 0)
    .set('minute', 0)
    .set('second', 0)
    .unix();
  const charges = await stripe.charges.search({
    query: `created>${todayDate}`,
  });

  const todayAmount = charges?.data?.reduce(
    (accumulater, charge) => (accumulater += charge?.amount),
    0,
  );

  console.log({ charges, todayAmount });
  const amount = findGBPBalance?.amount?.toString();

  const sixMonthsFromToday = dayjs()
    .subtract(6, 'month')
    .set('D', 1)
    .set('h', 1)
    .set('m', 0)
    .set('s', 0)
    .toDate();

  console.log({ sixMonthsFromToday });
  const getOrdersByMonth = await Order.aggregate([
    {
      $match: {
        status: {
          $in: ['received', 'shipped', 'delivered'],
        },
        createdAt: { $gte: sixMonthsFromToday },
      },
    },
    {
      $group: {
        _id: { $month: '$createdAt' },
        total: { $sum: '$transaction_cost.total' },

        /* status: { $match: { $or: ['received', 'shipped', 'delivered'] } }, */
        // customer: { $match: id },
      },
    },
    {
      $sort: {
        _id: 1,
      },
    },
  ]).exec();
  res.status(200).json({
    userCount,
    orderCount,
    todayAmount: (todayAmount / 100).toFixed(2),
    balance: (amount / 100).toFixed(2),
    orders: orders,
  });
});

export const adminLogin = [
  check('email').custom(async (email) => {
    const findUser = await User.findOne({ email });
    if (!findUser) {
      throw new Error("User doesn't exists.");
    }

    return true;
  }),
  asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;
    const result = validationResult(req);

    if (!result.isEmpty()) {
      const newResult = result.errors.map((item) => {
        return {
          [item.path]: item.msg,
        };
      });
      return res.status(404).send(...newResult);
    }

    const user = await User.findOne({ email });
    const match = await bcrypt.compare(password, user.password);

    console.log('match', match);

    res.status(200).send('login in successfully');
  }),
];
