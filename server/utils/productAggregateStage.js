function productAggregateStage() {
  return [
    {
      $unwind: { path: '$variations', includeArrayIndex: 'variationNumber' },
    },

    {
      $addFields: {
        variationOptions: {
          $objectToArray: '$variations.options',
        },
      },
    },

    {
      $addFields: {
        priceArray: {
          $cond: {
            if: { $eq: ['$variations.priceHeader.on', true] },
            then: {
              $map: {
                input: '$variationOptions',
                as: 'option',
                in: { $toDouble: '$$option.v.price' },
              },
            },
            else: '$$REMOVE',
          },
        },
        stockArray: {
          $cond: {
            if: { $eq: ['$variations.quantityHeader.on', true] },
            then: {
              $map: {
                input: '$variationOptions',
                as: 'option',
                in: { $toInt: '$$option.v.stock' },
              },
            },
            else: '$$REMOVE',
          },
        },
      },
    },

    {
      $group: {
        _id: '$_id',
        doc: { $first: '$$ROOT' },
        variationsArray: { $push: '$variations' },

        stockArrays: {
          $push: {
            $cond: {
              if: {
                $and: [
                  {
                    $eq: ['$variations.quantityHeader.on', true],
                  },
                  {
                    $eq: ['$variations.combine', true],
                  },
                ],
              },
              then: {
                $cond: {
                  if: {
                    $eq: ['$variationNumber', 2],
                  },
                  then: {
                    min: { $toInt: { $min: '$stockArray' } },
                    max: { $toInt: { $max: '$stockArray' } },
                    array: '$stockArray',
                    total: {
                      $sum: '$stockArray',

                      // {
                      //   $map: {
                      //     input: '$stockArray',
                      //     as: 'item',
                      //     in: { $toInt: '$$item' },
                      //   },
                      // },
                    },
                  },

                  else: '$$REMOVE',
                },
              },
              else: {
                $cond: {
                  if: {
                    $eq: ['$variations.quantityHeader.on', true],
                  },
                  then: {
                    min: { $toInt: { $min: '$stockArray' } },
                    max: { $toInt: { $max: '$stockArray' } },
                    array: '$stockArray',
                    total: {
                      $sum: '$stockArray',
                    },
                  },
                  else: '$$REMOVE',
                },
              },
            },
          },
        },
        priceArrays: {
          $push: {
            $cond: {
              if: {
                $and: [
                  {
                    $eq: ['$variations.priceHeader.on', true],
                  },
                  {
                    $eq: ['$variations.combine', true],
                  },
                ],
              },
              then: {
                $cond: {
                  if: {
                    $eq: ['$variationNumber', 2],
                  },
                  then: {
                    min: { $min: '$priceArray' },
                    max: { $max: '$priceArray' },
                  },

                  else: '$$REMOVE',
                },
              },
              else: {
                $cond: {
                  if: {
                    $eq: ['$variations.priceHeader.on', true],
                  },
                  then: {
                    min: { $min: '$priceArray' },
                    max: { $max: '$priceArray' },
                  },
                  else: '$$REMOVE',
                },
              },
            },
          },
        },
      },
    },

    {
      $replaceRoot: {
        newRoot: {
          $mergeObjects: [
            '$doc',
            {
              additional_data: {
                price: {
                  $cond: {
                    if: { $gt: [{ $size: '$priceArrays' }, 0] },
                    then: { $arrayElemAt: ['$priceArrays', 0] },
                    else: {
                      min: { $toDouble: '$doc.price.current' },
                      max: { $toDouble: '$doc.price.current' },
                    },
                  },
                },
                stock: {
                  $cond: {
                    if: { $gt: [{ $size: '$stockArrays' }, 0] },
                    then: { $arrayElemAt: ['$stockArrays', 0] },
                    else: {
                      min: '$doc.stock',
                      max: '$doc.stock',
                      total: '$doc.stock',
                    },
                  },
                },
              },
            },
            { variations: '$variationsArray' },
          ],
        },
      },
    },
    {
      $lookup: {
        from: 'orders',
        localField: '_id',
        foreignField: 'items.product',
        as: 'orders_docs',
        // let: { total_sales: 0, total_sales_amount: 0.0 },
        let: { productId: '$_id' },
        pipeline: [
          {
            $match: {
              status: { $ne: 'processing' },
            },
          },
          {
            $addFields: {
              prices: {
                $sum: {
                  $map: {
                    input: '$items',
                    as: 'item',
                    in: {
                      $cond: {
                        if: {
                          $eq: ['$$item.product', '$$productId'],
                        },
                        then: '$$item.price',
                        else: '$$REMOVE',
                      },
                    },
                  },
                },
              },
            },
          },
          {
            $project: {
              _id: 1,
              status: 1,
              prices: 1,

              // price: {
              //   items: {
              //     $elemMatch: { product: '$$productId' },
              //   },
              // },
            },
          },
        ],
      },
    },

    {
      $addFields: {
        stats: {
          revenue: { $toDouble: { $sum: '$orders_docs.prices' } },
          sales: { $toInt: { $size: '$orders_docs' } },
        },
      },
    },
    {
      $unset: [
        'orders_docs',
        'variationOptions',
        'priceArrays',
        'stockArrays',
        'priceArray',
        'stockArray',
        'variationNumber',
      ],
    },
  ];
}

export default productAggregateStage;
