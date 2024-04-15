import Switch from '../toggleSwitch/switch';
import { useEffect, useState, useRef } from 'react';

import formatData from '../formatData';
import { Input } from '../../utils/Input';
import '../../new_product.scss';
import { ClickAwayListener } from '@mui/material';
import handleValue from '../../utils/handleValue';
import {
    motion,
    AnimatePresence,
    easeInOut,
    useAnimation,
} from 'framer-motion';
import { useNewProduct } from '../../../../../../../context/newProductContext';
import { useVariation } from '../../../../../../../context/variationContext';
import { priceOptions, quantityOptions } from '../../utils/handleValueOptions';
import { useTableContext } from '../../../../../../../context/tableContext';
import _ from 'lodash';
function Row({
    singleVariation,

    update,
}) {
    const {
        variationList,
        isQuantityHeaderOn,
        isPriceHeaderOn,
        isCombine,
        checkSet,
        setCheckSet,
    } = useTableContext();
    const [error, setError] = useState({ price: null, stock: null });

    const [visible, setVisible] = useState(
        singleVariation.visible == false ? false : true
    );
    const [inputCheck, setInputCheck] = useState(false);

    const { check } = useVariation();

    // const [stock, setStock] = useState(singleVariation?.stock);
    const [trigger, setTrigger] = useState(false);

    const { setVariations, combineDispatch } = useNewProduct();
    console.log('row rerender');

    // useEffect(() => {
    //     if (check == true) {
    //         onClickAway();
    //     }

    //     updateList(price, stock);
    // }, [check]);

    const handleCheck = (e) => {
        e.stopPropagation();
        // setInputCheck(!inputCheck);
        setCheckSet((prevSet) => {
            const newSet = new Set(prevSet);
            if (newSet.has(singleVariation.id)) {
                newSet.delete(singleVariation.id);
            } else {
                newSet.add(singleVariation.id);
            }
            return newSet;
        });
    };
    const handlePrice = (value) => {
        // const options = {
        //     ...priceOptions,
        //     value,
        //     setValue: setPrice,
        //     setError,
        // };

        console.log({value})

        return handleValue(options);
    };

    // const handleStock = (value) => {
    //     const options = {
    //         ...quantityOptions,
    //         value,
    //         setValue: setStock,
    //         setError,
    //     };
    //     return handleValue(options);
    // };

    function onClickAway() {
        // if (
        //     (!price && !stock) ||
        //     (singleVariation.price == price &&
        //         singleVariation.stock == stock &&
        //         singleVariation.visible == visible)
        // ) {
        //     return;
        // }
        // const newPrice = formatData(price, 2);
        // const newStock = formatData(stock, 0);
        // setPrice(() => newPrice);
        // setStock(() => newStock);
        // updateList(newPrice, newStock);
    }
    function updateList(priceState, stockState) {
        const { options } = variationList;
        // get the variation, then update variation
        const newObj = options.get(singleVariation.id);
        isPriceHeaderOn ? (newObj.price = priceState) : delete newObj.price;
        isQuantityHeaderOn ? (newObj.stock = stockState) : delete newObj.stock;
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
            combineDispatch({
                type: 'update',
                id: singleVariation.id,
                newObj: newObj,
            });
        }
    }
    const tableRowVariants = {
        hover: {
            backgroundColor: '#eee',
            duration: 0,
            transition: {
                type: 'spring',
                stiffness: 30,
                duration: 0.1,
                backgroundColor: { ease: easeInOut, duration: 0.1 },
            },
        },
        initial: {
            opacity: 1,
            y: '0%',
            backgroundColor: '#dcf8d2',
        },
        animate: {
            opacity: 1,
            y: '0%',
            backgroundColor: '#FFFFFF',
            transition: {
                duration: 1,
                backgroundColor: { ease: easeInOut, duration: 1 },
            },
        },
        exit: {
            backgroundColor: '#FFFFFF',
            transition: { backgroundColor: { ease: easeInOut, duration: 0.2 } },
        },
    };

    return (
        <AnimatePresence>
            <ClickAwayListener onClickAway={onClickAway}>
                <motion.tr
                    className={`mt-10 h-full max-h-28 w-full min-w-full border-b-2 ${
                        inputCheck && visible && '!bg-gray-200'
                    }`}
                    key={trigger}
                    variants={tableRowVariants}
                    initial="initial"
                    animate={'animate'}
                    whileHover={'hover'}
                    transition={'transition'}
                    exit="exit"
                >
                    {(isPriceHeaderOn || isQuantityHeaderOn) && (
                        <motion.td className={`!py-6 !align-top`}>
                            <motion.input
                                id={`check-${singleVariation.id}`}
                                name={`check-${singleVariation.id}`}
                                // key={inputCheck}
                                type="checkbox"
                                className={`daisy-checkbox no-animation h-4 w-4 !rounded-[3px] border-2  border-dark-gray`}
                                checked={
                                    checkSet.has(singleVariation.id) && visible
                                }
                                onChange={handleCheck}
                                disabled={!visible}
                            />
                        </motion.td>
                    )}

                    <motion.td
                        className={`!pt-6 pl-4  ${
                            (error.price || error.stock) && ' !align-top'
                        } 
                        
                ${!visible && '!opacity-60 '}
                `}
                    >
                        <p className="text-sm font-light">
                            {singleVariation?.variation}
                        </p>
                    </motion.td>

                    {isCombine && (
                        <td
                            className={`!pt-6 pl-4  ${
                                (error.price || error.stock) && ' !align-top'
                            } 
                        
                ${!visible && '!opacity-60 '}
                `}
                        >
                            <p className="text-sm font-light">
                                {singleVariation?.variation2}
                            </p>
                        </td>
                    )}

                    {isPriceHeaderOn && (
                        <Input
                            value={_.get(singleVariation, 'price') || 0}
                            property={'price'}
                            handleOnchange={handlePrice}
                            error={error}
                            visible={visible}
                            id={`${singleVariation.id}-price`}
                            isValueValidate={true}
                        />
                    )}

                    {isQuantityHeaderOn && (
                        <Input
                            value={_.get(singleVariation, 'stock') || 0}
                            property={'stock'}
                            handleOnchange={() => console.log('jkl')}
                            error={error}
                            visible={visible}
                            id={`${singleVariation.id}-stock`}
                            isValueValidate={true}
                        />
                    )}

                    <td
                        className={` ${
                            !error.stock &&
                            !error.price &&
                            '!ml-auto w-full !min-w-full !align-middle'
                        }  !text-right`}
                    >
                        <div className="flex h-auto items-center justify-end">
                            {parseInt(_.get(singleVariation, 'stock')) ===
                                0 && (
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
                                toggle={() =>
                                    setVisible((prevState) => !prevState)
                                }
                            />
                        </div>
                    </td>
                </motion.tr>
            </ClickAwayListener>
        </AnimatePresence>
    );
}

export function RowInput(props) {
    const { visible } = props;

    // const addToValidateError = (err) => {
    //     if (err || error[property]) {
    //         // ('error');
    //         publishErrorDispatch({
    //             type: 'addToValidateInput',
    //             path: props?.id,
    //             error: err ? err : error[property],
    //         });
    //     }

    //     // ('trying', publishError);
    // };

    // useEffect(() => {
    //     if (publishError.has('validateInput') && props?.id) {
    //         const isPresent = publishError.get('validateInput').has(props?.id);

    //         if ((isPresent && !error[property]) || !visible) {
    //             ('deleting here');
    //             publishErrorDispatch({
    //                 type: 'deleteValidateInput',
    //                 path: props?.id,
    //             });

    //             return;
    //         }
    //     }
    //     if (visible) {
    //         addToValidateError();
    //     }
    // }, [value, visible]);
    // useEffect(() => {
    //     if (publish.firstAttempt) {
    //         const err = handleOnchange(value);
    //         if (visible && err) {
    //             ('run useEffect for publish.firstattempt');
    //             addToValidateError(err);
    //             // isAllInputValid.current = false;

    //             return;
    //         }
    //         // isAllInputValid.current = true;
    //     }
    // }, [publish]);

    return (
        <td className={`relative ${!visible && 'opacity-0'}`}>
            <Input {...props} />
        </td>
    );
}

export default Row;
