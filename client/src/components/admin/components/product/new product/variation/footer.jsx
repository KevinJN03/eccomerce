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
        priceValue, stockValue
    } = useNewProduct();
    const filteredFiles = files.filter((item) => item.isDragDisabled == false);
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
        stock: stockValue
    };

    const publish = async () => {
        console.log({values})
        try {
            const result = await adminAxios.post('/product/create', values);
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
