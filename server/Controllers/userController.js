/* eslint-disable import/prefer-default-export */
import asyncHandler from 'express-async-handler';
import User from '../Models/user.js';
import multer from 'multer';
import fileFilter from '../Upload/fileFilter.js';
import sharpify from '../Upload/sharpify.js';
import bcrypt from 'bcryptjs';
import s3Upload, { s3Delete } from '../utils/s3Service.js';
import 'dotenv/config';
import { body, check, validationResult } from 'express-validator';
import timezone from 'dayjs/plugin/timezone.js';
import utc from 'dayjs/plugin/utc.js';
import dayjs from 'dayjs';
import passport from 'passport';
import { checkAuthenticated } from '../middleware/checkAuthenticated.js';
import Address from '../Models/address.js';
import addressValidator from '../utils/addressValidator.js';
import errorRegenerator from '../utils/errorRegenerator.js';

import { v4 as uuidv4 } from 'uuid';
import mongoose from 'mongoose';
import Stripe from 'stripe';
import Order from '../Models/order.js';
import { parsePhoneNumberFromString } from 'libphonenumber-js';

import * as React from 'react';
import ChangePassword from '../React Email/emails/changePassword.jsx';
import { render } from '@react-email/render';
import transporter from '../utils/nodemailer.js';
import 'dotenv/config';
import ChangeEmail from '../React Email/emails/changeEmail.jsx';
import userValidators from '../utils/userValidators.js';
import OrderCancel from '../React Email/emails/orderCancelled.jsx';
import logger from '../utils/logger.js';
import handleProfilePhoto from '../utils/handleProfilePhoto.js';
const stripe = Stripe(process.env.STRIPE_KEY);

const CLIENT_URL = process.env.CLIENT_URL;
const SALT_ROUNDS = process.env.SALT_ROUNDS;
dayjs.extend(utc);
dayjs.extend(timezone);


// test
export const dummy_data = asyncHandler(async (req, res, next) => {
  const dummyUsers = [
    {
      firstName: 'John',
      lastName: 'Doe',
      email: 'johndoe@example.com',
      password: 'password123',
      dob: new Date('1990-01-15'),
      interest: 'Menswear',
    },
    {
      firstName: 'Jane',
      lastName: 'Smith',
      email: 'janesmith@example.com',
      password: 'securepassword',
      dob: new Date('1985-05-20'),
      interest: 'Womenswear',
    },
    {
      firstName: 'Alice',
      lastName: 'Johnson',
      email: 'alice@example.com',
      password: 'mysecretpassword',
      dob: new Date('1995-09-10'),
      interest: 'Menswear',
    },
    {
      firstName: 'Ella',
      lastName: 'Brown',
      email: 'ella@example.com',
      password: 'mypassword123',
      dob: new Date('1988-11-30'),
      interest: 'Womenswear',
    },
  ];

  const bulkCreate = await User.insertMany(dummyUsers);
  res.send(bulkCreate);
});

export const delete_user = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const user = await User.findByIdAndDelete(id);
  await s3Delete('user', id);
  res.status(200).json({
    msg: 'user Deleted',
    user,
  });
});
export const delete_many_user = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const idArr = id.split(',');
  const deleteUserImage = idArr.map((item) => {
    s3Delete('user', item);
  });

  const result = await Promise.all([
    User.deleteMany({ _id: idArr }),
    deleteUserImage,
  ]);
  res.status(200).send(result);
});

const storage = multer.memoryStorage();

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 1000000000, files: 6 },
});

export const create_user = [
  upload.single('file'),
  asyncHandler(async (req, res, next) => {
    const { file } = req;

    const {
      password,
      firstName,
      lastName,
      dob,
      address,
      mobile,
      email,
      interest,
    } = req.body;

    const hashPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      password: hashPassword,
      firstName,
      lastName,
      dob,
      address: [address],
      mobile,
      email,
      interest,
    });

    const { id } = user;

    await handleProfilePhoto(file, id);
    res.status(201).send(user);
  }),
];

