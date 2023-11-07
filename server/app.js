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
import userRoute from './Routes/userRoute.js';
import adminRoute from './Routes/adminRoute.js';
import orderRoute from './Routes/orderRoute.js';
import deliveryRoute from './Routes/deliveryRoute.js';
import errorHandler from './errorHandler.js';
import passport from './utils/passport.js';
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
    cookie: { maxAge: 1000 * 60 * 60 * 24, secure: false, httpOnly: true }, // 1 day
  }),
);
app.use(passport.initialize());
app.use(passport.session());
app.use(morgan('dev'));
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/server-status', (req, res) => {
  res.send('OK');
});
app.use('/product', productRoute);
app.use('/coupon', couponRoute);
app.use('/category', categoryRoute);
app.use('/search', searchRoute);
app.use('/giftcard', giftCardRoute);
app.use('/user', userRoute);
app.use('/admin', adminRoute);
app.use('/order', orderRoute);
app.use('/delivery', deliveryRoute);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`listening on Port: ${PORT}`);
});
