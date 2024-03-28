import { Close, CloseRounded, Delete } from '@mui/icons-material';
import Section from './section';
import BubbleButton from '../../../../buttons/bubbleButton';
import ReactFlagsSelect from 'react-flags-select';
import Label from './label';
import { getNameList, getData } from 'country-list';
import { forwardRef, useEffect, useRef, useState } from 'react';

import { internationalOptions } from './shippingOptions';
import { ClickAwayListener } from '@mui/material';
import _, { cloneDeep } from 'lodash';
import { useDeliveryContext } from '../../../../../context/deliveryCOntext';
import { useCreateProfileContext } from '../../../../../context/createProfileContext';
import Charges from './charges';
import shipping from './shipping/shipping';

function DeliveryService({
    handleDelete,
    service,
    index,

    isUpgrade,
    property,
}) {
    const {
        countries,
        setProfile,
        errors,
        highlightError,
        setErrors,
        profile,
        selectedDestination,
        commonCountries,
    } = useCreateProfileContext();

    const [isCustomName, setIsCustomName] = useState(false);
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
        setErrors((prevState) => {
            const cloneErrors = cloneDeep(prevState);

            _.unset(cloneErrors, [property, service?._id, 'destination']);
            return cloneErrors;
        });
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
                        className={`daisy-select daisy-select-bordered w-full ${highlightError([property, service?._id, 'destination'])}`}
                    >
                        <option value="" disabled selected>
                            {isUpgrade ? 'Add a destination' : 'Add a location'}
                        </option>

                        {isUpgrade ? (
                            <>
                                {['Domestic', 'International'].map((item) => {
                                    return (
                                        <option
                                            key={`${item}`}
                                            value={item}
                                            selected={
                                                service?.destination ==
                                                item.toLowerCase()
                                            }
                                        >
                                            {item}
                                        </option>
                                    );
                                })}
                            </>
                        ) : (
                            <>
                                {/* <option
                                    disabled
                                    className="text-base font-bold"
                                >
                                    ─────────
                                </option> */}
                                {/* <option
                                    data-code={'elsewhere-else'}
                                    data-name={'Elsewhere Else'}
                                    disabled={selectedDestination.has(code)}
                                >
                                    Elsewhere Else
                                </option> */}

                                {[
                                    {
                                        array: [
                                            {
                                                code: 'elsewhere-else',
                                                name: 'Elsewhere Else',
                                            },
                                        ],
                                        field: 'elsewhere'
                                    },
                                    {
                                        array: commonCountries,
                                        field: 'commonCountries',
                                    },
                                    { array: countries, field: 'countries' },
                                ].map(({ array, field }) => {
                                    return (
                                        <>
                                            <option
                                                key={`${service._id}-${field}`}
                                                disabled
                                                className="text-base font-bold"
                                            >
                                                ─────────
                                            </option>
                                            {array.map(({ name, code }) => {
                                                return (
                                                    <option
                                                        key={`${service._id}-${field}-${code}`}
                                                        disabled={selectedDestination.has(
                                                            code
                                                        )}
                                                        data-code={code}
                                                        data-name={name}
                                                    >
                                                        {name}
                                                    </option>
                                                );
                                            })}
                                        </>
                                    );
                                })}
                            </>
                        )}
                    </select>
                )}

                {_.has(errors, [property, service?._id, 'destination']) && (
                    <p className="mt-2 text-base  text-red-800">
                        {errors[property][service._id]['destination']}
                    </p>
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
                                                        upgrade: e.target.value,
                                                    },
                                                });

                                                setErrors((prevState) => {
                                                    const cloneErrors =
                                                        cloneDeep(prevState);

                                                    if (
                                                        e.target.value.trim()
                                                            .length > 0
                                                    ) {
                                                        _.unset(cloneErrors, [
                                                            property,
                                                            service?._id,
                                                            'upgrade',
                                                        ]);
                                                    } else {
                                                        _.set(
                                                            cloneErrors,
                                                            [
                                                                property,
                                                                service?._id,
                                                                'upgrade',
                                                            ],
                                                            'Name must be between 1 and 128 characters'
                                                        );
                                                    }

                                                    return cloneErrors;
                                                });
                                            }}
                                            type="text"
                                            name="upgrade-name-input"
                                            id="upgrade-name-input"
                                            className={`daisy-input daisy-input-bordered w-full pr-14 ${highlightError([property, service?._id, 'upgrade'])}`}
                                        />
                                        <div className="absolute right-4 top-1/2 h-fit w-fit translate-y-[-50%]">
                                            <BubbleButton
                                                handleClick={() => {
                                                    setIsCustomName(
                                                        () => false
                                                    );
                                                    handleUpdate({
                                                        updateProperty: {
                                                            upgrade: '',
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
                                                        upgrade: '',
                                                    },
                                                });
                                                return;
                                            }
                                            setErrors((prevState) => {
                                                const cloneErrors =
                                                    cloneDeep(prevState);

                                                _.unset(cloneErrors, [
                                                    property,
                                                    service?._id,
                                                    'upgrade',
                                                ]);
                                                return cloneErrors;
                                            });
                                            handleUpdate({
                                                updateProperty: {
                                                    upgrade: nameLC,
                                                },
                                            });
                                        }}
                                        name="upgrade-name"
                                        id="upgrade-name"
                                        className={`daisy-select daisy-select-bordered w-full ${highlightError(['delivery_upgrades', service?._id, 'upgrade'])}`}
                                    >
                                        <option
                                            value=""
                                            selected={service?.upgrade == ''}
                                            disabled
                                            hidden
                                        />

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
                                                        service?.upgrade ==
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
                                    <BubbleButton
                                        className={'px-3 py-3'}
                                        handleClick={handleDelete}
                                    >
                                        <Delete />
                                    </BubbleButton>
                                </div>
                            </div>

                            {_.has(errors, [
                                property,
                                service?._id,
                                'upgrade',
                            ]) && (
                                <p className="mt-2 text-base  text-red-800">
                                    {errors[property][service._id]['upgrade']}
                                </p>
                            )}
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

                                {[
                                    ...(() => {
                                        if (
                                            _.has(
                                                shipping,
                                                profile?.country_of_origin
                                            )
                                        ) {
                                            if (
                                                profile?.country_of_origin ==
                                                service?.iso_code
                                            ) {
                                                return shipping[
                                                    profile?.country_of_origin
                                                ]['domestic'];
                                            } else {
                                                return shipping[
                                                    profile?.country_of_origin
                                                ]['international'];
                                            }
                                        }

                                        return internationalOptions;
                                        // _.has(shipping) &&
                                        // profile?.country_of_origin ==
                                        //     service?.iso_code
                                        //     ? shipping[service?.iso_code][
                                        //           'domestic'
                                        //       ]
                                        //     : internationalOptions;
                                    })(),
                                ].map(({ options, courier }) => {
                                    return (
                                        <optgroup label={courier}>
                                            {options.map(
                                                ({ text, start, end }) => {
                                                    return (
                                                        <option
                                                            key={`${service._id}-${text}`}
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
                                {index != 0 && !isUpgrade && (
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
