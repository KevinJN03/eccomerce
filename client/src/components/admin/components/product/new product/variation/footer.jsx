import { useNewProduct } from '../../../../../../context/newProductContext';
import { convertToRaw } from 'draft-js';

import { adminAxios } from '../../../../../../api/axios';
import { useEffect, useState, useRef } from 'react';
import formatFormData from '../utils/formatFormData';
import { useParams } from 'react-router-dom';

function Footer({ type }) {
    const { id } = useParams();
    const {
        description,
        title,
        variations,
        files,
        category,
        gender,
        profile,
        publishErrorDispatch,
        publishError,
        priceValue,
        stockValue,
        publish,
        combine,
        setPublish,
        isAllInputValid,
        minVariationPrice,
    } = useNewProduct();
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        
        publishErrorDispatch({ type: 'getValidateInput', isAllInputValid });
    }, [publish]);

    const publishProduct = (e) => {
        e.preventDefault();

        setPublish((prevState) => ({
            ...prevState,
            firstAttempt: true,
            value: true,
        }));
        try {
            setLoading(() => true);
            const timeout = setTimeout(() => {
                const value = {
                    combine,
                    description,
                    title,
                    variations,
                    files,
                    category,
                    gender,
                    profile,
                    priceValue,
                    stockValue,
                    publishError,
                    publishErrorDispatch,
                    isAllInputValid,
                    minVariationPrice,
                };
                const formData = formatFormData(value);
                publishData(formData);
            }, 1000);

            
            if (publishError?.size > 0) {
                
                clearTimeout(timeout);
                setLoading(() => false);
            }
        } catch (error) {
            
        }
    };

    async function publishData(formData) {
        const url =
            type == 'update' ? `/product/${type}/${id}` : '/product/create';

        try {
            await adminAxios({
                method: type == 'update' ? 'put' : 'post',
                url: url,
                data: formData,
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            setLoading(() => false);
        } catch (error) {
            setLoading(() => false);

            const errorData = error.response.data;
            
            errorData?.[0]?.type == 'field'
                ? publishErrorDispatch({ type: 'set', data: errorData })
                : publishErrorDispatch({
                      type: 'default',
                      data: errorData,
                  });
        }
    }

    return (
        <div className="new-product-footer flex gap-2 p-6 font-medium">
            <button
                className="cancel-btn"
                onClick={() => navigate('/admin/products')}
            >
                Cancel
            </button>
            <button className="theme-btn ml-auto">Preview</button>
            <button className="theme-btn">Save as draft</button>
            <button
                className={`theme-btn  flex w-fit items-center justify-center bg-black`}
                disabled={publishError?.size > 0}
                onClick={publishProduct}
            >
                {!loading && (
                    <span className="whitespace-nowrap text-white">
                        {type == 'update' ? 'Publish Changes' : 'Publish'}
                    </span>
                )}
                {loading && (
                    <div className="w-full">
                        <div className="spinner-dot-pulse spinner-sm [--spinner-color:var(--white)]">
                            <div className="spinner-pulse-dot "></div>
                        </div>
                    </div>
                )}
            </button>
        </div>
    );
}
export default Footer;
