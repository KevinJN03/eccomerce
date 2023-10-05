import Switch from '../toggleSwitch/switch';
import { useEffect, useRef, useState } from 'react';
import OptionError from '../error/optionError';
import formatData from '../formatData';
import ErrorAlert from '../error/errorAlert';
import { ClickAwayListener } from '@mui/base/ClickAwayListener';

import {
    motion,
    AnimatePresence,
    easeIn,
    easeOut,
    easeInOut,
} from 'framer-motion';
function Row({
    variation,
    checkAll,
    setCheckAll,
    variationList,

    quantityOn,
    priceOn,
    selected,
    setSelected,
    update,
    combine,
}) {
    const [error, setError] = useState({ price: null, stock: null });
    const [state, setState] = useState(true);
    const [check, setCheck] = useState(false);
    const [price, setPrice] = useState();
    const [stock, setStock] = useState();
    const [trigger, setTrigger] = useState(false);
    const onClickAway = () => {
        //         console.log('clickaway');
        //         if (isNaN(price) && isNaN(stock)) {
        //             return;
        //         } else {
        //             console.log('clickaway change State');
        //             const newPrice = formatData(price, 2);
        //             const newStock = formatData(stock, 0);
        //   console.table({previousPrice, previousStock, newPrice, price})
        //             setPrice(newPrice);
        //             setStock(newStock);
        //         }
    };

    // useEffect(() => {
    //     // const newVariation

    //     const { options } = variationList;

    //     const newOptions = options.map((item) => {
    //         if (item.id == variation.id) {
    //             return {
    //                 ...item,
    //                 disabled: !state,
    //                 price: parseFloat(price).toFixed(2),
    //                 stock: parseInt(stock),
    //             };
    //         }
    //         return item;
    //     });

    //     setVariations(
    //         variations.map((item) => {
    //             if (item.id == variationList.id) {
    //                 return { ...item, options: newOptions };
    //             }
    //             return item;
    //         })
    //     );
    // },
    // [updater]
    // //  [state, stock, price]
    // );

    useEffect(() => {
        const count = variationList.options.length;

        if (checkAll == 'clear') {
            setCheck(false);
            return;
        }
        if (checkAll == true) {
            // debugger
            setCheck(true);
        } else if (checkAll == false) {
            setCheck(false);
        }
    }, [checkAll]);

    useEffect(() => {
        const count = variationList.options.length;

        if (check == true) {
            setSelected((prevState) => [
                ...prevState,
                { ...variation, price, stock },
            ]);
        } else if (check == false) {
            setCheckAll(null);
            setSelected((prevState) => {
                return [...prevState].filter((item) => item.id != variation.id);
            });
        }
    }, [check]);
    const handleCheck = (e) => {
        console.log('handleCheck');
        e.stopPropagation();
        setCheck(!check);
    };

    // once update is apply, update input field

    const clearError = (property) => {
        const newObj = { ...error };
        delete newObj[property];
        return newObj;
    };
    useEffect(() => {
        const findItemInSelect = selected.some(
            (item) => item.id == variation.id
        );
        if (findItemInSelect) {
            setTrigger(!trigger);
        }
        if (update.quantity != stock && findItemInSelect) {
            setStock(update.quantity);
        }
        setError(clearError('stock'));
    }, [update.quantity]);

    useEffect(() => {
        const findItemInSelect = selected.some(
            (item) => item.id == variation.id
        );
        if (findItemInSelect) {
            setTrigger(!trigger);
        }
        if (update.price != price && findItemInSelect) {
            setPrice(update.price);
        }
        setError(clearError('price'));
    }, [update.price]);

    const handlePrice = (e) => {
        e.stopPropagation();
        const value = e.target.value;
        if (!value) {
            setError({ ...error, price: 'Please enter a valid price.' });
        } else if (value == 0) {
            setError({
                ...error,
                price: 'Price must be between £0.99 and £42,977.48',
            });
        } else {
            setError(clearError('price'));
        }

        setPrice(value);
    };

    const handleStock = (e) => {
        e.stopPropagation();
        const value = e.target.value;
        if (!value) {
            setError({ ...error, stock: 'Please enter a valid quantity.' });
        } else {
            setError(clearError('stock'));
        }
        setStock(value);
    };

    const soldOut = () => {
        const newArr = Array.from(String(stock));
        if (newArr.length > 0) {
            let check = newArr.every((item) => item == '0');
            return check;
        } else {
            return null;
        }
    };

    const handleVisibility = (e) => {
        console.log('e', e);
        setState(!state);
    };

    const checkInSelect = selected.some((item) => item.id == variation.id);

    // className={`h-full max-h-28 w-full min-w-full ${
    //     state && '!hover:bg-[var(--light-grey)]'
    // } ${check && state && '!bg-gray-200'}`}
    // exit={{ background:  '#fffff', }}
    // role="presentation"
    const tableRowVariants = {
        initial: {
            opacity: 1,
            y: '0%',
            backgroundColor: '#FFFFFF',
        },

        animate: {
            opacity: 1,
            y: '0%',
            backgroundColor: ['#dcf8d2', '#FFFFFF'],
            transition: {
                duration: 2,
                ease: easeInOut,
                backgroundColor: { delay: 2 },
            },
        },
        // hover: {
        //       backgroundColor: state ? '#eee' : '#FFFFFF',
        //     //   scale: state ? 1.01 : 1,
        //       transition:{type: 'spring', stiffness: 30, duration: 0  }
        // },

        // exit: {backgroundColor: '#FFFFFF'}
    };

    const inputVariant = {
        check: {
            opacity: 1,
            backgroundColor: '#dcf8d2',
            transition: { checked:{ duration: 2} },
        },
        uncheck: {
            opacity: 0.8,
            transition: {  checked:{ duration: 2} },
        },
    };
    return (
        // <ClickAwayListener onClickAway={onClickAway}>
        <AnimatePresence>
            <motion.tr
                className={`h-full max-h-28 w-full min-w-full  ${
                    check && state && '!bg-gray-200'
                }`}
                key={trigger}
                variants={tableRowVariants}
                initial="initial"
                animate="animate"
                whileHover="hover"
                exit="exit"
            >
                {(priceOn || quantityOn) && (
                    <td
                        className={` ${
                            (error.price || error.stock) && '!align-top'
                        } align-middle`}
                    >
                        <motion.input
                            key={check}
                            onAnimationComplete={definition => {
                                console.log('Completed animating', definition, this.definition)}}
                            variants={inputVariant}
                            animate={check ? 'check' : 'uncheck'}
                            initial={false}
                          
                            type="checkbox"
                            className={`checkbox no-animation !rounded-[3px]`}
                            /* check && !variation.disabled */
                            checked={check && state}
                            onChange={handleCheck}
                            disabled={!state}
                        />
                    </td>
                )}

                <td
                    className={`pl-4   ${
                        (error.price || error.stock) && '!align-top'
                    } align-middle
                ${!state && '!opacity-60 '}
                `}
                >
                    {variation.variation}
                </td>

                {combine && (
                    <td
                        className={`  ${
                            (error.price || error.stock) && '!align-top'
                        } align-middle
                ${!state && '!opacity-60 '}
                `}
                    >
                        {variation.variation2}
                    </td>
                )}

                {priceOn && (
                    <>
                        <td className={`relative ${!state && 'opacity-0'}`}>
                            <div className="relative">
                                <span className="pound absolute left-2 top-2/4 translate-y-[-50%] font-medium">
                                    £
                                </span>
                                <input
                                    type="number"
                                    step=".01"
                                    className={`price-input input-number input input-lg w-full rounded-lg px-4 py-4 ${
                                        error.price &&
                                        'border-red-300 bg-red-200'
                                    }`}
                                    onChange={(e) => handlePrice(e)}
                                    value={price}
                                    disabled={!state}
                                />
                            </div>

                            {error.price && state && (
                                <OptionError
                                    msg={error.price}
                                    className={'!items-start'}
                                />
                            )}
                        </td>
                    </>
                )}

                {quantityOn && (
                    <>
                        <td className={`relative ${!state && 'opacity-0'}`}>
                            <input
                                onChange={(e) => handleStock(e)}
                                value={stock}
                                type="number"
                                className={`input-number input input-lg w-full rounded-lg  px-2 py-4 ${
                                    error.stock && 'border-red-300 bg-red-200'
                                }`}
                                disabled={!state}
                            />
                            {error.stock && state && (
                                <OptionError
                                    msg={error.stock}
                                    className={'!items-start'}
                                />
                            )}
                        </td>
                    </>
                )}

                <td
                    className={` ${
                        !error.stock &&
                        !error.price &&
                        '!ml-auto w-full !min-w-full !align-middle'
                    }  !text-right`}
                >
                    <div className="flex h-auto items-center justify-end">
                        {soldOut() && (
                            <span
                                className={`mr-4 flex h-5 items-center justify-center rounded-full bg-black px-2 py-2 text-s text-white ${
                                    !state && '!opacity-0'
                                }`}
                            >
                                Sold out
                            </span>
                        )}
                        <Switch state={state} toggle={handleVisibility} />
                    </div>
                </td>
            </motion.tr>
        </AnimatePresence>

        // </ClickAwayListener>
    );
}

export default Row;
