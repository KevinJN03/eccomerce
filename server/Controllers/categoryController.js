/* eslint-disable import/prefer-default-export */
import express from 'express';
import AsyncHandler from 'express-async-handler';
import Category from '../Models/category.js';
import productAggregateStage from '../utils/productAggregateStage.js';
const router = express.Router();

export const get_all_category = AsyncHandler(async (req, res, next) => {
  // const categories = await Category.find().populate(['men', 'women']).exec();

  const newCategories = await Category.aggregate([
    // {
    //   $unwind: {
    //     path: '$men',
    //   },
    // },
    {
      $lookup: {
        from: 'products',
        localField: '_id',
        foreignField: 'category',

        let: {
          gender: '$gender',
        },
        pipeline: [
          {
            $match: {
              gender: 'men',
            },
          },
          ...productAggregateStage({ stats: false }),
        ],
        as: 'men',
      },
    },
    {
      $lookup: {
        from: 'products',
        localField: '_id',
        foreignField: 'category',

        let: {
          gender: '$gender',
        },
        pipeline: [
          {
            $match: {
              gender: 'women',
            },
          },
          ...productAggregateStage({ stats: false }),

        ],
        as: 'women',
      },
    },

    {
      $addFields: {
        count: { $sum: [{ $size: '$men' }, { $size: '$women' }] },
      },
    },
  ]);
  res.send(newCategories);
});

export const get_singleCategory = AsyncHandler(async (req, res, next) => {
  const { name } = req.params;
  const result = await Category.findOne({ name: name.toLowerCase() })
    .populate(['men', 'women'])
    .exec();

  if (result) {
    res.send(result);
  } else {
    res.status(404).send(`Cant find Category ${name} Please try Again`);
  }
});

export const query_category_products_by_gender = AsyncHandler(
  async (req, res, next) => {
    const { name, gender } = req.params;

    const categoryResult = await Category.aggregate([
      {
        $match: { name: name.toLowerCase() },
      },
      {
        $lookup: {
          from: 'products',
          localField: gender.toLowerCase(),
          foreignField: '_id',
          as: 'products',
          pipeline: [
            {
              $match: { status: 'active' },
            },

            ...productAggregateStage({ stats: false }),
          ],
        },
      },
      {
        $project: {
          products: {
            $sortArray: {
              input: '$products',
              sortBy: {
                _id: 1,
              },
            },
          },
        },
      },
    ]);

    res.send(categoryResult[0].products);
  },
);

export const getCategoryIds = AsyncHandler(async (req, res, next) => {
  const categoryResult = await Category.find(
    {},
    { name: 1 },
    { lean: { toObject: true } },
  );

  res.send(categoryResult);
});
