/* eslint-disable import/prefer-default-export */
import asyncHandler from 'express-async-handler';
import Product from '../Models/product.js';
import { validationResult, check } from 'express-validator';
import { checkAuthenticated } from '../middleware/checkAuthenticated.js';
import randomstring from 'randomstring';
import 'dotenv/config';
import Stripe from 'stripe';
import _, { escape, sortBy } from 'lodash';
import generateOrderNumber from '../utils/generateOrderNumber.js';
import Order from '../Models/order.js';
import DeliveryProfile from '../Models/deliveryProfile.js';
import mongoose from 'mongoose';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat.js';
import PrivateNote from '../Models/privateNote.js';
import generatePaymentIntent from '../utils/generatePaymentIntent.js';
import orderAggregatePipeline from '../utils/orderAggregatePipeline.js';
import getMatchStage from '../utils/matchStageOrderAggregate.js';
import shipDateStage from '../utils/shipDateStage.js';

dayjs(customParseFormat);
const stripe = Stripe(process.env.STRIPE_KEY);

export const createPaymentIntent = [
  // check('cart').escape(),
  // check('shipping').escape(),
  // check('billing').escape(),
  checkAuthenticated,
  generatePaymentIntent,
  // asyncHandler(async (req, res, next) => {
  //   const userId = req.session.passport.user;
  //   const {
  //     cart,
  //     shipping,
  //     deliveryOption,
  //     billing,
  //     deliveryDate,
  //     delivery_cost,
  //   } = req.body;
  //   // make a map with all the cart item products
  //   //
  //   let cartPrice = 0;
  //   const cartMap = new Map();
  //   const cartObj = {};
  //   const itemsArray = [];
  //   const cartIds = [];

  //   console.log({ body: req.body });
  //   cart.map(
  //     ({
  //       id,
  //       variationSelect,
  //       quantity,
  //       isVariation1Present,
  //       isVariation2Present,
  //       isVariationCombine,
  //       variation_data,
  //       product_id,
  //       _id,
  //       price,
  //       ...rest
  //     }) => {
  //       const obj = {
  //         id: product_id,
  //         ...variationSelect,

  //         quantity,
  //         isVariation1Present: _.get(variation_data, 'variation1_present') || false,
  //         isVariation2Present: _.get(variation_data, 'variation2_present') || false,
  //         isVariationCombine :  _.get(variation_data, 'isVariationCombine') || false,
  //         price: price?.current,
  //       };
  //       itemsArray.push({ ...obj, product: id });
  //       cartIds.push(_id);
  //       if (!cartMap.has(_id)) {
  //         obj._id = _id;
  //         const array = [obj];

  //         cartObj[id] = array;
  //         cartMap.set(id, array);
  //       } else {
  //         obj._id = _id;
  //         const getArray = cartMap.get(id);

  //         getArray.push(obj);
  //         cartMap.set(getArray);
  //       }
  //     },
  //   );

  //   const productsArray = Object.keys(cartObj);

  //   const getAllCartProducts = await Product.find({
  //     _id: { $in: productsArray },
  //   });

  //   const getResult = getAllCartProducts.map((product) => {
  //     const getVariationSelectArray = cartObj[product.id];

  //     getVariationSelectArray.map((variationDetail) => {
  //       if (product?.variations) {
  //         if (product.variations.length < 3) {
  //           const foundObj = { price: null, stock: null };
  //           const findOptionsforVariation1 = product.variations.find(
  //             (item) => item.name === variationDetail.variation1.title,
  //           );
  //           const findOptionsforVariation2 = product.variations.find(
  //             (item) => item.name === variationDetail.variation2.title,
  //           );

  //           const findPrice_StockArray = [
  //             findOptionsforVariation1,
  //             findOptionsforVariation2,
  //           ].map((variation, index) => {
  //             if (variation?.options) {
  //               const foundOptionVariation = variation.options.get(
  //                 variationDetail[`variation${index + 1}`].id,
  //               );

  //               if (_.has(foundOptionVariation, 'price')) {
  //                 foundObj.price = foundOptionVariation.price;
  //               }

  //               if (_.has(foundOptionVariation, 'stock')) {
  //                 foundObj.stock = foundOptionVariation.stock;
  //               }
  //             }
  //           });

  //           if (foundObj.price) {
  //             cartPrice += foundObj.price * variationDetail?.quantity;
  //           } else {
  //             cartPrice += product?.price?.current * variationDetail.quantity;
  //           }
  //         } else {
  //           const findOptionsforVariation = product.variations[2].options;

  //           if (findOptionsforVariation) {
  //             const foundOptionVariation = findOptionsforVariation.get(
  //               variationDetail?.variation2?.id,
  //             );

  //             if (foundOptionVariation) {
  //               cartPrice +=
  //                 foundOptionVariation?.price * variationDetail?.quantity;
  //             } else {
  //             }
  //           }
  //         }
  //       }
  //     });
  //   });
  //   let subTotal = cartPrice;
  //   cartPrice += delivery_cost || 0;

  //   let parseCartPrice = parseFloat(cartPrice).toFixed(2);
  //   const calculatePrice = parseInt(parseCartPrice.replace('.', ''));

  //   /* use off_session inorder to allow klarna payment */
  //   const orderNumber = generateOrderNumber();

  //   console.log({ calculatePrice });
  //   const paymentIntent = await stripe.paymentIntents.create({
  //     metadata: {
  //       orderNumber,
  //     },
  //     amount: calculatePrice,
  //     currency: 'gbp',
  //     customer: userId,
  //     // setup_future_usage: 'off_session',
  //     shipping,
  //     payment_method_types: ['card', 'paypal', 'klarna', 'afterpay_clearpay'],
  //   });

  //   console.log({ orderNumber });

  //   const profile = await DeliveryProfile.findById(deliveryOption?.id, null, {
  //     toObject: true,
  //     new: true,
  //   });
  //   const orderObj = {
  //     _id: orderNumber,
  //     customer: userId,
  //     status: 'processing',
  //     shipping_address: shipping,
  //     billing_address: billing,
  //     transaction_cost: {
  //       total: parseCartPrice,
  //       subtotal: parseFloat(subTotal).toFixed(2),
  //     },
  //     shipping_option: {
  //       cost: delivery_cost,
  //       delivery_date: deliveryDate,
  //       name: deliveryOption?.name,
  //       id: deliveryOption?.id,
  //       time: profile?.processingTime?.end,
  //       type: profile?.processingTime?.type,
  //     },

  //     items: itemsArray,
  //     cartObj,
  //     cartIds,
  //   };

  //   const order = await Order.create(orderObj);
  //   // console.log({ order });
  //   // res.status(200).send({
  //   //   success: true,
  //   //   clientSecret: paymentIntent.client_secret,
  //   //   orderNumber: orderNumber,
  //   //   id: paymentIntent.id,
  //   // });
  // }),
];

