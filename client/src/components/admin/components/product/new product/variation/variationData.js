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

export const defaultMap = new Map();

defaultMap.set('Colour', {
    id: 1,
    defaultVariations: colorList,
    disabled: false,
});
defaultMap.set('Size', { id: 2, defaultVariations: sizeList, disabled: false });

export const resetDefaultMap = () => {
    for (const item of defaultMap.entries()) {
        const [key, value] = item;
        let newObj = { ...value, disabled: false };

        defaultMap.set(key, newObj);
    }
};

export const updatedDefaultMap = (name, id, boolean) => {
    if (defaultMap.has(name)) {
        const result = defaultMap.get(name);

        if (result.id == id) {
            const newObj = { ...result, disabled: boolean };
            defaultMap.set(name, newObj);
        }
    }
};

export const generateVariation = (name) => {
    const categoryList = defaultMap.get(name);

    if (categoryList) {
        const generatedList = categoryList.defaultVariations.map((item) => {
            return { variation: item, id: uuidv4() };
        });
        return generatedList;
    }

    return [];
};

export const filteredVariation = (name, options) => {
    let generatedList = generateVariation(name);
    console.log({ generatedList, options });
    if (generatedList.length > 0 && options.length > 0) {
        let newOptions = options.map(({ variation }) => variation);

        let filterArr = generatedList.filter(
            (item) => !newOptions.includes(item.variation)
        );
        console.log({ filterArr });
        return filterArr;
    } else {
        return [];
    }
};

export const generateCustomVariation = (text) => {
    const customVariation = {
        variation: text,
        id: uuidv4(),
        type: 'custom',
    };

    return customVariation;
};
