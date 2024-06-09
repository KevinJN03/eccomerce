import 'dotenv/config';
import Stripe from 'stripe';
import asyncHandler from 'express-async-handler';
import { check, validationResult } from 'express-validator';
import dayjs from 'dayjs';

const { STRIPE_KEY } = process.env;
const stripe = Stripe(STRIPE_KEY);

export const stripeTransactions = [
  asyncHandler(async (req, res, next) => {
    const transactions = await stripe.issuing.transactions.retrieve();

    res.send({ transactions, success: true });
  }),
];