export const signUp_user = [
  userValidators,
  asyncHandler(async (req, res, next) => {
    const { firstName, email, password, lastName } = req.body;
    const result = validationResult(req);

    if (!result.isEmpty()) {
      const newResult = {};

      result.errors.map(({ path, msg }) => {
        newResult[path] = msg;
      });
      return res.status(400).send(newResult);
    }

    const salt = bcrypt.genSaltSync(parseInt(SALT_ROUNDS));

    const hashPassword = bcrypt.hashSync(password, salt);
    const user = await User.create({ ...req.body, password: hashPassword });
    await stripe.customers.create({
      id: user.id,
      name: `${firstName} ${lastName}`,
      email,
    });
    res.status(201).send({ msg: 'user created', user });
  }),
];

export const get_single_user = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const sixMonthsFromToday = dayjs()
    .subtract(6, 'month')
    .set('D', 1)
    .set('h', 1)
    .set('m', 0)
    .set('s', 0)
    .toDate();

  const [user, orders, getOrdersByMonth] = await Promise.all([
    User.findById(id, null, {
      populate: {
        path: 'default_address.shipping_address',
      },
    }),
    Order.find({ customer: id }, null, {
      sort: { createdAt: -1 },
      limit: 5,
      populate: {
        path: 'items.product',
      },
    }),
    Order.aggregate([
      {
        $match: {
          status: {
            $in: ['received', 'shipped', 'delivered'],
          },
          createdAt: { $gte: sixMonthsFromToday },
          customer: new mongoose.Types.ObjectId(id),
        },
      },
      {
        $group: {
          _id: { $month: '$createdAt' },
          total: { $sum: '$transaction_cost.total' },
          numOfOrders: { $sum: 1 },
          /* status: { $match: { $or: ['received', 'shipped', 'delivered'] } }, */
          // customer: { $match: id },
        },
      },
      {
        $sort: {
          _id: 1,
        },
      },
    ]).exec(),
  ]);

  if (!user) {
    res.status(404).send('User Not Found');
  } else {
    res.status(200).send({ user, orders, getOrdersByMonth });
  }
});

export const update_single = [
  upload.single('file'),
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const { file } = req;

    const user = await User.updateOne({ _id: id }, req.body, {
      new: true,
      upsert: true,
      runValidators: true,
    });
    await handleProfilePhoto(file, id);

    res.status(200).send(user);
  }),
];

export const loginUser = [
  check('email', 'Please enter a valid email address.')
    .trim()
    .isEmail()
    .custom(async (email) => {
      const findUser = await User.findOne({ email });

      if (!findUser) {
        throw new Error('User does not exist.');
      }

      return true;
    }),
  check(
    'password',
    'Please enter a valid password between 8 to 50 characters.',
  )
    .trim()
    .notEmpty()
    .trim()
    .isLength({ min: 8, max: 50 }),
  asyncHandler(async (req, res, next) => {
    const result = validationResult(req).formatWith(({ msg }) => {
      return msg;
    });

    if (!result.isEmpty()) {
      return res.status(400).send(result.mapped());
    }

    await passport.authenticate('local', async (err, user, info) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res
          .status(400)
          .send({ password: 'The password is invalid. Please try again.' });
      }

      return req.logIn(user, (error) => {
 
        if (error) {
          next(error)
        }

       return res.redirect(303,'/api/user/check');
      });
  
    })(req, res, next);

    
  }),


 
 
];

export const userLogout = asyncHandler(async (req, res, next) => {
  if (req.isAuthenticated()) {
    req.logout();
    logger.info(`user ${req.user?._id} log out successfully.`);
  }
  res.status(200).clearCookie('connect.sid').send({
    msg: 'Successfully logout user.',
    authenticated: false,
  });
});

export const checkUser = asyncHandler(async (req, res, next) => {
  if (req.isAuthenticated()) {
    return res.status(200).send({ authenticated: true, user: req.user });
  }
  return res.status(401).send({ authenticated: false });
});

