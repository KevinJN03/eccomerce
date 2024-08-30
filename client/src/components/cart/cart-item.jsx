import Variation2Options from './variation2Options';
import { useEffect, useState } from 'react';
import { useCart } from '../../context/cartContext';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { CloseRounded, Favorite, FavoriteBorder } from '@mui/icons-material';

import Overlay from './overlay';
import getCartItemVariants from './cartItemVariants';
import useWishListHook from '../../hooks/wishlistHook';
import _, { cloneDeep, property, values } from 'lodash';
import dayjs from 'dayjs';
import ShippingSelectOption from './shippingSelectOption';
import { useWishlistContext } from '../../context/wishlistContext';
import SaveLaterOverLay from './saveLaterOverlay';
function Cart_Item({ cartItem, idx, lastIndex, deliveryMap }) {
    const [isRemoving, setIsRemoving] = useState({ saveForLater: false });
    const { dispatch, cart, removeItem, updateItemProperty } = useCart();

    const { addItem } = useWishlistContext();

    const handleRemove = () => {
        removeItem({ itemId: cartItem._id });
        // dispatch({ type: 'REMOVE', _id: cartItem._id });
    };

    const { isHoverFavorite, setIsHoverFavorite } = useWishListHook({
        product: cartItem,
    });
    const [favorite, setFavorite] = useState(false);
    const delivery = _.get(cartItem, ['deliveryInfo', 0]);

    const handleVariationChange = (e) => {
        const { ...values } =
            e.target.options[e.target.options.selectedIndex]?.dataset;

        updateItemProperty({
            itemId: cartItem._id,
            property: 'variation_data.select.variation2',
            value: values,
        });

        // if (!_.get(cartItem, 'variation_data', 'isVariationCombine')) {
        //     const findSizeVariation = [
        //         _.get(cartItem, 'variation_data', 'variation1_data'),
        //         _.get(cartItem, 'variation_data', 'variation2_data'),
        //         //  cartItem?.variation1,

        //         //  cartItem?.variation2,
        //     ].find((item, idx) => {
        //         if (item.title == 'Size') {
        //             variationIndex = idx + 1;
        //             return item;
        //         }
        //     });

        //     if (findSizeVariation?.array) {
        //         const foundVariation = findSizeVariation.array.find(
        //             (item) => item.id == id
        //         );

        //         if (foundVariation) {
        //             const updatedVariationSelect = cloneDeep(
        //                 _.get(cartItem, 'variation_data.select')
        //             );
        //             _.set(
        //                 updatedVariationSelect,
        //                 [`variation${variationIndex}`],
        //                 { ...foundVariation }
        //             );

        //             // {
        //             //     [`variation${variationIndex}`]: {
        //             //         ...cartItem.variationSelect?.[
        //             //             `variation${variationIndex}`
        //             //         ],
        //             //         ...foundVariation,
        //             //     },
        //             // };

        //             dispatch({
        //                 type: 'EDIT_VARIATION',
        //                 _id: cartItem?._id,
        //                 select: updatedVariationSelect,
        //             });
        //         }
        //     }
        // } else {
        //     const selectedVariation1 = _.get(
        //         cartItem,
        //         'variation_data.select.variation1.variation'
        //     );
        //     const findVariation = _.get(
        //         cartItem,
        //         `variation_data.select.variation1.${selectedVariation1}`
        //     );

        //     //    cartItem?.combineVariation?.[selectedVariation1];

        //     if (findVariation) {
        //         const newVariation = findVariation[e.target.value];
        //         const selectObj = _.cloneDeep(
        //             _.get(cartItem, ['variation_data', 'select'])
        //         );
        //         _.set(selectObj, ['variation2'], {
        //             ...selectObj?.variation2,
        //             ...newVariation,
        //         });

        //         // const updatedVariationSelect = {
        //         //         ..._.get(cartItem, ['variation_data', 'select' ]),
        //         //         variation2: {
        //         //             ...cartItem.variationSelect.variation2,
        //         //             ...newVariation,
        //         //         },
        //         //     };

        //         dispatch({
        //             type: 'EDIT_VARIATION',
        //             _id: product?._id,
        //             select: selectObj,
        //         });
        //     }
        // }
    };

    const handleQuantityChange = (e) => {
        // dispatch({
        //     type: 'EDIT_QUANTITY',
        //     quantity: e.target.value,
        //     _id: cartItem._id,
        // });

        updateItemProperty({
            itemId: cartItem._id,
            property: 'quantity',
            value: e.target.value,
        });
    };

    // useEffect(() => {
    //     const variationSelectArray = Object.entries(
    //         _.get(cartItem, 'variation_data.select')
    //     ).map(([key, value]) => {
    //         if (value?.title == 'Colour') {
    //             setFindColor(() => ({
    //                 variation: value?.variation,
    //                 variationType: key,
    //             }));
    //         }

    //         if (value?.title == 'Size') {
    //             setFindSize(() => ({
    //                 variation: value?.variation,
    //                 variationType: key,
    //             }));

    //             setSizeOptionArray(() =>
    //                 _.get(cartItem, `variation_data.${key}.array`)
    //             );
    //         }
    //     });
    // }, []);

    const [cartItemVariants, setCartItemVariants] = useState(() =>
        getCartItemVariants({
            idx,
            disableTranslateY: false,
            heightExit: true,
        })
    );

    const saveForLaterVariants = {
        exit: {
            scale: 0,
            opacity: 0,
            transition: {
                duration: 0.4,
            },
        },
    };

    const handleDeliverySelect = (e) => {
        const values = e.target[e.target.selectedIndex].dataset;
        dispatch({
            type: 'UPDATE_DELIVERY',
            _id: cartItem._id,
            shipping_data: {
                ...values,
                one_item: parseFloat(values.one_item),
                additional_item: parseFloat(values.additional_item),
            },
        });

        updateItemProperty({
            itemId: cartItem._id,
            property: 'shipping_data',
            value: {
                ...values,
                one_item: parseFloat(values.one_item),
                additional_item: parseFloat(values.additional_item),
            },
        });
    };

    return (
        <motion.section
            variants={cartItemVariants.section}
            animate={'animate'}
            exit={'exit'}
            initial={'initial'}
            className={` relative flex h-full max-h-44 origin-top`}
        >
            <div className="h-44 w-full">
                <Overlay
                    isRemoving={isRemoving}
                    setIsRemoving={setIsRemoving}
                    handleRemove={handleRemove}
                    enableBodyExit
                />
                <AnimatePresence>
                    {isRemoving?.showOverlay && (
                        <motion.div
                            key={`saveLaterOverlay-${cartItem._id}`}
                            exit={'exit'}
                            className=" absolute left-0 top-0 z-[1] flex h-full w-full flex-col items-center justify-center"
                        >
                            <AnimatePresence>
                                {!isRemoving.showOverlayOpacityOff && (
                                    <motion.p
                                        initial={{
                                            opacity: 0,
                                        }}
                                        animate={{
                                            opacity: 1,
                                            transition: {
                                                duration: 0.3,
                                                // delay: 0.5,
                                            },
                                        }}
                                        exit={{
                                            opacity: 0,
                                            scale: 0.9,
                                            transition: {
                                                duration: 0.2,
                                                delay: 0.1,
                                            },
                                        }}
                                        className=" text-sm font-medium text-black/80"
                                    >
                                        Item saved for later
                                    </motion.p>
                                )}
                            </AnimatePresence>
                            {/* <div className="relative flex h-full w-full items-end justify-center"> */}
                            <AnimatePresence>
                                <SaveLaterOverLay
                                    {...{ cartItem, isRemoving, setIsRemoving }}
                                />
                            </AnimatePresence>
                        </motion.div>
                    )}
                </AnimatePresence>
                <AnimatePresence>
                    {!isRemoving?.saveForLater && (
                        <motion.section
                            variants={saveForLaterVariants}
                            exit={'exit'}
                            onAnimationComplete={(e, k) => {
                                console.log('e: ', e, k);
                                if (e == 'exit') {
                                    setIsRemoving((prevState) => ({
                                        ...prevState,
                                        showOverlay: true,
                                    }));
                                }
                            }}
                            className={`h-44 w-full bg-white p-4 pb-0 ${
                                isRemoving?.complete
                                    ? 'opacity-0'
                                    : 'opacity-100'
                            } 
               
                
                `}
                        >
                            <section
                                className={` 
pb-4
                    ${
                        !lastIndex
                            ? 'border-b-2 border-light-grey'
                            : 'border-none'
                    }
               relative flex h-full w-full flex-row `}
                            >
                                <Link
                                    to={`/product/${cartItem.product_id}`}
                                    className="cart-img-container h-full"
                                >
                                    <img
                                        src={cartItem.images[0]}
                                        className="h-[140px] w-full max-w-[110px] object-cover"
                                    ></img>
                                </Link>
                                <section
                                    id="cart-info"
                                    className={
                                        '  flex !min-h-full flex-col flex-nowrap px-4'
                                    }
                                >
                                    <p className="flex gap-x-3 text-sm font-bold tracking-wider text-black">
                                        <span
                                            className={
                                                cartItem.price?.previous >
                                                cartItem.price.current
                                                    ? 'text-red-600'
                                                    : 'text-black/80'
                                            }
                                        >
                                            £{cartItem.price.current}
                                        </span>
                                        {cartItem.price?.previous &&
                                            cartItem.price?.previous >
                                                cartItem.price.current && (
                                                <span className="text-[12px] font-medium text-[var(--grey)] line-through">
                                                    £{cartItem.price?.previous}
                                                </span>
                                            )}
                                    </p>

                                    <div className=" bottom relative mt-2 flex h-full !max-h-full w-full flex-col justify-between">
                                        <p className="w-11/12 text-black/70">
                                            {cartItem.title}
                                        </p>
                                        <div className="cart-options">
                                            {_.get(
                                                cartItem,
                                                'variation_data.select.variation1.variation'
                                            ) && (
                                                <span className="border-r-[1px] pr-2 text-s text-black/70">
                                                    {_.get(
                                                        cartItem,
                                                        'variation_data.select.variation1.variation'
                                                    )}
                                                </span>
                                            )}
                                            {_.get(
                                                cartItem,
                                                'variation_data.select.variation2.variation'
                                            ) && (
                                                <div className="cursor-pointer border-r-[1px] pr-2">
                                                    <Variation2Options
                                                        handleOnChange={
                                                            handleVariationChange
                                                        }
                                                        options={_.get(
                                                            cartItem,
                                                            'variation_data.variation2_data.array'
                                                        )}
                                                        select={_.get(
                                                            cartItem,
                                                            'variation_data.select.variation2.variation'
                                                        )}
                                                        type="size"
                                                    />
                                                    <div className="border-r-2 pr-2" />
                                                </div>
                                            )}
                                            <div className="flex !cursor-pointer flex-nowrap  gap-x-2">
                                                <p>Qty</p>

                                                <span id="qty-select">
                                                    <select
                                                        onChange={
                                                            handleQuantityChange
                                                        }
                                                        name="quantity-select"
                                                        id="qty-size-select"
                                                        className="!max-w-[80px] text-s text-black/70"
                                                        tabIndex={'0'}
                                                    >
                                                        {cartItem.quantity >
                                                            10 && (
                                                            <option selected>
                                                                {
                                                                    cartItem.quantity
                                                                }
                                                            </option>
                                                        )}
                                                        {Array(10)
                                                            .fill('')
                                                            .map(
                                                                (
                                                                    item,
                                                                    index
                                                                ) => {
                                                                    return (
                                                                        <option
                                                                            className="text-black/60"
                                                                            key={`${cartItem._id}-qty-${
                                                                                index +
                                                                                1
                                                                            }`}
                                                                            value={
                                                                                index +
                                                                                1
                                                                            }
                                                                            // selected = {}
                                                                            selected={
                                                                                index +
                                                                                    1 ==
                                                                                cartItem.quantity
                                                                            }
                                                                        >
                                                                            {index +
                                                                                1}
                                                                        </option>
                                                                    );
                                                                }
                                                            )}
                                                    </select>
                                                </span>
                                            </div>
                                        </div>

                                        <div className="flex w-full gap-4">
                                            <button
                                                type="button"
                                                id="save-later-btn"
                                                className=""
                                                onClick={() => {
                                                    // handleWishlist;

                                                    setIsRemoving(
                                                        (prevState) => ({
                                                            ...prevState,
                                                            saveForLater: true,
                                                        })
                                                    );
                                                }}
                                                onMouseEnter={() =>
                                                    setIsHoverFavorite(
                                                        () => true
                                                    )
                                                }
                                                onMouseLeave={() =>
                                                    setIsHoverFavorite(
                                                        () => false
                                                    )
                                                }
                                            >
                                                <div className="flex h-fit w-fit flex-row items-center">
                                                    {isHoverFavorite ||
                                                    favorite ? (
                                                        <Favorite
                                                            sx={{
                                                                stroke: 'white',
                                                                strokeWidth:
                                                                    -0.5,
                                                                fontSize:
                                                                    '1rem',
                                                            }}
                                                        />
                                                    ) : (
                                                        <FavoriteBorder
                                                            sx={{
                                                                stroke: 'white',
                                                                strokeWidth:
                                                                    -0.5,
                                                                fontSize:
                                                                    '1rem',
                                                            }}
                                                        />
                                                    )}
                                                </div>

                                                <p className="m-0 text-xs">
                                                    Save for later
                                                </p>
                                            </button>

                                            {/* <select
                                                onChange={handleDeliverySelect}
                                                name="shipping-select"
                                                id="shipping-select"
                                                className=" daisy-select daisy-select-bordered daisy-select-sm w-full !rounded-none !text-xxs text-black"
                                            >
                                                <option
                                                    className=""
                                                    selected={true}
                                                    disabled
                                                >
                                                    Select delivery...
                                                </option>

                                                {!_.isEmpty(delivery) && (
                                                    <>
                                                        {[
                                                            _.get(
                                                                delivery,
                                                                'standard_delivery.0'
                                                            ),
                                                            ..._.filter(
                                                                _.get(
                                                                    delivery,
                                                                    'delivery_upgrades'
                                                                ),
                                                                {
                                                                    destination:
                                                                        'domestic',
                                                                }
                                                            ),
                                                        ]?.map((props) => {
                                                            return (
                                                                <ShippingSelectOption
                                                                    key={`${cartItem?._id}-${props?._id}`}
                                                                    {...props}
                                                                    cartItem={
                                                                        cartItem
                                                                    }
                                                                    delivery={
                                                                        delivery
                                                                    }
                                                                />
                                                            );
                                                        })}
                                                    </>
                                                )}
                                                <option
                                                    value={_.get(
                                                        delivery,
                                                        'standard_delivery.0.charges._id'
                                                    )}
                                                ></option>
                                            </select> */}
                                        </div>
                                    </div>
                                </section>
                                <div>
                                    <button
                                        type="button"
                                        // id="cart-close"
                                        className=" h-fit w-fit cursor-pointer rounded-full p-1 transition-all"
                                        onClick={() =>
                                            setIsRemoving(() => ({
                                                body: true,
                                                text: true,
                                            }))
                                        }
                                    >
                                        <CloseRounded className="!text-3xl" />
                                    </button>
                                </div>
                            </section>
                        </motion.section>
                    )}
                </AnimatePresence>
            </div>
        </motion.section>
    );
}

export default Cart_Item;
