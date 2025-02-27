/* eslint-disable import/prefer-default-export */
import User from '../Models/user.js';
import asyncHandler from 'express-async-handler';
import bcrypt from 'bcryptjs';
import { check, validationResult } from 'express-validator';
import Order from '../Models/order.js';
import passport from 'passport';
import 'dotenv/config.js';
import Stripe from 'stripe';
import dayjs from 'dayjs';
import minMax from 'dayjs/plugin/minMax';
import OrderShipped from '../React Email/emails/orderShipped.jsx';
import * as React from 'react';
import { render } from '@react-email/render';
import transporter from '../utils/nodemailer.js';
import OrderCancel from '../React Email/emails/orderCancelled.jsx';
import ReturnOrder from '../React Email/emails/returnOrder.jsx';
import { renderToStream } from '@react-pdf/renderer';
import Pdf from '../pdf/pdf.jsx';
import { generateSignedUrl, s3Get, s3PdfUpload } from '../utils/s3Service.js';
import randomString from 'randomstring';
import Coupon from '../Models/coupon.js';
import mongoose from 'mongoose';
import logger from '../utils/logger.js';
import Product from '../Models/product.js';
import productAggregateStage from '../utils/productAggregateStage.js';
import _ from 'lodash';
import productSearchStage from '../utils/productSearchStage.jsx';
import OpenAI from 'openai';
dayjs.extend(minMax);
const { SENDER, OPENAI_KEY, STRIPE_KEY, OPENAI_ORGANIZATION, OPENAI_PROJECT } =
  process.env;

const stripe = Stripe(STRIPE_KEY);
const openai = new OpenAI({
  organization: OPENAI_ORGANIZATION,
  project: OPENAI_PROJECT,
});

export const updateUserStatus = [
  check('id').trim().escape(),

  check('status')
    .trim()
    .escape()
    .customSanitizer((value) => {
      console.log({ value });

      if (value == 'active') {
        return 'inactive';
      } else {
        return 'active';
      }
    }),
  asyncHandler(async (req, res, next) => {
    const { id, status } = req.body;

    console.log({ status });

    const users = await User.updateMany(
      { _id: id },
      { status },
      { new: true, lean: { toObject: true } },
    );

    res.send({ success: true, users });
  }),
];

export const searchUser = [
  check('searchText').escape().trim().notEmpty(),

  asyncHandler(async (req, res, next) => {
    const { searchText } = req.query;

    const errors = validationResult(req);

    const projectionFields = {
      firstName: 1,
      lastName: 1,
      email: 1,
      dob: 1,
      _id: 1,
      status: 1,
      interest: 1,
    };

    if (!errors.isEmpty()) {
      const users = await User.find({}, projectionFields);
      return res.send({ result: users, searchText });
    }

    console.log({ searchText });
    const shouldArray = [
      'email',
      'lastName',
      'firstName',
      'interest',
      'status',
    ].map((field) => ({
      text: {
        query: searchText,
        path: field,
      },
    }));

    try {
      const objectId = new mongoose.Types.ObjectId(searchText);
      shouldArray.push({
        equals: {
          value: objectId,
          path: '_id',
        },
      });
    } catch (error) {
      console.error('parse string to objectId failed: ', error?.message);
    }

    const users = await User.aggregate([
      {
        $search: {
          index: 'user_search_index',
          compound: {
            should: shouldArray,
          },
        },
      },
      {
        $project: {
          ...projectionFields,
          score: { $meta: 'searchScore' },
        },
      },
    ]);

    res.send({ result: users, searchText });
  }),
];
export const ai_word_suggestion = [
  check('searchText', 'Provide a text to search').escape().trim().notEmpty(),
  asyncHandler(async (req, res, next) => {
    const { searchText } = req.query;
    const errors = validationResult(req).formatWith(({ msg }) => msg);

    if (!errors.isEmpty()) {
      return res.send({ result: [], searchText, errors: errors.mapped() });
    }

    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: 'user',
          content: `give me product word suggestion for the word "${searchText}" in a JSON array`,
        },
      ],
      model: 'gpt-3.5-turbo',
    });

    console.log(completion.choices[0]);
    res.send({ result: completion.choices[0], searchText });
  }),
];
export const count_all = asyncHandler(async (req, res, next) => {
  const todayDate = dayjs()
    .endOf('day')

    .unix();

  const sixMonthsFromToday = dayjs()
    .subtract(6, 'month')
    .startOf('day')
    .toDate();

  const [charges, userCount, orderCount, balance, orders, getOrdersByMonth] =
    await Promise.all([
      stripe.charges.search({
        query: `created>${todayDate}`,
      }),
      User.countDocuments(),
      Order.countDocuments(),
      stripe.balance.retrieve(),
      Order.find()
        .populate('items.product')
        .sort({ createdAt: -1, _id: 1 })
        .limit(5)
        .exec(),
      Order.aggregate([
        {
          $match: {
            // status: {
            //   $in: ['received', 'shipped', 'delivered'],
            // },
            createdAt: { $gte: sixMonthsFromToday },
          },
        },
        {
          $group: {
            _id: { $month: '$createdAt' },
            total: { $sum: '$transaction_cost.total' },
            numOfOrders: { $sum: 1 },
          },
        },
        {
          $sort: {
            _id: 1,
          },
        },
      ]).exec(),
    ]);
  const todayAmount = charges?.data?.reduce(
    (accumulater, charge) => (accumulater += charge?.amount),
    0,
  );
  const findGBPBalance = balance?.available?.find(
    (item) => item.currency == 'gbp',
  );
  const amount = findGBPBalance?.amount?.toString();

  res.status(200).json({
    userCount,
    orderCount,
    todayAmount: (todayAmount / 100).toFixed(2),
    balance: (amount / 100).toFixed(2),
    orders,
    getOrdersByMonth,
  });
});

