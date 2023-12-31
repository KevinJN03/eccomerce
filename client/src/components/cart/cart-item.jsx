import heart from '../../assets/heart.png';
import QTY_SIZE_OPTION from './qty-size-options';
import close from '../../assets/icons/close.png';
import { useEffect, useRef, useState } from 'react';
import { useCart } from '../../context/cartContext';
import { Link } from 'react-router-dom';
import { AnimatePresence, animate, motion } from 'framer-motion';
const arrayRange = (start, stop, step) =>
    Array.from(
        { length: (stop - start) / step + 1 },
        (value, index) => start + index * step
    );

function Cart_Item({ product }) {
    const heart_icon_ref = useRef();

    const [quantity, setQuantity] = useState(product?.quantity);
    const [findSize, setFindSize] = useState(null);
    const [sizeOptionArray, setSizeOptionArray] = useState([]);
    const [findColor, setFindColor] = useState(null);
    let quantityArr = arrayRange(1, 10, 1);

    const qtyRef = useRef(null);
    const sizeRef = useRef(null);
    const { dispatch, cart } = useCart();
    const [removeItem, setRemoveItem] = useState(false);
    const handleRemove = (id) => {
        setRemoveItem(() => true);
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

    const variants = {
        initial: {
            opacity: 0,
            translateY: 50,
        },
        animate: {
            opacity: 1,
            translateY: 0,
            transition: { duration: 2 },
        },
        exit: {
            opacity: 0,
            duration: 4,
            transition: { duration: 4 },
        },
    };
    return (
        <section className="white relative flex h-full flex-row gap-x-4 px-4 py-4">
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
                            product.price?.previous > product.price.current
                                ? 'text-red-600'
                                : 'text-dark-gray'
                        }
                    >
                        £{product.price.current}
                    </span>
                    {product.price?.previous &&
                        product.price?.previous > product.price.current && (
                            <span className="text-[12px] font-medium text-[var(--grey)] line-through">
                                £{product.price?.previous}
                            </span>
                        )}
                </p>

                <div className=" bottom relative mt-2 flex h-full !max-h-full w-full flex-col justify-between">
                    <p className="w-11/12 text-gray-500">{product.title}</p>
                    <div className="cart-options">
                        {findColor && (
                            <span className="border-r-[1px] pr-2 text-s">
                                {findColor?.variation?.toUpperCase()}
                            </span>
                        )}
                        {product?.isVariation2Present && (
                            <div className="cursor-pointer border-r-[1px] pr-2">
                                <QTY_SIZE_OPTION
                                    handleOnChange={handleSizeChange}
                                    options={product?.variation2?.array}
                                    select={
                                        product?.variationSelect?.variation2
                                            ?.variation
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
                            <QTY_SIZE_OPTION
                                handleOnChange={handleQuantityChange}
                                options={quantityArr}
                                select={quantity}
                                ref={qtyRef}
                            />
                        </div>
                    </div>
                    <button type="button" id="save-later-btn" className="">
                        <img loading="lazy" src={heart} ref={heart_icon_ref} />
                        <p className="m-0 text-xs">Save for later</p>
                    </button>
                </div>
            </section>
        </section>
    );
}

export default Cart_Item;
