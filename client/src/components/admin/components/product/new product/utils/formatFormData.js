import { convertToRaw } from 'draft-js';
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
        publishErrorDispatch,
        isAllInputValid
    } = value;

    const formData = new FormData();

  

  console.log('isAllInputValid', isAllInputValid.current)
        formData.append('isAllInputValid', isAllInputValid.current);
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

        formData.append('title', title);
        formData.append('category', category);
        formData.append('gender', gender);

        variations.length > 0 &&
            formData.append('price', JSON.stringify(priceValue));

        variations.length > 0 &&
            formData.append('stock', JSON.stringify(stockValue));
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
        }

        return formData;



}
