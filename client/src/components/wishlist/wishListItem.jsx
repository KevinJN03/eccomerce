import { useWishlistContext } from '../../context/wishlistContext';
import delete_icon from '../../assets/icons/delete-icon.png';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useAddItemToBagHook from '../../hooks/addItemToBagHook';
import AddToCart from '../Item_page/addToCart';
import { v4 as uuidv4 } from 'uuid';

import { AnimatePresence, motion } from 'framer-motion';
import _ from 'lodash';
function WishListItem(props) {
    console.log('wishlistItemHook render');
    const { variation_data } = props;

    const { removeItem } = useWishlistContext();
    const [isDisabled, setDisable] = useState(true);
    const [remove, setRemove] = useState({ parent: false, child: false });

    const [variation1, setVariation1] = useState(() => {
        if (props?.isVariation1Present && props.variation1.array?.length == 1) {
            return props.variation1.array[0]?.variation;
        }
        return null;
    });
    const [variation2, setVariation2] = useState(() => {
        if (props?.isVariation2Present && props.variation2.array?.length == 2) {
            return props.variation2.array[0]?.variation;
        }
        return null;
    });

    const [stockState, setStockState] = useState();
    const [stockState2, setStockState2] = useState();

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
    } = useAddItemToBagHook({ product: props });

    useEffect(() => {
        if (stockState <= 0) {
            setOutOfStock(() => true);
        } else {
            setOutOfStock(() => false);
        }

        if (stockState2 <= 0) {
            setOutOfStock(() => true);
        } else {
            setOutOfStock(() => false);
        }
    }, [stockState, stockState2]);

    // useEffect(() => {
    //     wishListDispatch({
    //         type: 'updateVariationSelect',
    //         wishlistId: product.wishlistId,
    //         variationSelect,

    //         product_id: product._id
    //     });
    // }, [variationSelect]);

    const variants = {
        parent: {
            exit: {
                scaleX: 0,
                width: '0px',

                transition: {
                    duration: 0.3,
                    ease: 'easeInOut',
                },
            },
        },
        child: {
            exit: {
                opacity: 0,
                scale: 0,
                transition: {
                    duration: 0.3,
                    ease: 'easeIn',
                },
            },
        },
    };

    useEffect(() => {
        if (error?.on) {
            console.log({ error });

            setRemove(() => ({ parent: false, child: false }));
        }
    }, [error]);
    return (
        <AnimatePresence>
            {!remove.parent && (
                <motion.section
                    key={`id-${props._id}`}
                    className="h-fit w-[19.75rem]  max-w-[19.75rem] origin-right"
                    initial={false}
                    animate={false}
                    variants={variants.parent}
                    exit={'exit'}
                    onAnimationComplete={(e) => {
                        if (remove.addToCart) {
                            handleAddToCart();
                        }
                        // handleDelete(props._id);
                        // removeItem({ itemId: props?._id });
                    }}
                >
                    <AnimatePresence>
                        {!remove.child && (
                            <motion.section
                                onAnimationComplete={(e) => {
                                    if (e == 'exit') {
                                        setRemove(() => ({
                                            child: true,
                                            parent: true,
                                        }));

                                        // removeItem({ itemId: props?._id });
                                        // handleDelete(product._id);
                                    }
                                }}
                                variants={variants.child}
                                exit={'exit'}
                                className="relative flex h-full  w-full flex-col gap-3 pr-2"
                            >
                                <div
                                    className="absolute right-4 top-2 rounded-full bg-white p-1.5 transition-all hover:bg-light-grey"
                                    onClick={() =>
                                        setRemove(() => ({
                                            child: true,
                                            addToCart: false,
                                        }))
                                    }
                                >
                                    <img
                                        src={delete_icon}
                                        className="h-6 w-6"
                                    />
                                </div>
                                <Link
                                    to={`/product/${props?.product_id}`}
                                    className="img-wrap"
                                >
                                    <img
                                        className={
                                            'h-[25rem] w-full object-cover'
                                        }
                                        src={props?.images[0]}
                                        alt=""
                                    />
                                </Link>

                                <div className="flex h-fit flex-col gap-3">
                                    <p className="h-12 overflow-hidden text-ellipsis   text-sm ">
                                        {props?.title}
                                    </p>

                                    <p className="text-sm font-semibold">
                                        £{priceState}
                                    </p>
                                    <div className="variation-selection border-b-2 ">
                                        {[
                                            {
                                                index: 1,
                                                currentVariation:
                                                    variationSelect?.variation1,
                                                stockState,
                                                setStockState,
                                            },
                                            {
                                                index: 2,
                                                currentVariation:
                                                    variationSelect?.variation2,
                                                stockState: stockState2,
                                                setStockState: setStockState2,
                                            },
                                        ].map(
                                            ({
                                                index,
                                                currentVariation,
                                                stockState,
                                                setStockState,
                                            }) => {
                                                const variationArray = _.get(
                                                    props,
                                                    `variation_data.variation${index}_data.array`
                                                );
                                                return (
                                                    <div
                                                        key={uuidv4()}
                                                        className="border-t-2"
                                                    >
                                                        {variationArray?.length ==
                                                        // props?.[
                                                        //     `variation${index}`
                                                        // ]?.array.length

                                                        1 ? (
                                                            <p className="flex h-12 items-center text-left">
                                                                {
                                                                    currentVariation?.variation
                                                                }
                                                            </p>
                                                        ) : variationArray?.length >
                                                          1 ? (
                                                            <select
                                                                onChange={(
                                                                    e
                                                                ) => {
                                                                    handleOnChange(
                                                                        {
                                                                            e,
                                                                            stockState,
                                                                            setStockState,
                                                                            property: `variation${index}`,
                                                                        }
                                                                    );
                                                                }}
                                                                name={`variation${index}`}
                                                                id={`variation${index}-select`}
                                                                className="daisy-select daisy-select-md !mx-0 w-full rounded-sm border-0  !px-0  focus:outline-offset-0 focus:outline-black   "
                                                            >
                                                                <option
                                                                    disabled
                                                                    selected
                                                                >
                                                                    Select{' '}
                                                                    {props?.[
                                                                        `variation${index}`
                                                                    ]?.title ||
                                                                        'option'}
                                                                </option>
                                                                {variationArray?.map(
                                                                    (
                                                                        item,
                                                                        idx
                                                                    ) => {
                                                                        return (
                                                                            // <option
                                                                            //     value={
                                                                            //         variation
                                                                            //     }
                                                                            // >
                                                                            //     {variation}
                                                                            // </option>

                                                                            <option
                                                                                selected={
                                                                                    item?.id ==
                                                                                    currentVariation?.id
                                                                                }
                                                                                // value={property ? { ...item } : item}
                                                                                key={
                                                                                    item?.id
                                                                                }
                                                                                data-id={
                                                                                    item?.id
                                                                                }
                                                                                data-variation={
                                                                                    item?.variation
                                                                                }
                                                                                data-price={
                                                                                    item?.price
                                                                                }
                                                                                data-stock={
                                                                                    item?.stock
                                                                                }
                                                                            >
                                                                                {`${
                                                                                    item[
                                                                                        'variation'
                                                                                    ] ||
                                                                                    item
                                                                                }${
                                                                                    item?.stock ==
                                                                                    0
                                                                                        ? ' - Out of Stock'
                                                                                        : ''
                                                                                }`}
                                                                            </option>
                                                                        );
                                                                    }
                                                                )}
                                                            </select>
                                                        ) : (
                                                            <p className="flex h-12 items-center text-left">
                                                                {'No variation'}
                                                            </p>
                                                        )}
                                                    </div>
                                                );
                                            }
                                        )}
                                    </div>
                                </div>

                                <div className="flex h-fit w-full  ">
                                    {/* <AddToCart
                                handleAddToCart={() =>
                                    setRemove(() => ({
                                        on: true,
                                        addToCart: true,
                                    }))
                                }
                                isOutOfStock={isOutOfStock}
                            /> */}

                                    <button
                                        onClick={() =>
                                            setRemove(() => ({
                                                child: true,
                                                addToCart: true,
                                            }))
                                        }
                                        disabled={
                                            (props.isVariation1Present &&
                                                !variationSelect.variation1
                                                    .variation) ||
                                            (props.isVariation2Present &&
                                                !variationSelect.variation2
                                                    .variation)
                                        }
                                        className="w-full border-2 border-primary-green py-1.5 font-gotham text-sm hover:border-green-900 disabled:border-black disabled:bg-black disabled:text-white disabled:opacity-45"
                                    >
                                        MOVE TO BAG
                                    </button>
                                </div>
                                {error?.on && (
                                    <div className="border border-red-400 bg-red-100 p-2">
                                        <p>{error?.msg}</p>
                                    </div>
                                )}
                            </motion.section>
                        )}
                    </AnimatePresence>
                </motion.section>
            )}
        </AnimatePresence>
    );
}

export default WishListItem;
