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
import https from 'https';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);
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

app.use(errorHandler);

const httpOptions = {
  // key: fs.readFileSync(path.join(__dirname, 'cert', 'key.pem'), 'utf8'),
  // cert: fs.readFileSync(path.join(__dirname, 'cert', 'sslcert.pem'), 'utf8'),
  // key: fs.readFileSync(path.join(__dirname, 'mkcert', 'cert.key')),
  // cert: fs.readFileSync(path.join(__dirname, 'mkcert', 'cert.crt')),
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
