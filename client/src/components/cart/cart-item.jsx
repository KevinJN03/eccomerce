import heart from '../../assets/heart.png';
import QTY_SIZE_OPTION from './qty-size-options';
import close from '../../assets/icons/close.png';
import { Fragment, useEffect, useRef, useState } from 'react';
import { useCart } from '../../context/cartContext';
import { Link } from 'react-router-dom';
import { AnimatePresence, animate, motion } from 'framer-motion';
import { CloseRounded } from '@mui/icons-material';
const arrayRange = (start, stop, step) =>
    Array.from(
        { length: (stop - start) / step + 1 },
        (value, index) => start + index * step
    );

function Cart_Item({ product, idx, lastIndex }) {
    const heart_icon_ref = useRef();

    const [quantity, setQuantity] = useState(product?.quantity);
    const [findSize, setFindSize] = useState(null);
    const [sizeOptionArray, setSizeOptionArray] = useState([]);
    const [findColor, setFindColor] = useState(null);
    const [isRemoving, setIsRemoving] = useState(false);
    let quantityArr = arrayRange(1, 10, 1);

    const qtyRef = useRef(null);
    const sizeRef = useRef(null);
    const { dispatch, cart } = useCart();

    const handleRemove = (id) => {
        setIsRemoving(() => true);
        dispatch({ type: 'remove', cartId: product.cartId });
    };

    const onClick = () => {
        qtyRef.current.focus();
    };

    const handleSizeChange = (e) => {
        const { id } =
            e.target.options[e.target.options.selectedIndex]?.dataset;

        let variationIndex = null;
        if (!product?.isVariationCombine) {
            const findSizeVariation = [
                product?.variation1,
                product?.variation2,
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
                        ...product?.variationSelect,
                        [`variation${variationIndex}`]: {
                            ...product.variationSelect?.[
                                `variation${variationIndex}`
                            ],
                            ...foundVariation,
                        },
                    };

                    dispatch({
                        type: 'edit variation',
                        cartId: product?.cartId,
                        variationSelect: updatedVariationSelect,
                    });
                }
            }
        } else {
            console.log('variation iscombine', product);

            const selectedVariation1 =
                product.variationSelect.variation1?.variation;
            const findVariation =
                product?.combineVariation?.[selectedVariation1];

            if (findVariation) {
                const newVariation = findVariation[e.target.value];
                const updatedVariationSelect = {
                    ...product.variationSelect,
                    variation2: {
                        ...product.variationSelect.variation2,
                        ...newVariation,
                    },
                };

                console.log({
                    updatedVariationSelect,
                    newVariation,
                    variationSelect: product?.variationSelect,
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
            cartId: product.cartId,
        });
    };

    useEffect(() => {
        const variationSelectArray = Object.entries(
            product?.variationSelect
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

                setSizeOptionArray(() => product?.[key]?.array || []);
            }
        });
    }, []);

    const overlayVariant = {
        body: {
            initial: {
                scaleX: 0,
            },
            animate: {
                scaleX: 1,
                transition: {
                    duration: 0.8,
                },
            },
        },
        text: {
            initial: { opacity: 0, scale: 0.9 },
            animate: {
                opacity: 1,
                scale: 1,
                transition: {
                    duration: 0.5,
                    delay: 0.3,
                    ease: 'easeInOut',
                },
            },
            exit: {
                backgroundColor: '#00000',
                transition: {
                    duration: 0.2,
                },
            },
        },
    };

    const variants = {
        product: {
            exit: {
                opacity: 0,
                transition: {
                    delay: 0.6,
                },
            },
        },

        section: {
            initial: { height: 'auto', translateY: 50, scale: 1 },
            animate: {
                translateY: 0,
                height: 'auto',
                scale: 1,
                transition: {
                    duration: 2,
                    delay: 2,
                    translateY: {
                        duration: 0.7,
                        delay: 0.2 * idx,
                    },
                },
            },
            exit: {
                height: '0px',
                opacity: 0,
                scale: 0.8,
                backgroundColor: '#00000',
                transition: {
                    duration: 0.7,
                    delay: 1.2,
                    height: {
                        duration: 0.7,
                        delay: 1.2,
                    },

                    scale: {
                        delay: 1,
                        duration: 0.2,
                    },
                    opacity: {
                        delay: 1,
                        duration: 0.2,
                    },
                },
            },
        },
    };

    return (
        <motion.section
            variants={variants.section}
            animate={'animate'}
            exit={'exit'}
            initial={'initial'}
            className={`white relative box-content flex h-full max-h-44  ${
                !lastIndex ? 'border-b-2 ' : ''
            }`}
        >
            <AnimatePresence>
                {isRemoving && (
                    <>
                        {' '}
                        <motion.div
                            key={'body' + product.cartId}
                            variants={overlayVariant.body}
                            animate={'animate'}
                            initial={'initial'}
                            className=" absolute left-0 top-0 z-[1] flex h-full  w-full origin-top-right border-b-2 bg-light-grey !py-4"
                        ></motion.div>
                        <motion.div
                            key={'text' + product.cartId}
                            variants={overlayVariant.text}
                            animate={'animate'}
                            initial={'initial'}
                            exit={'exit'}
                            className=" absolute left-0 top-0 z-[1] flex h-full w-full flex-col items-center justify-center  "
                        >
                            <CloseRounded className="!text-3xl " />
                            <p className="text-sm !text-black">Item Deleted</p>
                        </motion.div>
                    </>
                )}

                {!isRemoving && (
                    <motion.section
                        key={'product' + product.cartId}
                        variants={variants.product}
                        animate={'animate'}
                        exit={'exit'}
                        initial={'initial'}
                        className="white relative flex h-full w-full flex-row gap-x-4 px-4 py-4"
                    >
                        <button
                            type="button"
                            id="cart-close"
                            className="h-full w-full hover:bg-slate-100"
                            onClick={() => handleRemove(product.cartId)}
                        >
                            <img loading="lazy" src={close} />{' '}
                        </button>

                        <Link
                            to={`/product/${product.id}`}
                            className="cart-img-container min-h-full"
                        >
                            <img
                                src={product.images[0]}
                                className="h-[140px] w-full max-w-[110px] object-cover"
                            ></img>
                        </Link>
                        <section
                            id="cart-info"
                            className="flex !min-h-full flex-col flex-nowrap"
                        >
                            <p className="flex gap-x-3 text-sm font-bold tracking-wider text-[var(--primary-2)]">
                                <span
                                    className={
                                        product.price?.previous >
                                        product.price.current
                                            ? 'text-red-600'
                                            : 'text-dark-gray'
                                    }
                                >
                                    £{product.price.current}
                                </span>
                                {product.price?.previous &&
                                    product.price?.previous >
                                        product.price.current && (
                                        <span className="text-[12px] font-medium text-[var(--grey)] line-through">
                                            £{product.price?.previous}
                                        </span>
                                    )}
                            </p>

                            <div className=" bottom relative mt-2 flex h-full !max-h-full w-full flex-col justify-between">
                                <p className="w-11/12 text-gray-500">
                                    {product.title}
                                </p>
                                <div className="cart-options">
                                    {findColor && (
                                        <span className="border-r-[1px] pr-2 text-s">
                                            {findColor?.variation?.toUpperCase()}
                                        </span>
                                    )}
                                    {product?.isVariation2Present && (
                                        <div className="cursor-pointer border-r-[1px] pr-2">
                                            <QTY_SIZE_OPTION
                                                handleOnChange={
                                                    handleSizeChange
                                                }
                                                options={
                                                    product?.variation2?.array
                                                }
                                                select={
                                                    product?.variationSelect
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
                                        {/* <QTY_SIZE_OPTION
                                handleOnChange={handleQuantityChange}
                                options={quantityArr}
                                select={quantity}
                                ref={qtyRef}
                            /> */}

                                        <span id="qty-select">
                                            {/* <label htmlFor="qty-select">{}</label> */}
                                            <select
                                                onChange={handleQuantityChange}
                                                name="quantity-select"
                                                id="qty-size-select"
                                                className="!max-w-[80px] text-s"
                                                tabIndex={'0'}
                                            >
                                                {quantityArr.map(
                                                    (item, index) => {
                                                        return (
                                                            <option
                                                                key={item}
                                                                value={item}
                                                                // selected = {}
                                                                selected={
                                                                    item ==
                                                                    product.quantity
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
                                >
                                    <img
                                        loading="lazy"
                                        src={heart}
                                        ref={heart_icon_ref}
                                    />
                                    <p className="m-0 text-xs">
                                        Save for later
                                    </p>
                                </button>
                            </div>
                        </section>
                    </motion.section>
                )}
            </AnimatePresence>
        </motion.section>
    );
}

export default Cart_Item;
