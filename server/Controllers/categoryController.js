/* eslint-disable import/prefer-default-export */
import express from 'express';
import AsyncHandler from 'express-async-handler';
import Category from '../Models/category.js';
const router = express.Router();

export const get_all_category = AsyncHandler(async (req, res, next) => {
  const categories = await Category.find().populate(['men', 'women']).exec();
  res.send(categories);
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
      .populate(gender.toLowerCase())
      .exec();

    res.send(result);
  },
);
