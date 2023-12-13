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
import User from './Models/user.js';
import jwt from 'jsonwebtoken';
import { check, validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';
import { checkAdminAuthenticated } from './middleware/checkAuthenticated.js';
import { adminLogin } from './Controllers/adminController.js';
const {
  DBNAME,
  URL,
  SECRET,
  PASSWORD_RESET_JWT_SECRET,
  CLIENT_URL,
  SENDER,
  SALT_ROUNDS,
} = process.env;
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
app.use('/api/admin/login', adminLogin);
app.use('/api/product', productRoute);
app.use('/api/coupon', couponRoute);
app.use('/api/category', categoryRoute);
app.use('/api/search', searchRoute);
app.use('/api/giftcard', giftCardRoute);
app.use('/api/user', userRoute);
app.use('/api/admin', [checkAdminAuthenticated, adminRoute]);
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
      from: SENDER,
      to: process.env.TEST_EMAIL,
      subject: 'test email',
      html: emailHtml,
    };

    const sendEmail = await transporter.sendMail(mailOptions);
    res.status(200).send(emailHtml);
  }),
);

app.post('/api/forget-password', [
  check('email', 'Email is Invalid.')
    .trim()
    .escape()
    .isEmail()
    .custom(async (value, { req }) => {
      const user = await User.findOne({ email: value });
      if (!user) {
        throw new Error(
          "Email Address doesn't exist, please check the email for any typos.",
        );
      } else {
        req.password = user.password;
        return true;
      }
    }),
  asyncHandler(async (req, res, next) => {
    const errorFormatter = ({ msg, path }) => {
      return msg;
    };
    const results = validationResult(req).formatWith(errorFormatter);

    if (!results.isEmpty()) {
      // console.log('validationError: ', results.mapped());

      return res.status(404).send({ error: results.mapped() });
    }
    const { email } = req?.body;
    console.log('here: ', { password: req.password });

    const newSecret = PASSWORD_RESET_JWT_SECRET + req.password;

    const payload = {
      id: req.password,
      email: email,
    };
    const token = jwt.sign(payload, newSecret, { expiresIn: '15m' });
    const url = `${CLIENT_URL}/portal/reset-password?pwrt=${token}&email=${email}`;

    const emailHtml = render(<PasswordReset url={url} />);
    const mailOptions = {
      from: SENDER,
      to: email,
      subject: 'Your GLAMO password reset link is ready',
      html: emailHtml,
    };

    await transporter.sendMail(mailOptions);
    return res.status(200).send({
      success: true,
      msg: 'password link successfully generated and sent to user email.',
    });
  }),
]);

app.post('/api/reset-password', [
  check('password', 'Password must be between 10 to 20 characters.')
    .trim()
    .escape()
    .notEmpty()
    .isLength({ min: 10, max: 20 }),
  check('confirmPassword')
    .trim()
    .escape()
    .custom((value, { req }) => {
      if (value != req.body.password) {
        throw new Error('passwords does not match.');
      } else {
        return true;
      }
    }),
  check('email').trim().escape(),
  check('token').trim().escape(),
  asyncHandler(async (req, res, next) => {
    try {
      const results = validationResult(req).formatWith(({ msg }) => msg);

      if (!results.isEmpty()) {
        console.log({ error: results.mapped() });
        return res.status(400).send({ error: results.mapped() });
      }
      const { token, email, password, confirmPassword } = req.body;
      const user = await User.findOne({ email });
      if (!user) {
        return res
          .status(404)
          .send({ success: false, msg: 'user does not exist.' });
      }
      const getSecret = PASSWORD_RESET_JWT_SECRET + user.password;
      const payload = jwt.verify(token, getSecret);

      if (payload?.email != email) {
        return res.status(404).send({ success: false, msg: 'invalid' });
      }

      const salt = bcrypt.genSaltSync(parseInt(SALT_ROUNDS));
      const hashPassword = bcrypt.hashSync(confirmPassword, salt);
      user.password = hashPassword;
      user.save();
      res.send({ success: true, msg: 'password successfully updated!' });
    } catch (error) {
      console.error('invalid jwt', error);
      let expired = false;
      let invalid = false;
      if (error?.name == 'TokenExpiredError') {
        expired = true;
      }
      if (error?.name == 'JsonWebTokenError') {
        invalid = true;
      }
      res.status(500).send({ expired, invalid });
    }
  }),
]);

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
