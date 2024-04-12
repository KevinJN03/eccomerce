import _ from 'lodash';
function variationFormat({ products }) {
  return Array.from(products).map(({ variationList, ...remainingProps }) => {
    const newProps = _.cloneDeep(remainingProps);
    for (let i = 0; i < variationList?.length; i++) {
      console.log({ variationList });
      if (i < 2) {
        _.set(
          newProps,
          ['variation_data', `variation${i + 1}_data`],
          variationList[i],
        );

        _.set(newProps, ['variation_data', `variation${i + 1}_present`], true);
      } else {
        const combineVariation = {};

        variationList[i].array.forEach(
          ({ variation, variation2, ...newProps }) => {
            if (!combineVariation.hasOwnProperty(variation)) {
              combineVariation[variation] = {};
            }

            // combineVariation[variation][variation2] = newProps;

            _.set(combineVariation, [variation, variation2], newProps);
          },
        );

        newProps.combineVariation = combineVariation;

        _.set(
          newProps,
          ['variation_data', 'combineVariation'],
          combineVariation,
        );
        _.set(newProps, ['variation_data', 'isVariationCombine'], true);
      }
    }

    return newProps;
  });
}

export default variationFormat;
