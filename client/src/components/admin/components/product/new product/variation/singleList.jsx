import { useEffect, useState } from 'react';
import Table from './table/table';
import { motion, AnimatePresence, easeIn, easeOut } from 'framer-motion';
function SingleList({ variation, handleUpdate, isCombine, setCombine , combine, variationIndex }) {
    const { name, options, priceHeader, quantityHeader } = variation;
    const [selected, setSelected] = useState(new Map());

    const [update, setUpdate] = useState({
        price: null,
        stock: null,
        bool: false,
    });
    const [checkAll, setCheckAll] = useState(false);

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

    const layout = determineLayout();

    console.log('layout', layout);

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
            transition: { duration: 0.1, ease: easeOut, opacity: {delay: 0} },
        },
    };
    return (
        <section className="mt-12 flex basis-full flex-col">
            <section className="flex w-full flex-row justify-between">
                <div className="flex flex-col">
                    <h3 className="text-lg font-semibold tracking-wide">
                        {name}
                    </h3>
                    <p>{`${options.size || options.length} ${
                        options.size || options.length > 1 ? 'variants' : 'variant'
                    }`}</p>
                </div>
                <AnimatePresence>
                    {selected.size > 0 && (
                        <motion.div
                            className="flex-no-wrap variations-center flex flex-row gap-x-3 py-2"
                            variants={variants}
                            initial='initial'
                            animate='animate'
                            exit='exit'
                        >
                            <motion.p
                                key={selected.size}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="self-center"
                            >
                                {`${selected.size} selected`}{' '}
                            </motion.p>
                            {priceHeader.on && (
                                <button
                                    type="button"
                                    className="theme-btn"
                                    onClick={() =>
                                        handleUpdate(
                                            'price',
                                            selected,
                                            setUpdate,
                                            update,
                                            setCheckAll
                                        )
                                    }
                                >
                                    Update price
                                </button>
                            )}
                            {quantityHeader.on && (
                                <button
                                    type="button"
                                    className="theme-btn"
                                    onClick={() =>
                                        handleUpdate(
                                            'quantity',
                                            selected,
                                            setUpdate,
                                            update,
                                            setCheckAll
                                        )
                                    }
                                >
                                    Update Quantity
                                </button>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </section>
            <Table
            variationIndex ={variationIndex }
                variationList={variation}
                setSelected={setSelected}
                selected={selected}
                update={update}
                combine={combine}
                isCombine={isCombine}
                setCheckAll={setCheckAll}
                checkAll={checkAll}
                layout={layout}
                setCombine={setCombine}
            />
        </section>
    );
}

export default SingleList;
