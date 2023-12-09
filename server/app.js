/* eslint-disable no-console */
/* eslint-disable import/no-extraneous-dependencies */
import express from 'express';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import morgan from 'morgan';
import cors from 'cors';
import mongoose from 'mongoose';
import 'dotenv/config';
import productRoute from './Routes/productRoute.js';
import categoryRoute from './Routes/categoryRoute.js';
import couponRoute from './Routes/couponRoute.js';
import searchRoute from './Routes/searchRoute.js';
import giftCardRoute from './Routes/giftCardRoute.js';
import webHookRoute from './Routes/webhookRoute.js';
import userRoute from './Routes/userRoute.js';
import adminRoute from './Routes/adminRoute.js';
import orderRoute from './Routes/orderRoute.js';
import deliveryRoute from './Routes/deliveryRoute.js';
import errorHandler from './errorHandler.js';
import passport from './utils/passport.js';
import https from 'https';
import fs from 'fs';
import asyncHandler from 'express-async-handler';
import transporter from './utils/nodemailer.js';
import * as React from 'react';
import { render } from '@react-email/render';
import OrderCancel from './React Email/orderCancelled.jsx';
import OrderSuccess from './React Email/orderSuccess.jsx';
import Order from './Models/order.js';
import 'dotenv/config';
import PasswordReset from './React Email/passwordreset.jsx';
const { DBNAME, URL, SECRET } = process.env;
const PORT = 3000;
const db = () => {
  mongoose
    .connect(URL, { dbName: DBNAME })
    .then(async () => {
      // connection.sessions.drop();
      console.log('successfully database Connection');
    })
    .catch((error) => {
      console.log(`error: ${error}`);
    });
};
db();

const app = express();
// app.use(cors());
app.use(cors({ origin: true, credentials: true }));
app.use(
  session({
    secret: SECRET,
    resave: false,
    saveUninitialized: true,

    store: MongoStore.create({
      mongoUrl: URL,
      dbName: DBNAME,
      collectionName: 'sessions',
    }),
    cookie: { maxAge: 1000 * 60 * 60 * 24, secure: false, httpOnly: false }, // 1 day
  }),
);
app.use(passport.initialize());
app.use(passport.session());
app.use(morgan('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/api/server-status', (req, res) => {
  res.send('OK');
});
app.use('/api/product', productRoute);
app.use('/api/coupon', couponRoute);
app.use('/api/category', categoryRoute);
app.use('/api/search', searchRoute);
app.use('/api/giftcard', giftCardRoute);
app.use('/api/user', userRoute);
app.use('/api/admin', adminRoute);
app.use('/api/order', orderRoute);
app.use('/api/delivery', deliveryRoute);
app.use('/api/webhook', webHookRoute);
app.get(
  '/api/test',
  asyncHandler(async (req, res, next) => {
    const order = await Order.findById('068D4XFNAGCH', null, {
      populate: 'items.product',
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

    // const emailHtml = render(<OrderSuccess {...props} />);

    const emailHtml = render(<PasswordReset url={'https://google.com'} />);
    const mailOptions = {
      from: 'kevinjean321@gmail.com',
      to: process.env.TEST_EMAIL,
      subject: 'test email',
      html: emailHtml,
      // template: 'New Template',
      // context: {
      //   firstName: 'Adam',
      // },
    };

    // const sendEmail = await transporter.sendMail(mailOptions);
    res.status(200).send(emailHtml);
  }),
);
app.use(errorHandler);

const httpOptions = {
  key: fs.readFileSync('./mkcert/key.pem'),
  cert: fs.readFileSync('./mkcert/cert.pem'),
  requestCert: false,
  rejectUnauthorized: process.env.NODE_ENV === 'production',
};
console.log({
  NODE_ENV: process.env.NODE_ENV,
  bool: process.env.NODE_ENV === 'production',
});
const sslServer = https.createServer(httpOptions, app);
sslServer.listen(PORT, () => {
  console.log(`Secure server🔑 listening on Port: ${PORT}`);
});
