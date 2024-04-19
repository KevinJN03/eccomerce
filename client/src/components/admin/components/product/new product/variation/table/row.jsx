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
} from 'framer-motion';
import { useNewProduct } from '../../../../../../../context/newProductContext';
import { priceOptions, quantityOptions } from '../../utils/handleValueOptions';
import { useTableContext } from '../../../../../../../context/tableContext';
import _ from 'lodash';
function Row({ singleVariation }) {
    const {
        variationList,
        isQuantityHeaderOn,
        isPriceHeaderOn,
        isCombine,
        checkSet,
        setCheckSet,
    } = useTableContext();
    const [error, setError] = useState({ price: null, stock: null });
    const { setVariations, combineDispatch, variations } = useNewProduct();
    const [priceValue, setPriceValue] = useState(null);
    const [stockValue, setStockValue] = useState(null);
    const handleCheck = (e) => {
        e.stopPropagation();
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

    const handleOnchange = ({ value, optionObj, setValue }) => {
        const options = {
            ...optionObj,
            value,
            setValue,
            setError,
        };

        return handleValue(options);
    };
    useEffect(() => {
        if (_.has(singleVariation, 'price')) {
            setPriceValue(() => singleVariation?.price);
        }

        if (_.has(singleVariation, 'stock')) {
            setStockValue(() => singleVariation.stock);
        }
    }, [singleVariation]);

    const updateOptionsInVariations = (newObject) => {
        const newVariations = _.cloneDeep(variations).map((item) => {
            if (item._id == variationList._id) {
                const newOptionMap = new Map(item.options);
                newOptionMap.set(newObject.id, newObject);

                return { ...item, options: newOptionMap };
            }

            return item;
        });

        return newVariations;
    };

    function onClickAway() {
        if (
            (!priceValue && !stockValue) ||
            (singleVariation.price == priceValue &&
                singleVariation.stock == stockValue)
        ) {
            return;
        }
        const newObject = { ...singleVariation };
        if (isPriceHeaderOn) {
            newObject.price = formatData(priceValue, 2);
        }
        if (isQuantityHeaderOn) {
            newObject.stock = formatData(stockValue, 0);
        }
        if (isCombine) {
            combineDispatch({
                type: 'update',
                id: singleVariation.id,
                newObj: newObject,
            });
        } else {
            const newVariations = updateOptionsInVariations(newObject);

            setVariations(() => newVariations);
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

    const toggleVisible = () => {
        const newObject = {
            ...singleVariation,
            visible: !singleVariation.visible,
        };
        if (isCombine) {
            combineDispatch({
                type: 'update',
                id: singleVariation.id,
                newObj: newObject,
            });
        } else {
            const newVariations = updateOptionsInVariations(newObject);
            setVariations(() => newVariations);
        }
    };
    return (
        <AnimatePresence>
            <ClickAwayListener onClickAway={onClickAway}>
                <motion.tr
                    className={`mt-10 h-full max-h-28 w-full min-w-full border-b-2 ${
                        checkSet.has(singleVariation.id) &&
                        singleVariation.visible &&
                        '!bg-gray-200'
                    }`}
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
                                    checkSet.has(singleVariation.id) &&
                                    singleVariation.visible
                                }
                                onChange={handleCheck}
                                disabled={!singleVariation.visible}
                            />
                        </motion.td>
                    )}

                    <motion.td
                        className={`!pt-6 pl-4  ${
                            (error.price || error.stock) && ' !align-top'
                        } 
                        
                ${!singleVariation.visible && '!opacity-60 '}
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
                        
                ${!singleVariation.visible && '!opacity-60 '}
                `}
                        >
                            <p className="text-sm font-light">
                                {singleVariation?.variation2}
                            </p>
                        </td>
                    )}

                    {isPriceHeaderOn && (
                        <td
                            className={`relative ${_.get(singleVariation, 'visible') ? 'opacity-100' : 'opacity-0'}`}
                        >
                            <Input
                                value={
                                    priceValue

                                    // ||
                                    // _.get(singleVariation, 'price')
                                }
                                property={'price'}
                                handleOnchange={(e) =>
                                    handleOnchange({
                                        value: e.target.value,
                                        optionObj: priceOptions,
                                        setValue: setPriceValue,
                                    })
                                }
                                error={error}
                                visible={singleVariation.visible}
                                id={`${singleVariation.id}-price`}
                                isValueValidate={true}
                            />
                        </td>
                    )}

                    {isQuantityHeaderOn && (
                        <>
                            {' '}
                            <td
                                className={`relative ${_.get(singleVariation, 'visible') ? 'opacity-100' : 'opacity-0'}`}
                            >
                                <Input
                                    value={stockValue}
                                    property={'stock'}
                                    handleOnchange={(e) =>
                                        handleOnchange({
                                            value: e.target.value,
                                            optionObj: quantityOptions,
                                            setValue: setStockValue,
                                        })
                                    }
                                    error={error}
                                    visible={_.get(singleVariation, 'visible')}
                                    id={`${singleVariation.id}-stock`}
                                    isValueValidate={true}
                                />
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
                            {parseInt(_.get(singleVariation, 'stock')) ===
                                0 && (
                                <span
                                    className={`mr-4 flex h-5 items-center justify-center rounded-full bg-black px-2 py-2 text-s text-white ${
                                        !singleVariation.visible && '!opacity-0'
                                    }`}
                                >
                                    Sold out
                                </span>
                            )}
                            <Switch
                                state={singleVariation.visible}
                                toggle={toggleVisible}
                            />
                        </div>
                    </td>
                </motion.tr>
            </ClickAwayListener>
        </AnimatePresence>
    );
}

export default Row;
