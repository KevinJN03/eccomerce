import 'dotenv/config';
import Stripe from 'stripe';
import asyncHandler from 'express-async-handler';
const stripe = Stripe(process.env.STRIPE_KEY);
const CLIENT_URL = process.env.CLIENT_URL;

const stripeWebHooks = asyncHandler((req, res, next) => {
  const event = req.body;
  if (event.type == 'setup_intent.succeeded') {
    return res.redirect('/api/user/payment-method/all');
  } else {
    res.status(200).send({ success: true });
  }
});

export default stripeWebHooks;
