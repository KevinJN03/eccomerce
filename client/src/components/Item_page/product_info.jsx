import Info from '../common/info';
import Select from './Select';
import Size from './Size';
import WishList from './Wishlist';
import AddToCart from './addToCart';
import Product_Detail from './product_detail';
import Return from './return';
import Shipping from './shipping';
import Similar_Styles from './style_it_with/similar_style';
import Style_It_With from './style_it_with/style_it_with';

import { useEffect, useRef, useState } from 'react';

function Product_info({ title, text, details, images, product, loading }) {
    const [priceState, setPriceState] = useState(null);

    const [error, setError] = useState(false);
    const [isOutOfStock, setOutOfStock] = useState(false);
    const [variationSelect, setVariationSelection] = useState({
        variation1: { id: null, variation: null },
        variation2: { id: null, variation: null },
    });

    const [combineVariation, setCombineVariation] = useState(null);

    useEffect(() => {
        setPriceState(product?.price?.current);

        if (product?.isVariationCombine) {
            setCombineVariation(() => product?.combineVariation);
        }

        if (product?.isVariation1Present) {
            if (product?.variation1?.array?.length == 1) {
                setVariationSelection((prevState) => ({
                    ...prevState,
                    variation1: {
                        ...prevState.variation1,
                        ...product?.variation1?.array[0],
                    },
                }));
            }
        }
    }, [product]);

    useEffect(() => {
        if (product?.isVariationCombine) {
            var getPrice =
                combineVariation?.[variationSelect?.variation1?.variation]?.[
                    variationSelect?.variation2?.variation
                ]?.price;

            setPriceState(() => getPrice || product?.price?.current);
        }
    }, [variationSelect.variation1, variationSelect.variation2]);

    // console.log({
    //     variation2: product?.variation1,
    //     variation1: product?.variation2,
    //     combine: product?.combineVariation,
    //     isVariationCombine: product?.isVariationCombine,
    // });

    useEffect(() => {
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
    }, [product]);
    return (
        <section id="product-info">
            {!loading ? (
                <Info title={title} price={priceState} text={text} />
            ) : (
                <div className="skeleton-pulse mb-4 h-full max-h-[100px] w-full"></div>
            )}

            {product?.isVariation1Present && !loading ? (
                <>
                    <Select
                        variationSelect={variationSelect}
                        setVariationSelection={setVariationSelection}
                        array={product.variation1.array}
                        text={product.variation1.title.toUpperCase()}
                        single={product?.variation1?.array?.[0]['variation']}
                        property={'variation1'}
                        setOutOfStock={setOutOfStock}
                        setPrice={setPriceState}
                        ref={null}
                        isSecond={false}
                    />
                </>
            ) : (
                product?.isVariation1Present &&
                loading && (
                    <div className="skeleton-pulse mb-4 h-full max-h-[48px] w-full"></div>
                )
            )}

            {product?.isVariation2Present && !loading ? (
                <Select
                    variationSelect={variationSelect}
                    setVariationSelection={setVariationSelection}
                    array={product.variation2.array}
                    text={product.variation2.title.toUpperCase()}
                    single={product?.variation2?.array?.[0]['variation']}
                    property={'variation2'}
                    setOutOfStock={setOutOfStock}
                    setPrice={setPriceState}
                    ref={null}
                    isSecond={false}
                />
            ) : (
                product?.isVariation2Present &&
                loading && (
                    <div className="skeleton-pulse mb-4 h-full max-h-[48px] w-full"></div>
                )
            )}

            {error && (
                <div className="error-box mb-4 bg-red-100 px-3 py-2 text-sm">
                    Please select from the available colour and size options.
                </div>
            )}

            <div className="adddtocart-wishlist">
                {loading ? (
                    <div className="skeleton-pulse mb-4 h-full w-full"></div>
                ) : (
                    <>
                        <AddToCart
                            variationSelect={variationSelect}
                            product={product}
                            price={priceState}
                            setError={setError}
                            isOutOfStock={isOutOfStock}
                        />
                        <WishList />
                    </>
                )}
            </div>

            {!loading ? (
                <Shipping />
            ) : (
                <div className="skeleton-pulse mb-4 h-full min-h-[100px] w-full"></div>
            )}

            {!loading ? (
                <>
                    <div className=" flex flex-col border-t-[thin] sm:mx-4 sm+md:mb-10 sm+md:gap-0 lg:mt-6">
                        <Product_Detail details={details} />
                        <Return />{' '}
                    </div>
                </>
            ) : (
                <div className="skeleton-pulse h-full w-full"></div>
            )}

            <section className="similar-style-with-container flex sm:mx-4 sm+md:flex-col-reverse sm+md:gap-8 lg:mt-5 lg:flex-col">
                {!loading ? (
                    <Similar_Styles images={images} />
                ) : (
                    <div className="skeleton-pulse h-full w-full"></div>
                )}
                {/* <Style_It_With products={style_it_with_image} /> */}
            </section>
        </section>
    );
}

export default Product_info;
