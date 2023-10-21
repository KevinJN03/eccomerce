import { useNewProduct } from '../../../../../../context/newProductContext';
import { convertToRaw } from 'draft-js';

import { adminAxios } from '../../../../../../api/axios';
import { useEffect, useState } from 'react';
import formatFormData from '../utils/formatFormData';

function Footer({}) {
    const [publish, setPublish] = useState(false);

    const {
        description,
        title,
        variations,
        files,
        category,
        gender,
        profile,
        publishErrorDispatch,
        priceValue,
        stockValue,
        triggerGlobalUpdate,
        TriggerGlobalUpdate_Dispatch,
    } = useNewProduct();

    const publishProduct = () => {
        setPublish(true);
        setTimeout(() => {
            const value = {
                description,
                title,
                variations,
                files,
                category,
                gender,
                profile,
                priceValue,
                stockValue,
            };
            const formData = formatFormData(value);
            publishData(formData);
            setPublish(false);
        }, 2000);

        // }, 0)
    };

    async function publishData(formData) {
        try {
            await adminAxios({
                method: 'post',
                url: '/product/create',
                data: formData,
                headers: { 'Content-Type': 'multipart/form-data' },
            });
        } catch (error) {
            const errorData = error.response.data;
            console.log('error', errorData);
            
           
            publishErrorDispatch({ type: 'set', data: errorData });
        }
    }

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
            <button
                className="theme-btn  flex w-24 items-center justify-center bg-black"
                onClick={publishProduct}
            >
                {!publish && <span className="text-white">Publish</span>}
                {publish && (
                    <>
                        <div className="spinner-dot-pulse spinner-sm [--spinner-color:var(--white)]">
                            <div className="spinner-pulse-dot "></div>
                        </div>
                    </>
                )}
            </button>
        </div>
    );
}
export default Footer;
