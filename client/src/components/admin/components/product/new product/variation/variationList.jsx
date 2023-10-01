import { useVariation } from '../../../../../../context/variationContext';
import { useState } from 'react';
import Switch from './switch';
import Table from './table/table.jsx';
function VariationList({}) {
    const { variations, dispatch, setCheck } = useVariation();
    const { selected } = useVariation();

    const handleUpdate = (category) => {
        setCheck(true);
        dispatch({ type: 'update', category: category });
    };

    return (
        <>
            {variations.length > 0 && (
                <section className="mt-12 flex basis-full flex-col">
                    <section className="flex w-full flex-row justify-between">
                        <div className="flex flex-col">
                            <h3 className="text-lg font-semibold tracking-wide">
                                {variations.length <= 1 && variations[0].name}
                                {variations.length > 1 &&
                                    `${variations[0].name} and ${variations[1].name} `}
                            </h3>
                            <p>{`${variations.length} ${
                                variations.length > 1 ? 'variants' : 'variant'
                            }`}</p>
                        </div>
                        <span className="flex-no-wrap flex flex-row items-center gap-x-3 py-2">
                            <p>{selected.length} selected</p>
                            <button
                                type="button"
                                className="theme-btn"
                                onClick={() => handleUpdate('price')}
                            >
                                Update price
                            </button>
                            <button
                                type="button"
                                className="theme-btn"
                                onClick={() => handleUpdate('quantity')}
                            >
                                Update Quantity
                            </button>
                        </span>
                    </section>
                    <Table  />
                </section>
            )}
        </>
    );
}

export default VariationList;
