import { useVariation } from '../../../../../../context/variationContext';
import { useState } from 'react';

import Table from './table/table.jsx';
import SingleList from './singleList';

function TestVariationList({}) {
    const { variations, dispatch, setCheck } = useVariation();

    const handleUpdate = (category, selected, setUpdate, update) => {
        setCheck(true);
        dispatch({ type: 'update', category, selected, setUpdate, update });
    };

    return (
        <>
            {variations.length > 0 &&
                variations.map((variation) => {
                    return (
                        <>
                            <SingleList
                                variation={variation}
                                key={variation.id}
                                handleUpdate={handleUpdate}
                            />
                        </>
                    );
                })}
        </>
    );
}
export default TestVariationList;
