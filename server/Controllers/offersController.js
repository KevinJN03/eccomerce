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
import offerOrderAggregate from '../utils/offerOrderAggregate';
// eslint-disable-next-line import/prefer-default-export

const models = {
  promo_code: Coupon,
  gift_card: GiftCard,
};

const validator = () => {
  return [
    check('value').escape().trim(),
    check('start_date').escape().trim(),
    check('end_date').escape().trim(),
  ];
};

export const get_offer = [
  check('id').escape().trim(),
  check('offer_type').escape().trim(),
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const { offer_type } = req.query;

    const { start_date: new_start_date, end_date: new_end_date } =
      generateDateRange({
        value: 'all_time',
        converter: 'toDate',
      });
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

      ...offerOrderAggregate({
        offer_type,
        new_end_date,
        new_start_date,
      }),
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
  ...validator(),

  asyncHandler(async (req, res, next) => {
    const { value } = req.body;

    const { start_date, end_date } = generateDateRange({
      ...req.body,
      converter: 'toDate',
    });

    const pipeline = [
      {
        $match: {
          $and: [{ createdAt: { $gte: start_date, $lte: end_date } }],
          $or: [
            {
              'transaction_cost.offer.promo_code.discount': {
                $gt: 0,
              },
            },
            {
              'transaction_cost.offer.gift_card.discount': {
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
          total_discount_amount: {
            $sum: {
              $add: [
                '$transaction_cost.offer.promo_code.discount',
                '$transaction_cost.offer.gift_card.discount',
              ],
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
      total_discount_amount: 0,
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

export const get_all_offers = [
  ...validator(),
  check('offer_type').escape().trim(),
  asyncHandler(async (req, res, next) => {
    const { value, offer_type } = req.body;

    const { start_date, end_date } = generateDateRange({
      ...req.body,
      converter: 'unix',
    });
    //

    const new_start_date = new Date(start_date * 1000);
    const new_end_date = new Date(end_date * 1000);

    const pipeline = [
      // not all offers will have an end date
      // i need to find the promos that was active during the time given t search for
      //

      {
        $match: {
          $or: [
            {
              $and: [
                {
                  timestamp: {
                    $lte: new_end_date,
                    $gte: new_start_date,
                  },
                },
                // { end_date: { $lte: end_date } },
              ],
            },
            // offer with no end_date but started before the end_date
            // if end_date selected is before the start_date of offer dont show offer
            // end_date <= start_date - no show
            {
              $and: [
                {
                  end_date: { $eq: null },
                  timestamp: {
                    $lte: new_end_date,
                  },
                },
              ],
            },
          ],
        },
      },
      ...offerOrderAggregate({ new_end_date, new_start_date, offer_type }),
    ];

    const results = await models[offer_type].aggregate(pipeline);
    // res.send({ results, body: req.body, start_date, end_date });
    res.send(results);
  }),
];
