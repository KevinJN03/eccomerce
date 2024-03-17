import { Close, CloseRounded, Delete } from '@mui/icons-material';
import Section from './section';
import BubbleButton from '../../../../buttons/bubbleButton';
import ReactFlagsSelect from 'react-flags-select';
import Label from './label';
import { getNameList, getData } from 'country-list';
import { useState } from 'react';

import { internationalOptions, UkOptions } from './shippingOptions';
function DeliveryService({
    handleDelete,
    service,
    index,
    setProfile,
    isUpgrade,
    property,
}) {
    const [countries, setCountries] = useState(() => getData());
    const [showOptions, setShowOptions] = useState(false);

    const [isCustomName, setIsCustomName] = useState(false);
    const handleOnChange = (e) => {
        if (!isUpgrade) {
            const { ...value } = e.target[e.target.selectedIndex].dataset;
            setProfile((prevState) => {
                const newValues = Array.from(prevState?.[property]);
                newValues[index] = {
                    ...newValues,
                    name: value.name,
                    location: value.code,
                };
                return { ...prevState, [property]: newValues };
            });
        } else {
            setProfile((prevState) => {
                const newValues = Array.from(prevState?.[property]);
                newValues[index] = {
                    ...newValues[index],
                    destination: e.target.value,
                };

                return { ...prevState, [property]: newValues };
            });
        }
    };
    const [shippingOptions, setSHippingOptions] = useState(() =>
        service?.location == 'GB' ? UkOptions : internationalOptions
    );

    return (
        <section className=" flex flex-nowrap items-start gap-20">
            <div className="left w-full flex-[0.7]">
                {isUpgrade ? (
                    <Label title={'Destination'} disableAsterisk={true} />
                ) : (
                    service?.name && (
                        <Label title={service?.name} disableAsterisk={true} />
                    )
                )}

                {(!service?.name || isUpgrade) && (
                    <select
                        onChange={handleOnChange}
                        name=""
                        id=""
                        className="daisy-select daisy-select-bordered w-full"
                    >
                        <option value="" disabled selected>
                            {isUpgrade ? 'Add a destination' : 'Add a location'}
                        </option>

                        {isUpgrade ? (
                            <>
                                {['Domestic', 'International'].map((item) => {
                                    return <option value={item}>{item}</option>;
                                })}
                            </>
                        ) : (
                            <>
                                {countries.map(({ name, code }) => {
                                    return (
                                        <option
                                            data-code={code}
                                            data-name={name}
                                        >
                                            {name}
                                        </option>
                                    );
                                })}
                            </>
                        )}
                    </select>
                )}
            </div>
            <div className="right w-full flex-[2]">
                <div className="mb-5 flex w-full flex-col gap-4">
                    {isUpgrade && (
                        <div>
                            <p className="text-base font-semibold">Upgrade</p>
                            <div className="flex flex-row flex-nowrap items-center gap-2">
                                {isCustomName ? (
                                    <div className="relative flex h-fit w-full flex-row flex-nowrap">
                                        <input
                                            onChange={(e) => {
                                                setProfile((prevState) => {
                                                    const newValues =
                                                        Array.from(
                                                            prevState?.[
                                                                property
                                                            ]
                                                        );

                                                    newValues[index] = {
                                                        ...newValues[index],
                                                        name: e.target.value,
                                                    };
                                                    return {
                                                        ...prevState,
                                                        [property]: newValues,
                                                    };
                                                });
                                            }}
                                            type="text"
                                            name="upgrade-name-input"
                                            id="upgrade-name-input"
                                            className="daisy-input daisy-input-bordered w-full pr-14"
                                        />
                                        <div className="absolute right-4 top-1/2 h-fit w-fit translate-y-[-50%]">
                                            <BubbleButton
                                                handleClick={() =>
                                                    setIsCustomName(() => false)
                                                }
                                                className={'px-1.5 py-1.5'}
                                            >
                                                <CloseRounded className="!fill-black/70" />
                                            </BubbleButton>
                                        </div>
                                    </div>
                                ) : (
                                    <select
                                        onChange={(e) => {
                                            const nameLC =
                                                e.target.value?.toLowerCase();

                                            if (nameLC == 'custom') {
                                                setIsCustomName(() => true);
                                            } else {
                                                setProfile((prevState) => {
                                                    const newValues =
                                                        Array.from(
                                                            prevState?.[
                                                                property
                                                            ]
                                                        );

                                                    newValues[index] = {
                                                        ...newValues[index],
                                                        name: nameLC,
                                                    };
                                                    return {
                                                        ...prevState,
                                                        [property]: newValues,
                                                    };
                                                });
                                            }
                                        }}
                                        name="upgrade-name"
                                        id="upgrade-name"
                                        className="daisy-select daisy-select-bordered w-full"
                                    >
                                        {[
                                            'Express',
                                            '1 Day',
                                            'Economy',
                                            'Custom',
                                        ].map((item) => {
                                            return (
                                                <option
                                                    value={item}
                                                    key={item}
                                                    selected={
                                                        service?.name ==
                                                        item.toLowerCase()
                                                    }
                                                >
                                                    {item}
                                                </option>
                                            );
                                        })}
                                    </select>
                                )}
                                <div className="w-14">
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
                        </div>
                    )}
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
                                    Select a delivery service
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

                            <div className="w-14">
                                {!service?.disableDelete && !isUpgrade && (
                                    <BubbleButton
                                        className={'px-3 py-3'}
                                        handleClick={handleDelete}
                                    >
                                        <Delete />
                                    </BubbleButton>
                                )}
                            </div>
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
