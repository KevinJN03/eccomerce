/* eslint-disable no-console */
/* eslint-disable import/no-extraneous-dependencies */
import express from 'express';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import morgan from 'morgan';
import cors from 'cors';
import mongoose from 'mongoose';
import 'dotenv/config';
import errorHandler from './errorHandler.js';
import passport from 'passport';
import './utils/passport';
import indexRoute from './Routes/index.js';
import NodeCache from 'node-cache';
import ExpressStatusMonitor from 'express-status-monitor';
import logger from './utils/logger.js';
import dayjs from 'dayjs';
import { utc } from 'dayjs';
import fs from 'fs';
import https from 'https';
dayjs.extend(utc);
const { DBNAME, URL, SECRET, PORT, CLIENT_URL, NODE_ENV } = process.env;

// do not connect to cloud database in test environment.
if (NODE_ENV != 'test') {
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
}

const app = express();
// app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan(NODE_ENV == 'production' ? 'tiny' : 'dev'));
export const myCache = new NodeCache();

//app.set('trust proxy', true);
//app.use(cors({ origin: true, credentials: true }));
app.use(cors({
  origin: CLIENT_URL, // frontend URL
  credentials: true                // allow cookies, credentials
}));
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

app.use(
  ExpressStatusMonitor({
    path: '/api/status',
    title: 'Backend Server ',
  }),
);
app.use('/api', indexRoute);
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

export default app;
