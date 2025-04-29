import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { AdminReducer } from '../hooks/adminReducer';
import { useNavigate } from 'react-router-dom';
import axios, { adminAxios } from '../api/axios.js';
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

    const abortControllerRef = useRef(new AbortController());
    const [isOutOfStock, setOutOfStock] = useState(false);
    const [combineVariation, setCombineVariation] = useState(null);
    const [error, setError] = useState({ on: false, msg: '' });

    useEffect(() => {
        return () => {
            abortControllerRef.current?.abort();
        };
    }, []);

    const handleOnChange = async ({
        e,
        stockState,
        setStockState,
        property,
    }) => {
        try {
            const values = e.target.options[e.target.selectedIndex].dataset;
            const { _id, variation } = values;
            abortControllerRef.current?.abort();
            abortControllerRef.current = new AbortController();

            const newVariationSelect = {
                ...variationSelect,
                [property]: { ...values },
            };

            const findOptionValues = await axios.post(
                '/variation/option',
                { ...values, variationSelect: newVariationSelect },
                { signal: abortControllerRef.current?.signal }
            );

            setVariationSelection(() => newVariationSelect);
            debugger;
        } catch (error) {
            console.log(error);
            setError(() => ({ on: true, msg: error.response.data?.msg }));
        }

        // const isCombineVariation =
        //     property == 'variation2' &&
        //     _.get(variation_data, 'isVariationCombine');
        // let stock, price;
        // debugger;
        // // Check if item is a combined variation item
        // // if true, find the variation, and set the VariationSelection object as [property] values within the combineVAriation object
        // //  if false,
        // if (isCombineVariation) {
        //     const findVariation = _.get(variation_data, [
        //         'combineVariation',

        //         variationSelect?.variation1?.variation,
        //         variation,
        //     ]);
        //     setVariationSelection((prevState) => ({
        //         ...prevState,
        //         [property]: { ...prevState[property], ...findVariation },
        //     }));

        //     if (_.has(findVariation, 'stock')) {
        //         // setStockState(() => findVariation.stock);
        //         stock = findVariation.stock;
        //     }

        //     if (_.has(findVariation, 'price')) {
        //         price = findVariation.price;
        //     }
        // } else {
        //     setVariationSelection((prevState) => ({
        //         ...prevState,
        //         [property]: { ...prevState[property], variation, _id },
        //     }));

        //     if (_.has(values, 'stock')) {
        //         stock = values.stock;
        //     }

        //     if (_.has(values, 'price')) {
        //         price = values.price;
        //     }
        // }
        // setStockState(() => stock);
        // setPriceState(() => price);
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
