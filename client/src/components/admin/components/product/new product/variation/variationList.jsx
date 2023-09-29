import { useVariation } from '../../../../../../context/variationContext';
import { useState } from 'react';
import Switch from './switch';
import Table from './table/table.jsx';
function VariationList({}) {
    const { variations } = useVariation();

    debugger
    return (
        <section className="mt-12 flex basis-full flex-col">
            <section className="flex w-full flex-row justify-between">
                <div className="flex flex-col">
                    <h3 className="text-lg font-semibold tracking-wide">
                        {variations[0].name}
                    </h3>
                    <p>{`${variations.length} ${
                        variations.length > 1 ? 'variants' : 'variant'
                    }`}</p>
                </div>
                <span className="flex-no-wrap flex flex-row items-center gap-x-3 py-2">
                    <p>{1} selected</p>
                    <button type="button" className="theme-btn">
                        Update price
                    </button>
                    <button type="button" className="theme-btn">
                        Update Quantity
                    </button>
                </span>
            </section>
            <Table variations={variations}/>
        </section>
    );
}

export default VariationList;