export const adminLogin = [
  check('email').custom(async (email, { req }) => {
    const findUser = await User.findOne({ email });
    if (!findUser) {
      throw new Error("User doesn't exists.");
    }

    if (findUser?.adminAccess != true) {
      throw new Error('User does not have admin access.');
    }

    req.hassPassword = findUser.password;
    return true;
  }),
  check('password', 'password doesnt match.')
    .trim()
    .custom(async (value, { req }) => {
      console.log({ passwd: req.hassPassword, value });

      const match = await bcrypt.compare(value, req.hassPassword);
      console.log({ match });
      if (!match) {
        throw new Error('password doesnt match.');
      }

      return true;
    }),
  asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;
    const result = validationResult(req).formatWith(({ msg }) => {
      return msg;
    });

    if (!result.isEmpty()) {
      return res.status(404).send({ success: false, error: result.mapped() });
    }

    passport.authenticate('local', (err, user, info) => {
      if (err) {
        next(err);
      }

      if (!user) {
        return res
          .status(400)
          .send({ password: 'The password is invalid. Please try again.' });
      }
      if (user?.adminAccess != true) {
        return res
          .status(400)
          .send({ email: 'User does not have admin access.' });
      }
      req.logIn(user, (error) => {
        if (error) {
          return next(err);
        }
        logger.info(`admin User ${user._id} logged in successfully`);
        res.redirect(303, '/api/admin/check');
      });
    })(req, res, next);
    // res.status(200).send({ success: true, msg: 'login in successfully' });
  }),
];

export const getAllUsers = asyncHandler(async (req, res, next) => {
  const users = await User.find({});
  res.status(200).send(users);
});

export const getSingleOrder = [
  check('id').escape().trim().toUpperCase(),
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;

    const order = await Order.findOne({ _id: id }, null, {
      populate: {
        path: 'items.product customer',
        select: 'tittle _id images firstName lastName email title',
      },
      lean: { toObject: true },
    });

    if (!order) {
      return res.status(404).send({ msg: 'Order not found.', success: false });
    }
    if (_.get(order, 'charge_id')) {
      const charge = await stripe.charges.retrieve(order.charge_id);
      _.set(order, 'refund.amount', charge.amount_refunded / 100);
      // _.set(order, 'refund.data', charge);
    }

    res.status(200).send({ order, success: true });
  }),
];

