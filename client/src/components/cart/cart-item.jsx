import heart from '../../assets/heart.png';
import QTY_SIZE_OPTION from './qty-size-options';
import close from '../../assets/icons/close.png';
import { Fragment, useEffect, useRef, useState } from 'react';
import { useCart } from '../../context/cartContext';
import { Link } from 'react-router-dom';
import { AnimatePresence, animate, motion } from 'framer-motion';
import { CloseRounded, Favorite, FavoriteBorder } from '@mui/icons-material';

import Overlay from './overlay';
import getCartItemVariants from './cartItemVariants';
import { useHover } from '@uidotdev/usehooks';
import useWishListHook from '../../hooks/wishlistHook';
import Hearts from './hearts';
const arrayRange = (start, stop, step) =>
    Array.from(
        { length: (stop - start) / step + 1 },
        (value, index) => start + index * step
    );

function Cart_Item({ cartItem, idx, lastIndex }) {
    const [quantity, setQuantity] = useState(cartItem?.quantity);
    const [findSize, setFindSize] = useState(null);
    const [sizeOptionArray, setSizeOptionArray] = useState([]);
    const [findColor, setFindColor] = useState(null);
    const [isRemoving, setIsRemoving] = useState({ saveForLater: false });
    let quantityArr = arrayRange(1, 10, 1);

    const { dispatch, cart } = useCart();

    const handleRemove = () => {
        dispatch({ type: 'remove', cartId: cartItem.cartId });
    };

    const {
        isHoverFavorite,
        setIsHoverFavorite,
        favorite,
        setFavorite,
        handleWishlist,
    } = useWishListHook({
        product: cartItem,
    });

    const handleSizeChange = (e) => {
        const { id } =
            e.target.options[e.target.options.selectedIndex]?.dataset;

        let variationIndex = null;
        if (!cartItem?.isVariationCombine) {
            const findSizeVariation = [
                cartItem?.variation1,
                cartItem?.variation2,
            ].find((item, idx) => {
                if (item.title == 'Size') {
                    variationIndex = idx + 1;
                    return item;
                }
            });

            if (findSizeVariation?.array) {
                const foundVariation = findSizeVariation.array.find(
                    (item) => item.id == id
                );

                if (foundVariation) {
                    const updatedVariationSelect = {
                        ...cartItem?.variationSelect,
                        [`variation${variationIndex}`]: {
                            ...cartItem.variationSelect?.[
                                `variation${variationIndex}`
                            ],
                            ...foundVariation,
                        },
                    };

                    dispatch({
                        type: 'edit variation',
                        cartId: cartItem?.cartId,
                        variationSelect: updatedVariationSelect,
                    });
                }
            }
        } else {
            const selectedVariation1 =
                cartItem.variationSelect.variation1?.variation;
            const findVariation =
                cartItem?.combineVariation?.[selectedVariation1];

            if (findVariation) {
                const newVariation = findVariation[e.target.value];
                const updatedVariationSelect = {
                    ...cartItem.variationSelect,
                    variation2: {
                        ...cartItem.variationSelect.variation2,
                        ...newVariation,
                    },
                };

                // dispatch({
                //     type: 'edit variation',
                //     cartId: product?.cartId,
                //     variationSelect: updatedVariationSelect,
                // });
            }
        }
    };

    const handleQuantityChange = (e) => {
        setQuantity(() => e.target.value);
        dispatch({
            type: 'edit quantity',
            quantity: e.target.value,
            cartId: cartItem.cartId,
        });
    };

    useEffect(() => {
        const variationSelectArray = Object.entries(
            cartItem?.variationSelect
        ).map(([key, value]) => {
            if (value?.title == 'Colour') {
                setFindColor(() => ({
                    variation: value?.variation,
                    variationType: key,
                }));
            }

            if (value?.title == 'Size') {
                setFindSize(() => ({
                    variation: value?.variation,
                    variationType: key,
                }));

                setSizeOptionArray(() => cartItem?.[key]?.array || []);
            }
        });
    }, []);

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
                duration: 0.7,
            },
        },
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
                    {(isRemoving?.showOverlay) && (
                        <motion.div
                            key={`saveLaterOverlay-${cartItem.cartId}`}
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
                                        className=" text-sm font-medium"
                                    >
                                        Item saved for later
                                    </motion.p>
                                )}
                            </AnimatePresence>
                            {/* <div className="relative flex h-full w-full items-end justify-center"> */}
                            <AnimatePresence>
                                {[
                                    {
                                        left: 40,

                                        fontSize: 1,

                                        bottom: 1,
                                    },
                                    {
                                        left: 42,
                                        fontSize: 0.8,

                                        bottom: 2.3,
                                    },

                                    {
                                        fontSize: 0.6,
                                        left: 45,

                                        bottom: 1.7,
                                    },
                                    {
                                        left: 45,

                                        fontSize: 0.45,

                                        bottom: 3,
                                    },
                                ].map(
                                    (
                                        { left, top, fontSize, ml, bottom, mb },
                                        idx
                                    ) => {
                                        const variants = {
                                            initial: { opacity: 0 },
                                            animate: {
                                                opacity: 1,
                                                transition: {
                                                    duration: 0.3,
                                                    delay: 0.2 * (idx + 1),
                                                },
                                            },
                                            exit: {
                                                opacity: 0,
                                                transition: {
                                                    duration: 0.3,
                                                    delay: (4 - idx) * 0.2,
                                                },
                                            },
                                        };
                                        return (
                                            <AnimatePresence>
                                                {!isRemoving?.showOverlayOpacityOff && (
                                                    <motion.div
                                                        style={{
                                                            // marginBottom: `${mb}rem`

                                                            bottom: `${bottom}rem`,
                                                            left: `${left}%`,
                                                        }}
                                                        className={`absolute`}
                                                        key={`heart-${
                                                            idx + 1
                                                        }-${cartItem.cartId}`}
                                                        variants={variants}
                                                        initial={'initial'}
                                                        animate={'animate'}
                                                        exit={'exit'}
                                                        onAnimationComplete={(
                                                            e
                                                        ) => {
                                                            if (
                                                                idx == 0 &&
                                                                e == 'exit'
                                                            ) {
                                                                handleWishlist();
                                                                handleRemove();
                                                            }
                                                            if (
                                                                idx == 3 &&
                                                                e == 'animate'
                                                            ) {
                                                                setIsRemoving(
                                                                    (
                                                                        prevState
                                                                    ) => ({
                                                                        ...prevState,
                                                                        showOverlayOpacityOff: true,
                                                                        // showOverlay: false,
                                                                    })
                                                                );
                                                            }
                                                        }}
                                                    >
                                                        <Favorite
                                                            sx={{
                                                                fontSize:
                                                                    fontSize +
                                                                    'rem',
                                                            }}
                                                        />
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        );
                                    }
                                )}
                            </AnimatePresence>{' '}
                            {/* </div> */}
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
                                    to={`/product/${cartItem.id}`}
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
                                            {findColor && (
                                                <span className="border-r-[1px] pr-2 text-s text-black/70">
                                                    {findColor?.variation}
                                                </span>
                                            )}
                                            {cartItem?.isVariation2Present && (
                                                <div className="cursor-pointer border-r-[1px] pr-2">
                                                    <QTY_SIZE_OPTION
                                                        handleOnChange={
                                                            handleSizeChange
                                                        }
                                                        options={
                                                            cartItem?.variation2
                                                                ?.array
                                                        }
                                                        select={
                                                            cartItem
                                                                ?.variationSelect
                                                                ?.variation2
                                                                ?.variation
                                                        }
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
                                                        {quantityArr.map(
                                                            (item, index) => {
                                                                return (
                                                                    <option
                                                                        className="text-black/60"
                                                                        key={
                                                                            item
                                                                        }
                                                                        value={
                                                                            item
                                                                        }
                                                                        // selected = {}
                                                                        selected={
                                                                            item ==
                                                                            cartItem.quantity
                                                                        }
                                                                    >
                                                                        {item}
                                                                    </option>
                                                                );
                                                            }
                                                        )}
                                                    </select>
                                                </span>
                                            </div>
                                        </div>
                                        <button
                                            type="button"
                                            id="save-later-btn"
                                            className=""
                                            onClick={() => {
                                                // handleWishlist;

                                                setIsRemoving((prevState) => ({
                                                    ...prevState,
                                                    saveForLater: true,
                                                }));
                                            }}
                                            onMouseEnter={() =>
                                                setIsHoverFavorite(() => true)
                                            }
                                            onMouseLeave={() =>
                                                setIsHoverFavorite(() => false)
                                            }
                                        >
                                            <div className="h-fit w-fit">
                                                {isHoverFavorite || favorite ? (
                                                    <Favorite
                                                        sx={{
                                                            stroke: 'white',
                                                            strokeWidth: -0.5,
                                                            fontSize: '1rem',
                                                        }}
                                                    />
                                                ) : (
                                                    <FavoriteBorder
                                                        sx={{
                                                            stroke: 'white',
                                                            strokeWidth: -0.5,
                                                            fontSize: '1rem',
                                                        }}
                                                    />
                                                )}
                                            </div>

                                            <p className="m-0 text-xs">
                                                Save for later
                                            </p>
                                        </button>
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
