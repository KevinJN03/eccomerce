/* eslint-disable */
import asyncHandler from 'express-async-handler';
import Product from '../Models/product.js';
import Category from '../Models/category.js';

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
import _ from 'lodash';
import sortCombineVariation from '../utils/sortCOmbineVariations.js';
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

  const product = await Product.findById(id)
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
    price,

    category,

    minVariationPrice,
  } = product;

  const newProducts = product.toJSON({ flattenMaps: true });
  let newData = {
    ...newProducts,
    id: product.id,
    category: category.name,
    also_like: { men: category.men, women: category.women },
  };

  // if ('variations' in product) {
  const isVariationsPresent = _.has(newProducts, 'variations');

  if (isVariationsPresent) {
    const { variations } = product;
    let minimumPrice = Infinity;
    for (let i = 0; i < variations.length; i++) {
      const { combine, name, name2, options } = variations[i];

      if (i == 0 && combine) {
        console.log('this variation is combined');

        // jump to 3rd variation which is combined
        i++;
        continue;
      } else if (variations.length < 3) {
        // variationsObject[`variation${i}`] = { array: [] }

        const valueArray = [];
        for (const [key, value] of options) {
          const hasPriceProperty = _.has(value, 'price');

          if (hasPriceProperty) {
            minimumPrice = Math.min(minimumPrice, value.price);
          }
          valueArray.push(value);
        }
        newData[`variation${i + 1}`] = { array: valueArray, title: name };
        newData[`isVariation${i + 1}Present`] = true;
        console.log('product is not combined', valueArray);
      }

      if (i == 2 && combine && variations.length == 3) {
        const { variationObj, minPriceValue, variation1, variation2 } =
          sortCombineVariation(options);

        variation1.title = name;
        variation2.title = name2;

        minimumPrice = minPriceValue;

        newData.variation1 = variation1;
        newData.variation2 = variation2;
        newData.isVariation1Present = true;
        newData.isVariation2Present = true;
        newData.combineVariation = variationObj;
        newData.isVariationCombine = true;
      }
    }

    if (isFinite(minimumPrice)) {
      newData.price.current = minimumPrice;
    }
  }

  // if (isVariationsPresent) {
  //   product.variations.map((variation, idx) => {
  //     if (idx == 0) {
  //     }
  //     if (variation.name == 'Size' && !variation.name2) {
  //       const sizeArr = [];
  //       for (const [key, value] of variation?.options) {
  //         sizeArr.push(value);
  //       }
  //       newData.size = sizeArr;
  //     }

  //     if (variation.name == 'Colour' && !variation.name2) {
  //       const colorArr = [];
  //       for (const [key, value] of variation?.options) {
  //         colorArr.push(value);
  //       }
  //       newData.color = colorArr;
  //     }

  //     const isName2Present = variation?.name2;

  //     if (isName2Present) {
  //       let minPriceValue = Infinity;
  //       console.log('im in here');
  //       const variationObj = {};
  //       const map = new Map();
  //       for (const [key, value] of variation?.options) {
  //         minPriceValue = Math.min(value.price, minPriceValue);
  //         if (!map.has(value.variation)) {
  //           const newVariationObj = {
  //             [value.variation2]: {
  //               id: value.id,
  //               stock: value.stock,
  //               price: value.price,
  //               visible: value.visible,
  //             },
  //           };

  //           variationObj[value.variation] = newVariationObj;
  //           map.set(value.variation, newVariationObj);
  //         } else {
  //           const getItemFromMap = map.get(value.variation);

  //           const newVariationObj = {
  //             [value.variation2]: {
  //               id: value.id,
  //               stock: value.stock,
  //               price: value.price,
  //               visible: value.visible,
  //             },
  //           };
  //           const updatedVariationObject = Object.assign(
  //             getItemFromMap,
  //             newVariationObj,
  //           );
  //           map.set(value.variation, updatedVariationObject);
  //         }
  //       }

  //       newData.price.current = minPriceValue;

  //       // newData.combineVariation = arr;
  //       newData.combineVariation = variationObj;
  //     }
  //   });
  // }

  console.log(newData.price);
  res.send(newData);
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
      res.status(400).send(resultValidation.errors);
      return;
    }
    const { gender, category } = req.body;
    const newProduct = new Product();

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
      res.status(400).send(result.errors);
      return;
    }

    const { id } = req.params;
    const { gender, category } = req.body;
    const { productData, sharpResult } = await generateProduct(req, id);
    const oldProduct = await Product.findById(id, {
      category: 1,
      gender: 1,
      price: 1,
      variations: 1,
      // minVariationPrice: 0,
    }).populate({
      path: 'category',
    });

    await s3Delete('products', id);
    await s3Upload(sharpResult, false, id);

    const newPrice = {
      current: productData?.price?.current,
      previous: oldProduct.price?.current || oldProduct?.minVariationPrice,
    };
    productData.price = newPrice;
    if (category !== oldProduct.category.id || gender !== oldProduct.gender) {
      await Category.updateOne(
        { _id: oldProduct.category },
        { $pull: { [oldProduct.gender]: id } },
      );

      await Category.updateOne({ _id: category }, { $push: { [gender]: id } });
    }

    await Product.findByIdAndUpdate(id, { ...productData }, { upsert: true });

    res.status(200).send('Product successfully updated.');
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
