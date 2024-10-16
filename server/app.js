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
import webHookRoute from './Routes/webhookRoute.js';
import userRoute from './Routes/userRoute.js';
import adminRoute from './Routes/adminRoute.js';
import orderRoute from './Routes/orderRoute.js';
import deliveryRoute from './Routes/deliveryRoute.js';
import errorHandler from './errorHandler.js';
import passport from './utils/passport/passport.js';
import indexRoute from './Routes/indexRoute.js';
import NodeCache from 'node-cache';
import 'dotenv/config';
import {
  checkAdminAuthenticated,
  checkAuthenticated,
} from './middleware/checkAuthenticated.js';
import ExpressStatusMonitor from 'express-status-monitor';
import logger from './utils/logger.js';
import dayjs from 'dayjs';
import { utc } from 'dayjs';
dayjs.extend(utc);
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
app.use(morgan((process.env.NODE_ENV = 'production' ? 'tiny' : 'dev')));
export const myCache = new NodeCache();
// app.use(cors());
app.set('trust proxy', true);
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

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  ExpressStatusMonitor({
    path: '/api/status',
    title: 'Backend Server ',
  }),
);
app.use('/api', indexRoute);
app.use('/api/product', productRoute);
app.use('/api/coupon', couponRoute);
app.use('/api/category', categoryRoute);
app.use('/api/search', searchRoute);
//app.use('/api/giftcard', giftCardRoute);
app.use('/api/user', [checkAuthenticated, userRoute]);
app.use('/api/admin', [checkAdminAuthenticated, adminRoute]);
app.use('/api/order', orderRoute);
app.use('/api/delivery', deliveryRoute);
app.use('/api/webhook', webHookRoute);
// test email

app.use(errorHandler);

// const httpOptions = {
//   key: fs.readFileSync('./mkcert/key.pem'),
//   cert: fs.readFileSync('./mkcert/cert.pem'),
//   requestCert: false,
//   rejectUnauthorized: process.env.NODE_ENV === 'production',
// };

// const sslServer = https.createServer(httpOptions, app);
// sslServer.listen(PORT, () => {
//   logger.info(`Secure server🔑 listening on Port: ${PORT}`);
//   // logger.error(`Secure server🔑 listening on Port: ${PORT}`);
// });

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
