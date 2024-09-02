import { AnimatePresence, motion } from 'framer-motion';
import variant from '../../order/home/variant';
import { Link, useNavigate } from 'react-router-dom';
import { ClickAwayListener } from '@mui/material';
import { useState } from 'react';
import { useContent } from '../../../../context/ContentContext';
import { useListingPageContext } from '../../../../context/listingPageContext';

function Actions({ showAction, setShowAction, className, product }) {
    const { setModalCheck, setModalContent } = useContent();

    const { handleClick, text } = useListingPageContext();

    const closeAction = () => {
        setShowAction(() => false);
    };

    return (
        <AnimatePresence>
            {showAction && (
                <ClickAwayListener onClickAway={closeAction}>
                    <motion.div
                        variants={variant}
                        animate={'animate'}
                        initial={'initial'}
                        exit={'exit'}
                        className={` ${
                            className || ''
                        } absolute right-0 top-full z-10  rounded border border-gray-300 bg-white py-2`}
                    >
                        {' '}
                        {product?.status == 'active' && (
                            <div className="w-full border-b border-gray-300 pb-2">
                                <Link
                                    onClick={closeAction}
                                    to={`/product/${product?._id}`}
                                    target="_blank"
                                >
                                    <p className="!w-full !min-w-full cursor-pointer whitespace-nowrap py-2  pl-4 text-s hover:bg-light-grey/50">
                                        View on glamo
                                    </p>
                                </Link>

                                <p className="cursor-pointer whitespace-nowrap py-2 pl-4 text-s hover:bg-light-grey/50">
                                    View stats
                                </p>
                            </div>
                        )}
                        <div className="border-b border-gray-300 py-2">
                            <Link
                                onClick={closeAction}
                                to={`edit/${product._id}`}
                            >
                                <p className="cursor-pointer whitespace-nowrap py-2 pl-4 hover:bg-light-grey/50">
                                    Edit
                                </p>
                            </Link>

                            <Link
                                onClick={closeAction}
                                to={`copy/${product?._id}`}
                                target="_blank"
                            >
                                <p className="cursor-pointer whitespace-nowrap py-2 pl-4 hover:bg-light-grey/50">
                                    Copy
                                </p>
                            </Link>

                            <button
                                onClick={() => {
                                    handleClick({
                                        productIds: [product?._id],
                                        type: text[
                                            product?.status
                                        ].toLowerCase(),
                                    });
                                    closeAction();
                                }}
                                className="w-full cursor-pointer py-2 pl-4 text-left hover:bg-light-grey/50"
                            >
                                <p>{text[product?.status]}</p>
                            </button>
                        </div>
                        <div className="border-b border-gray-300 py-2">
                            <p
                                onClick={() => {
                                    handleClick({
                                        productIds: [product?._id],
                                        type: 'change_section',
                                    });
                                    closeAction();
                                }}
                                className="cursor-pointer whitespace-nowrap py-2 pl-4 pr-14 hover:bg-light-grey/50"
                            >
                                Change Section
                            </p>
                        </div>
                        <p
                            onClick={() => {
                                handleClick({
                                    type: 'delete',
                                    productIds: [product?._id],
                                });
                                closeAction();
                            }}
                            className="mt-2 cursor-pointer whitespace-nowrap py-2 pl-4 hover:bg-light-grey/50"
                        >
                            Delete
                        </p>
                    </motion.div>
                </ClickAwayListener>
            )}
        </AnimatePresence>
    );
}

export default Actions;
