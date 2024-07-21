import asyncHandler from 'express-async-handler';
import Coupon from '../Models/coupon';
import mongoose from 'mongoose';
import productAggregateStage from '../utils/productAggregateStage';
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
