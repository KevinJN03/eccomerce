/* eslint-disable no-restricted-syntax */
function sortCombineVariation(options) {
  let minPriceValue = Infinity;
  console.log('im in here');

  const variationObj = {};
  const map = new Map();
  const variation2Map = new Map();
  const variation1 = {
    array: [],
  };
  const variation2 = {
    array: [],
  };
  for (const [key, value] of options) {
    minPriceValue = Math.min(value.price, minPriceValue);

    if (!variation2Map.has(value.variation2)) {
      const newObj = {
        variation: value.variation2,
        id: key,
      };
      variation2.array.push(newObj);
      variation2Map.set(value.variation2, newObj);
    }

    if (!map.has(value.variation)) {
      variation1.array.push({ variation: value.variation, id: key });

      const newVariationObj = {
        [value.variation2]: {
          id: value.id,
          stock: value.stock,
          price: value.price,
          visible: value.visible,
        },
      };

      variationObj[value.variation] = newVariationObj;
      map.set(value.variation, newVariationObj);
    } else {
      const getItemFromMap = map.get(value.variation);

      const newVariationObj = {
        [value.variation2]: {
          id: value.id,
          stock: value.stock,
          price: value.price,
          visible: value.visible,
        },
      };
      const updatedVariationObject = Object.assign(
        getItemFromMap,
        newVariationObj,
      );
      map.set(value.variation, updatedVariationObject);
    }
  }

  //   newData.price.current = minPriceValue;

  //   newData.combineVariation = variationObj;
  //   newData.testObj = testObj;

  return { variationObj, minPriceValue, variation1, variation2 };
}

export default sortCombineVariation;
