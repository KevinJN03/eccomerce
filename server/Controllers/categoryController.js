/* eslint-disable import/prefer-default-export */
import express from 'express';
import AsyncHandler from 'express-async-handler';
import Category from '../Models/category.js';
const router = express.Router();

export const get_all_category = AsyncHandler(async (req, res, next) => {
  const categories = await Category.find().populate(['men', 'women']).exec();

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
    const result = await Category.findOne(
      { name: name.toLowerCase() },
      { gender: 1 },
    )
      .populate({
        path: gender.toLowerCase(),

        // populate: {
        //   model: 'product',
        //   path: 'minVariationPrice',
        // },
      })
      .exec();

    res.send(result);
  },
);
