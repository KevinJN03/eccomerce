import { useEffect, useState } from 'react';
import OptionError from './error/optionError';

import formatData from './formatData';
import handleValue from '../utils/handleValue';
import { priceOptions, quantityOptions } from '../utils/handleValueOptions';
import { AnimatePresence } from 'framer-motion';
import { useTableContext } from '../../../../../../context/tableContext';
import BubbleButton from '../../../../../buttons/bubbleButton.jsx';
import ThemeBtn from '../../../../../buttons/themeBtn.jsx';
import _ from 'lodash';
import { useClickAway } from '@uidotdev/usehooks';
import { useVariation } from '../../../../../../context/variationContext.jsx';
import { useNewProduct } from '../../../../../../context/newProductContext.jsx';
function Update({ category, closeModal }) {
    const [error, setError] = useState({ price: null, quantity: null });
    const [value, setValue] = useState('');
    const { variations, setVariations } = useVariation();
    const { combine, combineDispatch } = useNewProduct();

    const { checkSet, setCheckSet, variationList, isCombine } =
        useTableContext();

    const [current, setCurrent] = useState({});
    const num = category == 'price' ? 2 : 0;

    useEffect(() => {
        const value = checkValue();
        setCurrent(value);
    }, []);

    const handleOnchange = (value) => {
        if (category == 'price') {
            handleValue({ ...priceOptions, setError, value, setValue });
        } else if (category == 'quantity') {
            handleValue({
                ...quantityOptions,
                property: category,
                setError,
                value,
                setValue,
            });
        }
    };

    const apply = () => {
        try {
            if (error[category]) {
                return;
            }
            const checkSetToArray = Array.from(checkSet);

            if (_.get(combine, 'combine')) {
                debugger
                const newOptionMap = new Map(_.get(combine, 'options'));
                checkSetToArray.forEach((item) => {
                    if (newOptionMap.has(item)) {
                        const getVariation = newOptionMap.get(element);
                        newOptionMap.set(element, {
                            ...getVariation,
                            [category == 'quantity' ? 'stock' : category]:
                                value,
                        });
                    }
                });

                combineDispatch({
                    type: 'UPDATE_OPTIONS',
                    options: newOptionMap,
                });
            } else {
                const newVariations = _.cloneDeep(variations).map((item) => {
                    if (item._id == variationList._id) {
                        const newMap = new Map(item?.options);

                        checkSetToArray.forEach((element) => {
                            if (newMap.has(element)) {
                                const getVariation = newMap.get(element);
                                newMap.set(element, {
                                    ...getVariation,
                                    [category == 'quantity'
                                        ? 'stock'
                                        : category]: value,
                                });
                            }
                        });

                        return { ...item, options: newMap };
                    }

                    return item;
                });
                setVariations(() => newVariations);
            }

            closeModal();
        } catch (error) {
            console.error('error at update: ', error);
        }
    };

    function checkValue() {
        let newCategory = category;
        if (newCategory == 'quantity') newCategory = 'stock';
        let isAllValueSame = true;
        let firstSelectItemValue = checkSet.entries().next().value[1][
            newCategory
        ];
        for (const value of checkSet.values()) {
            const newValue = value[newCategory]?.toString();
            if (newValue != firstSelectItemValue?.toString()) {
                isAllValueSame = false;
                break;
            }
        }
        if (!firstSelectItemValue && isAllValueSame == true) {
            firstSelectItemValue = 0;
        }
        return { amount: firstSelectItemValue, check: isAllValueSame };
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
                Update {category} for {checkSet.size}{' '}
                {checkSet.size > 1 ? 'variants' : 'variant'}
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
                <div className="relative">
                    <input
                        ref={ref}
                        value={value}
                        onChange={(e) => handleOnchange(e.target.value)}
                        type="number"
                        className={`input-number border-1 input-bordered input input-lg min-w-full rounded-md ${
                            category == 'price' ? '!px-6' : ' px-2'
                        } ${error?.[category] && 'border-red-400 bg-red-100'}`}
                    />
                    {category == 'price' && (
                        <span className="absolute left-3 top-2/4 translate-y-[-50%] ">
                            £
                        </span>
                    )}
                </div>
                <AnimatePresence>
                    {error?.[category] && (
                        <OptionError
                            className={'!gap-1 !px-0 py-2'}
                            msg={error?.[category]}
                        />
                    )}
                </AnimatePresence>
            </div>

            <div className="flex flex-row flex-nowrap justify-between pt-10">
                <BubbleButton handleClick={closeModal} />

                <span className="flex flex-row items-center gap-3">
                    {(error?.[category] || value.length < 1) && (
                        <p className="text-sm opacity-60">
                            Enter valid {category}
                        </p>
                    )}

                    <ThemeBtn
                        handleClick={apply}
                        text={'Apply'}
                        disabled={error[category]}
                    />
                </span>
            </div>
        </section>
    );
}

export default Update;
