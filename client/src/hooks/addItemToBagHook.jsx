import { useEffect, useState } from 'react';
import { useCart } from '../context/cartContext';
import { useLayoutContext } from '../context/layoutContext';
import _, { cloneDeep } from 'lodash';
import objectId from 'bson-objectid';
function useAddItemToBagHook({ product, }) {
    const { dispatch, addItem, formatData } = useCart();

    const [priceState, setPriceState] = useState(null);
    const [variationSelect, setVariationSelection] = useState(
        _.get(product, 'variation_data.select') || {
            variation1: { id: null, variation: null },
            variation2: { id: null, variation: null },
        }
    );
    const [isOutOfStock, setOutOfStock] = useState(false);
    const [combineVariation, setCombineVariation] = useState(null);
    const [error, setError] = useState({on: false, msg: ''});
    const { isHover, setIsHover } = useLayoutContext();
    useEffect(() => {
        setPriceState(
            _.get(product, 'price.current') ||
                _.get(product, 'additional_data.price.min')
        );
        const getCombineVariation = _.get(
            product,
            'variation_data.isVariationCombine'
        );
        if (getCombineVariation) {
            setCombineVariation(() => getCombineVariation);
        }

        const variationSelectObj = {};

        // setVariationSelection((prevState) => ({
        //     ...prevState,
        //     ...variationSelectObj,
        // }));

        [1, 2].forEach((variationNumber) => {
            if (
                _.get(
                    product,
                    `variation_data.variation${variationNumber}_present`
                ) &&
                _.get(
                    product,
                    `variation_data.variation${variationNumber}_data.array`
                )?.length == 1
            ) {
                variationSelectObj[`variation${variationNumber}`] = _.get(
                    product,
                    `variation_data.variation${variationNumber}_data.array.0`
                );
            }

            if (
                _.get(
                    product,
                    `variation_data.variation${variationNumber}_present`
                )
            ) {
                setVariationSelection((prevState) => ({
                    ...prevState,
                    [`variation${variationNumber}`]: {
                        ...prevState?.[`variation${variationNumber}`],
                        title: product?.[`variation${variationNumber}`]?.title,
                    },
                }));
            }
        });

        console.log('variation changed');

        // check dependency
    }, [product]);

    useEffect(() => {
        if (_.get(product, 'variation_data.isVariationCombine')) {
            const getPrice = _.get(combineVariation, [
                variationSelect?.variation1?.variation,
                variationSelect?.variation2?.variation,
                'price',
            ]);
debugger
            setPriceState(() =>
                parseFloat(
                    getPrice || product?.additional_data?.price?.min
                ).toFixed(2)
            );
        }
    }, [variationSelect.variation1, variationSelect.variation2]);

    const handleAddToCart = () => {
        if (
            (_.get(product, ['variation_data', 'variation1_present']) &&
                !variationSelect.variation1.variation) ||
            (_.get(product, ['variation_data', 'variation2_present']) &&
                !variationSelect.variation2.variation)
        ) {
            setError(() => ({on: true, msg: 'Please select from the available variation options.'}));
            return;
        }

        if (isHover?.timeout) {
            clearTimeout(isHover.timeout);
        }

        // const newProduct = cloneDeep(product);
        // const pickedData = _.pick(newProduct, [
        //     'variation_data',
        //     'images',
        //     'title',
        //     'delivery',
        //     'quantity',
        //     'price',
        //     'additional_data',
        //     'shipping_data',
        //     'stock',
        //     'status',
        // ]);
        // _.set(pickedData, 'price.current', priceState);
        // _.set(pickedData, ['variation_data', 'select'], variationSelect);
        // _.set(pickedData, 'product_id', product._id);
        // _.set(pickedData, '_id', objectId().toString());
        // _.set(pickedData, 'quantity', 1);

        addItem({
            itemData: formatData({ product, priceState, variationSelect }),
        });
        // dispatch({ type: 'ADD', product: pickedData });

        setError(() => false);
    };

    const handleOnChange = ({ e, stockState, setStockState, property }) => {
        const id = e.target.options[e.target.selectedIndex].dataset?.id;
        const variation =
            e.target.options[e.target.selectedIndex].dataset?.variation;
        const stock = e.target.options[e.target.selectedIndex].dataset?.stock;
        const price = e.target.options[e.target.selectedIndex].dataset?.price;
        console.log('variation onchange');
        setVariationSelection((prevState) => ({
            ...prevState,
            [property]: { ...prevState[property], variation, id },
        }));

        if (stock == 0 || stock) {
            setStockState(() => stock);
        }

        if (price) {
            setPriceState(() => price);
        }
    };
    return {
        priceState,
        setPriceState,
        variationSelect,
        setVariationSelection,
        combineVariation,
        setCombineVariation,
        isOutOfStock,
        setOutOfStock,
        handleAddToCart,
        error,
        setError,
        handleOnChange,
    };
}

export default useAddItemToBagHook;
