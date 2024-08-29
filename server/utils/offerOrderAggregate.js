const offerOrderAggregate = ({ new_end_date, new_start_date, offer_type }) => {
  const foreignField = `transaction_cost.offer.${offer_type}.offer_id`;

  return [
    {
      $lookup: {
        from: 'orders',
        localField: '_id',
        foreignField,
        let: { offer_id: '$_id' },
        pipeline: [
          {
            $match: {
              createdAt: {
                $lte: new_end_date,
                $gte: new_start_date,
              },
            },
          },
          {
            $group: {
              _id: 'offer_revenue',
              revenue: { $sum: '$transaction_cost.total' },
              uses: { $sum: 1 },
            },
          },
        ],
        as: 'orders',
      },
    },

    {
      $addFields: {
        orders: {
          $cond: {
            if: {
              $gte: [{ $size: '$orders' }, 1],
            },
            then: { $arrayElemAt: ['$orders', 0] },
            else: { revenue: 0, uses: 0 },
          },
        },
      },
    },
  ];
};

export default offerOrderAggregate;
