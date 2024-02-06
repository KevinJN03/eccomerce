import { useNewProduct } from '../../../../../../context/newProductContext';
import { convertToRaw } from 'draft-js';

import { adminAxios } from '../../../../../../api/axios';
import { useEffect, useState, useRef } from 'react';
import formatFormData from '../utils/formatFormData';
import { useNavigate, useParams } from 'react-router-dom';
import { useAdminContext } from '../../../../../../context/adminContext';
import CancelButton from '../../../../../buttons/cancelButton';

function Footer({ type }) {
    const { id } = useParams();
    const navigate = useNavigate();

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
        product,
    } = useNewProduct();
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        publishErrorDispatch({ type: 'getValidateInput', isAllInputValid });
    }, [publish]);

    const publishProduct = (e, draft = false) => {
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
                publishData(formData, draft);
            }, 1000);

            if (publishError?.size > 0) {
                clearTimeout(timeout);
                setLoading(() => false);
            }
        } catch (error) {}
    };

    async function publishData(formData, draft) {
        const url = draft
            ? '/draftProducts/save'
            : type == 'update'
              ? `/product/${type}/${id}`
              : '/product/create';

        try {
            await adminAxios({
                method: draft ? 'post' : type == 'update' ? 'put' : 'post',
                url: url,
                data: formData,
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            setLoading(() => false);

            navigate('/admin/products');
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
        <div className="sticky bottom-0 flex w-full max-w-full gap-2 border-t border-dark-gray/50 bg-white px-6 py-4 font-medium">
        

            <CancelButton handleClick={() => navigate('/admin/products')} />
            <button className="theme-btn ml-auto !text-sm">Preview</button>
            <button
                className="theme-btn !text-sm"
                onClick={(e) => publishProduct(e, true)}
            >
                Save as draft
            </button>
            <button
                className={`theme-btn  flex w-fit items-center justify-center bg-black`}
                disabled={publishError?.size > 0}
                onClick={(e) => publishProduct(e, false)}
            >
                {!loading && (
                    <p className="whitespace-nowrap text-sm text-white">
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
