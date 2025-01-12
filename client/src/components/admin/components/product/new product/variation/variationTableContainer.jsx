import { Fragment, useEffect, useState } from 'react';
import Table from './table/table';
import { motion, AnimatePresence, easeIn, easeOut } from 'framer-motion';
import { useVariation } from '../../../../../../context/variationContext';

import { v4 as uuidv4 } from 'uuid';
import { useNewProduct } from '../../../../../../context/newProductContext';
import TableProvider from '../../../../../../context/tableContext';
import { Box, Modal } from '@mui/material';
import Update from './update';
import _ from 'lodash';
function VariationTableContainer({ variation, isCombine }) {
    const { name, options, priceHeader, quantityHeader } = variation;

    const [checkSet, setCheckSet] = useState(new Set());

    const [modalOpen, setModalOpen] = useState(false);
    const [modalProps, setModalProps] = useState({});
    const [showAllVariants, setShowAllVariants] = useState(false);

    const determineLayout = () => {
        if (isCombine) {
            return 'combine';
        }
        if (variation.priceHeader.on && variation.quantityHeader.on) {
            return 'bothHeader';
        } else if (variation.priceHeader.on || variation.quantityHeader.on) {
            return 'oneHeader';
        } else if (!variation.priceHeader.on && !variation.quantityHeader.on) {
            return 'noHeader';
        }
    };
    const handleUpdate = (props) => {
        setModalProps(() => props);
        setModalOpen(() => true);
    };

    const layout = determineLayout();
    const variants = {
        initial: {
            opacity: 0,
        },
        animate: {
            opacity: 1,
            transition: { duration: 0.6, ease: easeIn },
        },
        exit: {
            opacity: 0,
            transition: { duration: 0.1, ease: easeOut, opacity: { delay: 0 } },
        },
    };

    const value = {
        checkSet,
        setCheckSet,

        variationList: variation,
        isQuantityHeaderOn: variation.quantityHeader.on,
        isPriceHeaderOn: variation.priceHeader.on,
        isCombine,
        layout,
        showAllVariants,
        setShowAllVariants,
    };
    return (
        <TableProvider value={value}>
            <section
                className="mt-12 flex basis-full flex-col"
                key={`section-${variation._id}`}
            >
                <section className="flex w-full flex-row justify-between">
                    <div className="flex flex-col">
                        <h3 className="text-lg font-semibold tracking-wide">
                            {name}
                        </h3>
                        <p>{`${options?.size || options?.length} ${
                            options?.size || options?.length > 1
                                ? 'variants'
                                : 'variant'
                        }`}</p>
                    </div>
                    <AnimatePresence>
                        {checkSet.size > 0 && (
                            <motion.div
                                className="flex-no-wrap variations-center flex flex-row gap-x-3 py-2"
                                variants={variants}
                                initial="initial"
                                animate="animate"
                                exit="exit"
                            >
                                <p className="self-center">
                                    <motion.span
                                        // key={checkSet.size}
                                        // initial={{ opacity: 0 }}
                                        // animate={{ opacity: 1 }}
                                        className="self-center"
                                    >
                                        {checkSet.size}
                                    </motion.span>
                                    {` selected`}
                                </p>
                                {[
                                    {
                                        category: 'price',
                                        on: priceHeader.on,
                                        fixedNum: 2,
                                        title: 'price',
                                        enablePoundSign: true,
                                    },
                                    {
                                        category: 'stock',
                                        on: quantityHeader.on,
                                        fixedNum: 0,
                                        title: 'quantity',
                                        enablePoundSign: false,
                                    },
                                ].map((props) => {
                                    const { on, category, title } = props;
                                    return (
                                        <Fragment key={category}>
                                            {on && (
                                                <button
                                                    type="button"
                                                    className="theme-btn"
                                                    onClick={() =>
                                                        handleUpdate(props)
                                                    }
                                                >
                                                    Update {_.upperFirst(title)}
                                                </button>
                                            )}
                                        </Fragment>
                                    );
                                })}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </section>
                <Table key={variation._id} />
                <Modal
                    open={modalOpen}
                    onClose={() => setModalOpen(() => false)}
                >
                    <Box
                        sx={{
                            backgroundColor: 'white',
                            // maxWidth: '500px',
                            position: 'absolute',
                            top: '50%',
                            left: '50%',

                            transform: 'translate(-50%, -50%)',
                            maxWidth: '600px',
                            width: '100%',

                            borderRadius: '2rem',
                            display: 'flex',
                            justifyContent: 'center',
                            padding: '1.6rem',

                            border: 'none',
                        }}
                    >
                        <Update
                            closeModal={() => setModalOpen(() => false)}
                            {...modalProps}
                        />
                    </Box>
                </Modal>
            </section>
        </TableProvider>
    );
}

export default VariationTableContainer;
