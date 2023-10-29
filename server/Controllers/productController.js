import asyncHandler from 'express-async-handler';
import Product from '../Models/product.js';
import Category from '../Models/category.js';
import mongoose from 'mongoose';
import { validationResult } from 'express-validator';
const url = `${process.env.UPLOAD_URL}/products`;
import productValidator from '../utils/productValidator.js';
import sharpify from '../Upload/sharpify.js';
import multer from 'multer';
import fileFilter from '../Upload/fileFilter.js';
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

  console.log(product.variations);

  product?.variations.map((variation) => {
    if (variation.name == 'Size' && !variation.name2) {
      const sizeArr = [];
      for (const [key, value] of variation?.options) {
        sizeArr.push({ size: value.variation });
      }
      newData.size = sizeArr;
    }

    if (variation.name == 'Colour' && !variation.name2) {
      const colorArr = [];
      for (const [key, value] of variation?.options) {
        colorArr.push(value.variation);
      }
      newData.color = colorArr;
    }
  });

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
  await await ('products', id);
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

async function generateProduct(req, id) {
  let counter = 0;
  const imageArr = [];
  const { files } = req;

  const { variations } = req.body;
  const { title, delivery, gender, price, stock, category, detail } = req.body;

  console.log({ detail });
  const newStock = JSON.parse(stock.replace(/&quot;/g, '"'));
  const newPrice = JSON.parse(price.replace(/&quot;/g, '"'));
  const parseVariations = variations?.map((item) => {
    const data = JSON.parse(item);
    delete data.id;
    data.options = new Map(data.options);

    return data;
  });

  const productData = {
    title,
    delivery,
    gender,
    category,
    detail,
    variations: parseVariations,
    images: imageArr,
  };
  if (newStock.on) {
    productData.stock = newStock.value;
  }

  if (newPrice.on) {
    productData.price = { current: newPrice.value };
  }

  // const newFiles = files.map(async (item) => {
  //   const sharpen = await sharpify(item);
  //   sharpen.fileName = counter === 0 ? 'primary' : `additional-${counter}`;
  //   imageArr.push(`${url}/${id}/${sharpen.fileName}.${sharpen.format}`);
  //   counter += 1;
  //   return sharpen;
  // });
  const sharpResult = [];
  for (const item of files) {
    const sharpen = await sharpify(item);
    sharpen.fileName = counter === 0 ? 'primary' : `additional-${counter}`;
    imageArr.push(`${url}/${id}/${sharpen.fileName}.${sharpen.format}`);
    counter += 1;
    sharpResult.push(sharpen);
  }

  // const sharpResult = await Promise.all(newFiles);
  return { productData, sharpResult };
}
export const create_new_product = [
  upload.array('files', 6),
  productValidator,
  async function (req, res, next) {
    const resultValidation = validationResult(req);
    if (!resultValidation.isEmpty()) {
      console.log('errorList:', resultValidation.errors);
      res.status(400).send(resultValidation.errors);
      return;
    }
    const { gender, category } = req.body;
    const newProduct = new Product();

    console.log({ id: newProduct.id });
    const { productData, sharpResult } = await generateProduct(
      req,
      newProduct.id,
    );

    Object.assign(newProduct, productData);

    // console.log(
    //   '--------------------------------\r\n',
    //   'newProduct: ',
    //   newProduct,
    // );
    try {
      await Category.updateOne(
        { _id: category },
        { $push: { [gender]: newProduct.id } },
      );

      await s3Upload(sharpResult, false, newProduct.id);

      await newProduct.save();
      return res.status(201).send('Product successfully created!!!');
    } catch (error) {
      const deleteId = newProduct.id;

      const deleteResult = await s3Delete('products', deleteId);
      console.log({ deleteResult });

      next(error);
    }
  },
];
export const update_product = [
  upload.array('files', 6),

  productValidator,
  asyncHandler(async (req, res, next) => {
    const result = validationResult(req);

    if (!result.isEmpty()) {
      console.log('errorList:', result.errors);
      res.status(400).send(result.errors);
      return;
    }

    const { id } = req.params;
    const { gender, category } = req.body;
    const { productData, sharpResult } = await generateProduct(req, id);
    const oldProduct = await Product.findById(id, {
      category: 1,
      gender: 1,
    }).populate('category');

    await s3Delete('products', id);
    await s3Upload(sharpResult, false, id);
    if (category !== oldProduct.category.id || gender !== oldProduct.gender) {
      console.log('not same');
      console.log({
        category,
        oldCategory: oldProduct.category.id,
        gender,
        oldGender: oldProduct.gender,
      });

      productData.price.previous = oldProduct.price.current;
      await Category.updateOne(
        { _id: oldProduct.category },
        { $pull: { [oldProduct.gender]: id } },
      );

      await Category.updateOne({ _id: category }, { $push: { [gender]: id } });
    }

    await Product.findByIdAndUpdate(id, { ...productData }, { upsert: true });

    res.status(200).send('Procduct successfully updated.');
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
