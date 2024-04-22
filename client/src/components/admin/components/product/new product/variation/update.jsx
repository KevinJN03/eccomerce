import { useEffect, useState } from 'react';
import OptionError from './error/optionError';

import formatData from './formatData';
import handleValue from '../utils/handleValue';
import { priceOptions, quantityOptions } from '../utils/handleValueOptions';
import { AnimatePresence } from 'framer-motion';
import { useTableContext } from '../../../../../../context/tableContext';
import BubbleButton from '../../../../../buttons/bubbleButton.jsx';
import ThemeBtn from '../../../../../buttons/themeBtn.jsx';
import _, { property } from 'lodash';
import { useClickAway } from '@uidotdev/usehooks';
import { useVariation } from '../../../../../../context/variationContext.jsx';
import { useNewProduct } from '../../../../../../context/newProductContext.jsx';
import { Input } from '../utils/Input.jsx';
function Update({ category, closeModal }) {
    const [value, setValue] = useState('');
    const { variations, setVariations } = useVariation();

    const [property, setProperty] = useState(`update-${category}`);
    const { combine, combineDispatch, publishErrorDispatch, publishError } =
        useNewProduct();

    const { checkSet, setCheckSet, variationList, isCombine } =
        useTableContext();
    const [checkSetToArray, setCheckSetToArray] = useState(
        Array.from(checkSet)
    );
    const [current, setCurrent] = useState({});
    const num = category == 'price' ? 2 : 0;

    const errorMsg = _.get(publishError, property);

    useEffect(() => {
        const value = checkValue();
        setCurrent(value);

        return() => {
            publishErrorDispatch({type: 'CLEAR', path: property})
        }
    }, []);

    const handleOnchange = (value) => {
        const options = {
            publishErrorDispatch,
            value,
            setValue,
            property: property,
        };
        if (category == 'price') {
            handleValue({
                ...priceOptions,
                ...options,
            });
        } else if (category == 'stock') {
            handleValue({
                ...quantityOptions,
                ...options,
            });
        }
    };

    const apply = () => {
        try {
            if (errorMsg) {
                return;
            }

            const updateVariationOptionData = (optionMap) => {
                checkSetToArray.forEach((element) => {
                    if (optionMap.has(element)) {
                        const getVariation = optionMap.get(element);
                        optionMap.set(element, {
                            ...getVariation,
                            [category]: value,
                        });

                        publishErrorDispatch({
                            type: 'CLEAR',
                            path: `${element}-${category}`,
                        });
                    }
                });
            };

            if (_.get(combine, 'on')) {
                const newOptionMap = new Map(_.get(combine, 'options'));
                updateVariationOptionData(newOptionMap);

                combineDispatch({
                    type: 'UPDATE_OPTIONS',
                    options: newOptionMap,
                });
            } else {
                const newVariations = _.cloneDeep(variations).map((item) => {
                    if (item._id == variationList._id) {
                        const newMap = new Map(item?.options);
                        updateVariationOptionData(newMap);

                        return { ...item, options: newMap };
                    }

                    return item;
                });

                setVariations(() => newVariations);
            }
            setCheckSet(() => new Set());
            closeModal();
        } catch (error) {
            console.error('error at update: ', error);
        }
    };

    function checkValue() {
        let isAllValueSame = true;
        const newOptionsMap = new Map(variationList?.options);
        const firstOption = newOptionsMap.get(checkSetToArray[0]);
        for (let i = 1; i < checkSetToArray.length; i++) {
            const item = checkSetToArray[i];
            if (newOptionsMap.has(item)) {
                const getVariation = newOptionsMap.get(item);

                if (getVariation[category] != firstOption[category]) {
                    isAllValueSame = false;
                    break;
                }
            }
        }

        return {
            amount: _.get(firstOption, category) || 0,
            check: isAllValueSame,
        };
    }

    const ref = useClickAway(() => {
        if (value) {
            const newValue = formatData(value, num);
            setValue((prev) => newValue);
        }
    });

    return (
        <section className="update flex w-full flex-col">
            <h1 className="pb-3 text-3xl font-semibold tracking-wide">
                Update {category == 'stock' ? 'quantity' : category} for{' '}
                {checkSet.size} {checkSet.size > 1 ? 'variants' : 'variant'}
            </h1>
            <p className="mb-4 mt-1 text-sm text-black/70">
                Current {category}:{' '}
                {current?.check && category == 'price'
                    ? `£ ${parseFloat(current.amount).toFixed(2)}`
                    : current?.check
                      ? current.amount
                      : 'Mixed'}
            </p>
            <div className="my-4">
                <label className="mb-2 font-medium">
                    New {category}
                    <span className="ml-1 text-xl text-red-700">*</span>
                </label>{' '}
                <div className=" !w-full">
                    <Input
                        visible={true}
                        value={value}
                        property={'price'}
                        handleOnchange={(e) => handleOnchange(e.target.value)}
                        enablePoundSign={category == 'price' ? true : false}
                    />
                    {/* <input
                        ref={ref}
                        value={value}
                        onChange={(e) => handleOnchange(e.target.value)}
                        type="number"
                        className={`input-number border-1 input-bordered input input-lg min-w-full rounded-md ${
                            category == 'price' ? '!px-6' : ' px-2'
                        } ${errorMsg && 'border-red-400 bg-red-100'}`}
                    />
                    {category == 'price' && (
                        <span className="absolute left-3 top-2/4 translate-y-[-50%] ">
                            £
                        </span>
                    )} */}
                </div>
                <AnimatePresence>
                    {errorMsg && (
                        <OptionError
                            className={'!gap-1 !px-0 py-2'}
                            msg={errorMsg}
                        />
                    )}
                </AnimatePresence>
            </div>

            <div className="flex flex-row flex-nowrap justify-between pt-10">
                <BubbleButton handleClick={closeModal} />

                <span className="flex flex-row items-center gap-3">
                    {(errorMsg || value.length < 1) && (
                        <p className="text-sm opacity-60">
                            Enter valid {category}
                        </p>
                    )}

                    <ThemeBtn
                        handleClick={apply}
                        text={'Apply'}
                        disabled={errorMsg}
                    />
                </span>
            </div>
        </section>
    );
}

export default Update;
