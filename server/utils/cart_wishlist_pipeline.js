import dayjs from 'dayjs';
import productAggregateStage from './productAggregateStage';
import _, { sortBy } from 'lodash';
const todayDate = dayjs();

const convertWeeksToDays = ({ field, property }) => {
  return {
    $cond: {
      if: { $eq: [`${property}.type`, 'weeks'] },
      then: { $multiply: [`${property}.${field}`, 7] },
      else: `${property}.${field}`,
    },
  };
};
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

        // {
        //   $addFields: {
        //     'variation_data.combineVariation': {
        //       $cond: {
        //         if: { $gte: [{ $size: '$variations' }, 2] },
        //         // then: {
        //         //   $map: {
        //         //     input: { $arrayElemAt: ['$variations', 2] },
        //         //     as: 'variation',
        //         //     in: '$$variation.option'
        //         //   },
        //         // },

        //         then: {
        //           $objectToArray: {
        //             $arrayElemAt: ['$variations.options', 2],
        //           },
        //         },
        //         else: false,
        //       },
        //     },
        //   },
        // },

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
            price: {
              $mergeObjects: [
                { $arrayElemAt: ['$items.productInfo.price', 0] },
                '$items.price',
              ],
            },
          },
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
    $addFields: {
      'items.variation_data': {
        // $arrayToObject: {
        $reduce: {
          input: '$items.variationList',
          initialValue: '$items.variation_data',
          in: {
            $cond: {
              if: {
                $lt: ['$$this.variationIndex', 2],
              },

              then: {
                $mergeObjects: [
                  '$$value',
                  {
                    $arrayToObject: [
                      [
                        {
                          k: {
                            $concat: [
                              'variation',
                              {
                                $toString: {
                                  $add: ['$$this.variationIndex', 1],
                                },
                              },
                              '_present',
                            ],
                          },
                          v: true,
                        },
                        {
                          k: {
                            $concat: [
                              'variation',
                              {
                                $toString: {
                                  $add: ['$$this.variationIndex', 1],
                                },
                              },
                              '_data',
                            ],
                          },
                          v: '$$this',
                        },
                      ],
                    ],
                  },
                ],
              },

              else: {
                $mergeObjects: [
                  '$$value',
                  { $arrayToObject: [[{ k: 'isVariationCombine', v: true }]] },
                ],
              },

              // {
              //   $mergeObjects: [
              //     '$$value',
              //     {
              //       $arrayToObject: [
              //         [
              //           {
              //             k: 'combineVariation',
              //             v: {
              //               $reduce: {
              //                 input: '$$this.array',
              //                 initialValue: {},
              //                 in: {
              //                   $mergeObjects: [
              //                     '$$value',
              //                     {
              //                       $arrayToObject: [
              //                         [
              //                           {
              //                             k: '$$this.variation',
              //                             v: {
              //                               $concatArrays: [
              //                                 {
              //                                   $let: {
              //                                     vars: {
              //                                       converted: {
              //                                         $filter: {
              //                                           as: 'convertedArray',
              //                                           input: {
              //                                             $objectToArray:
              //                                               '$$value',
              //                                           },

              //                                           cond: {
              //                                             $eq: [
              //                                               '$$convertedArray.k',
              //                                               '$$this.variation',
              //                                             ],
              //                                           },
              //                                         },
              //                                       },
              //                                     },

              //                                     in: {
              //                                       $cond: {
              //                                         if: {
              //                                           $eq: [
              //                                             {
              //                                               $type:
              //                                                 '$$converted.v',
              //                                             },
              //                                             'object',
              //                                           ],
              //                                         },
              //                                         then: '$$converted.v',
              //                                         else: [],
              //                                       },
              //                                     },
              //                                   },
              //                                 },

              //                                 [
              //                                   {
              //                                     k: '$$this.variation2',
              //                                     v: '$$this',
              //                                   },
              //                                 ],
              //                               ],
              //                               // $mergeObjects: [
              //                               //   {
              //                               //     $let: {
              //                               //       vars: {
              //                               //         converted: {
              //                               //           $filter: {
              //                               //             as: 'convertedArray',
              //                               //             input: {
              //                               //               $objectToArray:
              //                               //                 '$$value',
              //                               //             },

              //                               //             cond: {
              //                               //               $eq: [
              //                               //                 '$$convertedArray.k',
              //                               //                 '$$this.variation',
              //                               //               ],
              //                               //             },
              //                               //           },
              //                               //         },
              //                               //       },

              //                               //       in: {
              //                               //         $cond: {
              //                               //           if: {
              //                               //             $eq: [
              //                               //               {
              //                               //                 $type:
              //                               //                   '$$converted.v',
              //                               //               },
              //                               //               'object',
              //                               //             ],
              //                               //           },
              //                               //           then: '$$converted.v',
              //                               //           else: {},
              //                               //         },
              //                               //       },
              //                               //     },
              //                               //   },
              //                               //   {
              //                               //     $arrayToObject: [
              //                               //       [
              //                               //         {
              //                               //           k: '$$this.variation2',
              //                               //           v: '$$this',
              //                               //         },
              //                               //       ],
              //                               //     ],
              //                               //   },
              //                               // ],
              //                             },
              //                           },
              //                         ],
              //                       ],
              //                     },
              //                   ],
              //                 },
              //               },
              //             },
              //           },
              //         ],
              //       ],
              //     },
              //   ],
              // },
            },
          },
        },
        // },
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
      original_items: {
        $push: '$items',
      },
      delivery_option: { $first: '$delivery_option' },
    },
  },

  { $unwind: { path: '$items', preserveNullAndEmptyArrays: true } },
  {
    $group: {
      _id: '$items.delivery',
      original_items: {
        $first: '$original_items',
      },
      delivery_option: { $first: '$delivery_option' },
      deliveryCounts: {
        $sum: '$items.quantity',
      },
      cartId: { $first: '$_id' },
      profileInfo: { $first: { $arrayElemAt: ['$items.deliveryInfo', 0] } },
      items: {
        $push: '$items',
      },
    },
  },
  {
    $addFields: {
      costArray: {
        $concatArrays: [
          '$profileInfo.standard_delivery',
          '$profileInfo.delivery_upgrades',
        ],
      },
      profile_processing_times: {
        start: convertWeeksToDays({
          field: 'start',
          property: '$profileInfo.processing_time',
        }),
        end: convertWeeksToDays({
          field: 'end',
          property: '$profileInfo.processing_time',
        }),
      },
    },
  },
  {
    $addFields: {
      costArrayTotal: {
        $arrayToObject: {
          $map: {
            input: '$costArray',
            // as: 'delivery',
            in: {
              $let: {
                vars: {
                  startDate: {
                    $dateAdd: {
                      startDate: new Date(),
                      unit: 'day',
                      amount: {
                        $add: [
                          '$profile_processing_times.start',
                          convertWeeksToDays({
                            field: 'start',
                            property: '$$this.shipping',
                          }),
                        ],
                      },
                    },
                  },
                  endDate: {
                    $dateAdd: {
                      startDate: new Date(),
                      unit: 'day',
                      amount: {
                        $add: [
                          '$profile_processing_times.end',
                          convertWeeksToDays({
                            field: 'end',
                            property: '$$this.shipping',
                          }),
                        ],
                      },
                    },
                  },
                },
                in: {
                  k: { $toString: '$$this._id' },
                  v: {
                    _id: '$$this._id',
                    startDate: '$$startDate',
                    endDate: '$$endDate',
                    estimated_delivery: {
                      $cond: {
                        if: {
                          $eq: [
                            {
                              $dateToString: {
                                format: '%b',
                                date: '$$startDate',
                              },
                            },
                            {
                              $dateToString: {
                                format: '%b',
                                date: '$$endDate',
                              },
                            },
                          ],
                        },
                        then: {
                          $concat: [
                            {
                              $dateToString: {
                                format: '%d',
                                date: '$$startDate',
                              },
                            },
                            '-',
                            {
                              $dateToString: {
                                format: '%d',
                                date: '$$endDate',
                              },
                            },
                            ' ',
                            {
                              $dateToString: {
                                format: '%b',
                                date: '$$endDate',
                              },
                            },
                          ],
                        },
                        else: {
                          $concat: [
                            {
                              $dateToString: {
                                format: '%b %d',
                                date: '$$startDate',
                              },
                            },
                            '-',
                            {
                              $dateToString: {
                                format: '%b %d',
                                date: '$$endDate',
                              },
                            },
                          ],
                        },
                      },
                    },
                    cost: {
                      $add: [
                        '$$this.charges.one_item',
                        {
                          $multiply: [
                            '$$this.charges.additional_item',
                            { $subtract: ['$deliveryCounts', 1] },
                          ],
                        },
                      ],
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  },

  {
    $group: {
      _id: '$cartId',
      delivery_option: { $first: '$delivery_option' },
      deliveryInfoObj: {
        $addToSet: {
          k: { $toString: '$_id' },
          v: {
            $mergeObjects: [
              { shipping_costs: '$costArrayTotal' },
              '$profileInfo',
              { itemsByProfile: '$items' },
            ],
          },
        },
      },

      items: {
        $first: '$original_items',
      },
    },
  },

  {
    $replaceRoot: {
      newRoot: {
        $mergeObjects: [
          '$$ROOT',
          { deliveryInfoObj: { $arrayToObject: '$deliveryInfoObj' } },
        ],
      },
    },
  },
];

export default cart_wishlist_pipeline;
