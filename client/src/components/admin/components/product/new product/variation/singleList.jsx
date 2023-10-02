import { useState } from 'react';
import Table from './table/table';
function SingleList({ variation, handleUpdate }) {
    const { name, options, priceHeader, quantityHeader } = variation;
    const [selected, setSelected] = useState([]);

    const [update, setUpdate] = useState({ price: null, stock: null });

 
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
                {selected.length > 0 && (
                    <span className="flex-no-wrap flex flex-row items-center gap-x-3 py-2">
                        <p>{selected.length} selected</p>
                        {priceHeader.on && (
                            <button
                                type="button"
                                className="theme-btn"
                                onClick={() =>  handleUpdate('price', selected, setUpdate, update)}
                            >
                                Update price
                            </button>
                        )}
                        {quantityHeader.on && (
                            <button
                                type="button"
                                className="theme-btn"
                                onClick={() =>
                                    handleUpdate('quantity', selected, setUpdate, update)
                                }
                            >
                                Update Quantity
                            </button>
                        )}
                    </span>
                )}
            </section>
            <Table
                variationList={variation}
                setSelected={setSelected}
                selected={selected}
                update={update}
            />
        </section>
    );
}

export default SingleList;
