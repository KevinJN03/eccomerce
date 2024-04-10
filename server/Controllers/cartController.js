import asyncHandler from 'express-async-handler';
import { body, check, validationResult } from 'express-validator';
import _, { property } from 'lodash';
import mongoose from 'mongoose';
import productAggregateStage from '../utils/productAggregateStage';
import variationFormat from '../utils/variationFormat.js';

export default function generateModelSchemaRoute(Model, property) {
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

      const data = await Model.aggregate([
        {
          $match: {
            _id: new mongoose.Types.ObjectId(id),
            items: { $exists: true, $ne: [] },
          },
        },
        { $unwind: { path: '$items', preserveNullAndEmptyArrays: true } },
        {
          $lookup: {
            from: 'deliveryprofiles',
            localField: 'items.delivery',
            foreignField: '_id',
            as: 'items.deliveryInfo',
          },
        },
        {
          $lookup: {
            from: 'products',
            localField: 'items.product_id',
            foreignField: '_id',
            as: 'items.productInfo',
            let: { id: '$_id' },
            pipeline: [
              ...productAggregateStage({ stats: false }),

              {
                $addFields: {
                  'variation_data.combineVariation': {
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
                    $mergeObjects: [
                      '$doc',
                      { variationList: '$variationList' },
                    ],
                  },
                },
              },
              {
                $unset: [
                  'variationOptionArray',
                  'variationIndex',
                  'optionArray',
                  '_id',
                ],
              },

              // ...variationSortAggregate(),
            ],
          },
        },
        {
          $addFields: {
            items: {
              $mergeObjects: [
                '$items',
                { $arrayElemAt: ['$items.productInfo', 0] },
                {
                  variation_data: {
                    select: '$items.variation_data.select',
                  },
                },
              ],
            },
          },
        },

        {
          $unset: 'items.productInfo',
        },
        {
          $group: {
            _id: '$_id',
            items: {
              $push: '$items',
            },
            doc: { $first: '$$ROOT' },
          },
        },

        {
          $replaceRoot: {
            newRoot: {
              $mergeObjects: ['$doc', { items: '$items' }],
            },
          },
        },
      ]);

      var document = {
        ...data[0],
        items: variationFormat({ products: data[0].items }),
      };
      // }

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
      return res.redirect(300, `/api/${property}/${id}`)
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

      console.log({ findIfExist });

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
        return res.redirect(300, `/api/${property}/${id}`);
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
      return res.redirect(300, `/api/${property}/${id}`)
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

      // res.send(document);
      return res.redirect(300, `/api/${property}/${id}`)
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
