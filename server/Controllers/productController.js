/* eslint-disable */
// eslint-disable-next-line import/prefer-default-export
import asyncHandler from 'express-async-handler';
import Product from '../Models/product.js';
import Category from '../Models/category.js';
import { validationResult, check } from 'express-validator';
import productValidator from '../utils/productValidator.js';
import s3Upload, { s3Delete } from '../utils/s3Service.js';

import 'dotenv/config';
import { has } from 'lodash';
import multerUpload from '../utils/multerUpload';
import sortCombineVariation from '../utils/sortCOmbineVariations.js';
import generateProduct from '../utils/generateProduct.js';
import { Endpoint } from 'aws-sdk';
import productAggregateStage from '../utils/productAggregateStage.js';
import mongoose from 'mongoose';

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

export const getProductsInfo = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const ids = id.split(',').map((id) => new mongoose.Types.ObjectId(id));
  // const product = await Product.find({ _id: ids })
  //   .populate([{ path: 'delivery' }, { path: 'category' }])

  //   .exec();

  const newProduct = await Product.aggregate([
    {
      $match: {
        _id: {
          $in: ids,
        },
      },
    },
    {
      $lookup: {
        from: 'categories',
        localField: 'category',
        foreignField: '_id',
        as: 'category',
        pipeline: [
          {
            $project: {
              _id: 1,
              name: 1,
            },
          },
        ],
      },
    },
    {
      $lookup: {
        from: 'deliveryprofiles',
        localField: 'delivery',
        foreignField: '_id',
        as: 'delivery',
      },
    },
    {
      $set: {
        category: { $arrayElemAt: ['$category', 0] },
      },
    },
    ...productAggregateStage({ stats: true }),
  ]);
  if (newProduct.length < 1) {
    return res.status(404).send('product not found');
  }

  // await s3Get(id);

  return res.status(200).send(newProduct);
});

export const get_many_product = [
  check('id').trim().escape(),
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;

    const ids = id.split(',').map((id) => new mongoose.Types.ObjectId(id));
    console.log({ ids });
    const products = await Product.aggregate([
      {
        $match: { _id: { $in: ids } },
      },
      ...productAggregateStage({ stats: false }),

      {
        $lookup: {
          from: 'products',
          localField: 'category',
          foreignField: 'category',
          as: 'alsoLike',

          let: { gender: '$gender', id: '$_id' },
          pipeline: [
            {
              $match: {
                $and: [
                  {
                    $expr: {
                      $eq: ['$status', 'active'],
                    },
                  },
                  {
                    $expr: {
                      $eq: ['$gender', '$$gender'],
                    },
                  },
                  {
                    $expr: {
                      $ne: [{ $toObjectId: '$$id' }, '$_id'],
                    },
                  },
                ],
              },
            },

            ...productAggregateStage({ stats: false }),

            {
              $unset: ['variations'],
            },

            { $limit: 10 },

            // { $limit: 1 },
            // {
            //   $project: {
            //     result: 1,
            //     gender: 1,
            //   },
            // },
          ],
        },
      },
      {
        $addFields: {
          combineVariation: {
            $cond: {
              if: { $gte: [{ $size: '$variations' }, 2] },
              // then: {
              //   $map: {
              //     input: { $arrayElemAt: ['$variations', 2] },
              //     as: 'variation',
              //     in: '$$variation.option'
              //   },
              // },

              then: {
                $objectToArray: {
                  $arrayElemAt: ['$variations.options', 2],
                },
              },
              else: false,
            },
          },
        },
      },

      {
        $unwind: {
          path: '$variations',
          includeArrayIndex: 'variationIndex',
        },
      },
      {
        $addFields: {
          optionArray: { $objectToArray: '$variations.options' },
        },
      },

      {
        $addFields: {
          variationOptionArray: {
            $map: {
              input: '$optionArray',
              as: 'variationOption',
              in: '$$variationOption.v',
            },
          },
        },
      },

      {
        $group: {
          _id: '$_id',
          variations: {
            $push: '$variations',
          },
          doc: { $first: '$$ROOT' },
          variationList: {
            $push: {
              title: '$variations.name',
              variationIndex: '$variationIndex',
              array: '$variationOptionArray',
            },
          },
        },
      },
      {
        $replaceRoot: {
          newRoot: {
            $mergeObjects: ['$doc', { variationList: '$variationList' }],
          },
        },
      },
      {
        $unset: ['variationOptionArray', 'variationIndex', 'optionArray'],
      },

      { $sort: { _id: 1 } },

      {
        $project: {
          variations: 0,
        },
      },
    ]);

    const updateProductVariation = Array.from(products).map(
      ({ variationList, ...remainingProps }) => {
        const result = {};

        remainingProps[`isVariation1Present`] = false;
        remainingProps[`isVariation2Present`] = false;
        for (let i = 0; i < variationList.length; i++) {
          if (i < 2) {
            remainingProps[`variation${i + 1}`] = variationList[i];
            remainingProps[`isVariation${i + 1}Present`] = true;
          } else {
            const combineVariation = {};

            variationList[i].array.forEach(
              ({ variation, variation2, ...remainingProps }) => {
                if (!combineVariation.hasOwnProperty(variation)) {
                  combineVariation[variation] = {};
                }

                combineVariation[variation][variation2] = remainingProps;
              },
            );

            remainingProps.combineVariation = combineVariation;
            remainingProps[`isVariationCombine`] = true;
          }
        }

        return remainingProps;
      },
    );
    res.status(200).send({ products: updateProductVariation, success: true });
  }),
];
export const get_single_product = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const product = await Product.findById(id, null, {
    populate: {
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
    },

    // lean: {
    //   toObject: true,
    // },
  }).exec();

  if (!product || product?.status != 'active') {
    return res.status(404).send('product not found');
  }

  const { price, category } = product;

  const newProducts = product.toJSON({ flattenMaps: true });
  let newData = {
    ...newProducts,
    id: product.id,
    category: category.name,
    also_like: { men: category.men, women: category.women },
  };

  // if ('variations' in product) {
  const isVariationsPresent = has(newProducts, 'variations');

  newData.isVariation1Present = false;
  newData.isVariation2Present = false;
  newData.isVariationCombine = false;
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
          const hasPriceProperty = has(value, 'price');

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
  console.log(newData.price);
  res.send(newData);
});

