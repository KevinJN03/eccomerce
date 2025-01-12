import { createContext, useContext, useEffect, useRef, useState } from 'react';

const TableContext = createContext();
export const useTableContext = () => {
    return useContext(TableContext);
};
function TableProvider({ children, value }) {
    const [variationIdSet, setVariationsIdSet] = useState(new Set());
    const [variationOptions, setVariationOptions] = useState([]);
    const { variationList, checkSet, setCheckSet } = value;
    const unclearClickAwayRef = useRef(new Set());

    useEffect(() => {
        const idArray = [];
        const valueArray = [];

        variationList.options?.forEach((value, key) => {
            if (value.visible) {
                idArray.push(key);
            }
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
                unclearClickAwayRef,
            }}
        >
            {children}
        </TableContext.Provider>
    );
}

export default TableProvider;
