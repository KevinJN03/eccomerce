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

export const generateVariation = (list) => {
    const generatedList = list.map((item) => {
        return { variation: item, id: uuidv4() };
    });
    return generatedList;
};

export const generateCustomVariation = (text) => {
    const customVariation = {
        variation: text,
        id: uuidv4(),
        type: 'custom',
    };

    return customVariation;
};
