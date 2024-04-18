import { useEffect, useState } from 'react';
import { useCart } from '../context/cartContext';
import { useLayoutContext } from '../context/layoutContext';
import _, { cloneDeep } from 'lodash';
import objectId from 'bson-objectid';
function useAddItemToBagHook({ product }) {
    const { dispatch, addItem, formatData } = useCart();
    const { variation_data } = product;
    const [priceState, setPriceState] = useState(
        _.get(product, 'price.current')
    );
    const [variationSelect, setVariationSelection] = useState(
        _.get(product, 'variation_data.select') || {
            variation1: { id: null, variation: null },
            variation2: { id: null, variation: null },
        }
    );
    const [isOutOfStock, setOutOfStock] = useState(false);
    const [combineVariation, setCombineVariation] = useState(null);
    const [error, setError] = useState({ on: false, msg: '' });
    const { isHover, setIsHover } = useLayoutContext();
    useEffect(() => {
        setPriceState(
            _.get(product, 'price.current') ||
                _.get(product, 'additional_data.price.min')
        );
        setCombineVariation(
            () => _.get(product, 'variation_data.combineVariation') || {}
        );

        const variationSelectObj = {};

        // setVariationSelection((prevState) => ({
        //     ...prevState,
        //     ...variationSelectObj,
        // }));

        [1, 2].forEach((variationNumber) => {
            const isPresent = _.get(
                product,
                `variation_data.variation${variationNumber}_present`
            );
            const variationArray = _.get(
                product,
                `variation_data.variation${variationNumber}_data.array`
            );
            if (isPresent && variationArray?.length == 1) {
                variationSelectObj[`variation${variationNumber}`] = _.get(
                    product,
                    `variation_data.variation${variationNumber}_data.array.0`
                );
            }

            // if (
            //     _.get(
            //         product,
            //         `variation_data.variation${variationNumber}_present`
            //     )
            // ) {
            //     setVariationSelection((prevState) => ({
            //         ...prevState,
            //         [`variation${variationNumber}`]: {
            //             ...prevState?.[`variation${variationNumber}`],
            //             title: product?.[`variation${variationNumber}`]?.title,
            //         },
            //     }));
            // }
        });

        if (!_.isEmpty(variationSelectObj)) {
            setVariationSelection((prevState) => ({
                ...prevState,
                ...variationSelectObj,
            }));
        }

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
            setPriceState(() =>
                parseFloat(
                    getPrice ||
                        _.get(product, 'price.current') ||
                        product?.additional_data?.price?.min
                ).toFixed(2)
            );
        }
    }, [variationSelect.variation1, variationSelect.variation2]);

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

    const handleOnChange = ({ e, stockState, setStockState, property }) => {
        const { price, stock, id, variation } =
            e.target.options[e.target.selectedIndex].dataset;

        if (
            property == 'variation2' &&
            _.get(variation_data, 'isVariationCombine')
        ) {
            const findVariation = _.get(variation_data, [
                'combineVariation',
                variationSelect?.variation1?.variation,
                variation,
            ]);
            setVariationSelection((prevState) => ({
                ...prevState,
                [property]: { ...prevState[property], ...findVariation },
            }));
            debugger;
        } else {
            setVariationSelection((prevState) => ({
                ...prevState,
                [property]: { ...prevState[property], variation, id },
            }));
        }

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
