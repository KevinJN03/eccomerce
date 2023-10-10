import asyncHandler from 'express-async-handler';
import Product from '../Models/product.js';
import Category from '../Models/category.js';

import { body, validationResult } from 'express-validator';
import category from '../Models/category.js';
// eslint-disable-next-line import/prefer-default-export

export const get_all_products = asyncHandler(async (req, res) => {
  const products = await Product.find();
  res.send(products);
});

// export const get_all_by_category = asyncHandler(async (req, res) => {
//   const category = await Category.find();

//   const products = await Product.find({ category });
//   if (category) {
//     res.send(category);
//   }
// });

export const get_single_product = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const product = await Product.findOne({ _id: id })
    .populate({
      path: 'category',
      populate: [
        {
          path: 'men',
          perDocumentLimit: 10,
          match: { _id: { $ne: id } },
        },
        {
          path: 'women',
          perDocumentLimit: 10,
          match: { _id: { $ne: id } },
        },
      ],
    })
    .exec();

  const {
    title,
    price,
    detail,
    color,
    size,
    images,
    reviews,
    category,
    gender,
  } = product;

  const newData = {
    id: product.id,
    gender,
    title,
    price,
    detail,
    color,
    size,
    images,
    reviews,
    category: category.name,
    also_like: { men: category.men, women: category.women },
  };
  console.log(product.id);

  return res.send(newData);
});

export const delete_product = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const product = await Product.findByIdAndDelete(id);

  res.status(200).json({
    msg: 'Product deleted.',
    product,
  });
});

export const create_new_product = [
  body('title', 'Please add a title.').trim().escape().notEmpty(),
  body('files', 'Please add some photos.').trim().escape().isArray({ min: 1 }),
  body('category', 'Please select from one of the categories.').trim().escape().notEmpty(),
  body('gender', 'Please select from one of the genders.').trim().escape().notEmpty(),
  body('price', 'Please enter a valid price.').trim().escape().notEmpty(),
  body('stock', 'Please enter a valid stock.')
    .trim()
    .escape()
    .notEmpty()
    .isNumeric(),
  body('detail', 'Please add some details.')
    .trim()
    .escape()
    .isArray({ min: 1 })
    .custom(async (value) => {
      const everyValue = value.every((item) => item === '\n' || item === '');
      console.log({ value, everyValue });
      if (everyValue === true) {
        throw new Error();
      }
    }),
  body('delivery', 'Please add some delivery profiles.')
    .trim()
    .escape()
    .isArray({ min: 1 }),
  asyncHandler(async (req, res, next) => {
    const result = validationResult(req);

    if (!result.isEmpty()) {
      console.log(result.errors);
      res.status(400).send(result.errors);
      return;
    }

    console.log(req.body);
    res.send('ok');
  }),
];
