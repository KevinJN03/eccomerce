import 'dotenv/config';
import Stripe from 'stripe';
import asyncHandler from 'express-async-handler';
const stripe = Stripe(process.env.STRIPE_KEY);
const CLIENT_URL = process.env.CLIENT_URL;

const stripeWebHooks = asyncHandler((req, res, next) => {
  const event = req.body;

  if (event.type == 'checkout.session.completed') {


    console.log('complete', event)
  }
  res.status(200).send('hi');
});

export default stripeWebHooks;
