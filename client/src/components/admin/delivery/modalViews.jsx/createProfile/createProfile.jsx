import { AddRounded, CloseRounded } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useContent } from '../../../../../context/ContentContext';
import BubbleButton from '../../../../buttons/bubbleButton';
import { Fragment, useEffect, useRef, useState } from 'react';
import Label from './label';
import DeliveryService from './deliveryService';
import Section from './section';
import UserLogout from '../../../../../hooks/userLogout.jsx';
import { getData, getName } from 'country-list';
import ThemeBtn from '../../../../buttons/themeBtn';
import { adminAxios } from '../../../../../api/axios.js';
import _ from 'lodash';
import CreateProfileContextProvider from '../../../../../context/createProfileContext.jsx';
import ObjectId from 'bson-objectid';
function CreateProfile({}) {
    const { setModalCheck, modalContent } = useContent();
    const { logoutUser } = UserLogout();

    const abortControllerRef = useRef(new AbortController());
    const timeoutRef = useRef(null);
    const intervalRef = useRef(null);

    const clickAwayRefs = useRef({});
    const [loading, setLoading] = useState(true);

    const [btnLoad, setBtnLoad] = useState(false);
    const latestStateRef = useRef();

    const generateNewService = () => {
        return {
            one_item: '0.00',
            additional_item: '0.00',
            _id: ObjectId().toHexString(),
        };
    };

    const [profile, setProfile] = useState({
        country_of_origin: 'GB',
        standard_delivery: [
            {
                iso_code: 'GB',
                destination: getName('GB'),
                disableDelete: true,
                ...generateNewService(),
            },
            {
                iso_code: 'everywhere_else',
                destination: 'Everywhere Else',
                ...generateNewService(),
            },
        ],

        upgrades: [],
    });
    const [showPTInput, setShowPTInput] = useState(false);
    const [countries, setCountries] = useState(() => getData());

    useEffect(() => {
        latestStateRef.current = profile;
    }, [profile]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                if (modalContent?.profileId) {
                    const { data } = await adminAxios.get(
                        `/delivery/${modalContent.profileId}`
                    );

                    setProfile(() => ({
                        ...data[0],
                        name:
                            modalContent?.version == 'duplicate'
                                ? `Duplicate of ${data[0]?.name}`
                                : data[0]?.name,
                    }));
                }
            } catch (error) {
                logoutUser({ error });
            } finally {
                setTimeout(() => {
                    setLoading(() => false);
                }, 1000);
            }
        };

        fetchData();

        return () => {
            abortControllerRef.current?.abort();

            clearTimeout(timeoutRef?.current);

            clearInterval(intervalRef?.current);
        };
    }, []);
    const handleProcessingTime = (e) => {
        if (e.target.value == 'custom-range') {
            setProfile((prevState) => ({
                ...prevState,
                processing_time: { type: 'days', start: 1, end: 1 },
            }));
            setShowPTInput(() => true);
        } else {
            setShowPTInput(() => false);

            const { ...values } = e.target[e.target.selectedIndex].dataset;
            setProfile((prevState) => ({
                ...prevState,
                processing_time: values,
            }));
        }
    };

    const handleDelete = ({ property, idx, _id }) => {
        console.log('clicked');
        setProfile((prevState) => {
            const value = prevState?.[property];
            console.log({ value, _id });
            return {
                ...prevState,
                [property]: value.filter(
                    (currentValue) => currentValue?._id != _id
                ),
            };
        });
    };

    const handleSubmit = async () => {
        abortControllerRef.current?.abort();
        abortControllerRef.current = new AbortController();
        let success = false;
        try {
            setBtnLoad(() => true);
            const intervalFunc = async () => {
                const copyClickAways = _.cloneDeep(clickAwayRefs.current);

                const isAllClickAwayDone = Object.values(copyClickAways).every(
                    ({ one_item, additional_item }) => {
                        return one_item == false && additional_item == false;
                    }
                );
                console.log({ isAllClickAwayDone, copyClickAways });

                if (
                    modalContent?.version == 'create' ||
                    modalContent?.version == 'duplicate'
                ) {
                    const { data } = await adminAxios.post(
                        '/delivery/create',
                        latestStateRef.current,
                        { signal: abortControllerRef.current.signal }
                    );
                } else if (modalContent?.version == 'edit') {
                    const { data } = await adminAxios.put(
                        `/delivery/update/${modalContent?.profileId}`,
                        latestStateRef.current,
                        { signal: abortControllerRef.current.signal }
                    );
                }
                success = true;
                return;
            };

            timeoutRef.current = setTimeout(intervalFunc, 1000);
        } catch (error) {
            console.error(error);

            logoutUser({ error });
        } finally {
            if (success) {
                setTimeout(() => {
                    setModalCheck(() => false);
                    modalContent?.setTriggerRefresh((prevState) => !prevState);
                }, 1000);
            } else {
                setBtnLoad(() => false);
            }
        }
    };

    return (
        <CreateProfileContextProvider
            value={{ clickAwayRefs, countries, setProfile }}
        >
            <section className="relative mb-10 flex w-fit justify-center">
                <section className="flex  flex-col gap-6 rounded-3xl bg-white p-8 sm+md:w-10/12 lg:w-[43.75rem]">
                    <h1 className="font-EBGaramond text-4xl">
                        {modalContent?.version[0].toUpperCase() +
                            modalContent?.version?.substring(1)}{' '}
                        delivery profile
                    </h1>

                    {!loading ? (
                        <>
                            <p className="text-base">
                                We use these settings to calculated postage
                                costs and estimated delivery dates for buyers.
                                Learn about{' '}
                                <span className="font-medium underline">
                                    delivery settings
                                </span>{' '}
                                and{' '}
                                <span className="font-medium underline">
                                    estimated delivery
                                </span>{' '}
                                dates.
                            </p>

                            {modalContent?.version == 'edit' && (
                                <Section title={`Profile name﻿`}>
                                    <input
                                        value={profile?.name}
                                        onChange={(e) =>
                                            setProfile((prevState) => ({
                                                ...prevState,
                                                name: e.target.value,
                                            }))
                                        }
                                        type="text"
                                        className="daisy-input daisy-input-bordered w-full"
                                    />
                                    <ErrorMessage
                                        msg={
                                            'Profile name must be between 1 and 128 characters.'
                                        }
                                    />
                                </Section>
                            )}
                            <Section
                                title={'Country of origin'}
                                description={`The country you're dispatching from`}
                                noWhiteSpace
                            >
                                <select
                                    onChange={(e) => {
                                        const values =
                                            e.target[e.target.selectedIndex]
                                                .dataset;

                                        setProfile((prevState) => {
                                            const newStandardDelivery =
                                                _.cloneDeep(
                                                    prevState.standard_delivery
                                                );

                                            newStandardDelivery[0] = {
                                                destination: values.name,
                                                iso_code: values.code,
                                            };
                                            console.log(newStandardDelivery[0]);
                                            return {
                                                ...prevState,
                                                country_of_origin: values.code,
                                                standard_delivery:
                                                    newStandardDelivery,
                                            };
                                        });
                                    }}
                                    name="country-origin"
                                    id="country-origin"
                                    className="daisy-select daisy-select-bordered w-full"
                                >
                                    <option disabled>Select a location</option>
                                    {countries.map(({ code, name }) => {
                                        return (
                                            <option
                                                selected={
                                                    code ==
                                                    profile?.country_of_origin
                                                }
                                                data-code={code}
                                                data-name={name}
                                            >
                                                {name}
                                            </option>
                                        );
                                    })}
                                </select>
                            </Section>
                            <Section
                                errorMSg={'Enter a valid postal code'}
                                noWhiteSpace
                                title={'Origin post code'}
                                description={`Where will your orders dispatch from – home, the post office, or another location?`}
                            >
                                <input
                                    value={profile?.origin_post_code}
                                    onChange={(e) =>
                                        setProfile((prevState) => ({
                                            ...prevState,
                                            origin_post_code: e.target.value,
                                        }))
                                    }
                                    name="postcode-origin"
                                    id="postcode-origin"
                                    className="daisy-input daisy-input-bordered w-full max-w-40"
                                />
                            </Section>
                            <Section
                                noWhiteSpace
                                title={`Processing time
                `}
                                description={`How much time

                do you need to prepare an order and put it in the post? Keep in mind, shoppers have shown they're more likely to buy items that dispatch quickly.`}
                                note={` Your shop's order processing schedule is set to
                        include: Monday–Friday.`}
                            >
                                <select
                                    onChange={handleProcessingTime}
                                    name="country-origin"
                                    id="country-origin"
                                    className="daisy-select daisy-select-bordered w-full"
                                >
                                    <option selected disabled>
                                        Select your processing time...
                                    </option>
                                    {[
                                        { start: 1, end: 1, type: 'days' },
                                        { start: 1, end: 2, type: 'days' },
                                        { start: 1, end: 3, type: 'days' },
                                        { start: 3, end: 5, type: 'days' },
                                        { start: 5, end: 7, type: 'days' },
                                    ].map(({ start, end, type, isCustom }) => {
                                        return (
                                            <option
                                                data-start={start}
                                                data-end={end}
                                                data-type={type}
                                            >{`${start}${end != 1 ? `-${end}` : ''} ${type}`}</option>
                                        );
                                    })}

                                    <option value="custom-range">
                                        Custom range
                                    </option>
                                </select>

                                {showPTInput && (
                                    <div className="mt-3 flex flex-col gap-3">
                                        <div className="flex w-9/12 flex-row flex-nowrap items-center gap-3">
                                            {['start', 'end'].map(
                                                (field, idx) => {
                                                    return (
                                                        <Fragment
                                                            key={`select-${field}`}
                                                        >
                                                            <select
                                                                onChange={(
                                                                    e
                                                                ) => {
                                                                    setProfile(
                                                                        (
                                                                            prevState
                                                                        ) => ({
                                                                            ...prevState,
                                                                            processing_time:
                                                                                {
                                                                                    ...prevState?.processing_time,
                                                                                    [field]:
                                                                                        e
                                                                                            .target
                                                                                            .value,
                                                                                },
                                                                        })
                                                                    );
                                                                }}
                                                                name={`${field}-select`}
                                                                id={`${field}-select`}
                                                                className="daisy-select daisy-select-bordered w-full flex-1"
                                                            >
                                                                {Array(10)
                                                                    .fill(1)
                                                                    .map(
                                                                        (
                                                                            item,
                                                                            idx
                                                                        ) => {
                                                                            return (
                                                                                <option
                                                                                    selected={
                                                                                        profile
                                                                                            .processing_time?.[
                                                                                            field
                                                                                        ] ==
                                                                                        idx +
                                                                                            1
                                                                                    }
                                                                                    key={`option-${idx + 1}-${field}`}
                                                                                    value={
                                                                                        idx +
                                                                                        1
                                                                                    }
                                                                                >
                                                                                    {idx +
                                                                                        1}{' '}
                                                                                </option>
                                                                            );
                                                                        }
                                                                    )}
                                                            </select>
                                                            {idx == 0 && (
                                                                <p className="text-base">
                                                                    -
                                                                </p>
                                                            )}
                                                        </Fragment>
                                                    );
                                                }
                                            )}
                                        </div>
                                        <div className="flex flex-row flex-nowrap gap-4">
                                            {[
                                                { field: 'days', text: 'Days' },
                                                {
                                                    field: 'weeks',
                                                    text: 'Weeks',
                                                },
                                            ].map(({ text, field }) => {
                                                return (
                                                    <div
                                                        key={`processing_time_type_${field}`}
                                                        className="flex items-center gap-2"
                                                    >
                                                        <input
                                                            onClick={() =>
                                                                setProfile(
                                                                    (
                                                                        prevState
                                                                    ) => ({
                                                                        ...prevState,
                                                                        processing_time:
                                                                            {
                                                                                ...prevState?.processing_time,
                                                                                type: field,
                                                                            },
                                                                    })
                                                                )
                                                            }
                                                            checked={
                                                                profile
                                                                    ?.processing_time
                                                                    ?.type ==
                                                                field
                                                            }
                                                            name="processing_time_type"
                                                            type="radio"
                                                            id={field}
                                                            className="daisy-radio"
                                                        />
                                                        <label
                                                            htmlFor={`#${field}`}
                                                            className="text-xs font-medium"
                                                        >
                                                            {text}
                                                        </label>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                )}
                            </Section>

                            <hr className="bg-dark-gray" />

                            {[
                                {
                                    buttonText: 'Add another location',
                                    serviceArray:
                                        profile?.standard_delivery || [],
                                    property: 'standard_delivery',
                                    title: 'Standard delivery',
                                    isUpgrade: false,
                                    description:
                                        'Where will you dispatch to? We’ll show your listings to shoppers in the countries you add here. Estimate your postage costs',
                                },
                                {
                                    buttonText: 'Add a delivery upgrade',
                                    isUpgrade: true,

                                    serviceArray: profile?.upgrades || [],
                                    property: 'upgrades',
                                    title: 'Delivery upgrades',
                                    description:
                                        'Give buyers the option to choose faster delivery. We’ll add these costs to your standard pricing. Learn more',
                                },
                            ].map(
                                (
                                    {
                                        title,
                                        property,
                                        description,
                                        serviceArray,
                                        buttonText,
                                        isUpgrade,
                                        _id,
                                    },
                                    idx
                                ) => {
                                    return (
                                        <Fragment key={title}>
                                            <section className=" flex flex-col gap-6">
                                                <Label
                                                    title={title}
                                                    description={description}
                                                />
                                            </section>

                                            {serviceArray.map((item, idx) => {
                                                return (
                                                    <DeliveryService
                                                        key={item._id}
                                                        isUpgrade={isUpgrade}
                                                        property={property}
                                                        service={item}
                                                        index={idx}
                                                        handleDelete={() =>
                                                            handleDelete({
                                                                property,
                                                                idx,
                                                                _id: item._id,
                                                            })
                                                        }
                                                    />
                                                );
                                            })}

                                            <BubbleButton
                                                handleClick={() =>
                                                    setProfile((prevState) => ({
                                                        ...prevState,
                                                        [property]: [
                                                            ...prevState?.[
                                                                property
                                                            ],
                                                            generateNewService(),
                                                        ],
                                                    }))
                                                }
                                                className={`flex w-fit items-center px-3 py-3`}
                                            >
                                                <div className="flex w-fit flex-nowrap gap-2">
                                                    <AddRounded />{' '}
                                                    <p className="text-base font-semibold">
                                                        {buttonText}
                                                    </p>
                                                </div>
                                            </BubbleButton>

                                            {idx == 0 && (
                                                <hr className="bg-dark-gray" />
                                            )}
                                        </Fragment>
                                    );
                                }
                            )}

                            {modalContent?.version !== 'edit' && (
                                <>
                                    <hr className="my-4 bg-dark-gray" />
                                    <Section title={`Profile name﻿`}>
                                        <input
                                            value={profile?.name}
                                            onChange={(e) =>
                                                setProfile((prevState) => ({
                                                    ...prevState,
                                                    name: e.target.value,
                                                }))
                                            }
                                            type="text"
                                            className="daisy-input daisy-input-bordered w-full"
                                        />
                                    </Section>
                                </>
                            )}
                        </>
                    ) : (
                        <div className="flex  h-44 w-full items-center justify-center">
                            <div className="spinner-circle spinner-lg [--spinner-color:var(--slate-12)]"></div>
                        </div>
                    )}

                    <footer className="mt-10 flex items-center justify-between">
                        <BubbleButton
                            handleClick={() => setModalCheck(() => false)}
                        />

                        <ThemeBtn
                            text={'Save profile'}
                            handleClick={handleSubmit}
                        >
                            {btnLoad ? (
                                <div className="spinner-circle spinner-sm [--spinner-color:255,255,255]" />
                            ) : (
                                <div className="flex flex-row flex-nowrap items-center text-base font-medium text-white">
                                    Save profile
                                    {profile?.active_listing > 0 && (
                                        <span className="ml-2 rounded-full bg-white px-2 py-1 text-xs font-normal">
                                            {`Affects ${profile?.active_listing} ${profile.active_listing > 1 ? 'listings' : 'listing'}`}
                                        </span>
                                    )}
                                </div>
                            )}
                        </ThemeBtn>
                    </footer>
                </section>

                <motion.div
                    className="absolute right-[-4rem] top-0  rounded-full p-2 "
                    onClick={() => setModalCheck(() => false)}
                    whileHover={{
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        transition: {
                            duration: 1.3,
                        },
                    }}
                >
                    <CloseRounded className="!fill-white " fontSize="large" />
                </motion.div>
            </section>
        </CreateProfileContextProvider>
    );
}

export default CreateProfile;

function ErrorMessage({ msg }) {
    return <p className="mt-2 text-base  text-red-800">{msg}</p>;
}