export const logoutUser = asyncHandler(async (req, res, next) => {
  // req.logOut();
  // req.session.destroy();
  // logger.info(`user ${req.user.id} log out successfully`);
  // return res.status(200).clearCookie('connect.sid').send({
  //   msg: 'Successfully logout user.',
  //   authenticated: false,
  // });

  req.logout((err) => {
    if (err) {
      throw new Error(err);
    }
    res.clearCookie('connect.sid').send({
      msg: 'Successfully logout user.',
      authenticated: false,
    });
  });

  logger.info(`user ${req?.user?._id} log out successfully`);
});

export const getAllUserData = [
  asyncHandler(async (req, res, next) => {
    const user = await User.findById(
      req.user._id,
      {
        email: 1,
        firstName: 1,
        lastName: 1,
        interest: 1,
        _id: 1,
        id: 1,
        social_accounts: 1,
        default_address: 1,
        contact_preferences: 1,
        address: 1,
        dob: 1,
      },
      {
        lean: {
          toObject: true,
        },

        populate: {
          path: 'address',
        },
      },
    ).exec();

    res.send({ user });
  }),
];

export const changeDetails = [
  check('firstName', 'Please enter a first name').trim().escape().notEmpty(),
  check('lastName', 'Please enter a last name').trim().escape().notEmpty(),
  check('email', 'Please enter a valid email')
    .trim()
    .escape()
    .isEmail()
    .notEmpty()
    .custom(async (value, { req }) => {
      const userId = req.session.passport?.user;

      const currentUser = await User.findById(
        userId,
        { email: 1, lastEmailChange: 1 },
        { lean: { toObject: true } },
      );
      const findNewEmail = await User.findOne(
        { email: value },
        { email: 1 },
        {
          lean: { toObject: true },
        },
      );

      if (currentUser?.email == findNewEmail?.email) {
        return true;
      }

      if (currentUser?.lastEmailChange) {
        const todayDate = dayjs();
        const lastTimeEmailChanged = dayjs(currentUser?.lastEmailChange);

        const difference = todayDate.diff(lastTimeEmailChanged, 'minute');

        if (difference < 30) {
          throw new Error(
            `Sorry, you'll need to wait ${
              30 - difference
            } minutes to change your email address again.`,
          );
        }
      }

      if (findNewEmail) {
        throw new Error(`${value} is already registered`);
      }

      return true;
    }),
  check('interest', 'Please select a valid interest.')
    .trim()
    .escape()
    .notEmpty(),
  check('dob', 'Must be 18 years old or older')
    .trim()
    .escape()
    .notEmpty()
    .custom((value) => {
      const todayDate = dayjs();
      const dateOfBirth = dayjs(value);

      const difference = todayDate.diff(dateOfBirth, 'year');

      if (difference >= 18) {
        return true;
      }

      return false;
    }),
  asyncHandler(async (req, res, next) => {
    const body = req.body;
    const userId = req.session.passport.user;
    const result = validationResult(req).formatWith(({ msg }) => msg);

    if (!result?.isEmpty()) {
      return res.status(400).send({ error: result.mapped(), success: false });
    }

    const user = await User.findByIdAndUpdate(userId, body, {
      select: { email: 1 },
      lean: { toObject: true },

      new: false,
      // returnDocument: 'after',
      runValidators: true,
    });

    if (user?.email != req.body?.email) {
      const previousEmailHtml = render(
        <ChangeEmail
          firstName={req.body?.firstName}
          newEmail={req.body?.email}
        />,
      );

      const newEmailHtml = render(
        <ChangeEmail firstName={req.body?.firstName} />,
      );

      const mailOptions = {
        from: process.env.SENDER,

        subject: 'You’ve updated your email address',
      };

      const promiseResult = await Promise.all([
        transporter.sendMail({
          ...mailOptions,
          to: user?.email,
          html: previousEmailHtml,
        }),
        transporter.sendMail({
          ...mailOptions,
          to: req.body?.email,
          html: newEmailHtml,
        }),
        User.findByIdAndUpdate(
          userId,
          { lastEmailChange: Date.now() },
          { lean: { toObject: true }, select: { email: 1 } },
        ),
      ]);
    }

    res.redirect(303, '/api/user/check');
  }),
];

