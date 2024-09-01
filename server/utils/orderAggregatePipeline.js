const orderAggregatePipeline = [
  { $unwind: '$items' },
  {
    $lookup: {
      from: 'products',
      localField: 'items.product',
      foreignField: '_id',
      as: 'productLookup',
    },
  },
  {
    $project: {
      productLookup: {
        variations: 0,
        reviews: 0,
        detail: 0,
        category: 0,
        gender: 0,
        price: 0,
        delivery: 0,
      },
    },
  },

  {
    $addFields: {
      'items.product': { $arrayElemAt: ['$productLookup', 0] },
    },
  },
  {
    $unset: 'productLookup',
  },
  {
    $group: {
      _id: '$_id',
      itemsArray: { $push: '$items' },
      detail: { $first: '$$ROOT' },
    },
  },
  // {
  //   $sort: { _id: 1 },
  // },
  {
    $replaceRoot: {
      newRoot: { $mergeObjects: ['$detail', { items: '$itemsArray' }] },
    },
  },

  {
    $group: {
      _id: {
        $dateToString: {
          format: '%Y-%m-%d',
          // date: { $toDate: '$newDate' },
          date: '$createdAt',
        },
      },

      totalDocuments: { $sum: 1 },
      orders: {
        $push: '$$ROOT',
      },
    },
  },
];



export default orderAggregatePipeline;
