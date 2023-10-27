import { useNewProduct } from '../../../../../../context/newProductContext';
import { convertToRaw } from 'draft-js';

import { adminAxios } from '../../../../../../api/axios';
import { useEffect, useState, useRef } from 'react';
import formatFormData from '../utils/formatFormData';

function Footer({}) {
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
    } = useNewProduct();

    const isAllInputValid = useRef(true);

    useEffect(() => {
        publishErrorDispatch({
            type: 'getValidateInput',
            isAllInputValid,
        });
    }, [publish]);
    const publishProduct = (e) => {
        e.preventDefault();
        try {
            setPublish((prevState) => ({
                ...prevState,
                firstAttempt: true,
                value: true,
            }));

            setTimeout(() => {
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
                };
                const formData = formatFormData(value);
                publishData(formData);
                setPublish((prevState) => {
                    return { ...prevState, value: false };
                });
            }, 2000);
        } catch (error) {
            console.log('error while publish: ', error);
        }
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

            // publishErrorDispatch({ type: 'set', data: errorData });
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
                className={`theme-btn  flex w-24 items-center justify-center bg-black`}
                disabled={publishError?.size > 0}
                onClick={publishProduct}
            >
                {!publish?.value && <span className="text-white">Publish</span>}
                {publish?.value && (
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
