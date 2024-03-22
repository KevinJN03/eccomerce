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
import CreateProfileContextProvider, {
    useCreateProfileContext,
} from '../../../../../context/createProfileContext.jsx';
import ObjectId from 'bson-objectid';
import Footer from './footer.jsx';
import ProfileName from './profileName.jsx';
import CountryOrigin from './countryOrigin.jsx';
import ProcessingTime from './processingTime.jsx';
import DeliverySection from './deliverySection.jsx';
import OriginPostCode from './originPostCode.jsx';
function CreateProfile({}) {
    const { setModalCheck, modalContent } = useContent();

    const { profile, setProfile, errors, loading, highlightError } =
        useCreateProfileContext();
    return (
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
                            We use these settings to calculated postage costs
                            and estimated delivery dates for buyers. Learn about{' '}
                            <span className="font-medium underline">
                                delivery settings
                            </span>{' '}
                            and{' '}
                            <span className="font-medium underline">
                                estimated delivery
                            </span>{' '}
                            dates.
                        </p>

                        {modalContent?.version == 'edit' && <ProfileName />}
                        <CountryOrigin />
                        <OriginPostCode />
                        <ProcessingTime />

                        <hr className="bg-dark-gray" />
                        <DeliverySection />

                        {modalContent?.version !== 'edit' && (
                            <>
                                <hr className="my-4 bg-dark-gray" />
                                <ProfileName />
                            </>
                        )}
                    </>
                ) : (
                    <div className="flex  h-44 w-full items-center justify-center">
                        <div className="spinner-circle spinner-lg [--spinner-color:var(--slate-12)]"></div>
                    </div>
                )}

                <Footer />
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

function Index({}) {
    return (
        <CreateProfileContextProvider>
            <CreateProfile />
        </CreateProfileContextProvider>
    );
}

export default Index;