export const addUserAddress = [
  addressValidator,
  asyncHandler(async (req, res, next) => {
    const result = validationResult(req);

    if (!result.isEmpty()) {
      const newResult = errorRegenerator(result);
      return res.status(400).send(newResult);
    }
    const userId = req.session.passport.user;

    const address = new Address({ ...req.body, userId });

    const [newAddress, user] = await Promise.all([
      address.save(),
      User.findByIdAndUpdate(
        userId,
        { $push: { address: address._id } },
        { runValidators: true, new: true, select: { password: 0 } },
      )
        .populate('address')
        .exec(),
    ]);
    if (user.address.length == 1) {
      user.default_address = {
        billing_address: address.id,
        shipping_address: address.id,
      };

      await user.save();
    }
    res.status(200).send({
      success: true,
      address: user.address,
      default_address: user.default_address,
    });
  }),
];

export const deleteAddress = [
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;

    const userId = req.session.passport.user;
    const [address, user] = await Promise.all([
      Address.findByIdAndDelete(id),
      User.findByIdAndUpdate(
        userId,
        { $pull: { address: id } },
        { runValidators: true, new: true, select: { password: 0 } },
      )
        .populate('address')
        .exec(),
    ]);

    if (user.default_address.shipping_address == address.id) {
      user.default_address = {
        shipping_address: null,
        billing_address: null,
      };
      await user.save();
    }

    res.status(200).send({ success: true, address: user.address });
  }),
];

export const editAddress = [
  addressValidator,
  asyncHandler(async (req, res, next) => {
    const result = validationResult(req);

    const { id } = req.params;
    if (!result.isEmpty()) {
      const newResult = errorRegenerator(result);

      return res.status(400).send(newResult);
    }

    const user = await User.findById(req.session.passport.user, { address: 1 });

    const isUserAddress = user.address.some((item) => {
      return item.toString() == id;
    });

    if (!isUserAddress) {
      return res.status(404).send({ notFound: true });
    }

    const parseNumber = parsePhoneNumberFromString(
      req.body?.mobile,
      req.body?.country,
    );
    if (isUserAddress) {
      await Address.findByIdAndUpdate(
        id,
        { ...req.body, mobile: parseNumber?.number },
        { new: true },
      );
      return res.redirect(303, '/api/user/userData');
    }
  }),
];

export const updatePreferences = [
  check('discount_new_drops.email').escape().trim(),
  check('discount_new_drops.text').escape().trim(),
  check('stock_alert.email').escape().trim(),

  asyncHandler(async (req, res, next) => {
    const userId = req.session.passport.user;

    const user = await User.findByIdAndUpdate(
      userId,
      {
        contact_preferences: req.body,
      },
      {
        new: true,
        upsert: true,
        select: { contact_preferences: 1 },
        lean: { toObject: true },
      },
    );

    res
      .status(200)
      .send({ msg: 'User contact preferences successfully updates', ...user });
  }),
];

export const updateDefaultAddress = [
  asyncHandler(async (req, res, next) => {
    const body = req.body;
    const property = Object.keys(body)[0];
    const value = Object.values(body)[0];
    const userId = req.session.passport.user;
    const user = await User.findByIdAndUpdate(
      userId,
      {
        $set: { [`default_address.${property}`]: value },
      },
      {
        new: true,
        upsert: true,
        select: {
          default_address: 1,
        },
      },
    );

    return res.status(200).send({
      msg: `succussfully update user default ${property.replaceAll('_', ' ')}.`,
      default_address: user.default_address,
    });
  }),
];

