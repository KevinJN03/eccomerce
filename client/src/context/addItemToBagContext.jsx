import { createContext, useContext, useState } from 'react';
import { AdminReducer } from '../hooks/adminReducer';
import { useNavigate } from 'react-router-dom';
import { adminAxios } from '../api/axios.js';
import { useCart } from './cartContext.jsx';
import { useProductContext } from './productContext.jsx';
import _ from 'lodash';
import { useLayoutContext } from './layoutContext.jsx';
const AddItemToBagContext = createContext();

export const useAddItemToBagContext = () => {
    return useContext(AddItemToBagContext);
};

export function AddItemToBagProvider({ children }) {
    const { product } = useProductContext();

    const { isHover, setIsHover } = useLayoutContext();
    const { dispatch, addItem, formatData } = useCart();
    const { variation_data } = product;
    const [priceState, setPriceState] = useState(() => {
        const price =
            _.get(product, 'additional_data.price.min') ||
            _.get(product, 'price.current');
        return price;
    });
    const [variationSelect, setVariationSelection] = useState(
        _.get(product, 'variation_data.select') || {
            variation1: { id: null, variation: null },
            variation2: { id: null, variation: null },
        }
    );
    const [isOutOfStock, setOutOfStock] = useState(false);
    const [combineVariation, setCombineVariation] = useState(null);
    const [error, setError] = useState({ on: false, msg: '' });

    const handleOnChange = ({ e, stockState, setStockState, property }) => {
        const values = e.target.options[e.target.selectedIndex].dataset;
        const { _id, variation } = values;
        debugger;
        if (
            property == 'variation2' &&
            _.get(variation_data, 'isVariationCombine')
        ) {
            const combineVariationMap = new Map(
                _.get(product, 'variation_data.combineVariation.options')
            );

            const findVariation = _.get(variation_data, [
                'combineVariation',
                variationSelect?.variation1?.variation,
                variation,
            ]);
            setVariationSelection((prevState) => ({
                ...prevState,
                [property]: { ...prevState[property], ...findVariation },
            }));

            if (_.has(findVariation, 'stock')) {
                setStockState(() => findVariation.stock);
            }

            if (_.has(findVariation, 'price')) {
                setPriceState(() => findVariation.price);
            }
        } else {
            setVariationSelection((prevState) => ({
                ...prevState,
                [property]: { ...prevState[property], variation, _id },
            }));

            if (_.has(values, 'stock')) {
                setStockState(() => values.stock);
            }

            if (_.has(values, 'price')) {
                setPriceState(() => values.price);
            }
        }
    };

    const handleAddToCart = () => {
        console.log({ variationSelect });

        if (
            (_.get(product, ['variation_data', 'variation1_present']) &&
                !variationSelect.variation1.variation) ||
            (_.get(product, ['variation_data', 'variation2_present']) &&
                !variationSelect.variation2.variation)
        ) {
            setError(() => ({
                on: true,
                msg: 'Please select from the available variation options.',
            }));
            return;
        }

        if (isHover?.timeout) {
            clearTimeout(isHover.timeout);
        }

        addItem({
            itemData: formatData({ product, priceState, variationSelect }),
        });

        setError(() => false);
    };

    const value = {
        priceState,
        setPriceState,
        variationSelect,
        setVariationSelection,
        isOutOfStock,
        setOutOfStock,
        combineVariation,
        setCombineVariation,
        error,
        setError,
        handleAddToCart,

        handleOnChange,
    };
    return (
        <AddItemToBagContext.Provider value={value}>
            {children}
        </AddItemToBagContext.Provider>
    );
}
