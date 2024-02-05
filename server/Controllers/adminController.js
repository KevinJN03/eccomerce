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
import OrderShipped from '../React Email/emails/orderShipped.jsx';
import * as React from 'react';
import { render } from '@react-email/render';
import transporter from '../utils/nodemailer.js';
import OrderCancel from '../React Email/emails/orderCancelled.jsx';
import ReturnOrder from '../React Email/emails/returnOrder.jsx';
import { renderToStream, renderToBuffer } from '@react-pdf/renderer';
import Pdf from '../pdf/pdf.jsx';
import s3Upload, {
  generateSignedUrl,
  s3Delete,
  s3Get,
  s3PdfUpload,
} from '../utils/s3Service.js';
import randomString from 'randomstring';
import Coupon from '../Models/coupon.js';
import mongoose from 'mongoose';

import multerUpload from '../utils/multerUpload.js';
import DraftProducts from '../Models/draftProducts.js';
import productValidator from '../utils/productValidator.js';
import generateProduct from '../utils/generateProduct.js';
import Product from '../Models/product.js';
import draftProducts from '../Models/draftProducts.js';
import productAggregateStage from '../utils/productAggregateStage.js';
import { JsonWebTokenError } from 'jsonwebtoken';
const stripe = Stripe(process.env.STRIPE_KEY);
const { SENDER } = process.env;
export const count_all = asyncHandler(async (req, res, next) => {
  const todayDate = dayjs()
    .set('hour', 0)
    .set('minute', 0)
    .set('second', 0)
    .unix();

  const sixMonthsFromToday = dayjs()
    .subtract(6, 'month')
    .set('D', 1)
    .set('h', 1)
    .set('m', 0)
    .set('s', 0)
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
        .sort({ createdAt: -1 })
        .limit(5)
        .exec(),
      Order.aggregate([
        {
          $match: {
            status: {
              $in: ['received', 'shipped', 'delivered'],
            },
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

    req.password = findUser.password;
    return true;
  }),
  check('password')
    .trim()
    .escape()
    .custom(async (value, { req }) => {
      if (req.password) {
        const match = await bcrypt.compare(value, req.password);

        if (!match) {
          throw new Error('password doesnt match.');
        }
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

        return res.status(200).redirect('/api/user/check');
      });
    })(req, res, next);
    // res.status(200).send({ success: true, msg: 'login in successfully' });
  }),
];

export const getAllUsers = asyncHandler(async (req, res, next) => {
  const users = await User.find({});
  res.status(200).send(users);
});

export const getSingleOrder = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const order = await Order.findOne({ _id: id?.toUpperCase() }, null, {
    populate: {
      path: 'items.product customer',
      select: 'tittle _id images firstName lastName email title',
    },
  });

  if (!order) {
    return res.status(404).send({ msg: 'Order not dfound.', success: false });
  }

  res.status(200).send({ order, success: true });
});

export const updateOrder = [
  check('courier', 'Please enter a valid courier of 3 or more characters.')
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

  check(
    'trackingNumber',
    'Please enter a valid password of 12 or more characters.',
  )
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
  check('searchText').trim('#').trim().escape(),
  asyncHandler(async (req, res, next) => {
    const { searchText } = req.body;
    let objectId = null;

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
    } catch (error) {
      objectId = null;
      console.error('parse string to objectId failed: ', error?.message);
    }

    const searchResult = await Order.aggregate([
      {
        $search: {
          index: 'orders_search_index',
          compound: {
            should,
          },
        },
      },

      { $unwind: '$items' },
      {
        $lookup: {
          from: 'products',
          localField: 'items.product',
          foreignField: '_id',
          as: 'productLookup',
        },
      },
      {
        $project: {
          productLookup: {
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
        $sort: { _id: 1 },
      },
      // {
      //   $limit: 5,
      // },
    ]);
    console.log({ searchText, should, searchResult });
    res.status(200).send({ searchResult, success: true });
  }),
];

export const getDraftProducts = asyncHandler(async (req, res, next) => {
  const draftProducts = await DraftProducts.find({});

  res.send({ draftProducts });
});

export const createDaftProduct = [
  multerUpload.array('files', 6),
  productValidator,
  asyncHandler(async (req, res, next) => {
    const result = validationResult(req);

    if (!result.isEmpty()) {
      res.status(400).send(result.errors);
      return;
    }

    const { gender, category } = req.body;
    const draftProducts = new DraftProducts();

    const { productData, sharpResult } = await generateProduct(
      req,
      draftProducts.id,
      'draftProducts',
    );

    Object.assign(draftProducts, productData);
    draftProducts.status = 'draft';
    try {
      await s3Upload({
        files: sharpResult,
        isProfile: false,
        folderId: draftProducts.id,
        endPoint: 'draftProducts',
      });

      await draftProducts.save();
      return res.send({ success: true, msg: 'draft saved' });
    } catch (error) {
      const deleteId = draftProducts.id;

      await s3Delete('products', deleteId);

      next(error);
    }
  }),
];

export const getDraft = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const draftProduct = await DraftProducts.findOne({ _id: id })
    .populate([{ path: 'delivery' }, { path: 'category' }])
    .exec();

  if (!draftProduct) {
    return res.status(404).send('product not found');
  }

  // await s3Get(id);

  return res.status(200).send({ draftProduct });
});