export const shipOrder = [
  check('courier', 'Select a courier').escape().trim().notEmpty(),
  check('tracking_number', 'Invalid Tracking Number')
    .escape()
    .trim()
    .notEmpty(),
  check('dispatch_date', 'Select a Dispatch Date').escape().trim().notEmpty(),
  check('note').escape().trim(),
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const { preview, dispatch_date } = req.body;

    const errors = validationResult(req).formatWith(({ msg }) => msg);

    if (!errors.isEmpty() && !preview) {
      return res.status(400).send(errors.mapped());
    }

    const orderInfo = await Order.findById(id, null, {
      populate: 'customer',
      lean: { toObject: true },
      new: true,
    });
    const arrays = {
      start: [],
      end: [],
    };
    orderInfo.itemsByProfile.forEach(({ shippingInfo }) => {
      const { start, end, type } = _.get(shippingInfo, 'processing_time');
      let startDate = dayjs(dispatch_date).add(start, type.slice(0, -1));
      let endDate = dayjs(dispatch_date).add(end, type.slice(0, -1));

      arrays.start.push(startDate);
      arrays.end.push(endDate);
    });

    const findMinStartDate = dayjs.min(arrays.start).endOf('day').toISOString();
    const findMaxEndDate = dayjs.max(arrays.end).endOf('day').toISOString();
    console.log({ findMinStartDate, findMaxEndDate });

    const shippedObj = {
      ...req.body,
      max_delivery_date: findMaxEndDate,
      min_delivery_date: findMinStartDate,
    };

    if (preview) {
      res.status(200).send({
        success: true,
        html: render(
          <OrderShipped
            order={{ ...orderInfo, shipped: shippedObj }}
            preview={true}
          />,
        ),
      });
      return;
    }

    const order = await Order.findOneAndUpdate(
      { _id: id },
      {
        shipped: shippedObj,
        status: 'shipped',
        // ...req.body,
        // ship_date: new Date(),
        // 'shipping_option.delivery_date': newDeliveryDate,
      },
      {
        populate: { path: 'items.product customer' },
        new: true,
        lean: { toObject: true },
      },
    ).exec();

    const emailHtml = render(<OrderShipped order={order} />);
    const mailOptions = {
      from: SENDER,
      to: order?.customer?.email,
      subject: 'Your order’s on its way!',
      html: emailHtml,
    };

    const sendEmail = await transporter.sendMail(mailOptions);
    const responseObject = { success: true, msg: 'order shipped email sent' };

    res.send({ success: true, msg: 'order shipped email sent' });
  }),
];

export const mark_as_gift = [
  asyncHandler(async (req, res, next) => {
    const { id } = req.body;

    if (id.length > 1) {
      await Order.updateMany({ _id: id }, [
        {
          $set: { mark_as_gift: req.body.mark_as_gift },
        },
      ]);
    } else {
      await Order.findByIdAndUpdate(id[0], [
        {
          $set: { mark_as_gift: { $not: '$mark_as_gift' } },
        },
      ]);
    }

    // res.send(order);

    if (id.length == 1) {
      return res.redirect(`/api/admin/order/${id}`);
    } else {
      res.send({
        success: true,
        msg: `Orders status updated to ${req.body?.mark_as_gift}`,
        updateOrderInfo: false,
      });
    }
  }),
];

