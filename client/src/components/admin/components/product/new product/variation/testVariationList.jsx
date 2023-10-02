import { useVariation } from '../../../../../../context/variationContext';
import { useState } from 'react';
import Switch from './toggleSwitch/switch';
import Table from './table/table.jsx';
import SingleVariation from './singleVariation';
function TestVariationList({}) {
    const { variations, dispatch, setCheck } = useVariation();
    const { selected } = useVariation();

    const handleUpdate = (category) => {
        setCheck(true);
        dispatch({ type: 'update', category: category });
    };

    function SingleList({ variation }) {
        const { name, options } = variation;
        
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
                    )}
                </section>
                <Table variationList={variation} />
            </section>
        );
    }
    return (
        <>
            {variations.length > 0 &&
                variations.map((variation) => {
                    return (
                        <>
                            <SingleList variation={variation} />
                        </>
                    );
                })}
        </>
    );
}
export default TestVariationList;
