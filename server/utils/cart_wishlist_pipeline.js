import productAggregateStage from "./productAggregateStage";

const cart_wishlist_pipeline = [

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
              $mergeObjects: ['$doc', { variationList: '$variationList' }],
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
];


export default cart_wishlist_pipeline