export const cancelOrder = [
  check('reason', 'Choose a reason').escape().trim().notEmpty(),
  check('returning_items', 'Choose an answer')
    .escape()
    .trim()
    .notEmpty()
    .toBoolean(),
  check('message_to_buyer', 'Keep note below 500 characters')
    .escape()
    .trim()
    .isLength({ max: 500 }),
  check('id').escape().trim(),
  check('cancel_order').escape().trim().toBoolean(),
  asyncHandler(async (req, res, next) => {
    const { cancel_order } = req.body;
    const { id } = req.params;
    const errors = validationResult(req).formatWith(({ msg }) => msg);
    if (!errors.isEmpty()) {
      return res.status(400).send(errors.mapped());
    }
    const date = dayjs().toDate();
    const updateObj = {
      cancel: { ...req.body, date },
      completed_date: date,
    };
    const statusObject = {};
    if (cancel_order) {
      statusObject.status = 'cancelled';
    }
    const order = await Order.findOneAndUpdate(
      { _id: id },
      { ...statusObject },
      {
        populate: { path: 'items.product customer' },
        new: true,
        lean: { toObject: true },
      },
    ).exec();

    if (order?.payment_intent_id) {
      const refundObj = {
        payment_intent: order.payment_intent_id,
        metadata: { ...req.body, order_id: order._id },
      };

      if (req.body?.charge) {
        refundObj.amount = parseFloat(req.body.charge) * 100;
      }
      const refund = await stripe.refunds.create(refundObj);

      updateObj['$push'] = { 'refund.id': refund.id };

      // await Order.findByIdAndUpdate(
      //   id,
      //   {
      //     $push: { 'refund.id': refund.id },
      //   },
      //   { new: true, useFindAndModify: false },
      // );
    }

    const updateOrder = await Order.findOneAndUpdate({ _id: id }, updateObj, {
      populate: { path: 'items.product customer' },
      new: true,
      lean: { toObject: true },
    }).exec();
    const emailHtml = render(<OrderCancel order={updateOrder} />);
    const mailOptions = {
      from: SENDER,
      to: updateOrder?.customer?.email,
      subject: 'Your GLAMO order has been cancelled',
      html: emailHtml,
    };

    const sendEmail = await transporter.sendMail(mailOptions);
    res.send({ success: true });
  }),
];
// ----------------------------------------------------
export const updateOrder = [
  check('courier', 'Select a courier')
    .trim()
    .escape()
    .custom((value, { req }) => {
      if (req.body?.status == 'shipped') {
        if (value.length < 3) {
          return false;
        }
      }
      return true;
    }),

  check('trackingNumber', 'Invalid Tracking Number')
    .trim()
    .escape()
    .custom((value, { req }) => {
      if (req.body?.status == 'shipped') {
        if (value.length < 12) {
          return false;
        }
      }
      return true;
    }),
  check('status', 'Please select an available option.')
    .trim()
    .escape()
    .notEmpty(),
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const results = validationResult(req).formatWith(({ msg }) => msg);

    if (!results.isEmpty()) {
      return res.status(400).send({ error: results.mapped() });
    }
    const { trackingNumber, courier, status } = req.body;

    if (status === 'shipped') {
      const oldOrderInfo = await Order.findById(id, null, {
        lean: { toObject: true },
        new: true,
      });

      const addUnit = oldOrderInfo?.shipping_option?.type?.substring(
        0,
        oldOrderInfo?.shipping_option?.type?.length - 1,
      );

      const newDeliveryDate = dayjs()
        .add(oldOrderInfo?.shipping_option?.time, addUnit)
        .format('dddd, D MMMM, YYYY');

      const order = await Order.findOneAndUpdate(
        { _id: id },
        {
          ...req.body,
          ship_date: new Date(),
          'shipping_option.delivery_date': newDeliveryDate,
        },
        {
          populate: { path: 'items.product customer' },
          new: true,
          lean: { toObject: true },
        },
      ).exec();

      const emailHtml = render(<OrderShipped order={order} />);
      const mailOptions = {
        from: SENDER,
        to: order?.customer?.email,
        subject: 'Your order’s on its way!',
        html: emailHtml,
      };

      const sendEmail = await transporter.sendMail(mailOptions);
    }
    if (status === 'cancelled') {
      const order = await Order.findOneAndUpdate(
        { _id: id },
        { status, cancel_date: new Date() },
        {
          populate: { path: 'items.product customer' },
          new: true,
          lean: { toObject: true },
        },
      ).exec();

      if (order?.payment_intent_id) {
        const refund = await stripe.refunds.create({
          payment_intent: order?.payment_intent_id,
        });

        await Order.findByIdAndUpdate(id, { refund_id: refund.id });
        console.log({ refund });
      }

      const emailHtml = render(<OrderCancel order={order} />);
      const mailOptions = {
        from: SENDER,
        to: order?.customer?.email,
        subject: 'Your GLAMO order has been cancelled',
        html: emailHtml,
      };

      const sendEmail = await transporter.sendMail(mailOptions);
    }

    if (status == 'returned') {
      const order = await Order.findOneAndUpdate(
        { _id: id },
        { status, return_date: new Date() },
        {
          populate: { path: 'items.product customer' },
          new: true,
          lean: { toObject: true },
        },
      ).exec();

      if (order?.payment_intent_id) {
        const refund = await stripe.refunds.create({
          payment_intent: order?.payment_intent_id,
        });

        await Order.findByIdAndUpdate(id, { refund_id: refund.id });
        console.log({ refund });
      }

      const emailHtml = render(<ReturnOrder order={order} />);
      const mailOptions = {
        from: SENDER,
        to: order?.customer?.email,
        subject: 'Your refund is on its way! 💸',
        html: emailHtml,
      };

      const sendEmail = await transporter.sendMail(mailOptions);
    }
    // res.status(302).redirect('/api/admin/orders');
    res.status(200).send({ success: true, msg: 'order successfully updated!' });
  }),
];

