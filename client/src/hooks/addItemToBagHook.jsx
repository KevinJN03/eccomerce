import { useEffect, useState } from 'react';

function useAddItemToBagHook({ product }) {
    const [priceState, setPriceState] = useState(null);
    const [variationSelect, setVariationSelection] = useState({
        variation1: { id: null, variation: null },
        variation2: { id: null, variation: null },
    });
    const [isOutOfStock, setOutOfStock] = useState(false);
    const [combineVariation, setCombineVariation] = useState(null);

    useEffect(() => {
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

        console.log({ isVariation1Present: product?.isVariation1Present });

        [1, 2].map((variationNumber) => {
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
        if (product?.isVariationCombine) {
            const getPrice =
                combineVariation?.[variationSelect?.variation1?.variation]?.[
                    variationSelect?.variation2?.variation
                ]?.price;

            setPriceState(
                () => getPrice || product?.additional_data?.price?.min
            );
        }
    }, [variationSelect.variation1, variationSelect.variation2]);

    return {
        priceState,
        setPriceState,
        variationSelect,
        setVariationSelection,
        combineVariation,
        setCombineVariation,
        isOutOfStock,
        setOutOfStock,
    };
}

export default useAddItemToBagHook;
