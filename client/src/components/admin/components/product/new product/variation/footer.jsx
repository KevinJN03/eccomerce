import { useNewProduct } from '../../../../../../context/newProductContext';
import { convertToRaw } from 'draft-js';

import { adminAxios } from '../../../../../../api/axios';
function Footer({}) {
    const {
        description,
        title,
        variations,
        files,
        category,
        gender,
        profile,
        setPublishError,
        priceValue,
        stockValue,
    } = useNewProduct();
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

    const values = {
        detail: mappedBlocks,
        title,
        variations,
        files: filteredFiles,
        category,
        gender,
        delivery: profile.map((item) => item._id),
        price: priceValue,
        stock: stockValue,
    };

    const publish = async () => {
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

        formData.append('variations', JSON.stringify(variations));
        formData.append('title', title), formData.append('category', category);
        formData.append('gender', gender);

        formData.append('price', priceValue);
        formData.append('stock', stockValue);

        try {
            console.log(values);
            await adminAxios({
                method: 'post',
                url: '/product/create',
                data: formData,
                headers: { 'Content-Type': 'multipart/form-data' },
            });
        } catch (error) {
            const errorData = error.response.data;
            console.log('error', errorData);
            setPublishError(errorData);
        }
    };
    return (
        <div className="new-product-footer flex gap-2 p-6 font-medium">
            <button
                className="border-none hover:bg-[var(--light-grey)]"
                onClick={() => navigate('/admin/products')}
            >
                Cancel
            </button>
            <button className="theme-btn ml-auto">Preview</button>
            <button className="theme-btn">Save as draft</button>
            <button className="theme-btn bg-black text-white" onClick={publish}>
                Publish
            </button>
        </div>
    );
}

export default Footer;
