import { convertToRaw } from 'draft-js';

import { useNewProduct } from '../../../../../../context/newProductContext';
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
    } = value;

    const filteredFiles = files
        .filter((item) => item.isDragDisabled == false)
        .map((item) => item.file);

    const { blocks } = convertToRaw(description.getCurrentContent());
    const mappedBlocks = blocks.map(
        (block) => (!block.text.trim() && '\n') || block.text
    );
    // if block type is unordered list, make it into an individual list
    // else connect blocks

    mappedBlocks.reduce((acc, block) => {
        let returned = acc;
        if (block === '\n') returned += block;
        else returned += `${block}\n`;
        return returned;
    }, '');

    // TriggerGlobalUpdate_Dispatch('trigger');
    const formData = new FormData();

    for (const item of filteredFiles) {
        formData.append('files', item);
    }
    for (const { _id } of profile) {
        formData.append('delivery[]', _id);
    }

    for (const item of mappedBlocks) {
        formData.append('detail[]', item);
    }
    // for (const item of variations) {
    //     formData.append('variations[]', JSON.stringify(item));
    // }

    for (const item of [...variations]) {
        const { options } = item;
        let arr = Array.from(options.entries());
        const newObj = { ...item, options: arr };
        const stringObj = JSON.stringify(newObj);
        formData.append('variations[]', JSON.stringify(newObj));

        formData.append('title', title), formData.append('category', category);
        formData.append('gender', gender);

        formData.append('price', priceValue);
        formData.append('stock', stockValue);
    }

    return formData;
}
