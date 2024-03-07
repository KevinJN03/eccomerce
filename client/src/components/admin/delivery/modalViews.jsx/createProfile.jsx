import { AddRounded, CloseRounded } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useContent } from '../../../../context/ContentContext';
import BubbleButton from '../../../buttons/bubbleButton';
import { useState } from 'react';
function CreateProfile({}) {
    const { setModalCheck } = useContent();

    const [profile, setProfile] = useState({ active_listing: 1 });
    return (
        <section className="relative mb-10">
            <section className="flex w-full max-w-[43.75rem] flex-col gap-6 rounded-3xl bg-white p-8">
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
                >
                    <select
                        name="country-origin"
                        id="country-origin"
                        className="daisy-select daisy-select-bordered w-full"
                    ></select>
                </Section>
                <Section
                    title={'Origin post code'}
                    description={`Where will your orders dispatch from – home, the post office, or another location?`}
                >
                    <input
                        name="postcode-origin"
                        id="postcode-origin"
                        className="daisy-input daisy-input-bordered w-full max-w-40"
                    />
                </Section>
                <Section
                    title={`Processing time
                `}
                    description={`How much time

                do you need to prepare an order and put it in the post? Keep in mind, shoppers have shown they're more likely to buy items that dispatch quickly.`}
                >
                    <select
                        name="country-origin"
                        id="country-origin"
                        className="daisy-select daisy-select-bordered w-full"
                    ></select>

                    <p className="mt-3">
                        Your shop's order processing schedule is set to include:
                        Monday–Friday.
                    </p>
                </Section>

                <hr className="bg-dark-gray" />

                <section className="standard-delivery flex flex-col gap-6">
                    <Label
                        title={'Standard delivery'}
                        description={
                            'Where will you dispatch to? We’ll show your listings to shoppers in the countries you add here. Estimate your postage costs'
                        }
                    />
                </section>

                <DeliveryService title={'United Kingdom'} />
                <DeliveryService title={'Everywhere else'} />

                <BubbleButton
                    handleClick={() => {}}
                    className={`flex w-fit items-center px-3 py-3`}
                >
                    <div className="flex w-fit flex-nowrap gap-2">
                        <AddRounded />{' '}
                        <p className="text-base font-semibold">
                            Add another location
                        </p>
                    </div>
                </BubbleButton>

                <section className="delivery-upgrade">
                    <Label
                        title={'Delivery upgrades'}
                        disableAsterisk={true}
                        description={`Give buyers the option to choose faster delivery. We’ll add these costs to your standard pricing. Learn more`}
                    />
                    <BubbleButton
                        handleClick={() => {}}
                        className={`flex w-fit items-center px-3 py-3`}
                    >
                        <div className="flex w-fit flex-nowrap gap-2">
                            <AddRounded />{' '}
                            <p className="text-base font-semibold">
                                Add a delivery upgrade
                            </p>
                        </div>
                    </BubbleButton>

                    <hr className="my-4 bg-dark-gray" />
                    <Section title={`Profile name﻿`}>
                        <input
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
                            className="flex  flex-nowrap items-center rounded-full  bg-black px-5 py-3 text-base font-medium text-white"
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

function Label({ title, description, disableAsterisk }) {
    return (
        <div className="flex flex-col gap-y-1">
            <label className="whitespace-nowrap text-base font-semibold">
                {title}{' '}
                {!disableAsterisk && <span className="text-red-800 ">*</span>}
            </label>

            <p>{description}</p>
        </div>
    );
}

function Section({ children, title, description, disableAsterisk }) {
    return (
        <section className=" flex flex-nowrap items-start gap-20">
            <div className="left w-full flex-[0.7]">
                {' '}
                <Label {...{ disableAsterisk, title, description }} />
            </div>
            <div className="right w-full flex-[2]">{children}</div>
        </section>
    );
}

function DeliveryService({ title }) {
    return (
        <Section title={title} disableAsterisk={true}>
            <div className="mb-5 flex w-full flex-col gap-4">
                <div>
                    <p className="text-base font-semibold">Delivery service</p>

                    <select
                        name="delivery-service"
                        id="delivery-service"
                        className="daisy-select daisy-select-bordered w-full"
                    ></select>
                </div>

                <section className="w-full max-w-[calc(8/12*100%)]">
                    <p className="text-base font-semibold">
                        What you'll charge
                    </p>

                    <select
                        name="shipping-charge"
                        id="shipping-charge"
                        className="daisy-select daisy-select-bordered w-full"
                    ></select>

                    <div className="mt-4 flex w-full flex-nowrap gap-4">
                        <div className="left flex flex-col gap-1 ">
                            <p className="text-base font-semibold">One item</p>

                            <input
                                type="text"
                                className="daisy-input daisy-input-bordered w-full"
                            />
                        </div>
                        <div className="right flex flex-col gap-1">
                            <p className="text-base font-semibold">
                                Additional item
                            </p>

                            <input
                                type="text"
                                className="daisy-input daisy-input-bordered w-full"
                            />
                        </div>
                    </div>
                </section>
            </div>
        </Section>
    );
}
export default CreateProfile;
