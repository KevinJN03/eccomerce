import { AnimatePresence, motion } from 'framer-motion';
import variant from '../../order/home/variant';
import { Link, useNavigate } from 'react-router-dom';
import { ClickAwayListener } from '@mui/material';
import { useState } from 'react';
import { useContent } from '../../../../context/ContentContext';

function Actions({ showAction, setShowAction, className, product }) {
    const navigate = useNavigate();
    const { setModalCheck, setModalContent } = useContent();
    const changeSection = () => {
        setModalContent(() => ({ type: 'changeSection' }));
        setModalCheck(() => true);
        setShowAction(() => false);
    };
    const handleDelete = () => {
        setModalContent(() => ({ type: 'delete', ids: [product._id]}));
        setModalCheck(() => true);
        setShowAction(() => false);
    };

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
                        <div className="border-b border-dark-gray/50 pb-2 ">
                            <p className="cursor-pointer whitespace-nowrap py-2 pl-4 hover:bg-light-grey/50">
                                View on glamo
                            </p>
                            <p className="cursor-pointer whitespace-nowrap py-2 pl-4 pr-20 hover:bg-light-grey/50">
                                View stats
                            </p>
                        </div>
                        <div className="border-b border-dark-gray/50 py-2">
                            <p
                                onClick={() => navigate(`edit/${product._id}`)}
                                className="cursor-pointer whitespace-nowrap py-2 pl-4 hover:bg-light-grey/50"
                            >
                                Edit
                            </p>
                            <Link to={`copy/${product?._id}`} target="_blank">
                                <p className="cursor-pointer whitespace-nowrap py-2 pl-4 hover:bg-light-grey/50">
                                    Copy
                                </p>
                            </Link>
                        </div>

                        <div className="border-b border-dark-gray/50 py-2">
                            <p
                                onClick={changeSection}
                                className="cursor-pointer whitespace-nowrap py-2 pl-4 hover:bg-light-grey/50"
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
