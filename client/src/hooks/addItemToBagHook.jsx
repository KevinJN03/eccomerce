import { useEffect, useState } from 'react';
import { useCart } from '../context/cartContext';
import { v4 as uuidv4 } from 'uuid';
import { useLayoutContext } from '../context/layoutContext';
import _, { cloneDeep } from 'lodash';
function useAddItemToBagHook({ product }) {
    const { dispatch } = useCart();

    const [priceState, setPriceState] = useState(null);
    const [variationSelect, setVariationSelection] = useState(
        product?.variationSelect || {
            variation1: { id: null, variation: null },
            variation2: { id: null, variation: null },
        }
    );
    const [isOutOfStock, setOutOfStock] = useState(false);
    const [combineVariation, setCombineVariation] = useState(null);
    const [error, setError] = useState(false);
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

        setVariationSelection((prevState) => ({
            ...prevState,
            ...variationSelectObj,
        }));

        [1, 2].forEach((variationNumber) => {
            if (
                _.get(
                    product,
                    `variation_data.variaion${variationNumber}_present`
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

            if (product?.[`isVariation${variationNumber}Present`]) {
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
            setError(() => true);
            return;
        }

        if (isHover?.timeout) {
            clearTimeout(isHover.timeout);
        }

        const { alsoLike, detail, reviews, ...rest } = product;

        const newProduct = cloneDeep(rest);

        newProduct.id = product._id;
        newProduct.cartId = uuidv4();
        newProduct.quantity = 1;
        _.set(newProduct, 'price.current', priceState);

        _.set(newProduct, ['variation_data', 'select'], variationSelect);
      //  newProduct.variationSelect = variationSelect;
        dispatch({ type: 'add', product: newProduct });
        // console.log({ newProduct });
        setError(() => false);

        const timeout = setTimeout(() => {
            setIsHover(() => ({ on: false, menu: null }));
        }, 3000);
        setIsHover(() => ({
            on: true,
            menu: 'cart',
            timeout,
            addToCart: true,
        }));
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
