import { convertToRaw } from 'draft-js';
import _ from 'lodash';
export default function formatFormData(value) {
    const {
        description,
        title,
        variations,
        files,
        category,
        gender,
        profile,
        priceValue,
        stockValue,

        
        combine,
        minVariationPrice,
    } = value;

    const formData = new FormData();
    // formData.append('isAllInputValid', isAllInputValid.current);
    const filteredFiles = files
        .filter((item) => item.isDragDisabled == false)
        .map((item) => item.file);

    formData.append('title', title);
    formData.append('category', category);
    formData.append('gender', gender);
    formData.append('price', priceValue);
    formData.append('stock', stockValue);
    formData.append('minVariationPrice', minVariationPrice);
    formData.append('description', description);
    for (const item of filteredFiles) {
        formData.append('files', item);
    }
    formData.append('delivery', _.get(profile, '_id'));
    
    const newVariations = [...variations];

    if (combine.on) {
        const newCombine = { ...combine };

        delete newCombine.on;
        newVariations.push(newCombine);
    }
    for (const item of [...newVariations]) {
        const { options } = item;
        let arr = Array.from(options.entries());
        const newObj = { ...item, options: arr };
        const stringObj = JSON.stringify(newObj);
        formData.append('variations[]', JSON.stringify(newObj));
    }

    return formData;
}
