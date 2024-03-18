import { AddRounded, CloseRounded } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useContent } from '../../../../../context/ContentContext';
import BubbleButton from '../../../../buttons/bubbleButton';
import { Fragment, useState } from 'react';
import Label from './label';
import DeliveryService from './deliveryService';
import Section from './section';
import { v4 as uuidv4 } from 'uuid';
import ReactFlagsSelect from 'react-flags-select';

import { getNameList } from 'country-list';
function CreateProfile({}) {
    const { setModalCheck, modalContent } = useContent();

    const [profile, setProfile] = useState({
        standard_delivery: [
            {
                location: 'GB',
                destination: 'United Kingdom',
                disableDelete: true,
            },
            {
                location: 'everywhere_else',
                destination: 'Everywhere Else',
            

            },
        ],

        upgrades: [],
    });
    const [showPTInput, setShowPTInput] = useState(false);

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

    const handleDelete = ({ property, idx }) => {
        setProfile((prevState) => {
            const value = prevState?.[property];

            return {
                ...prevState,
                [property]: value?.filter(
                    (currentValue, currentValueIndex) =>
                        currentValueIndex != idx
                ),
            };
        });
    };
    return (
        <section className="relative mb-10 flex w-fit justify-center">
            <section className="flex  flex-col gap-6 rounded-3xl bg-white p-8 sm+md:w-10/12 lg:w-[43.75rem]">
                <h1 className="font-EBGaramond text-4xl">
                    Create delivery profile
                </h1>
                <p className="text-base">
                    We use these settings to calculated postage costs and
                    estimated delivery dates for buyers. Learn about{' '}
                    <span className="font-medium underline">
                        delivery settings
                    </span>{' '}
                    and{' '}
                    <span className="font-medium underline">
                        estimated delivery
                    </span>{' '}
                    dates.
                </p>

                <Section
                    title={'Country of origin'}
                    description={`The country you're dispatching from`}
                    noWhiteSpace
                >
                    {/* <select
                        name="country-origin"
                        id="country-origin"
                        className="daisy-select daisy-select-bordered w-full"
                    ></select> */}

                    <ReactFlagsSelect
                        id="country-of-origin"
                        className="w-full !rounded-lg"
                        fullWidth={true}
                        selected={profile?.country_of_origin}
                        onSelect={(code) =>
                            setProfile((prevState) => ({
                                ...prevState,
                                country_of_origin: code,
                            }))
                        }
                    />
                </Section>
                <Section
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
                >
                    <select
                        onChange={handleProcessingTime}
                        name="country-origin"
                        id="country-origin"
                        className="daisy-select daisy-select-bordered w-full"
                    >
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

                        <option value="custom-range">Custom range</option>
                    </select>

                    {showPTInput && (
                        <div className="mt-3 flex flex-col gap-3">
                            <div className="flex w-9/12 flex-row flex-nowrap items-center gap-3">
                                {['start', 'end'].map((field, idx) => {
                                    return (
                                        <Fragment key={`select-${field}`}>
                                            <select
                                                onChange={(e) => {
                                                    setProfile((prevState) => ({
                                                        ...prevState,
                                                        processing_time: {
                                                            ...prevState?.processing_time,
                                                            [field]:
                                                                e.target.value,
                                                        },
                                                    }));
                                                }}
                                                name={`${field}-select`}
                                                id={`${field}-select`}
                                                className="daisy-select daisy-select-bordered w-full flex-1"
                                            >
                                                {Array(10)
                                                    .fill(1)
                                                    .map((item, idx) => {
                                                        return (
                                                            <option
                                                                selected={
                                                                    profile
                                                                        .processing_time?.[
                                                                        field
                                                                    ] ==
                                                                    idx + 1
                                                                }
                                                                key={`option-${idx + 1}-${field}`}
                                                                value={idx + 1}
                                                            >
                                                                {idx + 1}{' '}
                                                            </option>
                                                        );
                                                    })}
                                            </select>
                                            {idx == 0 && (
                                                <p className="text-base">-</p>
                                            )}
                                        </Fragment>
                                    );
                                })}
                            </div>
                            <div className="flex flex-row flex-nowrap gap-4">
                                {[
                                    { field: 'days', text: 'Days' },
                                    { field: 'weeks', text: 'Weeks' },
                                ].map(({ text, field }) => {
                                    return (
                                        <div
                                            key={`processing_time_type_${field}`}
                                            className="flex items-center gap-2"
                                        >
                                            <input
                                                onClick={() =>
                                                    setProfile((prevState) => ({
                                                        ...prevState,
                                                        processing_time: {
                                                            ...prevState?.processing_time,
                                                            type: field,
                                                        },
                                                    }))
                                                }
                                                checked={
                                                    profile?.processing_time
                                                        ?.type == field
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

                    <p className="mt-3">
                        Your shop's order processing schedule is set to include:
                        Monday–Friday.
                    </p>
                </Section>

                <hr className="bg-dark-gray" />

                {[
                    {
                        buttonText: 'Add another location',
                        serviceArray: profile?.standard_delivery || [],
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
                            isUpgrade
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
                                        isUpgrade={isUpgrade}
                                            property={property}
                                            service={item}
                                            index={idx}
                                            setProfile={setProfile}
                                            handleDelete={() =>
                                                handleDelete({
                                                    property,
                                                    idx,
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
                                                ...prevState?.[property],
                                                {},
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

                                {idx == 0 && <hr className="bg-dark-gray" />}
                            </Fragment>
                        );
                    }
                )}

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

                <footer className="mt-10 flex items-center justify-between">
                    <BubbleButton
                        handleClick={() => setModalCheck(() => false)}
                    />
                    <button
                        type="button"
                        className="flex flex-nowrap items-center rounded-full  bg-black px-5 py-3 text-base font-medium text-white"
                    >
                        {' '}
                        Save profile
                        {profile?.active_listing > 0 && (
                            <span className="ml-2 rounded-full bg-white px-2 py-1 text-xs font-normal">
                                {`Affects ${profile?.active_listing} ${profile.active_listing > 1 ? 'listings' : 'listing'}`}
                            </span>
                        )}
                    </button>
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
    );
}

export default CreateProfile;
