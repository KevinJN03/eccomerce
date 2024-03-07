import { useEffect, useState } from 'react';
import { useCart } from '../context/cartContext';
import { v4 as uuidv4 } from 'uuid';
import { useLayoutContext } from '../context/layoutContext';
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
    useEffect(
        () => {
            setPriceState(product?.price?.current);

            if (product?.isVariationCombine) {
                setCombineVariation(() => product?.combineVariation);
            }

            const variationSelectObj = {};

            if (
                (product?.isVariation1Present,
                product?.variation1?.array?.length == 1)
            ) {
                variationSelectObj.variation1 = product?.variation1?.array[0];
            }

            if (
                product?.isVariation2Present &&
                product?.variation2?.array?.length == 1
            ) {
                variationSelectObj.variation2 = product?.variation2?.array[0];
            }

            setVariationSelection((prevState) => ({
                ...prevState,
                ...variationSelectObj,
            }));

            [1, 2].map((variationNumber) => {
                if (product?.[`isVariation${variationNumber}Present`]) {
                    setVariationSelection((prevState) => ({
                        ...prevState,
                        [`variation${variationNumber}`]: {
                            ...prevState?.[`variation${variationNumber}`],
                            title: product?.[`variation${variationNumber}`]
                                ?.title,
                        },
                    }));
                }
            });

            console.log('variation changed');

            // check dependency
        },
        [
            // product
        ]
    );

    useEffect(() => {
        if (product?.isVariationCombine) {
            const getPrice =
                combineVariation?.[variationSelect?.variation1?.variation]?.[
                    variationSelect?.variation2?.variation
                ]?.price;

            setPriceState(() =>
                parseFloat(
                    getPrice || product?.additional_data?.price?.min
                ).toFixed(2)
            );
        }
    }, [variationSelect.variation1, variationSelect.variation2]);

    const handleAddToCart = () => {
        if (
            (product.isVariation1Present &&
                !variationSelect.variation1.variation) ||
            (product.isVariation2Present &&
                !variationSelect.variation2.variation)
        ) {
            setError(() => true);
            return;
        }

        if (isHover?.timeout) {
            clearTimeout(isHover.timeout);
        }

        const { alsoLike, detail, reviews, ...rest } = product;
        const newProduct = JSON.parse(JSON.stringify(rest));

        newProduct.id = product._id;
        newProduct.cartId = uuidv4();
        newProduct.quantity = 1;
        newProduct.price.current = priceState;
        newProduct.variationSelect = variationSelect;
        dispatch({ type: 'add', product: newProduct });
        console.log({ newProduct });

        console.log({ product });
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
console.log('variation onchange')
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
