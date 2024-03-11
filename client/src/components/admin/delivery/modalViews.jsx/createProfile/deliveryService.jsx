import { Delete } from '@mui/icons-material';
import Section from './section';
import BubbleButton from '../../../../buttons/bubbleButton';
import ReactFlagsSelect from 'react-flags-select';
import Label from './label';
import { getNameList, getData } from 'country-list';
import { useState } from 'react';

import { internationalOptions, UkOptions } from './shippingOptions';
function DeliveryService({ title, handleDelete, service, index, setProfile }) {
    const [countries, setCountries] = useState(() => getData());
    const [showOptions, setShowOptions] = useState(false);
    const handleOnChange = (e) => {
        const { ...value } = e.target[e.target.selectedIndex].dataset;
        console.log({ value });
        setProfile((prevState) => {
            const { standard_delivery } = prevState;
            const new_standard_delivery = Array.from(standard_delivery);
            new_standard_delivery[index] = {
                ...new_standard_delivery,
                name: value.name,
                location: value.code,
            };
            return { ...prevState, standard_delivery: new_standard_delivery };
        });
    };
    const [shippingOptions, setSHippingOptions] = useState(() =>
        service?.location == 'GB' ? UkOptions : internationalOptions
    );

    return (
        <section className=" flex flex-nowrap items-start gap-20">
            <div className="left w-full flex-[0.7]">
                {service?.name ? (
                    <Label title={title} disableAsterisk={true} />
                ) : (
                    <select
                        onChange={handleOnChange}
                        name=""
                        id=""
                        className="daisy-select daisy-select-bordered w-full"
                    >
                        <option value="" disabled selected>
                            Add a location
                        </option>

                        {countries.map(({ name, code }) => {
                            return (
                                <option data-code={code} data-name={name}>
                                    {name}
                                </option>
                            );
                        })}
                    </select>
                )}
            </div>
            <div className="right w-full flex-[2]">
                <div className="mb-5 flex w-full flex-col gap-4">
                    <div>
                        <p className="text-base font-semibold">
                            Delivery service
                        </p>
                        <div className="flex flex-row flex-nowrap items-center gap-2">
                            <select
                                name="delivery-service"
                                id="delivery-service"
                                className="daisy-select daisy-select-bordered w-full"
                            >
                                <option value="" selected disabled>
                                    Select a delivery dervice
                                </option>

                                {shippingOptions.map(({ options, courier }) => {
                                    return (
                                        <optgroup label={courier}>
                                            {options.map(
                                                ({ text, start, end }) => {
                                                    return (
                                                        <option>
                                                            {`${text} (${start == end ? start : `${start}-${end}`} days)`}
                                                        </option>
                                                    );
                                                }
                                            )}
                                        </optgroup>
                                    );
                                })}
                            </select>
                            {!service?.disableDelete && (
                                <BubbleButton
                                    className={'px-3 py-3'}
                                    handleClick={handleDelete}
                                >
                                    <Delete />
                                </BubbleButton>
                            )}
                        </div>
                    </div>

                    <section className="w-full max-w-[calc(8/12*100%)]">
                        <p className="text-base font-semibold">
                            What you'll charge
                        </p>

                        <select
                            onChange={(e) => {
                                const { value } =
                                    e.target[e.target.selectedIndex];

                                if (value == 'fixed-price') {
                                    setShowOptions(() => true);
                                } else {
                                    setShowOptions(() => false);
                                }
                            }}
                            name="shipping-charge"
                            id="shipping-charge"
                            className="daisy-select daisy-select-bordered w-full"
                        >
                            <option value="free-delivery">Free delivery</option>
                            <option value="fixed-price">Fixed price</option>
                        </select>

                        {showOptions && (
                            <div className="mt-4 flex w-full flex-nowrap gap-4">
                                <div className="left flex flex-col gap-1 ">
                                    <p className="whitespace-nowrap text-base font-semibold">
                                        One item
                                    </p>

                                    <input
                                        type="text"
                                        className="daisy-input daisy-input-bordered w-full"
                                    />
                                </div>
                                <div className="right flex flex-col gap-1">
                                    <p className="whitespace-nowrap text-base font-semibold">
                                        Additional item
                                    </p>

                                    <input
                                        type="text"
                                        className="daisy-input daisy-input-bordered w-full"
                                    />
                                </div>
                            </div>
                        )}
                    </section>
                </div>
            </div>
        </section>
    );
}

export default DeliveryService;