export const addPaymentMethod = [
  check('logo').escape().trim(),
  check('description').escape().trim(),
  check('alt').escape().trim(),
  check('text').escape().trim(),
  asyncHandler(async (req, res, next) => {
    const userId = req.session.passport.user;

    const user = await User.findByIdAndUpdate(
      userId,
      {
        $push: {
          payment_methods: { id: new mongoose.Types.ObjectId(), ...req.body },
        },
      },
      { upsert: true, new: true, select: { payment_methods: 1 } },
    );

    res.status(200).send({
      msg: 'payment method successfully added',
      payment_methods: user.payment_methods,
    });
  }),
];

export const deletePaymentMethod = [
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const userId = req.session.passport.user;

    await stripe.paymentMethods.detach(id);
    res.redirect(303, '/api/user/payment-method/all');
    // const user = await User.findByIdAndUpdate(
    //   userId,
    //   {
    //     $pull: {
    //       payment_methods: { _id: id },
    //     },
    //   },
    //   { upsert: true, new: true, select: { payment_methods: 1 } },
    // );
    // console.log({ payment_methods: user.payment_methods });
    // res.status(200).send({
    //   msg: 'payment method successfully added',
    //   payment_methods: user.payment_methods,
    // });
  }),
];

export const changeDefaultMethod = [
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const userId = req.session.passport.user;
    const customer = await stripe.customers.update(userId, {
      invoice_settings: { default_payment_method: id },
    });

    res.redirect(303, '/api/user/payment-method/all');
  }),
];

export const saveCustomerCard = [
  asyncHandler(async (req, res, next) => {
    const userId = req.session.passport.user;

    const findCustomer = await stripe.customers.list();

    const allCustomers = findCustomer.data;
    const checkExists = allCustomers.some((item) => item.id == userId);

    let setupIntent = null;
    if (checkExists) {
      setupIntent = await stripe.setupIntents.create({
        customer: userId,
        payment_method_types: ['card'],
      });
    } else {
      const customer = await stripe.customers.create({
        id: userId,
        name: `${req.user.firstName} ${req.user.lastName}`,
        email: req.user.email,
      });
      setupIntent = await stripe.setupIntents.create({
        customer: userId,
        payment_method_types: ['card'],
      });
    }

    res.send({
      success: true,
      id: setupIntent.id,
      client_secret: setupIntent.client_secret,
    });
  }),
];

export const getPaymentMethods = [
  asyncHandler(async (req, res, next) => {
    const userId = req.session.passport.user;

    const paymentMethods = await stripe.paymentMethods.list({
      customer: req.session.passport.user,
    });
    const customer = await stripe.customers.retrieve(userId);
    const defaultPaymentMethod =
      customer.invoice_settings?.default_payment_method;
    const newMethodsArray = paymentMethods.data
      .map((method) => {
        if (method.type === 'card') {
          const { brand, exp_month, exp_year, last4, funding } = method?.card;

          const newMonth = '0' + exp_month;
          return {
            id: method.id,
            brand: brand[0].toUpperCase() + brand.slice(1),
            exp_month: newMonth.slice(-2),
            exp_year: exp_year,
            last4,
            type: 'card',
            funding: funding[0].toUpperCase() + funding.slice(1),
            name: method.billing_details.name,
          };
        }

        if (method.type === 'paypal') {
          return {
            id: method.id,
            type: method.type,
            text: 'PayPal',
          };
        }

        return {
          id: method.id,
          type: method.type,
          text: method.type,
        };
      })
      .sort((a, b) => {
        if (a.id === defaultPaymentMethod) {
          return -1;
        }
        if (b.id === defaultPaymentMethod) {
          return +1;
        }
        return 0;
      });

    return res.status(200).send({
      success: true,
      paymentMethods: newMethodsArray,
    });
  }),
];

export const setUpPaypal = [
  asyncHandler(async (req, res, next) => {
    const userId = req.session.passport.user;
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['paypal'],
      mode: 'setup',
      customer: userId,
      success_url: `${CLIENT_URL}/my-account/payment-methods/`,
      cancel_url: `${CLIENT_URL}/my-account/payment-methods/cancel?session_id={CHECKOUT_SESSION_ID}`,
    });

    res.send({ success: true, url: session.url });
  }),
];

