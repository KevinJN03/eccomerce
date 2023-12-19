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

const { SENDER } = process.env;
router.get(
  '/:id',
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const order = await Order.findById(id, null, {
      populate: {
        path: 'items.product customer',
      },
      lean: { toObject: true },
    }).exec();

    const props = {
      firstName: 'kevin',
      orderNumber: '882411829',
      orderDate: 'Tuesday 28 November 2023',
      subtotal: 6.9,
      status: 'cancelled',
      deliveryCost: 4.5,
      total: 11.59,
      paymentType: 'paypal',
      deliveryName: 'Free Shipping',
      shipping_address: {
        name: 'kevin jean',
        phone: '07432298043',
        address: {
          city: 'london',
          line1: 'flat 2',
          line2: '14 test road',
          postal_code: 'tst124',
          state: 'lewisham',
          country: 'GB',
        },
      },
      items: order?.items,
    };
    // const emailHtml = render(<PasswordReset url={'google.com'} />);
    const emailHtml = render(<ChangePassword firstName={'Kevin'} />);
    const mailOptions = {
      from: SENDER,
      to: process.env.TEST_EMAIL,
      // to: 'cahada3632@bayxs.com',
      subject: 'test ored success betaemail email',
      html: emailHtml,
    };

    const sendEmail = await transporter.sendMail(mailOptions);
    res.status(200).send(emailHtml);
  }),
);

export default router;