export const delete_drafts = asyncHandler(async (req, res, next) => {
  const { ids } = req.params;

  const idsArray = ids.split(',');

  const deleteProductsImages = idsArray.map((id) => {
    return s3Delete('draftProducts', id);
  });

  const result = await Promise.all([
    DraftProducts.deleteMany({ _id: idsArray }),
    ...deleteProductsImages,
  ]);

  res.send({ msg: 'deletion successful' });
});

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
    console.log({ checks });

    const draftPipeline = [
      {
        $set: {
          status: 'draft',
        },
      },
      ...productAggregateStage(),

      { $sort: { _id: 1, ...checks.sort } },
    ];
    const productPipeline = [
      ...productAggregateStage(),

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
            $sortArray: { input: '$products', sortBy: { ...checks.sort } },
          },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ];

    if (checks?.section) {
      try {
        const newObjectId = new mongoose.Types.ObjectId(checks.section);
        productPipeline.unshift({ $match: { category: newObjectId } });

        draftPipeline.unshift({ $match: { category: newObjectId } });
      } catch (error) {
        console.log('error converting section id to objectId', error.message);
      }
    }
    if (checks?.featured) {
      productPipeline.unshift({ $match: { featured: true } });
      draftPipeline.unshift({ $match: { featured: true } });
    }

    if (checks?.searchText) {
      const should = [
        {
          autocomplete: {
            query: checks.searchText,
            path: 'title',
          },
        },
      ];

      try {
        const objectId = new mongoose.Types.ObjectId(checks.searchText);
        should.push({
          equals: {
            value: objectId,
            path: '_id',
          },
        });
      } catch (error) {
        console.error('parse string to objectId failed: ', error?.message);
      }

      const searchStage = {
        $search: {
          index: 'products_search_index',
          compound: {
            should,
          },
        },
      };
      productPipeline.unshift(searchStage);
      draftPipeline.unshift(searchStage);
    }
    const drafts = await DraftProducts.aggregate(draftPipeline).collation({
      locale: 'en',
      caseLevel: true,
    });

    const products = await Product.aggregate(productPipeline)
      .collation({ locale: 'en', caseLevel: true })
      .exec();

    const allProducts = products.reduce(
      (obj, item) => ((obj[item._id] = item.products), obj),
      {},
    );

    allProducts.draft = drafts;
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
    let product = null;

    if (draft) {
      product = await DraftProducts.findOneAndUpdate(
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
    } else {
      product = await Product.findOneAndUpdate(
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
    }

    console.log(product?.featured);
    res.status(200).send({ success: true, featured: product?.featured });
  }),
];

// export const searchProduct = [
//   asyncHandler(async (req, res, next) => {
//     const { searchText, sort } = req.query;

//     const should = [
//       {
//         autocomplete: {
//           query: searchText,
//           path: 'title',
//         },
//       },

//       {
//         text: {
//           query: searchText,
//           path: '_id',
//         },
//       },
//     ];

//     try {
//       const objectId = new mongoose.Types.ObjectId(searchText);
//       should.push({
//         equals: {
//           value: objectId,
//           path: 'customer',
//         },
//       });
//     } catch (error) {
//       console.error('parse string to objectId failed: ', error?.message);
//     }

//     const products = await Product.aggregate([
//       {
//         $search: {
//           index: 'products_search_index',
//           compound: {
//             should,
//           },
//         },
//       },
//       ...productAggregateStage(),
//       {
//         $set: {
//           status: {
//             $cond: {
//               if: { $gt: ['$additional_data.stock.total', 0] },
//               then: '$status',
//               else: 'soldout',
//             },
//           },
//         },
//       },

//       {
//         $group: {
//           _id: '$status',
//           products: { $push: '$$ROOT' },
//         },
//       },

//       {
//         $addFields: {
//           products: {
//             $sortArray: { input: '$products', sortBy: { ...checks.sort } },
//           },
//         },
//       },
//       {
//         $sort: { _id: 1 },
//       },
//     ]);
//     res.send({ success: true, searchText, products });
//   }),
// ];

export const deactivateProduct = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const { status } = req.query;
  const ids = id.split(',');
  console.log({ ids, status });

  const products = await Product.updateMany({ _id: ids }, { status });
  res.send({ success: true, msg: `${id} status has been updated` });
});
