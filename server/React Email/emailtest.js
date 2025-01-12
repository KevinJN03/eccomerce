import express from 'express';
import Order from '../Models/order';
import asyncHandler from 'express-async-handler';
import transporter from '../utils/nodemailer';
import { render } from '@react-email/render';
import * as React from 'react';
import OrderShipped from './emails/orderShipped.jsx';
import PasswordReset from './emails/passwordreset.jsx';
const router = express.Router();
import 'dotenv/config.js';
import OrderCancel from './emails/orderCancelled.jsx';
import OrderReceived from './emails/orderReceived.jsx';
import ReturnOrder from './emails/returnOrder.jsx';
import ChangePassword from './emails/changePassword.jsx';
import { v4 } from 'uuid';
import ChangeEmail from './emails/changeEmail.jsx';
import Stripe from 'stripe';
import _ from 'lodash';
import GiftCardSend from './emails/giftcard/GiftCardSend.jsx';
const { SENDER, STRIPE_KEY } = process.env;
const stripe = Stripe(STRIPE_KEY);

router.get(
  '/:id',
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    // const order = await Order.findById(id, null, {
    //   populate: [
    //     { path: 'items.product' },
    //     { path: 'customer' },
    //     { path: 'itemsByProfile.items.product' },
    //   ],
    //   lean: { toObject: true },
    // }).exec();

    // const charge = await stripe.charges.retrieve(order.charge_id);

    // _.set(order, 'refund.amount', charge.amount_refunded / 100);

    const emailHtml = render(
     // <GiftCardSend {...{ name: 'Kevin', amount: 5, code: 123 }} />,
      <PasswordReset url={'google.com'} />
      //<ChangeEmail firstName={'Kevin'} newEmail={process.env.TEST_EMAIL} />
      // <ReturnOrder order={order} />
    );
 

    const emailTestId = v4();
    const mailOptions = {
      from: SENDER,
      to: process.env.TEST_EMAIL,
  
      subject: 'test email ' + emailTestId,
      html: emailHtml,
    };

    const sendEmail = await transporter.sendMail(mailOptions);
    res.status(200).send(emailHtml);
  }),
);

export default router;
 