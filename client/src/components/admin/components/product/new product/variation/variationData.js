import ObjectID from 'bson-objectid';
import { v4 as uuidv4 } from 'uuid';

export const colorList = [
    'Red',
    'Yellow',
    'Blue',
    'Green',
    'Purple',
    'Orange',
    'Pink',
    'Brown',
    'Cyan',
    'Magenta',
];

export const sizeList = [
    'Small (S)',
    'Medium (M)',
    'Large (L)',
    'Extra Large (XL)',
    'Double Extra Large (XXL)',
];

export const defaultMap = new Map([
    [
        'Colour',
        {
            // id: 1,
            _id: uuidv4(),
            defaultVariations: colorList,
            disabled: false,
        },
    ],
    [
        'Size',
        {
            // id: 2
            _id: uuidv4(),
            defaultVariations: sizeList,
            disabled: false,
        },
    ],
]);

// defaultMap.set('Colour', {
//     id: 1,
//     defaultVariations: colorList,
//     disabled: false,
// });
// defaultMap.set('Size', { id: 2, defaultVariations: sizeList, disabled: false });

export const resetDefaultMap = () => {
    for (const item of defaultMap.entries()) {
        const [key, value] = item;
        let newObj = { ...value, disabled: false };

        defaultMap.set(key, newObj);
    }
};

export const updatedDefaultMap = (name, _id, boolean) => {
    if (defaultMap.has(name)) {
        const result = defaultMap.get(name);

        if (result._id == _id) {
            const newObj = { ...result, disabled: boolean };
            defaultMap.set(name, newObj);
        }
    }
};

export const generateVariation = (name, option) => {
    const categoryList = defaultMap.get(name);

    let arr = [];
    const listMap = new Map();
    if (categoryList) {
        const generatedList = categoryList.defaultVariations.map((item) => {
            const _id = uuidv4();
            option?.array
                ? arr.push({ variation: item, _id })
                : listMap.set(id, { variation: item, _id });
        });
    }

    return option?.array ? arr : listMap;
};

export const filteredVariation = (name, options) => {
    const newOptions = new Map(options);
    let generatedList = generateVariation(name, { array: true });
    ({ generatedList, options });

    const valueSet = new Set();
    for (const [key, value] of options.entries()) {
        valueSet.add(value.variation);

        // let newOptions = options.map(({ variation }) => variation);

        // let filterArr = generatedList.filter(
        //     (item) => !newOptions.includes(item.variation)
        // );
        // ({ filterArr });
        // return filterArr;
    }
    const newArr = generatedList.filter((item) => {
        if (!valueSet.has(item.variation)) {
            return true;
        } else {
            return false;
        }
    });

    return newArr;
};

export const generateCustomVariation = (text) => {
    const customVariation = {
        variation: text,
        _id: ObjectID().toString(),
        type: 'custom',
    };

    return customVariation;
};
export const getValuesFromMap = (options) => {
    const arr = [];
    for (const value of options.values()) {
        arr.push(value);
    }
    return arr;
    // setVariationOptions(arr);
};
