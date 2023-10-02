import { useState } from 'react';
import OptionError from './error/optionError';
import { useVariation } from '../../../../../../context/variationContext';
import { useClickAway } from '@uidotdev/usehooks';
import formatData from './formatData';

function Update() {
    const [error, setError] = useState('');
    const [value, setValue] = useState('');
    const { selected, setCheck, content, setUpdate, update } = useVariation();
    const { category } = content;
    const num = category == 'price' ? 2 : 0;

    const ref = useClickAway(() => {
        formatData(value, num, setValue);
    });

    const handleOnchange = (value) => {
        if (category == 'price') {
            if (!value) {
                setError(`Please enter a valid ${category}`);
            } else if (value == 0) {
                setError('Price must be between £0.99 and £42,977.48');
            } else {
                setError(null);
            }
        }

        setValue(value);
    };

    const apply = () => {
        try {
            setTimeout(() => {
                setUpdate({ ...update, [`${category}`]: value });
                setCheck(false);
            }, 200);
        } catch (error) {
            console.log('error at apply', error);
        }
    };
    return (
        <section className="update flex w-full flex-col">
            <h1 className="font-semibold tracking-wide">
                Update {category} for {selected.length}{' '}
                {selected.length > 1 ? 'variants' : 'variant'}
            </h1>
            <p className="mb-4 mt-1 text-sm">Current price: Mixed</p>
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
                        } ${error && 'border-red-400 bg-red-100'}`}
                    />
                    {category == 'price' && (
                        <span className="absolute left-3 top-2/4 translate-y-[-50%] ">
                            £
                        </span>
                    )}
                </span>

                {error && (
                    <OptionError className={'!gap-1 !px-0 py-2'} msg={error} />
                )}
            </div>

            <div className="variation-footer">
                <button
                    type="button"
                    className="cancel-btn"
                    onClick={() => setCheck(false)}
                >
                    Cancel
                </button>
                <span className="flex flex-row items-center gap-3">
                    {(error || value.length < 1) && (
                        <p className="text-sm opacity-60">
                            Enter valid {category}
                        </p>
                    )}
                    <button
                        type="button"
                        className="apply-btn"
                        onClick={apply}
                        disabled={(error && true) || !value}
                    >
                        Apply
                    </button>
                </span>
            </div>
        </section>
    );
}

export default Update;