export const exportPdf = [
  check('ids').escape(),
  check('printChecks.packing_slip.checks.note.text').trim(),
  asyncHandler(async (req, res, next) => {
    const { ids, printChecks } = req.body;

    console.log({ ids, printChecks: printChecks.packing_slip.checks?.note });
    if (ids.length < 1 || typeof ids != 'object') {
      return res.status(400).send({ success: false });
    }
    const orders = await Order.find({ _id: { $in: ids } }, null, {
      populate: {
        path: 'items.product customer',
        select: 'tittle _id images firstName lastName email title',
      },

      lean: { toObject: true },
    });

    if (orders.length < 1) {
      return res.status(400).send({ success: false });
    }
    const sortedOrders = orders?.sort(
      (a, b) => ids.indexOf(a?._id) - ids.indexOf(b?._id),
    );

    if (printChecks.packing_slip.checks?.coupon) {
      const coupon = await Coupon.findById(
        printChecks.packing_slip.checks?.coupon,
        null,
        {
          lean: { toObject: true },
        },
      );
      printChecks.packing_slip.checks.coupon = coupon;
    }
    const title = randomString.generate({ length: 12, charset: 'numeric' });
    const generateStream = async () => {
      return await renderToStream(
        <Pdf orders={sortedOrders} title={title} printChecks={printChecks} />,
      );
    };

    const pdfStream = await generateStream();

    const sendToS3 = await s3PdfUpload({
      pdfStream,
      fileName: `${title}.pdf`,
    });

    res
      .status(200)
      .send({ success: true, s3Data: sendToS3, id: req.user._id, file: title });
  }),
];

export const generatePresignUrl = [
  check('file').trim().escape(),
  asyncHandler(async (req, res, next) => {
    const url = await generateSignedUrl(`files/pdf/${req.body.file}`);

    console.log({ url });
    return res.send({ url });
  }),
];

export const testPdf = asyncHandler(async (req, res, next) => {
  const ids = ['DFI4DI7Q7CC5', '5NOBSKQULCUG'];
  const printChecks = {
    packing_slip: {
      on: true,
      checks: {
        shop_icon: 'shop_icon',
        dispatch_from: true,
        cost_breakdown: true,
        listing_photos: true,
        note: 'thank you so much',
        coupon: '6543b7af2fb500ba3f634f73',
        note_from_buyer:
          'Hello, the name I have given is in Kevin. I hope you can do that. If not please let me know. Thanks',
      },
    },
    order_receipt: { on: true, checks: { shop_icon: 'order_receipt_banner' } },
  };

  if (printChecks.packing_slip.checks?.coupon) {
    const coupon = await Coupon.findById(
      printChecks.packing_slip.checks?.coupon,
      null,
      {
        lean: { toObject: true },
      },
    );
    printChecks.packing_slip.checks.coupon = coupon;
  }
  const orders = await Order.find({ _id: { $in: ids } }, null, {
    populate: {
      path: 'items.product customer',
      select: 'tittle _id images firstName lastName email title',
    },

    lean: { toObject: true },
  });

  res.setHeader('Content-Type', 'application/pdf');

  const generateStream = async () => {
    return await renderToStream(
      <Pdf orders={orders} title={'test'} printChecks={printChecks} />,
    );
  };
  const pdfStream = await generateStream();

  pdfStream.pipe(res);
});

// search orders

