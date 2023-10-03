import { useEffect, useState } from 'react';
import Table from './table/table';
import { motion, AnimatePresence } from 'framer-motion';
function SingleList({ variation, handleUpdate, combine }) {
    const { name, options, priceHeader, quantityHeader } = variation;
    const [selected, setSelected] = useState([]);

    const [update, setUpdate] = useState({ price: null, stock: null });
    console.log('length', selected.length);
    console.log('selected', selected);

    return (
        <section className="mt-12 flex basis-full flex-col">
            <section className="flex w-full flex-row justify-between">
                <div className="flex flex-col">
                    <h3 className="text-lg font-semibold tracking-wide">
                        {name}
                    </h3>
                    <p>{`${options.length} ${
                        options.length > 1 ? 'variants' : 'variant'
                    }`}</p>
                </div>
                <AnimatePresence>
                    {selected.length > 0 && (
                        <motion.span
                            className="flex-no-wrap flex flex-row items-center gap-x-3 py-2"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            <motion.p
                                key={selected.length}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                            >
                                {`${selected.length} selected`}{' '}
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
                                            update
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
                                            update
                                        )
                                    }
                                >
                                    Update Quantity
                                </button>
                            )}
                        </motion.span>
                    )}
                </AnimatePresence>
            </section>
            <Table
                variationList={variation}
                setSelected={setSelected}
                selected={selected}
                update={update}
                combine={combine}
            />
        </section>
    );
}

export default SingleList;
