import productAggregateStage from './productAggregateStage';

const productInfoPipeline = () => {
  const variationsField = [
    { num: 1, props: [] },
    {
      num: 2,
      props: ['price', 'stock', '_id'],
    },
  ];

  const pipeline = [
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
        ],
      },
    },

    {
      $lookup: {
        from: 'categories',
        localField: 'category',
        foreignField: '_id',
        as: 'category',
      },
    },
    {
      $addFields: {
        category: {
          $arrayElemAt: ['$category.name', 0],
        },
        // find the combined variation
        'variation_data.combineVariation': {
          $arrayElemAt: [
            {
              $filter: {
                input: '$variations',
                as: 'variation',
                cond: {
                  $eq: ['$$variation.combine', true],
                },
              },
            },
            0,
          ],
        },
      },
    },

    // New data format

    {
      $unwind: {
        // unwind options  to later group my variation1 -> { variation1 : [{...object, variation2}]}
        path: '$variation_data.combineVariation.options',
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $addFields: {
        'variation_data.combineVariation.options': {
          $arrayElemAt: ['$variation_data.combineVariation.options', 1],
        },
      },
    },
    {
      $group: {
        // group by "variation" in the nested array, as options is a store as a map in the db, {options: [['id', object]]}
        _id: '$variation_data.combineVariation.options.variation',
        variation_group: {
          $push: '$variation_data.combineVariation.options',
        },
        doc: { $first: '$$ROOT' }, // Keep original document structure
      },
    },
    {
      $group: {
        // append all groups to variable groupedByVariation
        _id: null,
        doc: { $first: '$doc' },
        groupedByVariation: {
          $push: {
            key: '$_id',
            value: '$variation_group',
          },
        },
      },
    },

    // {
    //   $addFields: {
    //     'doc.variation_data.combineVariation.original_option': {
    //       $cond: {
    //         if: { $eq: ['$doc.variation_data.combineVariation.combine', true] },
    //         then: '$doc.variation_data.combineVariation.options',
    //         else: '$$REMOVE',
    //       },
    //     },
    //   },
    // },

    {
      $replaceRoot: {
        newRoot: {
          $mergeObjects: [
            // rebuild data structure to include groupByVariation
            '$doc',
            {
              variation_data: {
                $mergeObjects: [
                  '$doc.variation_data',
                  {
                    combineVariation: {
                      $mergeObjects: [
                        '$doc.variation_data.combineVariation',
                        { groupedByVariation: '$groupedByVariation' },
                      ],
                    },
                  },
                ],
              },
            },
          ],
        },
      },
    },
    {
      $addFields: {
        // 'variation_data.combineVariation.original_option': {
        //   $cond: {
        //     if: { $eq: ['$variation_data.combineVariation.combine', true] },
        //     then: '$variation_data.combineVariation.options',
        //     else: '$$REMOVE',
        //   },
        // },
        ...[...variationsField].reduce((accumulator, { num }) => {
          // create new  array fields containing all variation options for each variation Type
          const field = `variation_data.variation_${num}_array`;
          accumulator[field] = {
            $cond: [
              {
                $and: [
                  { $isArray: `$${field}` },
                  {
                    $gt: [{ $size: `$${field}` }, 0],
                  },
                  {
                    $not: {
                      $eq: [{ $arrayElemAt: [`$${field}`, 0] }, {}], // not empty
                    },
                  },
                ],
              },
              `$${field}`,
              {
                $cond: [
                  {
                    $lte: [
                      // compare bson types number
                      { $arrayElemAt: ['$variations.options', num - 1] },
                      null,
                    ],
                  },
                  '$$REMOVE',
                  {
                    $map: {
                      input: {
                        $arrayElemAt: ['$variations.options', num - 1],
                      }, // minus 1 to find the index in variations, array index starts from 0

                      as: 'option',
                      in: { $arrayElemAt: ['$$option', 1] },
                    },
                  },
                ],
              },
            ],
          };

          return accumulator;
        }, {}),
      },
    },

    {
      $unset: 'variation_data.combineVariation.options',
    },
  ];

  return pipeline;
};

export { productInfoPipeline };
