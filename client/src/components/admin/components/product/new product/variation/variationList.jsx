import { useVariation } from '../../../../../../context/variationContext';
import { Fragment, useEffect, useState } from 'react';
import { v4 as uuidV4 } from 'uuid';
import Table from './table/table.jsx';
import VariationTableContainer from './variationTableContainer.jsx';
import { useNewProduct } from '../../../../../../context/newProductContext';

function VariationList({}) {
    ('variationList Mount');
    const { variations, dispatch, setCheck } = useVariation();
    const { combine, combineDispatch } = useNewProduct();

    return (
        <>
            {combine?.on && (
                <VariationTableContainer
                    key={combine.id}
                    variation={combine}
                    isCombine={true}
                />
            )}
            {!combine?.on &&
                variations.length > 0 &&
                variations.map((variation, idx) => {
                    return (
                        <VariationTableContainer
                            key={variation._id}
                            variation={variation}
                            isCombine={false}
                        />
                    );
                })}
        </>
    );
}
export default VariationList;
