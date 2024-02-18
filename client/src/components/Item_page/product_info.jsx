import { FavoriteBorder } from '@mui/icons-material';
import Info from '../common/info';
import Select from './Select';
import AddToCart from './addToCart';
import Product_Detail from './product_detail';
import Return from './return';
import Shipping from './shipping';
import Similar_Styles from './style_it_with/similar_style';
import Style_It_With from './style_it_with/style_it_with';

import { useEffect, useRef, useState } from 'react';
import WishListBtn from '../buttons/wishlistBtn';
import { useWishlistContext } from '../../context/wishlistContext';
import useWishListHook from '../../hooks/wishlistHook';
import useAddItemToBagHook from '../../hooks/addItemToBagHook';

function Product_info({ title, text, details, images, product, loading }) {
    const {
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
    } = useAddItemToBagHook({ product });
    const {
        isHoverFavorite,
        setIsHoverFavorite,
        favorite,
        setFavorite,
        handleWishlist,
        showAnimation,
    } = useWishListHook({ product });

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
                        handleOnChange={handleOnChange}
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
                    handleOnChange={handleOnChange}
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
                    <div className="relative flex w-full flex-row items-center gap-3">
                        <AddToCart
                            {...{
                                handleAddToCart,
                                isOutOfStock,
                            }}
                        />
                        {/* <WishList /> */}

                        <div
                            className="relative rounded-full bg-light-grey/60 p-2"
                            onClick={handleWishlist}
                            onMouseEnter={() => setIsHoverFavorite(() => true)}
                            onMouseLeave={() => setIsHoverFavorite(() => false)}
                        >
                            <div className="absolute left-0 top-0 z-[1] h-full w-full rounded-inherit bg-transparent"></div>
                            <WishListBtn
                            favorite={favorite}
                            showAnimation={showAnimation}
                            isHoverFavorite={isHoverFavorite}
                            
                            />
                        </div>
                    </div>
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
