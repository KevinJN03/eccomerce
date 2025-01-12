import Switch from '../toggleSwitch/switch';
import { useEffect, useState, useRef, Fragment } from 'react';

import formatData from '../formatData';
import { Input } from '../../utils/Input';
import '../../new_product.scss';
import { ClickAwayListener } from '@mui/material';
import handleValue from '../../utils/handleValue';
import { motion, AnimatePresence } from 'framer-motion';
import { useNewProduct } from '../../../../../../../context/newProductContext';
import { priceOptions, quantityOptions } from '../../utils/handleValueOptions';
import { useTableContext } from '../../../../../../../context/tableContext';
import _ from 'lodash';
import tableRowVariants from './tableVariant';
function Row({ singleVariation, lastIndex, beforeLastIndex }) {
    // remove  priceValue and stockValue state to use combinereducer & setVariations to update variation values
    const {
        variationList,
        isQuantityHeaderOn,
        isPriceHeaderOn,
        isCombine,
        checkSet,
        setCheckSet,
        showAllVariants,
        unclearClickAwayRef,
    } = useTableContext();
    const [error, setError] = useState({ price: null, stock: null });
    const singleVariationRef = useRef({ ...singleVariation });

    useEffect(() => {
        singleVariationRef.current = {...singleVariation};
    }, [singleVariation]);
    const inputProps = [
        {
            category: 'price',
            fixedNum: 2,
            checker: isPriceHeaderOn,
            options: priceOptions,
            enablePoundSign: true,
        },
        {
            category: 'stock',
            fixedNum: 0,
            checker: isQuantityHeaderOn,
            options: quantityOptions,
            enablePoundSign: false,
        },
    ];
    const {
        setVariations,
        combineDispatch,
        variations,
        publishErrorDispatch,
        publishError,
    } = useNewProduct();

    const handleCheck = (e) => {
        e.stopPropagation();
        setCheckSet((prevSet) => {
            const newSet = new Set(prevSet);
            if (newSet.has(singleVariation._id)) {
                newSet.delete(singleVariation._id);
            } else {
                newSet.add(singleVariation._id);
            }
            return newSet;
        });
    };

    const handleOnchange = (
        { value, props, newSingleVariation },
        addToUnclear = true
    ) => {
        const { category } = props;
        const options = {
            ...props,
            value,
            // setValue,
            publishErrorDispatch,
            setError,
            setValue: (cb) => {
                const value = cb();

                const newObject = {
                    ...newSingleVariation,
                    [category]: value,
                };

                updateSingleVariation({ newObject });
                if (addToUnclear) {
                    unclearClickAwayRef.current.add(
                        `${singleVariation._id}-${category}`
                    );
                }
            },
        };

        handleValue(options);
        return;
    };

    const updateOptionsInVariations = (newObject) => {
        const newVariations = _.cloneDeep(variations).map((item) => {
            if (item._id == variationList._id) {
                const newOptionMap = new Map(item.options);
                newOptionMap.set(newObject._id, newObject);

                return { ...item, options: newOptionMap };
            }

            return item;
        });

        return newVariations;
    };
    function updateSingleVariation({ newObject }) {
        if (isCombine) {
            combineDispatch({
                type: 'update',
                _id: singleVariation._id,
                newObj: newObject,
            });
        } else {
            const newVariations = updateOptionsInVariations(newObject);
            setVariations(() => newVariations);
        }
    }
    function onClickAway(props) {
        const { category, fixedNum, checker, options } = props;
        //const { current: singleVariation } = singleVariationRef;
        if (
            (!singleVariation?.price && !singleVariation?.stock) ||
            unclearClickAwayRef.current.has(
                `${singleVariation._id}-${category}`
            ) == false
          //  ||  !singleVariationRef.current.visible
        ) {
            return;
        }
       
        const newSingleVariation = { ...singleVariation };
        //debugger;
        if (checker) {
            const newValue = formatData(singleVariation?.[category], fixedNum);
            newSingleVariation[category] = newValue;
            handleOnchange({
                // add or remove error if the newValue is compatible
                value: newValue,
                props: {
                    ...options,
                    property: `variationoption.${singleVariation._id}-${category}`,
                    category,
                },
                newSingleVariation,
            });
        }

        unclearClickAwayRef.current.delete(
            `${singleVariation._id}-${category}`
        );
    }

    const toggleVisible = () => {
        //debugger
        const property = `variationoption.${singleVariation._id}`;
        const newSingleVariation = {
            ...singleVariation,
            visible: !singleVariation.visible,
        };

        singleVariationRef.current = { ...newSingleVariation };
        if (newSingleVariation.visible == false) {
            updateSingleVariation({ newObject: newSingleVariation });
        }
        [...inputProps].forEach((props) => {
            const { category, options } = props;
            const field = `${property}-${category}`;
            if (newSingleVariation.visible == false) {
                // if going to be disabled -> cache eror message and remove errors
debugger
                publishErrorDispatch({
                    type: 'CLEAR',
                    path: field,
                });
            } else {
                // if going to be enabled back -> add or remove error if the value is compatible

                handleOnchange(
                    {
                        value: newSingleVariation?.[category],
                        props: { ...options, category, property: field },
                        newSingleVariation,
                    },
                    false
                );
            }
        });
    };
    return (
        <AnimatePresence>
            {/* <ClickAwayListener onClickAway={onClickAway}> */}
            <motion.tr
                className={`mt-10 h-full max-h-28 w-full min-w-full  ${lastIndex && !showAllVariants ? 'showAllVariants after:!bg-[linear-gradient(to_bottom,_rgba(255,255,255,0.75)_30%,_rgba(255,255,255,1)_90%)]' : beforeLastIndex && !showAllVariants ? 'showAllVariants  relative  border-b-2 after:!bg-[linear-gradient(to_bottom,_rgba(255,255,255,0.5)_90%,_rgba(255,255,255,0.7)_100%)]' : 'border-b-2'} ${
                    checkSet.has(singleVariation._id) &&
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
                            id={`check-${singleVariation._id}`}
                            name={`check-${singleVariation._id}`}
                            // key={inputCheck}
                            type="checkbox"
                            className={`daisy-checkbox no-animation daisy-checkbox-sm !rounded-[3px] border-2  border-dark-gray`}
                            checked={
                                checkSet.has(singleVariation._id) &&
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

                {[...inputProps].map((props) => {
                    const { checker, category, options, enablePoundSign } =
                        props;
                    const property = `variationoption.${singleVariation._id}-${category}`;
                    return (
                        <Fragment
                            key={`${singleVariation._id}-header${category}`}
                        >
                            {checker && (
                                <motion.td
                                    animate={
                                        _.get(singleVariation, 'visible')
                                            ? { opacity: 100 }
                                            : { opacity: 0 }
                                    }
                                    transition={{ duration: 0 }}
                                    className={`relative`}
                                >
                                    <ClickAwayListener
                                        onClickAway={() => onClickAway(props)}
                                    >
                                        <Input
                                            enablePoundSign={enablePoundSign}
                                            value={
                                                singleVariation?.[category] ||
                                                ''
                                            }
                                            property={property}
                                            handleOnchange={(e) =>
                                                handleOnchange({
                                                    value: e.target.value,
                                                    props: {
                                                        ...options,
                                                        property,
                                                        category,
                                                    },
                                                    newSingleVariation: {
                                                        ...singleVariation,
                                                    },
                                                })
                                            }
                                            visible={singleVariation.visible}
                                            id={`${singleVariation._id}-${category}`}
                                            isValueValidate={true}
                                        />
                                    </ClickAwayListener>
                                </motion.td>
                            )}
                        </Fragment>
                    );
                })}

                <td
                    className={` ${
                        !error.stock &&
                        !error.price &&
                        '!ml-auto w-full !min-w-full !align-middle'
                    }  !text-right`}
                >
                    <div className="flex h-auto items-center justify-end">
                        {singleVariation?.stock == 0 && (
                            <p
                                className={`mr-4 flex h-5 items-center justify-center whitespace-nowrap rounded-full bg-black px-2 py-2 text-xs text-white ${
                                    !singleVariation.visible && '!opacity-0'
                                }`}
                            >
                                Sold out
                            </p>
                        )}
                        <Switch
                            state={singleVariation.visible}
                            toggle={toggleVisible}
                        />
                    </div>
                </td>
            </motion.tr>
            {/* </ClickAwayListener> */}
        </AnimatePresence>
    );
}

export default Row;
