import asyncHandler from 'express-async-handler';
import Coupon from '../Models/coupon';
import mongoose from 'mongoose';
import productAggregateStage from '../utils/productAggregateStage';
import coupon from '../Models/coupon';
import { check, validationResult } from 'express-validator';
import dayjs from 'dayjs';
// eslint-disable-next-line import/prefer-default-export
export const get_offer = [
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;

    const offer = await Coupon.aggregate([
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

    const coupon = await Coupon.findByIdAndUpdate(
      id,
      {
        active: false,
        end_date: dayjs.utc().unix(),
      },
      {
        lean: { toObject: true },
        new: true,
      },
    );

    res.status(200).send(coupon);
  }),
];