export const getOrderDetails = [
  checkAuthenticated,
  asyncHandler(async (req, res, next) => {
    const userId = req.session.passport.user;
    const { id } = req.params;

    const order = await Order.findById(id.toUpperCase())
      .populate('items.product', ['images', 'title', 'variations'])
      .lean({ toObject: true })
      .exec();
    if (order) {
      if (order.customer.toString() === userId) {
        order.email = req?.user?.email;
        return res.status(200).send({
          order,
          success: false,
        });
      }

      res.status(404).send({
        msg: 'You are not authorized.',
        success: false,
      });
    } else {
      return res.status(404).send({
        msg: 'Not Found',
        success: false,
      });
    }
  }),
];

export const getAdminOrders = [
  check('status').escape().trim().toLowerCase(),
  check('page').escape().trim().toInt(),
  check('limit').escape().trim().toInt(),
  check('filter.destination').escape().trim().toUpperCase(),

  asyncHandler(async (req, res, next) => {
    const { filter, limit } = req.body;
    const recursiveGetData = async (page) => {
      const betaSortObj = { group: { _id: -1 }, orderArray: {}, document: {} };
      const matchArray = getMatchStage({ filter });
      const totalCountResult = await Order.aggregate([
        shipDateStage,
        {
          $match: {
            $and: matchArray,
          },
        },
        { $count: 'totalCount' },
      ]);

      const totalCount = _.get(totalCountResult, '0.totalCount') || 0;
      const maxPage = Math.ceil(totalCount / limit) || 1;
      const newPageNumber = page <= maxPage ? page : maxPage;
      const skip_limit_stage = [
        { $skip: (newPageNumber - 1) * limit },
        { $limit: limit },
      ];

      const aggregatePipeline = _.cloneDeep(orderAggregatePipeline);

      if (filter?.sort_by == 'dispatch by date') {
        betaSortObj;

        _.set(betaSortObj, 'document.ship_date', -1);
        _.set(betaSortObj, 'orderArray.ship_date', -1);
      } else if (filter?.sort_by == 'newest') {
        _.set(betaSortObj, 'document.createdAt', -1);
        _.set(betaSortObj, 'orderArray.createdAt', -1);
      } else if (filter?.sort_by == 'oldest') {
        _.set(betaSortObj, 'document.createdAt', 1);
        _.set(betaSortObj, 'orderArray.createdAt', 1);
        _.set(betaSortObj, 'group._id', 1);
      } else if (filter?.sort_by == 'destination') {
        // _.set(betaSortObj, 'document.createdAt', -1);
        // _.set(betaSortObj, 'orderArray.createdAt', -1);

        betaSortObj['document']['shipping_address.address.city'] = 1;
        betaSortObj['document']['shipping_address.address.country'] = 1;

        _.set(betaSortObj, 'group._id', 1);

        aggregatePipeline.pop();
        aggregatePipeline.push({
          $group: {
            _id: {
              $concat: [
                { $toLower: '$shipping_address.address.city' },
                ', ',
                { $toUpper: '$shipping_address.address.country' },
              ],
            },
            byDestination: { $first: true },
            country: { $first: '$shipping_address.address.country' },
            city: { $first: '$shipping_address.address.city' },

            totalDocuments: { $sum: 1 },
            orders: {
              $push: '$$ROOT',
            },
          },
        });
      }

      aggregatePipeline.unshift(...skip_limit_stage);
      aggregatePipeline.unshift({
        $sort: { ...betaSortObj['document'], _id: 1 },
      });
      aggregatePipeline.push({ $sort: betaSortObj['group'] });
      aggregatePipeline.push({
        $addFields: {
          orders: {
            $sortArray: {
              input: '$orders',
              sortBy: { ...betaSortObj['orderArray'], _id: 1 },
            },
          },
        },
      });

      if (matchArray.length >= 1) {
        aggregatePipeline.unshift({
          $match: {
            $and: matchArray,
          },
        });
      }
      aggregatePipeline.unshift(shipDateStage);

      console.log(betaSortObj);
      const [ordersByDate, pageCountResult] = await Promise.all([
        Order.aggregate(aggregatePipeline),
        Order.aggregate([
          shipDateStage,
          {
            $match: {
              $and: matchArray,
            },
          },
          ...skip_limit_stage,
          { $count: 'pageCount' },
        ]),
      ]);

      const pageCount = _.get(pageCountResult, '0.pageCount') || 0;
      console.log(
        `getting data for page ${page} with newPage being ${newPageNumber}`,
      );

      return res.status(200).send({
        ordersByDate,
        byDestination: filter?.sort_by == 'destination' ? true : false,
        success: true,
        totalCount,
        pageCount,
        page: newPageNumber,

        maxPage,
      });
    };

    return recursiveGetData(req.body?.page, false);
  }),
];

