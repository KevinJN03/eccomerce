import asyncHandler from 'express-async-handler';
import Product from '../Models/product.js';
import Category from '../Models/category.js';

import { body, check, validationResult } from 'express-validator';
import productValidator from '../utils/productValidator.js';
import sharpify from '../Upload/sharpify.js';
import multer from 'multer';
import fileFilter from '../Upload/fileFilter.js';
import category from '../Models/category.js';
import s3Upload, { s3Delete, s3Get } from '../s3Service.js';
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

export const get_single_admin_product = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const product = await Product.findOne({ _id: id })
    .populate([{ path: 'delivery' }, { path: 'category' }])
    .exec();

  if (!product) {
    return res.status(404).send('product not found');
  }

  // await s3Get(id);

  return res.status(200).send(product);
});

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

  if (!product) {
    return res.status(404).send('product not found');
  }

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
  await s3Delete('products', id);
  res.status(200).json({
    msg: 'Product deleted.',
    product,
  });
});

export const delete_many_product = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const idArr = id.split(',');
  const deleteProductsImages = idArr.map((item) => {
    return s3Delete('products', item);
  });

  const result = await Promise.all([
    Product.deleteMany({ _id: idArr }),
    deleteProductsImages,
  ]);
  res.status(200).send(result);
});

// create a new Product
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 1000000000, files: 6 },
});

// work on adding variations
export const create_new_product = [
  upload.array('files', 6),
  productValidator,
  asyncHandler(async (req, res, next) => {
    try {
      let counter = 0;
      const imageArr = [];
      const url = `${process.env.UPLOAD_URL}/products`;
      const result = validationResult(req);
      const { files } = req;
      const { variations } = req.body;

      const parseVariations = variations?.map((item) => {
        const data = JSON.parse(item);
        delete data.id;
        data.options = new Map(data.options);

        return data;
      });
      // const parseVariations = variations;
      // validate price and quantity only if variations is empty;
      if (!result.isEmpty()) {
        console.log('errorList:', result.errors);
        res.status(400).send(result.errors);
        return;
      }

      const { title, delivery, gender, price, stock, category, detail } =
        req.body;

      const newStock = JSON.parse(stock.replace(/&quot;/g, '"'));
      const newPrice = JSON.parse(price.replace(/&quot;/g, '"'));
      const newProduct = new Product({
        title,
        delivery,
        gender,
        category,
        detail,
      });

      newProduct.variations = parseVariations;

      if (newStock.on) {
        newProduct.stock = newStock.value;
      }

      if (newPrice.on) {
        newProduct.price = { current: newPrice.value };
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

      await Category.updateOne(
        { _id: category },
        { $push: { [gender]: newProduct.id } },
      );

      console.log(
        '--------------------------------\r\n',
        'newProduct: ',
        newProduct,
      );
      newProduct.save();
      return res.status(201).send(newFiles);
    } catch (error) {
      console.log('error: ', error);
      next(error);
    }
  }),
];

export const getVariations = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const product = await Product.findById(id);
  const variation = product.variations[0].options.get(
    '67bec3e8-7010-4e96-b77e-cea2c38b2955',
  );

  res.send(variation);
});