export const delete_product = asyncHandler(async (req, res, next) => {
  const { ids } = req.params;

  const idsArray = ids.split(',');

  console.log(idsArray);
  const deleteProductsImages = idsArray.map((item) => {
    return s3Delete('products', item);
  });

  const result = await Promise.all([
    Product.deleteMany({ _id: idsArray }),
    ...deleteProductsImages,
  ]);

  res.send({ msg: 'deletion successful' });
});

// // create a new Product

// const upload = multerUpload;
// // work on adding variations

// export async function generateProduct(req, id) {
//   let counter = 0;
//   const imageArr = [];
//   const { files } = req;

//   const { variations } = req.body;
//   const { title, delivery, gender, price, stock, category, detail } = req.body;

//   const newStock = JSON.parse(stock.replace(/&quot;/g, '"'));
//   const newPrice = JSON.parse(price.replace(/&quot;/g, '"'));
//   const parseVariations = variations?.map((item) => {
//     const data = JSON.parse(item);
//     delete data.id;
//     data.options = new Map(data.options);

//     return data;
//   });

//   const productData = {
//     title,
//     delivery,
//     gender,
//     category,
//     detail,
//     variations: parseVariations,
//     images: imageArr,
//   };
//   if (newStock.on) {
//     productData.stock = newStock.value;
//   }

//   if (newPrice.on) {
//     productData.price = { current: newPrice.value };
//   }

//   // const newFiles = files.map(async (item) => {
//   //   const sharpen = await sharpify(item);
//   //   sharpen.fileName = counter === 0 ? 'primary' : `additional-${counter}`;
//   //   imageArr.push(`${url}/${id}/${sharpen.fileName}.${sharpen.format}`);
//   //   counter += 1;
//   //   return sharpen;
//   // });
//   const sharpResult = [];
//   for (const item of files) {
//     const sharpen = await sharpify(item);
//     sharpen.fileName = counter === 0 ? 'primary' : `additional-${counter}`;
//     imageArr.push(`${url}/${id}/${sharpen.fileName}.${sharpen.format}`);
//     counter += 1;
//     sharpResult.push(sharpen);
//   }

//   // const sharpResult = await Promise.all(newFiles);
//   return { productData, sharpResult };
// }
export const create_new_product = [
  multerUpload.array('files', 6),
  productValidator,

  asyncHandler(async (req, res, next) => {
    const resultValidation = validationResult(req);
    if (!resultValidation.isEmpty()) {
      res.status(400).send(resultValidation.errors);
      return;
    }
    const { gender, category } = req.body;
    const { isDraft } = req.query;
    const newProduct = new Product({ status: isDraft ? 'draft' : 'active' });

    const { productData, sharpResult } = await generateProduct(
      req,
      newProduct.id,
    );
 

    Object.assign(newProduct, productData);
    try {
      await Category.updateOne(
        { _id: category },
        { $push: { [gender]: newProduct.id } },
      );

      await s3Upload({
        files: sharpResult,
        isProfile: false,
        folderId: newProduct.id,
        endPoint: 'products',
      });

      await newProduct.save();
      return res.send({ success: true, msg: 'product saved' });
    } catch (error) {
      const deleteId = newProduct.id;

      const deleteResult = await s3Delete('products', deleteId);

      next(error);
    }
  }),
];
export const update_product = [
  multerUpload.array('files', 6),

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
    await s3Upload({
      files: sharpResult,
      isProfile: false,
      folderId: id,
      endPoint: 'products',
    });

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

    res.send({ msg: 'product updated', success: true });
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

export const increment_visit = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const product = await Product.findByIdAndUpdate(
    id,
    { $inc: { visits: 1 } },
    {
      new: true,
      lean: { toObject: true },
      select: { visits: 1 },
    },
  );

  res.status(200).send({ id, success: true, product });
});