export const setUpKlarna = [
  asyncHandler(async (req, res, next) => {
    const userId = req.session.passport.user;
    // const session = await stripe.checkout.sessions.create({
    //   payment_method_types: ['klarna','afterpay_clearpay'],
    //   shipping_address_collection: { allowed_countries: ['GB', 'US'] },
    //   line_items: [
    //     {
    //       price_data: {
    //         currency: 'gbp',
    //         product_data: {
    //           name: 'Setup Klarna For Future Use',
    //         },
    //          unit_amount:100,

    //       },
    //       quantity: 1,
    //     },
    //   ],
    //   mode: 'payment',
    //   customer: userId,
    //   success_url: `${CLIENT_URL}/my-account/payment-methods/`,
    //   cancel_url: `${CLIENT_URL}/my-account/payment-methods/cancel?session_id={CHECKOUT_SESSION_ID}`,
    // });

    // res.send({ success: true, url: session.url });
    const { email, firstName, lastName } = req.user;
    const name = `${firstName} ${lastName}`;

    const paymentMethod = await stripe.paymentMethods.create({
      type: 'afterpay_clearpay',
      billing_details: {
        address: {
          line1: 'null',
          country: 'GB',
          postal_code: 'null',
        },
        name,
        email,
      },
      // klarna: {
      //   dob: {
      //     day: 22,
      //     month: 3,
      //     year: 2002,
      //   },
      // },
    });

    const attachPaymentMethod = await stripe.paymentMethods.attach(
      paymentMethod.id,
      { customer: userId },
    );
    res.status(200).send({ success: true });
  }),
];

export const getOrders = [
  asyncHandler(async (req, res, next) => {
    const userId = req.session.passport.user;
    // const getUserOrder = await User.findOne({ _id: userId }, null, {
    //   projection: { orders: 1 },
    //   populate: 'orders',
    // });

    const getUserOrder = await Order.find({ customer: userId }, null, {
      lean: true,
    })
      .populate('items.product')

      .exec();

    return res
      .status(200)
      .send({ success: true, orders: getUserOrder?.reverse() });
  }),
];

export const changePassword = [
  check('currentPassword')
    .trim()
    .escape()
    .custom(async (value, { req }) => {
      const userId = req.session.passport?.user;
      const user = await User.findById(userId, null, {
        toObject: true,
        new: true,
      });

      const match = await bcrypt.compare(value, user?.password);

      if (!match) {
        throw new Error('Current password does not match');
      }
      return match;
    }),
  check('newPassword', 'Please enter a Password with 10 or more characters')
    .trim()
    .escape()
    .isLength({ min: 10 }),

  asyncHandler(async (req, res, next) => {
    const result = validationResult(req).formatWith(({ msg }) => msg);

    if (!result.isEmpty()) {
      return res.status(400).send({ error: result.mapped() });
    }

    const { currentPassword, newPassword } = req.body;
    if (currentPassword === newPassword) {
      return res.status(400).send({
        error: {
          newPassword:
            "Hey! It looks like you've used this password before. Please choose a fresh one.",
        },
      });
    }

    const userId = req.session.passport?.user;
    const salt = bcrypt.genSaltSync(parseInt(SALT_ROUNDS));

    const hashPassword = bcrypt.hashSync(newPassword, salt);

    const user = await User.findByIdAndUpdate(
      userId,
      { password: hashPassword },
      { new: true, lean: { toObject: true } },
    );

    const emailHtml = render(<ChangePassword firstName={user?.firstName} />);

    const SENDER = process.env.SENDER;
    const mailOptions = {
      from: SENDER,
      to: user?.email,
      subject: 'Password changed!',
      html: emailHtml,
    };

    await transporter.sendMail(mailOptions);
    res.send({ success: true, msg: 'Password successfully changed.' });
  }),
];

