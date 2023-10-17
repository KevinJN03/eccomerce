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
import { useNewProduct } from '../../../../../../../context/newProductContext';
function Row({
    singleVariation,
    checkAll,
    setCheckAll,
    variationList,
    quantityOn,
    priceOn,
    selected,
    setSelected,
    update,
    combine,
    // setSingleVariation,
}) {
    const [error, setError] = useState({ price: null, stock: null });
    const [visible, setVisible] = useState(singleVariation?.visible || true);
    const [check, setCheck] = useState(false);
    const [price, setPrice] = useState(singleVariation?.price);
    const [stock, setStock] = useState(singleVariation?.stock);
    const [trigger, setTrigger] = useState(false);

    const { globalUpdate, setGlobalUpdate } = useNewProduct();
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

    useEffect(() => {
        // const newVariation

        // const { options } = variationList;

        // const newOptions = options.map((item) => {
        //     if (item.id == singleVariation.id) {
        //         return {
        //             ...item,
        //             disabled: !state,
        //             price: parseFloat(price).toFixed(2),
        //             stock: parseInt(stock),
        //         };
        //     }
        //     return item;
        // });

        // setVariations(
        //     variations.map((item) => {
        //         if (item.id == variationList.id) {
        //             return { ...item, options: newOptions };
        //         }
        //         return item;
        //     })
        // );


        // setSingleVariation((prevState) => {
        //     return {...prevState, visible, price, stock}
        // } )
    },
    [visible, stock, price]
    //  [state, stock, price]
    );

    useEffect(() => {
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
            selected.add(singleVariation.id);

            // const newSelectSet = new Set(selected)
        } else if (check == false) {
            setCheckAll(null);
            // const newSelectSet = new Set(selected)
            selected.delete(singleVariation.id);
            // setSelected((prevState) => prevState = newSelectSet)
        }

        setSelected((prevState) => (prevState = new Set(selected)));
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
        let timeout;
        const findItemInSelect = selected.has(singleVariation.id);
        if (findItemInSelect) {
            setTrigger(!trigger); 
        }

        setTimeout(() => {
            if (update.price != price && findItemInSelect) {
                setPrice(update.price);
                setError(clearError('price'));
            }
            if (update.quantity != stock && findItemInSelect) {
                setStock(update.quantity); 
                setError(clearError('stock'));
            }
        }, 200);
        return () => {
            clearTimeout(timeout);
        };
    }, [update.price, update.quantity]);

    useEffect(() => {
        if (globalUpdate.price != price) {
            setPrice(globalUpdate.price);
        }

        if (globalUpdate.stock != stock) {
            setStock(globalUpdate.stock);
        }
    }, [globalUpdate.price, globalUpdate.stock]);
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

    // const checkInSelect = selected.some((item) => item.id == variation.id);

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
            transition: { checked: { duration: 2 } },
        },
        uncheck: {
            opacity: 0.8,
            transition: { checked: { duration: 2 } },
        },
    };
    return (
        // <ClickAwayListener onClickAway={onClickAway}>
        <AnimatePresence>
            <motion.tr
                className={`h-full max-h-28 w-full min-w-full  ${
                    check && visible && '!bg-gray-200'
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
                            // onAnimationComplete={(definition) => {
                            //     console.log(
                            //         'Completed animating',
                            //         definition,
                            //         this.definition
                            //     );
                            // }}
                            variants={inputVariant}
                            animate={check ? 'check' : 'uncheck'}
                            initial={false}
                            type="checkbox"
                            className={`checkbox no-animation !rounded-[3px]`}
                            /* check && !variation.disabled */
                            checked={check && visible}
                            onChange={handleCheck}
                            disabled={!visible}
                        />
                    </td>
                )}

                <td
                    className={`pl-4   ${
                        (error.price || error.stock) && '!align-top'
                    } align-middle
                ${!visible && '!opacity-60 '}
                `}
                >
                    {singleVariation?.variation}
                </td>

                {combine && (
                    <td
                        className={`  ${
                            (error.price || error.stock) && '!align-top'
                        } align-middle
                ${!visible && '!opacity-60 '}
                `}
                    >
                        {singleVariation?.variation2}
                    </td>
                )}

                {priceOn && (
                    <>
                        <td className={`relative ${!visible && 'opacity-0'}`}>
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
                                    disabled={!visible}
                                />
                            </div>

                            {error.price && visible && (
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
                        <td className={`relative ${!visible && 'opacity-0'}`}>
                            <input
                                onChange={(e) => handleStock(e)}
                                value={stock}
                                type="number"
                                className={`input-number input input-lg w-full rounded-lg  px-2 py-4 ${
                                    error.stock && 'border-red-300 bg-red-200'
                                }`}
                                disabled={!visible}
                            />
                            {error.stock && visible && (
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
                                    !visible && '!opacity-0'
                                }`}
                            >
                                Sold out
                            </span>
                        )}
                        <Switch
                            state={visible}
                            toggle={() => setVisible(!visible)}
                        />
                    </div>
                </td>
            </motion.tr>
        </AnimatePresence>

        // </ClickAwayListener>
    );
}

export default Row;