export const addPrivateNote = [
  check('note', 'invalid note').trim().escape().notEmpty(),
  check('orderId', 'invalid orderId').trim().escape().notEmpty(),

  asyncHandler(async (req, res, next) => {
    const { note, orderId } = req.body;
    const result = validationResult(req).formatWith(({ msg }) => msg);
    if (!result.isEmpty()) {
      return res.status(400).send({ error: result.mapped() });
    }
    // const privateNote = await PrivateNote.create({ note });
    // const privateNote = { note, date: Date.now(), id: crypto.randomUUID() };
    await Order.findByIdAndUpdate(
      orderId,
      {
        $push: { private_note: { note } },
      },
      { upsert: true, new: true, lean: { toObject: true } },
    );

    return res.redirect(`/api/admin/order/${orderId}`);
  }),
];

export const editPrivateNote = [
  check('noteId').trim().escape().notEmpty(),
  check('orderId').trim().escape().notEmpty(),
  check('note').trim().escape().notEmpty(),
  asyncHandler(async (req, res, next) => {
    const { note, orderId, noteId } = req.body;

    const result = validationResult(req).formatWith(({ msg }) => msg);

    if (!result.isEmpty()) {
      return res.status(400).send({ error: result.mapped() });
    }

    await Order.findOneAndUpdate(
      { _id: orderId, 'private_note._id': noteId },
      { $set: { 'private_note.$.note': note } },
      { upsert: true, new: true, lean: { toObject: true } },
    );

    return res.redirect(`/api/admin/order/${orderId}`);
  }),
];

export const deletePrivateNote = [
  check('noteId', 'invalid noteId').trim().escape().notEmpty(),
  check('orderId', 'invalid orderId').trim().escape().notEmpty(),
  asyncHandler(async (req, res, next) => {
    const result = validationResult(req).formatWith(({ msg }) => msg);
    const { noteId, orderId } = req.query;

    if (!result.isEmpty()) {
      return res.status(400).send({ error: result.mapped() });
    }

    await Order.findOneAndUpdate(
      { _id: orderId },
      { $pull: { private_note: { _id: new mongoose.Types.ObjectId(noteId) } } },
      { upsert: true, new: true, lean: { toObject: true } },
    );
    res.status(200).redirect(303, `/api/admin/order/${orderId}`);
  }),
];
