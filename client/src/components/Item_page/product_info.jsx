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

function Product_info({
    title,

    text,
    size,
    details,
    images,

    product,
    color,
    loading,
}) {
    const [priceState, setPriceState] = useState(null);
    console.log('render product info');

    const [sizeSelect, setSizeSelect] = useState(null);
    const sizeRef = useRef();
    const [colorSelect, setColorSelect] = useState(null);
    const [error, setError] = useState(false);
    const [isOutOfStock, setOutOfStock] = useState(false);
    const [variationSelect, setVariationSelection] = useState({
        color: {id: null, variation: null},
        size: {id: null, variation: null},
    });
    useEffect(() => {
        if (product.hasOwnProperty('price')) {
            setPriceState(() => product.price?.current);
        }
        if (product.hasOwnProperty('color')) {
            setColorSelect(() =>
                product.color.length == 1 ? product.color[0].color : null
            );
        }

        if (product.hasOwnProperty('size')) {
            setColorSelect(() =>
                product.size.length == 1 ? product.color[0].color : null
            );
        }
    }, [product]);
    useEffect(() => {
        const refStock =
            sizeRef?.current?.[sizeRef?.current?.selectedIndex].dataset?.stock;
        const refPrice =
            sizeRef?.current?.[sizeRef?.current?.selectedIndex].dataset?.price;

        if (refPrice) {
            setPriceState(() => refPrice);
        }
        if (refStock == 0) {
            setOutOfStock(() => true);
        } else {
            setOutOfStock(() => false);
        }
        if (error) {
            setError(() => false);
        }
    }, [sizeSelect, colorSelect]);

    //     useEffect(() => {
    // setOutOfStock(() => false)
    //     }, [colorSelect])

    return (
        <section id="product-info">
            {!loading ? (
                <Info title={title} price={priceState} text={text} />
            ) : (
                <div className="skeleton-pulse mb-4 h-full max-h-[100px] w-full"></div>
            )}

            {product?.isColorPresent && !loading ? (
                <Select
                    variationSelect={variationSelect}
                    setVariationSelection={setVariationSelection}
                    array={color}
                    text={'COLOUR'}
                    single={color[0]['variation']}
                    property={'color'}
                    setOutOfStock={setOutOfStock}
                    setPrice={setPriceState}
                    ref={null}
                    isSecond={false}
                />
            ) : (
                product?.isColorPresent &&
                loading && (
                    <div className="skeleton-pulse mb-4 h-full max-h-[48px] w-full"></div>
                )
            )}

            {product?.isSizePresent && !loading ? (
                <Select
                    variationSelect={variationSelect}
                    setVariationSelection={setVariationSelection}
                    array={
                        (product.isVariationCombine &&
                            colorSelect &&
                            product.combineVariation[colorSelect]) ||
                        product.size
                    }
                    property={'size'}
                    text={'SIZE'}
                    single={size[0]['variation']}
                    setOutOfStock={setOutOfStock}
                    setPrice={setPriceState}
                    ref={sizeRef}
                    isSecond={true}
                />
            ) : (
                product?.isSizePresent &&
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
                            sizeSelect={sizeSelect}
                            colorSelect={colorSelect}
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
