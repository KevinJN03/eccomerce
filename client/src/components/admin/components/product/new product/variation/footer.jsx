import { useNewProduct } from '../../../../../../context/newProductContext';
import { convertToRaw } from 'draft-js';

import { adminAxios } from '../../../../../../api/axios.js';
import { useEffect, useState, useRef } from 'react';
import formatFormData from '../utils/formatFormData';
import { useNavigate, useParams } from 'react-router-dom';
import { useAdminContext } from '../../../../../../context/adminContext';
import BubbleButton from '../../../../../buttons/bubbleButton';
import _ from 'lodash';
import { Box, Modal } from '@mui/material';
import BoxWithProps, {
    CloseModalButton,
} from '../../../../../common/BoxwithProps.jsx';

function Footer({ type }) {
    const { id } = useParams();
    const navigate = useNavigate();
    const abortControllerRef = useRef(new AbortController());
    const combineRef = useRef();
    const variationsRef = useRef();
    const [loading, setLoading] = useState({
        preview: false,
        draft: false,
        publish: false,
    }); // state to change which button to display loading animation
    const [modalCheck, setModalCheck] = useState(false);
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
        combine,
        setPublish,
        minVariationPrice,
    } = useNewProduct();

    useEffect(() => {
        combineRef.current = combine;
    }, [combine]);
    useEffect(() => {
        variationsRef.current = variations;
    }, [variations]);

    useEffect(() => {
        return () => {
            abortControllerRef.current?.abort();
        };
    }, []);

    //async function publishData(formData, draft) {
    async function publishData(formData, draft = false) {
        abortControllerRef.current?.abort();
        abortControllerRef.current = new AbortController();

        const url =
            draft == true
                ? '/product/create?isDraft=true'
                : type == 'update'
                  ? `/product/${type}/${id}`
                  : '/product/create';
        try {
            await adminAxios({
                method: draft ? 'post' : type == 'update' ? 'put' : 'post',
                url: url,
                data: formData,
                headers: { 'Content-Type': 'multipart/form-data' },
                signal: abortControllerRef.current.signal,
            });

            navigate('/admin/products');
        } catch (error) {
            const errorData = error.response.data;
            if (error.response.status == 500) {
                publishErrorDispatch({
                    type: 'default',
                    data: errorData,
                });

                return;
            }
            publishErrorDispatch({
                type: 'SET',
                data: errorData,
            });
        } finally {
            setLoading(() => ({}));
        }
    }

    // const publishProduct = (e, draft = false) => {
    const publishProduct = (draft = false) => {
        //debugger;

        if (!_.isEmpty(publishError)) {
            // clearTimeout(timeout);
            abortControllerRef.current.abort();
            setLoading(() => ({}));

            return;
        }
        // setPublish((prevState) => ({
        //     ...prevState,
        //     firstAttempt: true,
        //     value: true,
        // }));
        try {
            // const timeout = setTimeout(() => {
            const value = {
                combine: combineRef.current,
                description,
                title,
                variations: variationsRef.current,
                files,
                category,
                gender,
                profile,
                priceValue,
                stockValue,
                minVariationPrice,
            };
            const formData = formatFormData(value); // generate format to send data to backend
            // publishData(formData, draft);
            publishData(formData, draft);
            // }, 1000);

            // cancel operation if there is an error
        } catch (error) {
            debugger;
            setLoading(() => ({}));
        }
    };

    const publishPreview = (e) => {
        setLoading(() => ({ preview: true }));
        setModalCheck(() => true);
    };
    const publishDraft = (e) => {
        e.preventDefault();
        setLoading(() => ({ draft: true }));

        publishProduct(true);
    };

    const publishCreate = (e) => {
        e.preventDefault();
        setLoading(() => ({ publish: true }));

        publishProduct();
    };
    const handleClose = () => {
        setModalCheck(() => false);
        setLoading(() => ({ preview: false }));
    };
    return (
        <div className="sticky bottom-0 z-[3] flex w-full max-w-full justify-between gap-2 border-t border-dark-gray/50 bg-white px-6 py-4 font-medium">
            <BubbleButton handleClick={() => navigate('/admin/products')} />
            <section className="flex gap-2 ">
                {[
                    {
                        text: 'Preview',
                        type: 'preview',

                        buttonClick: publishPreview,
                    },
                    {
                        text: 'Save as draft',
                        type: 'draft',
                        buttonClick: publishDraft,
                    },
                    {
                        type: 'publish',
                        text:
                            type == 'update'
                                ? 'Publish Changes'
                                : type == 'copy'
                                  ? 'Copy'
                                  : 'Publish',
                        buttonClick: publishCreate,
                        className: `bg-black`, // additional classes for publish button
                        pClassName: 'text-white', // p element class
                    },
                ].map(({ text, buttonClick, type, className, pClassName }) => {
                    return (
                        <button
                            key={type}
                            className={`theme-btn w-full !text-sm ${className || ''}`}
                            onClick={buttonClick}
                            disabled={!_.isEmpty(publishError)}
                        >
                            {!loading?.[type] ? (
                                <p
                                    className={`whitespace-nowrap text-sm ${pClassName || ''}`}
                                >
                                    {text}
                                </p>
                            ) : (
                                <div
                                    className={`spinner-dot-pulse ![--spinner-color:var(--${type == 'publish' ? 'white' : 'black'})] spinner-sm`}
                                >
                                    <div className="spinner-pulse-dot"></div>
                                </div>
                            )}
                        </button>
                    );
                })}
            </section>
            {/* <button className="theme-btn ml-auto !text-sm">Preview</button>
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
                        <div className="spinner-dot-pulse spinner-sm ![--spinner-color:var(--white)]">
                            <div className="spinner-pulse-dot "></div>
                        </div>
                    </div>
                )}
            </button> */}

            <Modal open={modalCheck} onClose={handleClose}>
                <BoxWithProps
                    customSx={{
                        top: '5%',
                        left: '50%',

                        transform: 'translate(-50%, -0%)',
                        backgroundColor: 'white',
                        padding: '2rem',
                        borderRadius: '1.8rem',
                        maxWidth: '60vw',
                    }}
                >
                    <CloseModalButton handleClick={handleClose} />
                    <section>
                        <h1>Listing preview</h1>
                    </section>
                </BoxWithProps>
            </Modal>
        </div>
    );
}
export default Footer;
