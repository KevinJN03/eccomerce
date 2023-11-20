import 'dotenv/config';
import Stripe from 'stripe';
import asyncHandler from 'express-async-handler';
import { checkAuthenticated } from '../../middleware/checkAuthenticated.js';
const stripe = Stripe(process.env.STRIPE_KEY);
const CLIENT_URL = process.env.CLIENT_URL;

const stripeWebHooks = asyncHandler(async (req, res, next) => {
  const event = req.body;
  if (event.type == 'setup_intent.succeeded') {
    const { object } = event.data;

    const { customer } = object;
    const paymentMethod = await stripe.paymentMethods.retrieve(
      object.payment_method,
    );

    if (paymentMethod.type === 'card') {
      const newPaymentMethodId = paymentMethod.id;
      const newPaymentMethodFingerPrint = paymentMethod.card.fingerprint;
      const allPaymentMethods = await stripe.customers.listPaymentMethods(
        customer,
        {
          type: 'card',
        },
      );
      const { data } = allPaymentMethods;

      const fingerPrintArray = [];

      data.forEach((item) => {
        const fingerPrint = item.card.fingerprint;
        if (
          fingerPrint == newPaymentMethodFingerPrint &&
          item.id != newPaymentMethodId
        ) {
          fingerPrintArray.push({
            fingerPrint,
            id: item.id,
          });
        }
      });

      await Promise.all(
        [...fingerPrintArray].map(({ id }) => {
          return stripe.paymentMethods.detach(id);
        }),
      );
    }

    return res.send({ success: true });
  } else {
    res.status(200).send({ success: true });
  }
});

export default stripeWebHooks;