export const searchOrder = [
  check('searchText', 'Enter a value to search for.')
    .trim('#')
    .trim()
    .escape()
    .notEmpty(),
  asyncHandler(async (req, res, next) => {
    const { searchText, limit, page } = req.body;
    let objectId = null;

    const errors = validationResult(req).formatWith(({ msg }) => msg);

    if (!errors.isEmpty()) {
      return res.send({
        searchResult: [],
        searchText,
        totalCount: 0,
        // pageCount,
        page: 1,
        maxPage: 1,
        errors: errors.mapped(),
      });
    }
    const should = [
      {
        autocomplete: {
          query: searchText,
          path: 'shipping_address.name',
        },
      },

      {
        text: {
          query: searchText,
          path: '_id',
        },
      },
    ];

    try {
      const objectId = new mongoose.Types.ObjectId(searchText);
      should.push({
        equals: {
          value: objectId,
          path: 'customer',
        },
      });
    } catch (error) {}
    const searchStage = {
      $search: {
        index: 'orders_search_index',
        compound: {
          should,
        },
      },
    };
    const skip_limit_stage = [{ $skip: (page - 1) * limit }, { $limit: limit }];

    const [totalCountResult, searchResult] = await Promise.all([
      Order.aggregate([searchStage, { $count: 'totalCount' }]),
      // Order.aggregate([
      //   searchStage,
      //   ...skip_limit_stage,
      //   { $count: 'pageCount' },
      // ]),
      Order.aggregate([
        searchStage,
        ...skip_limit_stage,
        { $unwind: '$items' },
        {
          $lookup: {
            from: 'products',
            localField: 'items.product',
            foreignField: '_id',
            as: 'productLookup',
            pipeline: [
              {
                $project: {
                  variations: 0,
                  reviews: 0,
                  detail: 0,
                  category: 0,
                  gender: 0,
                  price: 0,
                  delivery: 0,
                  stock: 0,
                },
              },
            ],
          },
        },

        {
          $addFields: {
            'items.product': { $arrayElemAt: ['$productLookup', 0] },
          },
        },
        {
          $unset: 'productLookup',
        },
        {
          $group: {
            _id: '$_id',
            itemsArray: { $push: '$items' },
            doc: { $first: '$$ROOT' },
          },
        },
        {
          $replaceRoot: {
            newRoot: { $mergeObjects: ['$doc', { items: '$itemsArray' }] },
          },
        },
        {
          $lookup: {
            from: 'users',
            localField: 'customer',
            foreignField: '_id',
            as: 'customer',
            pipeline: [
              {
                $project: {
                  firstName: 1,
                  lastName: 1,
                },
              },
            ],
          },
        },
        {
          $replaceWith: {
            $setField: {
              field: 'customer',
              input: '$$ROOT',
              value: { $arrayElemAt: ['$customer', 0] },
            },
          },
        },
        {
          $sort: { _id: 1 },
        },
        // {
        //   $limit: 5,
        // },
      ]),
    ]);
    const totalCount = _.get(totalCountResult, '0.totalCount') || 0;
    res.status(200).send({
      searchResult,
      searchText,
      totalCount,
      // pageCount,
      page,
      maxPage: Math.ceil(totalCount / limit),
    });
  }),
];

export const searchProducts = [
  check('searchText').escape().trim().notEmpty(),
  asyncHandler(async (req, res, next) => {
    const { searchText } = await req.query;

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.send({ result: [], searchText });
    }
    const result = await Product.aggregate([
      productSearchStage(searchText),
      ...productAggregateStage({ stats: true }),

      // {
      //   $project: {
      //     variations: 0,
      //   },
      // },
    ]);

    res.send({
      result,
      success: true,
      searchText,
    });
  }),
];
export const getAllProducts = [
  check('check.featured')
    .trim()
    .escape()
    .toBoolean()
    .optional({ checkFalsy: true, null: true, undefined: true }),
  check('checks.sort.title')
    .trim()
    .escape()
    .toInt()
    .optional({ checkFalsy: true, null: true, undefined: true }),

  check("checks.sort.['additional_data.stock.total']")
    .trim()
    .escape()
    .toInt()
    .optional({ checkFalsy: true, null: true, undefined: true }),
  check("checks.sort.['additional_data.price.max']")
    .trim()
    .escape()
    .toInt()
    .optional({ checkFalsy: true, null: true, undefined: true }),
  asyncHandler(async (req, res, next) => {
    const { checks } = req.body;

    const productPipeline = [
      {
        $sort: { _id: 1 },
      },
      ...productAggregateStage({ stats: true }),

      {
        $set: {
          status: {
            $cond: {
              if: { $gt: ['$additional_data.stock.total', 0] },
              then: '$status',
              else: 'soldout',
            },
          },
        },
      },

      {
        $group: {
          _id: '$status',
          products: { $push: '$$ROOT' },
        },
      },

      {
        $addFields: {
          products: {
            $sortArray: {
              input: '$products',
              sortBy: { ...checks.sort, _id: 1 },
            },
          },
        },
      },
    ];

    const matchArray = [];

    if (checks?.category) {
      try {
        const newObjectId = new mongoose.Types.ObjectId(checks.category);

        matchArray.push({ category: newObjectId });
      } catch (error) {
        console.log('error converting category id to objectId', error.message);
      }
    }

    if (checks?.featured) {
      matchArray.push({ featured: true });
    }

    if (checks?.deliveryProfile) {
      try {
        const newObjectId = new mongoose.Types.ObjectId(checks.deliveryProfile);
        matchArray.push({ delivery: { $eq: newObjectId } });
      } catch (error) {
        console.log(
          'error converting deliveryProfile id to objectId',
          error.message,
        );
      }
    }

    if (matchArray.length > 0) {
      productPipeline.unshift({ $match: { $and: matchArray } });
    }
    if (checks?.searchText) {
      const searchStage = productSearchStage(checks.searchText);
      productPipeline.unshift(searchStage);
    }

    const products = await Product.aggregate(productPipeline)
      .collation({ locale: 'en', caseLevel: true })
      .exec();

    const allProducts = products.reduce(
      (obj, item) => ((obj[item._id] = item.products), obj),
      {},
    );

    res.status(200).send({
      success: true,
      products: allProducts,
    });
  }),
];

