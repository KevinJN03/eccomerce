/* eslint-disable import/prefer-default-export */
import asyncHandler from 'express-async-handler';

import { validationResult, check } from 'express-validator';
import { checkAuthenticated } from '../middleware/checkAuthenticated.js';

import 'dotenv/config';
import Stripe from 'stripe';

const stripe = Stripe(process.env.STRIPE_KEY);

export const create_order = [
  checkAuthenticated,
  asyncHandler(async (req, res, next) => {
    console.log(req.body);

    res.status(200).send('success');
  }),
];
export const createPaymentIntent = [
  checkAuthenticated,
  asyncHandler(async (req, res, next) => {
    console.log('create intent');

    console.log(req.body);

    // const paymentIntent = await stripe.paymentIntents.create();

    res.status(200).send({ success: true, clientSecret: 'test' });
  }),
];
