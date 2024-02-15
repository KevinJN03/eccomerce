import heart from '../../assets/heart.png';
import QTY_SIZE_OPTION from './qty-size-options';
import close from '../../assets/icons/close.png';
import { Fragment, useEffect, useRef, useState } from 'react';
import { useCart } from '../../context/cartContext';
import { Link } from 'react-router-dom';
import { AnimatePresence, animate, motion } from 'framer-motion';
import { CloseRounded } from '@mui/icons-material';

import Overlay from './overlay';
import getCartItemVariants from './cartItemVariants';
const arrayRange = (start, stop, step) =>
    Array.from(
        { length: (stop - start) / step + 1 },
        (value, index) => start + index * step
    );

function Cart_Item({ cartItem, idx, lastIndex }) {
    const heart_icon_ref = useRef();

    const [quantity, setQuantity] = useState(cartItem?.quantity);
    const [findSize, setFindSize] = useState(null);
    const [sizeOptionArray, setSizeOptionArray] = useState([]);
    const [findColor, setFindColor] = useState(null);
    const [isRemoving, setIsRemoving] = useState({});
    let quantityArr = arrayRange(1, 10, 1);

    const qtyRef = useRef(null);
    const sizeRef = useRef(null);
    const { dispatch, cart } = useCart();

    const handleRemove = (id) => {
        dispatch({ type: 'remove', cartId: cartItem.cartId });
    };

    const onClick = () => {
        qtyRef.current.focus();
    };

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
            console.log('variation iscombine', cartItem);

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

                console.log({
                    updatedVariationSelect,
                    newVariation,
                    variationSelect: cartItem?.variationSelect,
                });

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

    return (
        <motion.section
            variants={cartItemVariants.section}
            animate={'animate'}
            exit={'exit'}
            initial={'initial'}
            className={` relative flex h-full max-h-44`}
        >
            <Overlay
                isRemoving={isRemoving}
                setIsRemoving={setIsRemoving}
                handleRemove={handleRemove}
                enableBodyExit
            />
            <section
                className={`w-full bg-white p-4 pb-0 ${
                    isRemoving?.complete ? 'opacity-0' : 'opacity-100'
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
                        <p className="flex gap-x-3 text-sm font-bold tracking-wider text-[var(--primary-2)]">
                            <span
                                className={
                                    cartItem.price?.previous >
                                    cartItem.price.current
                                        ? 'text-red-600'
                                        : 'text-dark-gray'
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
                            <p className="w-11/12 text-gray-500">
                                {cartItem.title}
                            </p>
                            <div className="cart-options">
                                {findColor && (
                                    <span className="border-r-[1px] pr-2 text-s">
                                        {findColor?.variation?.toUpperCase()}
                                    </span>
                                )}
                                {cartItem?.isVariation2Present && (
                                    <div className="cursor-pointer border-r-[1px] pr-2">
                                        <QTY_SIZE_OPTION
                                            handleOnChange={handleSizeChange}
                                            options={
                                                cartItem?.variation2?.array
                                            }
                                            select={
                                                cartItem?.variationSelect
                                                    ?.variation2?.variation
                                            }
                                            type="size"
                                        />
                                        <div className="border-r-2 pr-2"></div>
                                    </div>
                                )}
                                <div
                                    className="flex !cursor-pointer flex-nowrap  gap-x-2"
                                    onClick={onClick}
                                >
                                    <p>Qty</p>

                                    <span id="qty-select">
                                        <select
                                            onChange={handleQuantityChange}
                                            name="quantity-select"
                                            id="qty-size-select"
                                            className="!max-w-[80px] text-s"
                                            tabIndex={'0'}
                                        >
                                            {quantityArr.map((item, index) => {
                                                return (
                                                    <option
                                                        key={item}
                                                        value={item}
                                                        // selected = {}
                                                        selected={
                                                            item ==
                                                            cartItem.quantity
                                                        }
                                                    >
                                                        {item}
                                                    </option>
                                                );
                                            })}
                                        </select>
                                    </span>
                                </div>
                            </div>
                            <button
                                type="button"
                                id="save-later-btn"
                                className=""
                            >
                                <img
                                    loading="lazy"
                                    src={heart}
                                    ref={heart_icon_ref}
                                />
                                <p className="m-0 text-xs">Save for later</p>
                            </button>
                        </div>
                    </section>
                    <div>
                        <button
                            type="button"
                            // id="cart-close"
                            className=" h-fit w-fit rounded-full p-1 transition-all cursor-pointer"
                            onClick={() =>
                                setIsRemoving(() => ({
                                    body: true,
                                    text: true,
                                }))
                            }
                        >
                            <CloseRounded  className='!text-3xl'/>
                        </button>
                    </div>
                </section>
            </section>
        </motion.section>
    );
}

export default Cart_Item;
