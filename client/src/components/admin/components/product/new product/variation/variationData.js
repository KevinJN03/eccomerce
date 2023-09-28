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

const list = { Colour: colorList, Size: sizeList };

export const generateVariation = (name) => {
    const catergoryList = list[`${name}`];

    if (catergoryList) {
        const generatedList = catergoryList.map((item) => {
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
        console.log('filter stage');
        let filterArr = generatedList.filter(
            (item) =>
                !options.some((item2) => item2.variation === item.variation)
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
