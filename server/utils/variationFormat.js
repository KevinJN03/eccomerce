import _ from 'lodash';
function variationFormat({ products }) {
  return Array.from(products).map(({ variationList, ...Props }) => {
    if (_.get(Props, 'variation_data.isVariationCombine') == true) {
      const combineVariation = {};

      variationList[2].array.forEach(
        ({ variation, variation2, ...newProps }) => {
          // console.log({variation, variation2, newProps})
          if (!combineVariation.hasOwnProperty(variation)) {
            combineVariation[variation] = {};
          }

          // combineVariation[variation][variation2] = {newProps};

          _.set(combineVariation, [variation, variation2], {
            variation,
            variation2,
            ...newProps,
          });
        },
      );

      //Props.combineVariation = combineVariation;
      //console.log(combineVariation)
      _.set(Props, ['variation_data', 'combineVariation'], combineVariation);
    }
    // const newProps = _.cloneDeep(remainingProps);
    // console.log({ variation_data });
    // for (let i = 0; i < variationList?.length; i++) {
    //   if (i < 2) {
    //     _.set(
    //       newProps,
    //       ['variation_data', `variation${i + 1}_data`],
    //       variationList[i],
    //     );

    //     _.set(
    //       newProps,
    //       ['variation_data', `variation${i + 1}_present`],
    //       true,
    //     );
    //   } else {
    //     const combineVariation = {};

    //     variationList[i].array.forEach(
    //       ({ variation, variation2, ...newProps }) => {
    //         if (!combineVariation.hasOwnProperty(variation)) {
    //           combineVariation[variation] = {};
    //         }

    //         // combineVariation[variation][variation2] = newProps;

    //         _.set(combineVariation, [variation, variation2], newProps);
    //       },
    //     );

    //     newProps.combineVariation = combineVariation;

    //     _.set(
    //       newProps,
    //       ['variation_data', 'combineVariation'],
    //       combineVariation,
    //     );
    //     _.set(newProps, ['variation_data', 'isVariationCombine'], true);
    //   }
    // }

    return Props;
  });
}

export default variationFormat;
