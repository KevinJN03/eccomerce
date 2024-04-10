import asyncHandler from 'express-async-handler';
import { body, check, validationResult } from 'express-validator';
import _, { property } from 'lodash';
import mongoose from 'mongoose';
import productAggregateStage from '../utils/productAggregateStage';
import variationFormat from '../utils/variationFormat.js';
import cart_wishlist_pipeline from '../utils/cart_wishlist_pipeline.js';

export default function generateModelSchemaRoute(Model, route) {
  const queryOptions = {
    new: true,
    // upsert: true,
    lean: { toObject: true },
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
    asyncHandler(async (req, res, next) => {
      const { id } = req.params;

      const errors = validationResult(req);
      console.log({ id });

      const findDoc = await Model.findOne({ _id: id }, null, queryOptions);

      if (!findDoc) {
        const newDoc = await Model.create({});

        return res.status(200).send(newDoc);
      }

      if (findDoc.items?.length < 1) {
        return res.send(findDoc);
      }

      console.log('getting Document from id');

      const data = await Model.aggregate(

        [
           {
          $match: {
            _id: new mongoose.Types.ObjectId(id),
          },
        },
         ...cart_wishlist_pipeline,
        ]
       
      );

      var document = {
        ...data[0],
        items: variationFormat({ products: data[0].items }),
      };
      
      // const document = data;

      res.send(document);
    }),
  ];

  const removeFromDocument = [
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
    asyncHandler(async (req, res, next) => {
      const { id, itemData } = req.body;

      const findIfExist = await Model.findOne({
        _id: id,
        'items.product_id': itemData.product_id,
        'items.variation_data.select': itemData.variation_data?.select,
      });
      if (findIfExist) {
        const document = await Model.findOneAndUpdate(
          {
            _id: id,
            'items.product_id': itemData.product_id,
            'items.variation_data.select': itemData.variation_data?.select,
          },
          { $inc: { 'items.$.quantity': 1 } },
          {
            new: true,

            lean: { toObject: true },
          },
        );
        //
        return res.redirect(301, `/api/${route}/${id}`);
      }

      const document = await Model.findByIdAndUpdate(
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
    asyncHandler(async (req, res, next) => {
      const { id, itemId, property, value } = req.body;

      const document = await Model.findOneAndUpdate(
        {
          _id: new mongoose.Types.ObjectId(id),
          'items._id': new mongoose.Types.ObjectId(itemId),
        },
        { [`items.$.${property}`]: value },
        {
          new: true,

          lean: { toObject: true },
        },
      );

      //  res.send(document);
      return res.redirect(301, `/api/${route}/${id}`);
    }),
  ];

  return {
    retrieveDocument,
    createDocument,
    updateDocument,
    removeFromDocument,
    addToDocument,
    updateProperty,
  };
}
