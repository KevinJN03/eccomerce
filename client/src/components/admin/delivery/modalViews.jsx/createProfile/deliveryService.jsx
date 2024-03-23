import { Close, CloseRounded, Delete } from '@mui/icons-material';
import Section from './section';
import BubbleButton from '../../../../buttons/bubbleButton';
import ReactFlagsSelect from 'react-flags-select';
import Label from './label';
import { getNameList, getData } from 'country-list';
import { forwardRef, useEffect, useRef, useState } from 'react';

import { internationalOptions, UkOptions } from './shippingOptions';
import { ClickAwayListener } from '@mui/material';
import _, { cloneDeep } from 'lodash';
import { useDeliveryContext } from '../../../../../context/deliveryCOntext';
import { useCreateProfileContext } from '../../../../../context/createProfileContext';
import Charges from './charges';
function DeliveryService({
    handleDelete,
    service,
    index,

    isUpgrade,
    property,
}) {
    const { countries, setProfile, errors, highlightError, setErrors } =
        useCreateProfileContext();
    const clickAwayRef = useRef({ one_item: false, additional_item: false });

    const [showOptions, setShowOptions] = useState(false);
    const [charges, setCharges] = useState({
        one_item: 0.0,
        additional_item: 0.0,
    });
    const [isCustomName, setIsCustomName] = useState(false);

    useEffect(() => {
        setCharges(() => ({ one_item: '0.00', additional_item: '0.00' }));
    }, [service?.iso_code]);

    const handleUpdate = ({ updateProperty }) => {
        setProfile((prevState) => {
            const newValues = Array.from(prevState?.[property]);

            newValues[index] = {
                ...newValues[index],
                ...updateProperty,
            };
            return {
                ...prevState,
                [property]: newValues,
            };
        });
    };

    const handleOnChange = (e) => {
        if (!isUpgrade) {
            const { ...value } = e.target[e.target.selectedIndex].dataset;

            handleUpdate({
                updateProperty: {
                    destination: value.name,
                    iso_code: value.code,
                },
            });
        } else {
            handleUpdate({
                updateProperty: { destination: e.target.value },
            });
        }
    };

    const handleSelect = (e) => {
        const value = {
            ...e.target[e.target.selectedIndex].dataset,
        };
        handleUpdate({
            updateProperty: { shipping: value },
        });

        const cloneErrors = cloneDeep(errors);


        if (_.has(cloneErrors, `${property}.${service._id}.shipping`)) {
            console.log({ cloneErrors });
            delete cloneErrors[property][service._id]['shipping'];
            setErrors(() => cloneErrors);
        }
    };

    return (
        <section className=" flex flex-nowrap items-start gap-20">
            <div className="left w-full flex-[0.7]">
                {isUpgrade ? (
                    <Label title={'Destination'} disableAsterisk={true} />
                ) : (
                    service?.destination && (
                        <Label
                            title={service?.destination}
                            disableAsterisk={true}
                        />
                    )
                )}

                {(!service?.destination || isUpgrade) && (
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
                                                handleUpdate({
                                                    updateProperty: {
                                                        name: e.target.value,
                                                    },
                                                });
                                            }}
                                            type="text"
                                            name="upgrade-name-input"
                                            id="upgrade-name-input"
                                            className="daisy-input daisy-input-bordered w-full pr-14"
                                        />
                                        <div className="absolute right-4 top-1/2 h-fit w-fit translate-y-[-50%]">
                                            <BubbleButton
                                                handleClick={() => {
                                                    setIsCustomName(
                                                        () => false
                                                    );
                                                    handleUpdate({
                                                        updateProperty: {
                                                            name: '',
                                                        },
                                                        property,
                                                    });
                                                }}
                                                className={'p-1.5'}
                                            >
                                                <CloseRounded className="!fill-black/70" />
                                            </BubbleButton>
                                        </div>
                                    </div>
                                ) : (
                                    <select
                                        // aria-invalid={true}
                                        onChange={(e) => {
                                            const nameLC =
                                                e.target.value?.toLowerCase();

                                            if (nameLC == 'custom') {
                                                setIsCustomName(() => true);
                                                handleUpdate({
                                                    updateProperty: {
                                                        name: '',
                                                    },
                                                });
                                                return;
                                            }
                                            handleUpdate({
                                                updateProperty: {
                                                    name: nameLC,
                                                },
                                            });
                                        }}
                                        name="upgrade-name"
                                        id="upgrade-name"
                                        className="daisy-select daisy-select-bordered w-full"
                                    >
                                        <option
                                            value=""
                                            selected={service?.name == ''}
                                            disabled
                                            hidden
                                        ></option>

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
                                    {!isUpgrade && index != 0 && (
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
                                onChange={handleSelect}
                                name="delivery-service"
                                id="delivery-service"
                                className={`daisy-select daisy-select-bordered w-full ${
                                    errors?.[property]?.[service._id]?.shipping
                                        ? 'border-red-700 bg-red-100'
                                        : ''
                                }`}
                            >
                                <option
                                    value=""
                                    selected={!service?.shipping?.service}
                                    disabled={_.isEmpty(
                                        service?.shipping?.service
                                    )}
                                >
                                    Select a delivery service
                                </option>

                                {(service?.iso_code == 'GB'
                                    ? UkOptions
                                    : internationalOptions
                                ).map(({ options, courier }) => {
                                    return (
                                        <optgroup label={courier}>
                                            {options.map(
                                                ({ text, start, end }) => {
                                                    return (
                                                        <option
                                                            selected={
                                                                service
                                                                    ?.shipping
                                                                    ?.service ==
                                                                text
                                                            }
                                                            data-service={text}
                                                            data-start={start}
                                                            data-end={end}
                                                            data-type={'days'}
                                                        >
                                                            {`${text} (${start == end ? start : `${start}-${end}`} ${'days'})`}
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

                        {_.has(
                            errors,
                            `${property}.${service._id}.shipping`
                        ) && (
                            <p className="mt-2 text-base  text-red-800">
                                {errors?.[`${property}`][service._id]?.shipping}
                            </p>
                        )}
                    </div>

                    <Charges
                        property={property}
                        service={service}
                        index={index}
                        handleUpdate={handleUpdate}
                    />
                </div>
            </div>
        </section>
    );
}

export default DeliveryService;
