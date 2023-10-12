import asyncHandler from 'express-async-handler';
import Product from '../Models/product.js';
import Category from '../Models/category.js';

import { body, check, validationResult } from 'express-validator';

import sharpify from '../Upload/sharpify.js';
import multer from 'multer';
import fileFilter from '../Upload/fileFilter.js';
import category from '../Models/category.js';
import s3Upload, { s3Delete } from '../s3Service.js';
// eslint-disable-next-line import/prefer-default-export
import { v4 as uuidv4 } from 'uuid';
import 'dotenv/config';

export const get_all_products = asyncHandler(async (req, res) => {
  const products = await Product.find().populate('category').exec();
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

  const product = await Product.findById(id);

  const { gender, category } = product;

  await Product.findByIdAndDelete(id);
  await Category.updateOne(
    { _id: category },
    {
      $pull: { [gender]: id },
    },
  );
  await s3Delete(id);
  res.status(200).json({
    msg: 'Product deleted.',
    product,
  });
});

// create a new Product
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 1000000000, files: 6 },
});

const customVariationValidator = (value, { req, next }) => {
  const { variations } = req.body;
  const parseVariation = JSON.parse(variations);
  console.log({ value });
  if (parseVariation.length > 0) {
    return true;
  }

  if (value) {
    return true;
  } else {
    return false;
  }
};
const validator = [
  check('files').custom((value, { req }) => {
    if (req.files.length < 1) {
      throw new Error('Please add a photo.');
    }

    return true;
  }),
  body('title', 'Please add a title.').trim().escape().notEmpty(),

  body('category', 'Please select from one of the categories.')
    .trim()
    .escape()
    .notEmpty()
    .custom((value) => {
      if (value === 'undefined') {
        throw new Error();
      }

      return true;
    }),
  body('gender', 'Please select from one of the genders.')
    .trim()
    .escape()
    .notEmpty()
    .custom((value) => {
      if (value === 'undefined') {
        throw new Error();
      }

      return true;
    }),
  body('price', 'Please enter a valid price.')
    .trim()
    .escape()
    .custom(customVariationValidator),

  // .notEmpty(),
  body('stock', 'Please enter a valid stock.')
    .trim()
    .escape()
    .custom(customVariationValidator),

  // .notEmpty(),
  body('detail', 'Please add some details.')
    .trim()
    .escape()
    .isArray({ min: 1 })
    .custom(async (value) => {
      const everyValue = value.every((item) => item === '\n' || item === '');

      if (everyValue === true) {
        throw new Error();
      }
    }),
  body('delivery', 'Please add some delivery profiles.')
    .trim()
    .escape()
    .isArray({ min: 1 }),
];

export const create_new_product = [
  upload.array('files', 6),
  validator,
  asyncHandler(async (req, res, next) => {
    let counter = 0;
    const imageArr = [];
    const url = `${process.env.UPLOAD_URL}/products`;
    const result = validationResult(req);
    const { files } = req;
    const { variations } = req.body;
    const parseVariations = JSON.parse(variations);

    // validate price and quantity only if variations is empty;
    if (!result.isEmpty()) {
      console.log('errorList:', result.errors);
      res.status(400).send(result.errors);
      return;
    }
    const { title, delivery, gender, price, stock, category, detail } =
      req.body;

    const newProduct = new Product({
      title,
      delivery,
      gender,
      price: { current: parseFloat(price) },
      stock,
      category,
      detail,
    });

    if (parseVariations.length > 0) {
      newProduct.variations = parseVariations;
    }

    const newFiles = files.map(async (item) => {
      const sharpen = await sharpify(item);
      sharpen.fileName = counter === 0 ? 'primary' : `additional-${counter}`;
      imageArr.push(
        `${url}/${newProduct.id}/${sharpen.fileName}.${sharpen.format}`,
      );
      counter += 1;
      return sharpen;
    });

    const sharpResult = await Promise.all(newFiles);
    newProduct.images = imageArr;

    const uploadResult = await s3Upload(sharpResult, false, newProduct.id);
    console.log('newProduct: ', newProduct);
    newProduct.save();

    await Category.updateOne(
      { _id: category },
      { $push: { [gender]: newProduct.id } },
    );
    return res.status(201).send(newFiles);
  }),
];
