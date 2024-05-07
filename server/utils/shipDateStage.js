const shipDateStage = {
    $addFields: {
      ship_date: {
        $max: {
          $map: {
            input: '$itemsByProfile',
            as: 'profile',
            in: {
              $dateAdd: {
                startDate: '$createdAt',
                unit: {
                  $substrBytes: [
                    '$$profile.shippingInfo.processing_time.type',
                    0,
                    {
                      $subtract: [
                        {
                          $strLenCP:
                            '$$profile.shippingInfo.processing_time.type',
                        },
                        1,
                      ],
                    },
                  ],
                },
                amount: '$$profile.shippingInfo.processing_time.end',
              },
            },
          },
        },
      },
    },
  };

  export default shipDateStage