export const getProductFiles = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const result = await s3Get(id);
  // const parseResult = result.map((file) => file.Body);

  const files = await Promise.all(
    (result || [])?.map(async ({ data, key }) => {
      // const file = new File([Body.read()], ContentType, {
      //   type: ContentType,
      // });

      const base64String = await data.Body.transformToString('base64');

      const obj = {
        ContentType: data.ContentType,
        fileName: key,
        ContentLength: data.ContentLength,
        buffer: base64String,
      };

      return obj;
    }),
  );

  res.send({ files });
});

export const updateProductFeature = [
  check('featured').escape().trim().toBoolean(),
  check('draft').escape().trim().toBoolean(),
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const { featured, draft } = req.query;

    const product = await Product.findOneAndUpdate(
      { _id: id },
      { featured },
      {
        upsert: false,
        new: true,
        lean: {
          toObject: true,
        },
      },
    );

    console.log(product?.featured);
    res.status(200).send({ success: true, featured: product?.featured });
  }),
];

export const updateStatus = asyncHandler(async (req, res, next) => {
  const { productIds, status } = req.body;
  const products = await Product.updateMany(
    { _id: productIds },
    { status },
    { lean: { toObject: true } },
  );
  console.log(products);
  res.send({
    success: true,
    msg: `${productIds} status has been updated`,
    count: products.modifiedCount,
  });
});

export const editTitle = [
  asyncHandler(async (req, res, next) => {
    const { selectedOption, productIds, optionData, property } = req.body;

    const products = await Product.find(
      { _id: productIds },
      { title: 1, description: 1 },
    );

    const updateProducts = products.map((product) => {
      let newText = null;
      const currentValue = product[property];
      console.log({ currentValue });
      if (selectedOption === 'add_to_front') {
        newText = optionData + currentValue;
      }

      if (selectedOption === 'add_to_end') {
        newText = currentValue + optionData;
      }

      if (selectedOption === 'find_and_replace') {
        if (optionData.replaceAll) {
          newText = currentValue?.replaceAll(
            optionData.find,
            optionData.replace,
          );
        } else {
          newText = currentValue?.replace(optionData.find, optionData.replace);
        }
      }

      if (selectedOption === 'delete') {
        newText = currentValue.replace(optionData, '');

        if (optionData.instance) {
          newText = currentValue.replaceAll(optionData.text, '');
        } else {
          newText = currentValue.replace(optionData.text, '');
        }
      }

      if (selectedOption === 'reset') {
        newText = optionData;
      }
      return Product.findByIdAndUpdate(
        { _id: product._id },
        { [property]: newText.replace(/ {2,}/g, '  ').trim() },
        {
          new: true,
          select: { [property]: 1 },
        },
      );
    });
    const promiseResult = await Promise.all(updateProducts);
    console.log({ promiseResult, property });
    res.send({ success: true, msg: 'titles updates' });
  }),
];

