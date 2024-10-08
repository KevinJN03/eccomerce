import asyncHandler from 'express-async-handler';
import { body, check, validationResult } from 'express-validator';
import _, { property } from 'lodash';
import mongoose from 'mongoose';
import productAggregateStage from '../utils/productAggregateStage';
import variationFormat from '../utils/variationFormat.js';
import cart_wishlist_pipeline from '../utils/cart_wishlist_pipeline.js';
import Product from '../Models/product';
export default function generateModelSchemaRoute(Model, route) {
  const queryOptions = {
    new: true,
    // upsert: true,
    lean: { toObject: true },
  };

  const validator = (field = 'body') => {
    return [
      check('id').trim().escape().notEmpty(),
      asyncHandler(async (req, res, next) => {
        try {
          const data = await Model.findOne({ _id: req[field].id });
          req[field].id = data._id;
          next();
        } catch (error) {
          const data = await Model.create({});
          console.log({ data });
          req[field].id = data._id;

          next();
        }
      }),
    ];
  };
  const createDocument = [
    asyncHandler(async (req, res, next) => {
      const document = await Model.create(req.body);
      console.log('document created');
      res.send({
        msg: 'document created successfully!',
        _id: document._id,
      });
    }),
  ];

  const updateDocument = [
    ...validator('params'),
    asyncHandler(async (req, res, next) => {
      const { id } = req.params;

      const document = await Model.findByIdAndUpdate(
        id,
        req.body,
        queryOptions,
      );

      res.send(document);
    }),
  ];

  const retrieveDocument = [
    ...validator('params'),
    asyncHandler(async (req, res, next) => {
      const { id } = req.params;

      const errors = validationResult(req);
      const findDoc = await Model.findOne({ _id: id }, null, queryOptions);

      if (!findDoc) {
        const newDoc = await Model.create({});

        return res.status(200).send(newDoc);
      }

      if (findDoc.items?.length < 1) {
        return res.send(findDoc);
      }

      const data = await Model.aggregate([
        {
          $match: {
            _id: id,
          },
        },
        ...cart_wishlist_pipeline,
      ]);

      console.group('this here');
      const document = {
        ...data[0],
        items: variationFormat({ products: data[0].items }),
      };
      res.send(document);
    }),
  ];

  const removeFromDocument = [
    ...validator('query'),
    asyncHandler(async (req, res, next) => {
      const { id, itemId } = req.query;

      const document = await Model.findByIdAndUpdate(
        { _id: id },
        { $pull: { items: { _id: itemId } } },
        { new: true },
      );

      // res.send(document);
      return res.redirect(301, `/api/${route}/${id}`);
    }),
  ];

  const addToDocument = [
    ...validator(),
    asyncHandler(async (req, res, next) => {
      const { id, itemData } = req.body;

      console.log({ id });

      const findObj = {
        _id: id,
        'items.product_id': itemData.product_id,
        'items.variation_data.select.variation1.variation': _.get(
          itemData,
          'variation_data.select.variation1.variation',
        ),
        'items.variation_data.select.variation2.variation': _.get(
          itemData,
          'variation_data.select.variation2.variation',
        ),
      };
      const findIfExist = await Model.findOne(findObj);
      if (findIfExist) {
        await Model.findOneAndUpdate(
          findObj,
          { $inc: { 'items.$.quantity': 1 } },
          {
            new: true,

            lean: { toObject: true },
          },
        );

        return res.redirect(301, `/api/${route}/${id}`);
      }

      await Model.findByIdAndUpdate(
        { _id: id },
        {
          $push: {
            items: {
              $each: [itemData],
              $position: 0,
            },
          },
        },
        { new: true },
      );

      // res.send(document);
      return res.redirect(301, `/api/${route}/${id}`);
    }),
  ];

  const updateProperty = [
    ...validator(),
    asyncHandler(async (req, res, next) => {
      const { id, itemId, property, value } = req.body;

      const obj = {};

      if (itemId) {
        obj['items._id'] = new mongoose.Types.ObjectId(itemId);
      }
      const document = await Model.findOneAndUpdate(
        {
          _id: id,
          ...obj,
        },
        { [itemId ? `items.$.${property}` : property]: value },
        {
          new: true,

          lean: { toObject: true },
        },
      );

      //  res.send(document);
      return res.redirect(301, `/api/${route}/${id}`);
    }),
  ];

  const getVariationValue = [
    asyncHandler(async (req, res, next) => {
      // const { id } = req.params;
      // const {index} = req.body

      // const document = await Model.findOne(
      //   {
      //     'items._id': new mongoose.Types.ObjectId(id),
      //   },
      //   { items: { $elemMatch: { _id: id } } },
      // );

      // if (document) {
      //   const [{ product_id, ...item }] = document.items;

      //   const product = await Product.findOne({ _id: product_id });
      //   if(product.variations?.length == 3 && index == 2 ){
      //     const combineVariations = product.variations[2];
      //   }
      // }

      res.send({ success: true });
      // const { id } = req.body;
    }),
  ];

  return {
    retrieveDocument,
    createDocument,
    updateDocument,
    removeFromDocument,
    addToDocument,
    updateProperty,
    getVariationValue,
  };
}
