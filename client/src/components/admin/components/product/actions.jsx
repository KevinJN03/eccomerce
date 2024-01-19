import { AnimatePresence, motion } from 'framer-motion';
import variant from '../../order/home/variant';
import { Link, useNavigate } from 'react-router-dom';
import { ClickAwayListener } from '@mui/material';
import { useState } from 'react';
import { useContent } from '../../../../context/ContentContext';
import { useListingPageContext } from '../../../../context/listingPageContext';

function Actions({ showAction, setShowAction, className, product }) {
    const navigate = useNavigate();
    const { setModalCheck, setModalContent } = useContent();
    const changeSection = () => {
        setModalContent(() => ({ type: 'changeSection' }));
        setModalCheck(() => true);
        setShowAction(() => false);
    };
    const handleDelete = () => {
        setModalContent(() => ({ type: 'delete', ids: [product._id] }));
        setModalCheck(() => true);
        setShowAction(() => false);
    };

    const { checks } = useListingPageContext();

    return (
        <AnimatePresence>
            {showAction && (
                <ClickAwayListener
                    onClickAway={() => setShowAction(() => false)}
                >
                    <motion.div
                        variants={variant}
                        animate={'animate'}
                        initial={'initial'}
                        exit={'exit'}
                        className={` ${
                            className || ''
                        } absolute bottom-0 right-0 z-10  rounded border border-dark-gray/50 bg-white py-2`}
                    >
                        {' '}
                        {product?.status == 'active' && (
                            <div className="w-full border-b border-dark-gray/50 pb-2">
                                <Link
                                    to={`/product/${product?._id}`}
                                    target="_blank"
                                    onClick={() => setShowAction()}
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
                        <div className="border-b border-dark-gray/50 py-2">
                            <Link
                                to={`edit/${product._id}${
                                    checks?.listing_status == 'draft'
                                        ? '?draft=true'
                                        : ''
                                }`}
                            >
                                <p className="cursor-pointer whitespace-nowrap py-2 pl-4 hover:bg-light-grey/50">
                                    Edit
                                </p>
                            </Link>

                            <Link
                                to={`copy/${product?._id}${
                                    checks?.listing_status == 'draft'
                                        ? '?draft=true'
                                        : ''
                                }`}
                                target="_blank"
                            >
                                <p className="cursor-pointer whitespace-nowrap py-2 pl-4 hover:bg-light-grey/50">
                                    Copy
                                </p>
                            </Link>
                        </div>
                        <div className="border-b border-dark-gray/50 py-2">
                            <p
                                onClick={changeSection}
                                className="cursor-pointer whitespace-nowrap py-2 pl-4 hover:bg-light-grey/50 pr-14"
                            >
                                Change Section
                            </p>
                        </div>
                        <p
                            onClick={handleDelete}
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
