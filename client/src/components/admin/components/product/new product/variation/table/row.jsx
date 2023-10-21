import Switch from '../toggleSwitch/switch';
import { useEffect, useState } from 'react';
import OptionError from '../error/optionError';
import formatData from '../formatData';
import { Input } from '../../utils/Input';
import '../../new_product.scss';
import { ClickAwayListener } from '@mui/material';
import handleValue from '../../utils/handleValue';
import { motion, AnimatePresence, easeInOut } from 'framer-motion';
import { useNewProduct } from '../../../../../../../context/newProductContext';
import { useVariation } from '../../../../../../../context/variationContext';
import { priceOptions, quantityOptions } from '../../utils/handleValueOptions';
function Row({
    singleVariation,
    checkAll,
    setCheckAll,
    variationList,
    isQuantityHeaderOn,
    isPriceHeaderOn,
    selected,
    setSelected,
    update,
    isCombine,
    setCombine,
    // setSingleVariation,
}) {
    const [error, setError] = useState({ price: null, stock: null });
    const [visible, setVisible] = useState(singleVariation?.visible || true);
    const [inputCheck, setInputCheck] = useState(false);

    const { check } = useVariation();
    const [price, setPrice] = useState(singleVariation?.price || '');
    const [stock, setStock] = useState(singleVariation?.stock || '');
    const [trigger, setTrigger] = useState(false);

    const { globalUpdate, setVariations } = useNewProduct();

    useEffect(() => {
        if (check == true) {
            console.log('onclickAway trigger');
            onClickAway();
        }

        // updateList(price, stock)
    }, [check]);

    // useEffect(() => {
    //     updateList();
    // }, [updater]);
    useEffect(() => {
        if (checkAll == 'clear') {
            setInputCheck(() => false);
            return;
        }
        if (checkAll == true) {
            // debugger
            setInputCheck(() => true);
        } else if (checkAll == false) {
            setInputCheck(() => false);
        }
    }, [checkAll]);

    useEffect(() => {
        const count = variationList.options.length;

        if (inputCheck == true) {
            selected.set(singleVariation.id, singleVariation);
        } else if (inputCheck == false) {
            setCheckAll(null);

            selected.delete(singleVariation.id);
        }

        setSelected((prevState) => new Map(selected));
    }, [inputCheck]);
    const handleCheck = (e) => {
        console.log('handleCheck');
        e.stopPropagation();
        setInputCheck(!inputCheck);
    };

    // once update is apply, update input field

    useEffect(() => {
        let timeout;
        const findItemInSelect = selected.has(singleVariation.id);

        if (findItemInSelect == false) return;
        setTrigger(!trigger);
        updateList(update.price, update.quantity);
        setTimeout(() => {
            if (update.price != price && findItemInSelect) {
                setPrice(update.price);
                setError((prevState) => {
                    return { ...prevState, price: null };
                });
            }
            if (update.quantity != stock && findItemInSelect) {
                setStock(update.quantity);
                setError((prevState) => {
                    return { ...prevState, stock: null };
                });
            }
        }, 150);
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
     
        const options = {
            ...priceOptions,
            value,
            setValue: setPrice,
            setError,
        };

        handleValue(options);
    };

    function onClickAway() {

        if (
            (!price && !stock) ||
            (singleVariation.price == price &&
                singleVariation.stock == stock &&
                singleVariation.visible == visible)
        ) {
            return;
        }
        console.log({ singleVariation, price, stock });
        console.log('clickaway pass');
        const newPrice = formatData(price, 2);
        const newStock = formatData(stock, 0);
        setPrice(() => newPrice);
        setStock(() => newStock);
        updateList(newPrice, newStock);
        // setUpdater((prevState) => !prevState);
    }

    function updateList(priceState, stockState) {
        console.log('update row');
        const { options } = variationList;
        // get the variation, then update variation
        const newObj = options.get(singleVariation.id);
        newObj.price = priceState;
        newObj.stock = stockState;
        newObj.visible = visible;
        const newOptions = new Map(options).set(singleVariation.id, newObj);
        if (!isCombine) {
            setVariations((prevState) => {
                return prevState.map((item) => {
                    if (item.id == variationList.id) {
                        return { ...item, options: newOptions };
                    }
                    return item;
                });
            });
        } else {
            setCombine((prevState) => {
                return { ...prevState, options: newOptions };
            });
        }
    }
    const handleStock = (e) => {
        e.stopPropagation();
        const value = e.target.value;
        const options = {
            ...quantityOptions,
            value,
            setValue: setStock,
            setError,
        };
        handleValue(options);
    };

    const soldOut = () => {
        const newArr = Array.from(String(stock));
        if (newArr.length > 0) {
            let inputCheck = newArr.every((item) => item == '0');
            return inputCheck;
        } else {
            return null;
        }
    };
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
        inputCheck: {
            opacity: 1,
            backgroundColor: '#dcf8d2',
            transition: { checked: { duration: 2 } },
        },
        uncheck: {
            opacity: 0.8,
            transition: { checked: { duration: 2 } },
        },
    };

    const inputPriceProps = {
        value: price,
        property: 'price',
        handleOnchange: handlePrice,
        error,
        visible,
    };

    const inputStockProps = {
        value: stock,
        property: 'stock',
        handleOnchange: handleStock,
        error,
        visible,
    };
    return (
        <AnimatePresence>
            <ClickAwayListener onClickAway={onClickAway}>
                <motion.tr
                    className={`h-full max-h-28 w-full min-w-full  ${
                        inputCheck && visible && '!bg-gray-200'
                    }`}
                    key={trigger}
                    variants={tableRowVariants}
                    initial="initial"
                    animate="animate"
                    whileHover="hover"
                    exit="exit"
                >
                    {(isPriceHeaderOn || isQuantityHeaderOn) && (
                        <td
                            className={` ${
                                (error.price || error.stock) && '!align-top'
                            } align-middle`}
                        >
                            <motion.input
                                id={`check-${singleVariation.id}`}
                                name={`check-${singleVariation.id}`}
                                key={inputCheck}
                                // onAnimationComplete={(definition) => {
                                //     console.log(
                                //         'Completed animating',
                                //         definition,
                                //         this.definition
                                //     );
                                // }}
                                variants={inputVariant}
                                animate={inputCheck ? 'inputCheck' : 'uncheck'}
                                initial={false}
                                type="checkbox"
                                className={`checkbox no-animation !rounded-[3px]`}
                                /* inputCheck && !variation.disabled */
                                checked={inputCheck && visible}
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

                    {isCombine && (
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

                    {isPriceHeaderOn && <RowInput {...inputPriceProps} />}

                    {isQuantityHeaderOn && <RowInput {...inputStockProps} />}

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
            </ClickAwayListener>
        </AnimatePresence>
    );
}

export function RowInput(props) {
    const { visible, error, property } = props;

    return (
        <td className={`relative ${!visible && 'opacity-0'}`}>
            <Input {...props} />
        </td>
    );
}

export default Row;
