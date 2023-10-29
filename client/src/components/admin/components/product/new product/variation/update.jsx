import { useEffect, useState } from 'react';
import OptionError from './error/optionError';
import { useVariation } from '../../../../../../context/variationContext';
import { useClickAway } from '@uidotdev/usehooks';
import formatData from './formatData';
import handleValue from '../utils/handleValue';
import { priceOptions, quantityOptions } from '../utils/handleValueOptions';
import { AnimatePresence } from 'framer-motion';
import { useNewProduct } from '../../../../../../context/newProductContext';

function Update({}) {
    const [error, setError] = useState({ price: null, quantity: null });
    const [value, setValue] = useState('');
    const { contentDispatch, setModalCheck, modalContent } = useNewProduct();
    const { category, selected, setUpdate, update, setCheckAll } = modalContent;

    const [current, setCurrent] = useState({});
    const num = category == 'price' ? 2 : 0;

    useEffect(() => {
        const value = checkValue();
        setCurrent(value);
    }, []);
    const ref = useClickAway(() => {
        if (value) {
            const newValue = formatData(value, num);
            setValue((prev) => newValue);
        }
    });

    const handleOnchange = (value) => {
        priceOptions;

        let options = {};

        if (category == 'price') {
            options = { ...priceOptions, setError, value, setValue };
        } else if (category == 'quantity') {
            options = {
                ...quantityOptions,
                property: category,
                setError,
                value,
                setValue,
            };
        }
        handleValue(options);
        // if (category == 'price') {
        //     if (!value) {
        //         setError(`Please enter a valid ${category}`);
        //     } else if (value == 0) {
        //         setError('Price must be between £0.99 and £42,977.48');
        //     } else {
        //         setError(null);
        //     }
        // }

        // setValue(value);
    };

    const apply = () => {
        try {
            setTimeout(() => {
                setUpdate((prevState)=> ({...prevState,
                    [category]: value,
                    bool: !update.bool,
                }));
                setModalCheck(() => false);
                setCheckAll(() => 'clear');
            }, 200);

            // setTimeout(() => {
            //     setSelected([])
            // }, 1000)
        } catch (error) {
            console.log('error at apply', error);
        }
    };

    function checkValue() {
        let newCategory = category;
        if (newCategory == 'quantity') newCategory = 'stock';
        let isAllValueSame = true;
        let firstSelectItemValue = selected.entries().next().value[1][
            newCategory
        ];
        for (const value of selected.values()) {
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

    return (
        <section className="update flex w-full flex-col">
            <h1 className="font-semibold tracking-wide">
                Update {category} for {selected.length}{' '}
                {selected.length > 1 ? 'variants' : 'variant'}
            </h1>
            <p className="mb-4 mt-1 text-sm">
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
                    <span className="asterisk ml-1 text-xl">*</span>
                </label>
                <span className="relative">
                    <input
                        value={value}
                        onChange={(e) => handleOnchange(e.target.value)}
                        type="number"
                        ref={ref}
                        className={`input-number border-1 input input-bordered input-lg min-w-full rounded-md ${
                            category == 'price' ? '!px-6' : ' px-2'
                        } ${error?.[category] && 'border-red-400 bg-red-100'}`}
                    />
                    {category == 'price' && (
                        <span className="absolute left-3 top-2/4 translate-y-[-50%] ">
                            £
                        </span>
                    )}
                </span>
<AnimatePresence>

                {error?.[category] && (
                    <OptionError
                        className={'!gap-1 !px-0 py-2'}
                        msg={error?.[category]}
                    />
                )}
</AnimatePresence>
            </div>

            <div className="variation-footer">
                <button
                    type="button"
                    className="cancel-btn"
                    onClick={() => setModalCheck(false)}
                >
                    Cancel
                </button>
                <span className="flex flex-row items-center gap-3">
                    {(error?.[category] || value.length < 1) && (
                        <p className="text-sm opacity-60">
                            Enter valid {category}
                        </p>
                    )}
                    <button
                        type="button"
                        className="apply-btn"
                        onClick={apply}
                        disabled={(error?.[category] && true) || !value}
                    >
                        Apply
                    </button>
                </span>
            </div>
        </section>
    );
}

export default Update;
