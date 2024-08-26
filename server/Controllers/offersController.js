import asyncHandler from 'express-async-handler';
import Coupon from '../Models/coupon';
import GiftCard from '../Models/giftCard';
import mongoose from 'mongoose';
import productAggregateStage from '../utils/productAggregateStage';
import Order from '../Models/order';
import { check, validationResult } from 'express-validator';
import dayjs from 'dayjs';
import generateDateRange from '../utils/generateDateRange';
import _ from 'lodash';
// eslint-disable-next-line import/prefer-default-export

const models = {
  promo_code: Coupon,
  gift_card: GiftCard,
};

export const get_offer = [
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const { offer_type } = req.query;

    const offer = await models[offer_type].aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(id) } },
      {
        $unwind: { path: '$listings', preserveNullAndEmptyArrays: true },
      },
      {
        $addFields: {
          listings: { $toObjectId: '$listings' },
        },
      },
      {
        $lookup: {
          from: 'products',
          localField: 'listings',
          foreignField: '_id',
          as: 'listings',
          pipeline: [
            ...productAggregateStage({ stats: false }),
            {
              $project: {
                variations: 0,
                reviews: 0,
              },
            },
          ],
        },
      },

      {
        $group: {
          _id: '$_id',
          doc: { $first: '$$ROOT' },
          listings: { $push: { $arrayElemAt: ['$listings', 0] } },
        },
      },

      {
        $replaceRoot: {
          newRoot: { $mergeObjects: ['$doc', { listings: '$listings' }] },
        },
      },
    ]);

    res.send(offer);
  }),
];

export const update_listings = [
  check('listings', 'Please add a listing').isArray({ min: 1 }),
  asyncHandler(async (req, res, next) => {
    const { id, listings } = req.body;

    const errors = validationResult(req).formatWith(({ msg }) => msg);

    if (!errors.isEmpty()) {
      return res.status(400).send(errors.mapped());
    }

    const coupon = await Coupon.findByIdAndUpdate(id, { listings });

    res.redirect(303, `/api/admin/offers/${id}`);
  }),
];

export const deactivate_offer = [
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const { offer_type } = req.query;

    const offer = await models[offer_type].findByIdAndUpdate(
      id,
      {
        active: false,
        end_date: dayjs.utc().unix(),
        $push: {
          audits: {
            $each: [
              {
                msg: 'Offer has been deactivated.',
              },
            ],
            $position: 0,
          },
        },
      },
      {
        lean: { toObject: true },
        new: true,
      },
    );

    res.status(200).send(offer);
  }),
];

export const overallPerformance = [
  check('value').escape().trim(),
  check('start_date').escape().trim(),
  check('end_date').escape().trim(),

  asyncHandler(async (req, res, next) => {
    const { value } = req.body;

    const dateRangeObj = generateDateRange();
    const dates = {};

    if (value === 'custom') {
      dates.start_date = dayjs(req.body.start_date, 'DD/MM/YYYY').toDate();
      dates.end_date = dayjs(req.body.end_date, 'DD/MM/YYYY').toDate();
    } else {
      _.assign(dates, dateRangeObj[value]);
    }

    const { start_date, end_date } = dates;
    const pipeline = [
      {
        $match: {
          $and: [{ createdAt: { $gte: start_date, $lte: end_date } }],
          $or: [
            {
              'offer.promo_code.discount': {
                $gt: 0,
              },
            },
            {
              'offer.gift_card.discount': {
                $gt: 0,
              },
            },
          ],
        },
      },
      {
        $group: {
          _id: 'overall_performance',
          orders_with_discount: { $sum: 1 },
          revenue_from_discounts: {
            $sum: '$transaction_cost.total',
          },
          ids: { $push: '$_id' },
          discount_total: {
            $sum: {
              $add: ['$offer.promo_code.discount', '$offer.gift_card.discount'],
            },
          },
        },
      },
    ];

    const [performanceResult] = await Order.aggregate(pipeline);
    const overall_performance = {
      orders_with_discount: 0,
      average_order_value: 0,
      revenue_from_discounts: 0,
      ...performanceResult,
    };

    if (performanceResult) {
      overall_performance['average_order_value'] = _.divide(
        _.get(performanceResult, 'revenue_from_discounts'),
        _.get(performanceResult, 'orders_with_discount'),
      );
    }

    res.status(200).send({
      ...overall_performance,
      start_date,
      end_date,
      value,
      body: req.body,
    });
  }),
];
