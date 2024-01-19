import { useNewProduct } from '../../../../../../context/newProductContext';
import { convertToRaw } from 'draft-js';

import { adminAxios } from '../../../../../../api/axios';
import { useEffect, useState, useRef } from 'react';
import formatFormData from '../utils/formatFormData';
import { useNavigate, useParams } from 'react-router-dom';
import { useAdminContext } from '../../../../../../context/adminContext';

function Footer({ type }) {
    const { id } = useParams();
const navigate = useNavigate()
    const { setAllProducts } = useAdminContext();
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
        } catch (error) {}
    };

    async function publishData(formData) {
        const url =
            type == 'update' ? `/product/${type}/${id}` : '/product/create';

        try {
            const { data } = await adminAxios({
                method: type == 'update' ? 'put' : 'post',
                url: url,
                data: formData,
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            setAllProducts(()=> data)
            setLoading(() => false);

            navigate('/admin/products')
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
        <div className="max-w-full w-full flex gap-2 px-6 py-4 font-medium sticky bottom-0 bg-white border-t border-dark-gray/50">
            <button
                className="cancel-btn"
                onClick={() => navigate('/admin/products')}
            >
                Cancel
            </button>
            <button className="theme-btn ml-auto !text-sm">Preview</button>
            <button className="theme-btn !text-sm">Save as draft</button>
            <button
                className={`theme-btn  flex w-fit items-center justify-center bg-black`}
                disabled={publishError?.size > 0}
                onClick={publishProduct}
            >
                {!loading && (
                    <p className="whitespace-nowrap text-white text-sm">
                        {type == 'update'
                            ? 'Publish Changes'
                            : type == 'copy'
                              ? 'Copy'
                              : 'Publish'}
                    </p>
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