export const editPrice = [
  check('amount', 'Price must be between £0.17 and £42,933.20')
    .escape()
    .trim()
    .isFloat({ min: 0.17, max: 42933.2 }),
  asyncHandler(async (req, res, next) => {
    const { productIds, selectedOption, amount } = req.body;

    const result = validationResult(req).formatWith(({ msg }) => msg);

    if (!result?.isEmpty()) {
      console.log({ error: result.mapped() });
      return res.status(400).send(result.mapped());
    }
    const productsInfo = await Product.find(
      { _id: productIds },
      { variations: 1, price: 1, images: 1, title: 1 },
      //   { lean: { toJSON: true } },
    );
    const failedProductIds = new Map();

    const eligibleProductID = new Set();
    const updateProductPrice = productsInfo.map((product) => {
      const idString = product._id?.toString();

      try {
        let isPriceAssorted = false;
        let variationWithPriceIndex = null;

        const getNewPrice = (currentPrice) => {
          let nextCurrentPrice = parseFloat(currentPrice || 0);
          const parseAmount = parseFloat(amount || 0);

          if (selectedOption == 'increase_by_amount') {
            nextCurrentPrice += parseAmount;
          }

          if (selectedOption == 'decrease_by_amount') {
            nextCurrentPrice -= parseAmount;
          }

          if (selectedOption == 'set_new_amount') {
            nextCurrentPrice = parseAmount;
          }

          if (selectedOption == 'percentage_increase') {
            nextCurrentPrice *= 1 + parseAmount / 100;
          }

          if (selectedOption == 'percentage_decrease') {
            nextCurrentPrice *= 1 - parseAmount / 100;
          }
          // return nextCurrentPrice.toFixed(2)
          const formatPrice = Math.floor(nextCurrentPrice * 100) / 100;
          if (formatPrice < 0.17 || formatPrice > 999) {
            console.log({ idString, formatPrice, status: 'failed' });
            eligibleProductID.delete(idString);
            failedProductIds.set(idString, {
              title: product.title,
              images: product.images,

              msg:
                formatPrice < 0.17
                  ? 'Price is below 0.17.'
                  : 'Price is too high.',
            });
          } else {
            eligibleProductID.add(idString);
          }
          return formatPrice;
        };

        for (const [idx, { priceHeader }] of product?.variations.entries()) {
          if (priceHeader?.on) {
            isPriceAssorted = true;
            variationWithPriceIndex = idx;
            break;
          }
        }
        if (!isPriceAssorted && !failedProductIds.has(idString)) {
          return Product.findByIdAndUpdate(
            { _id: product._id },
            {
              price: {
                previous: product.price.current,
                current: getNewPrice(product.price?.current),
              },
            },
          );
        }

        if (isPriceAssorted) {
          const generateVariationPrice = (index) => {
            const { options } = product.variations[index];
            const newOptionsMap = new Map();

            for (const [key, value] of options.entries()) {
              const newPrice = getNewPrice(value.price);

              newOptionsMap.set(key, {
                ...value.toObject(),
                price: newPrice,
              });

              if (newPrice < 0.17 || newPrice > 999) {
                break;
              }
            }

            if (!failedProductIds.has(idString)) {
              return Product.findByIdAndUpdate(
                { _id: product._id },
                { [`variations.${index}.options`]: newOptionsMap },
              );
            }
          };
          if (product.variations?.length === 3) {
            return generateVariationPrice(2);
          } else {
            return generateVariationPrice(variationWithPriceIndex);
          }
        }
      } catch (error) {
        console.error(error);
        failedProductIds.set(idString, {
          title: product.title,
          images: product.images,

          msg: `Error occured while updating, try again later`,
        });
      }
    });

    if (failedProductIds.size > 0) {
      return res.status(409).send({
        success: false,
        eligibleId: Array.from(eligibleProductID),
        failedProductIds: Array.from(failedProductIds).map(([key, value]) => ({
          ...value,
          id: key,
        })),
      });
    }
    const PromiseResult = await Promise.all(updateProductPrice);

    res.status(200).send({
      success: true,
      count: productsInfo?.length,
      msg: 'products price updated',
    });
  }),
];
