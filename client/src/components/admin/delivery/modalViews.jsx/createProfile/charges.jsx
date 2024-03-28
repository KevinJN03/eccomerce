import { Fragment, useEffect, useRef, useState } from 'react';
import { useCreateProfileContext } from '../../../../../context/createProfileContext';
import _, { cloneDeep } from 'lodash';
import Input from './input';
function Charges({ property, service, index, handleUpdate }) {
    const { profile, errors, setErrors } = useCreateProfileContext();
    const clickAwayRef = useRef({ one_item: false, additional_item: false });

    const [showOptions, setShowOptions] = useState(false);

    const [select, setSelect] = useState('free-delivery');
    const [charges, setCharges] = useState(
        service?.charges || {
            one_item: 0.0,
            additional_item: 0.0,
        }
    );
    useEffect(() => {
        if (
            service?.charges?.one_item > 0 ||
            service?.charges?.additional_item > 0
        ) {
            setSelect(() => 'fixed-price');
            setShowOptions(() => true);
        } else {
            setSelect(() => 'free-delivery');
        }
    }, []);

    useEffect(() => {
        setCharges(() => ({ one_item: '0.00', additional_item: '0.00' }));
    }, [service?.iso_code]);
    return (
        <section className="w-full max-w-[calc(8/12*100%)]">
            <p className="text-base font-semibold">What you'll charge</p>

            <select
                onChange={(e) => {
                    const value = e.target.value;
                    console.log({ value });

                    if (value == 'fixed-price') {
                        setShowOptions(() => true);
                    } else {
                        setShowOptions(() => false);

                        handleUpdate({
                            updateProperty: {
                                charges: {
                                    one_item: 0,
                                    additional_item: 0,
                                },
                            },
                        });

                        setErrors((prevState) => {
                            const newErrors = cloneDeep(prevState);

                            _.unset(newErrors, [
                                property,
                                service?._id,
                                'one_item',
                            ]);
                            _.unset(newErrors, [
                                property,
                                service?._id,
                                'additional_item',
                            ]);

                            return newErrors;
                        });

                        setCharges(() => ({
                            one_item: 0.0,
                            additional_item: 0.0,
                        }));
                    }

                    setSelect(() => e.target.value);
                }}
                name="shipping-charge"
                id="shipping-charge"
                className="daisy-select daisy-select-bordered w-full"
            >
                {[
                    { text: 'Free delivery', value: 'free-delivery' },
                    { text: 'Fixed price', value: 'fixed-price' },
                ].map(({ value, text }) => {
                    return (
                        <option value={value} selected={select == value}>
                            {text}{' '}
                        </option>
                    );
                })}
            </select>

            {showOptions && (
                <section>
                    <div className="mt-4 flex w-full flex-nowrap gap-4">
                        {[
                            { text: 'One item', prop: 'one_item' },
                            {
                                text: 'Additional item',
                                prop: 'additional_item',
                            },
                        ].map(({ text, prop }) => {
                            return (
                                <Input
                                    {...{
                                        text,
                                        property,
                                        index,
                                        service,
                                        prop,
                                        setCharges,
                                        charges,
                                        handleUpdate,
                                    }}
                                    ref={clickAwayRef}
                                />
                            );
                        })}
                    </div>
                </section>
            )}

            {['charges', 'one_item', 'additional_item'].map((element) => {
                return (
                    <Fragment key={`${service._id}-${element}`}>
                        {_.has(
                            errors,
                            `${property}.${service._id}.${element}`
                        ) && (
                            <p className="mt-2 text-base  text-red-800">
                                {
                                    errors?.[`${property}`][service._id]?.[
                                        element
                                    ]
                                }
                            </p>
                        )}
                    </Fragment>
                );
            })}
        </section>
    );
}

export default Charges;