export const addDigitalPaymentMethod = [
  asyncHandler(async (req, res, next) => {
    const { type } = req.body;
    const userId = req.session.passport?.user;
    const user = await User.findById(userId, null, {
      lean: { toObject: true },
    });

    const options = {
      type,
      billing_details: {
        // address: {
        //   line1: '1',
        //   line2: '1',
        //   state: '1',
        //   country: 'GB',
        //   postal_code: '1235',
        // },
        name: `${user?.firstName} ${user?.lastName}`,
        email: user?.email,
      },
    };
    if (type == 'klarna') {
      const customerDob = dayjs(user?.dob);

      const dob = {
        day: customerDob.date(),
        month: customerDob.month() + 1,
        year: customerDob.year(),
      };
      options.klarna = { dob };
    }

    const paymentMethod = await stripe.paymentMethods.create(options);

    const attach = await stripe.paymentMethods.attach(paymentMethod?.id, {
      customer: userId,
    });

    // return res.send({ sucess: true, msg: 'payment method added' });

    return res.redirect(303, '/api/user/payment-method/all');
    // const attachToCustomer = await stripe.setupIntents.create({
    //   payment_method_types: [type],
    //   customer: userId,
    //   payment_method: paymentMethod?.id,
    //   confirm: true,
    //   mandate_data: {
    //     customer_acceptance: {
    //       type: 'online',
    //       online: {
    //         ip_address: requestIp.getClientIp(req),
    //         user_agent: req.headers['user-agent'],
    //       },
    //     },
    //   },
    //   use_stripe_sdk: true,
    //   return_url: `${CLIENT_URL}/my-account/payment-methods`,
    // });

    // res.send({
    //   success: true,
    //   msg: 'payment method successfully added',
    //   clientSecret: attachToCustomer?.client_secret,
    //   url: attachToCustomer?.return_url,
    // });
  }),
];

export const cancelOrder = [
  check('orderNumber').trim().escape(),
  check('reason', 'Please select a reason for cancellation')
    .trim()
    .escape()
    .notEmpty(),
  check('redirect').trim().escape(),
  check('additional_information', 'Please enter under 500 characters')
    .trim()
    .escape()
    .isLength({ max: 500 }),
  asyncHandler(async (req, res, next) => {
    const { orderNumber, additional_information, redirect } = req.body;
    const userId = req.user?.id;

    const result = validationResult(req).formatWith(({ msg }) => msg);

    if (!result.isEmpty()) {
      return res.status(400).send({ error: result.mapped() });
    }

    const order = await Order.findByIdAndUpdate(
      orderNumber,
      {
        status: 'cancelled',
        cancel: {
          ...req.body,
        },
        cancel_date: new Date(),
      },
      {
        new: true,
        lean: {
          toObject: true,
        },
        populate: {
          path: 'items.product customer',
        },
      },
    );

    if (order?.payment_intent_id) {
      const refund = await stripe.refunds.create({
        payment_intent: order?.payment_intent_id,
      });

      await Order.findByIdAndUpdate(orderNumber, { refund_id: refund.id });
    }

    const emailHtml = render(<OrderCancel order={order} />);

    const { SENDER } = process.env;
    const mailOptions = {
      from: SENDER,
      to: order?.customer?.email,
      subject: 'Your GLAMO order has been cancelled',
      html: emailHtml,
    };
    await transporter.sendMail(mailOptions);
    if (redirect) {
      res.redirect('/api/user/orders');
    } else {
      res.status(200).send({ msg: 'successfully cancelled', success: true });
    }
  }),
];

export const updateWishlist = [
  asyncHandler(async (req, res, next) => {
    const userId = req.user._id;
    await User.findByIdAndUpdate(userId, { wishlist: req.body.wishlist });
    res.status(200).send({ success: true });
  }),
];

export const getWishlist = [
  asyncHandler(async (req, res, next) => {
    const userId = req.user._id;

    const user = await User.findById(userId, null, {
      lean: { toObject: true },
    });

    res.status(200).send({ wishlist: user.wishlist, success: true });
  }),
];
