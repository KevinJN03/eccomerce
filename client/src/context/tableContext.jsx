import { createContext, useContext, useEffect, useState } from 'react';
import { useContent } from './ContentContext';
import { useVariation } from './variationContext';

const TableContext = createContext();

export const useTableContext = () => {
    return useContext(TableContext);
};
function TableProvider({ children, value }) {
    const [variationIdSet, setVariationsIdSet] = useState(new Set());
    const [variationOptions, setVariationOptions] = useState([]);
    const { variationList, checkSet, setCheckSet } = value;

    useEffect(() => {
        const idArray = [];
        const valueArray = [];

        variationList.options?.forEach((value, key) => {
            idArray.push(key);
            valueArray.push(value);
        });
        setVariationOptions(() => valueArray);
        setVariationsIdSet(() => idArray);
    }, [variationList?.options]);

    const handleCheckAllVariations = () => {
        if (checkSet.size == variationIdSet.length) {
            setCheckSet(() => new Set());
        } else {
            setCheckSet(() => new Set(variationIdSet));
        }
    };
    return (
        <TableContext.Provider
            value={{
                ...value,
                variationOptions,
                variationIdSet,
                handleCheckAllVariations,
            }}
        >
            {children}
        </TableContext.Provider>
    );
}

export default TableProvider;
