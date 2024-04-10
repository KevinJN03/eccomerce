const text = { 0: 1, 1: 2 };
const variationSortAggregate = () => {
  return [
    // { $project: { productInfo: 1 } },

    {
      $addFields: {
        variationResult: {
          $reduce: {
            input: '$variationList',
            initialValue: {},
            in: {
              $let: {
                vars: {
                  currentIndex: { $indexOfArray: ['$variationList', '$$this'] },
                  currentVariation: '$$this',
                  variationNum: {
                    $add: [{ $indexOfArray: ['$variationList', '$$this'] }, 1],
                  },
                },
                in: {
                currentIndex: '$$currentIndex'
                },

                // $cond: {
                //   if: { $lt: ['$$currentIndex', 2] },
                //   then: {
                //     //    tester: '1',
                //     $mergeObjects: [
                //       '$$value',
                //       {
                //         currentIndex: '$$currentIndex',
                //       },
                //     ],
                //   },
                //   else: {
                //     tester: '1',
                //     //   $reduce: {
                //     //     input: '$$currentVariation.array',
                //     //     initialValue: {},
                //     //     in: {
                //     //       $mergeObjects: [
                //     //         '$$value',
                //     //         {
                //     //           combineVariation: {
                //     //             $mergeObjects: [
                //     //               '$$value.combineVariation',
                //     //               {
                //     //                 '$$this.variation': {
                //     //                   '$$this.variation2': '$$this',
                //     //                 },
                //     //               },
                //     //             ],
                //     //           },
                //     //         },
                //     //       ],
                //     //     },
                //     //   },
                //   },
                // },
              },
            },
          },
        },
      },
    },
    // {
    //   $addFields: {
    //     variationResult_data: {
    //       $reduce: {
    //         input: '$variationList',
    //         initialValue: {},
    //         in: {
    //           $let: {
    //             vars: {
    //               currentIndex: { $indexOfArray: ['$variationList', '$$this'] },
    //               currentVariation: '$$this',
    //             },
    //           },
    //         },
    //       },
    //     },
    //   },
    // },
  ];
};

export default variationSortAggregate;
