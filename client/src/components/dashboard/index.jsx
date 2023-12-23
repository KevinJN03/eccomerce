import Checkout_Header from '../checkout/checkout_header.jsx';
import '../../CSS/user-dashboard.scss';
import { useEffect, useReducer, useRef, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import Modal from '../admin/components/modal/modal.jsx';
import signOut_icon from '../../assets/icons/signout-icon.png';
import { UserDashboardProvider, reducer } from '../../context/userContext.jsx';

import NavOption from './nav-options/navOptions.jsx';
import { useAuth } from '../../hooks/useAuth.jsx';
import axios from '../../api/axios.js';
import dayjs from 'dayjs';
import DeleteAddress from './modalContent/deleteAddress.jsx';
import logOutUser from '../common/logoutUser.js';
import {
    motion,
    AnimatePresence,
    useScroll,
    useMotionValueEvent,
    useInView,
    easeInOut,
} from 'framer-motion';
import useCurrentLocation from '../../hooks/useCurrentLocation.jsx';
import UnsavedDetails from './modalContent/unsavedDetails.jsx';
import close_icon from '../../assets/icons/close.png';

import DeletePaymentMethod from './modalContent/delete-payment-method.jsx';
import MessageFooter from './messageFooter.jsx';

function Dashboard() {
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const { user, authDispatch } = useAuth();
    const [firstName, setFirstName] = useState(user?.firstName || '');
    const [lastName, setLastName] = useState(user?.lastName || '');
    const [email, setEmail] = useState(user?.email || '');
    const [interest, setInterest] = useState(user?.interest);
    const [dob, setDob] = useState('');
    const [address, setAddress] = useState([]);
    const [loadingState, setLoadingState] = useState(true);
    const [contact_preference, setContactPreference] = useState({});
    const [userPaymentMethods, setUserPaymentMethods] = useState([]);
    const [defaultAddresses, setDefaultAddresses] = useState({});
    const [ordersArray, setOrdersArray] = useState([]);
    const [socialAccounts, setSocialAccounts] = useState({});
    async function fetchResults() {
        try {
            const [userResult, paymentResult, orderResults] =
                await Promise.allSettled([
                    axios.get('user/userData'),
                    axios.get('user/payment-method/all'),
                    axios.get('user/orders'),
                ]);

            if (userResult.status == 'fulfilled') {
                const { user } = userResult.value?.data;
                setDob(() => dayjs(user?.dob).toISOString());
                console.log('here', { user });
                setContactPreference(() => user?.contact_preferences);
                setAddress(() => user?.address);
                setDefaultAddresses(() => user?.default_address);

                setSocialAccounts(() => user?.social_accounts);
            }

            if (paymentResult.status == 'fulfilled') {
                setUserPaymentMethods(() => [
                    ...paymentResult.value?.data?.paymentMethods,
                ]);
            }

            if (orderResults.status == 'fulfilled') {
                setOrdersArray(() => orderResults.value?.data?.orders);
            }

            console.log({ userResult });

            if (userResult.status == 'rejected') {
                logOutUser({
                    error: userResult.reason,
                    authDispatch,
                    navigate,
                });
            }
        } catch (error) {
            console.error(
                'error while checking if user is authenticated: ',
                error
            );
        } finally {
            setTimeout(() => {
                setLoadingState(false);
            }, 1000);
        }
    }

    useEffect(() => {
        fetchResults();
    }, []);

    const getRoute = () => {
        const routes = pathname.split('/');
        const findIndexForMyAccount = routes.indexOf('my-account');
        const routeIndex = findIndexForMyAccount + 1;

        const currentRoute = routes[routeIndex]
            ? routes[routeIndex]
            : routes[findIndexForMyAccount];

        return currentRoute;
    };

    const [selectOption, setSelectionOption] = useState(getRoute());
    useEffect(() => {
        'split: ', pathname.split('/');

        setSelectionOption(() => getRoute());
    }, [pathname]);

    const [modalContent, modalContentDispatch] = useReducer(reducer, {});
    const [modalCheck, setModalCheck] = useState(false);
    const [isDetailsUnSaved, setIsDetailsUnSaved] = useState(false);
    const [footerMessage, setFooterMessage] = useState({
        success: null,
        text: null,
    });
    const ref = useRef();
    const isInView = useInView(ref);
    const value = {
        modalContent,
        modalContentDispatch,
        modalCheck,
        setModalCheck,
        firstName,
        setFirstName,
        email,
        setEmail,
        interest,
        setInterest,
        dob,
        setDob,
        lastName,
        setLastName,
        address,
        setAddress,
        contact_preference,
        setContactPreference,
        loadingState,
        defaultAddresses,
        setDefaultAddresses,
        userPaymentMethods,
        ordersArray,
        setOrdersArray,
        isDetailsUnSaved,
        setIsDetailsUnSaved,
        footerMessage,
        setFooterMessage,
        socialAccounts,
        setSocialAccounts,
    };

    const view = {
        deletePaymentMethod: <DeletePaymentMethod />,
        deleteAddress: <DeleteAddress />,
        unsavedDetails: <UnsavedDetails />,
    };

    const logout = async () => {
        try {
            await axios.get('user/logout');
            authDispatch({ type: 'LOGOUT' });

            navigate('/home');
        } catch (error) {
            'error while loging out: ', error;
        }
    };

    const outletVariant = {
        initial: {
            opacity: 0,
        },
        animate: {
            opacity: 1,
            transition: { ease: 'easeInOut', duration: 0.6 },
        },
        exit: {
            opacity: 0,
        },
    };

    // const transition = {
    //     translateY: {
    //         duration: 3
    //     }
    // }
    return (
        <UserDashboardProvider value={value}>
            <AnimatePresence>
                <section className="user-dashboard flex h-full min-h-screen w-screen flex-col !items-center bg-[var(--light-grey)]">
                    <section className="dashboard-wrapper w-full max-w-4xl px-3">
                        <Checkout_Header text={'MY ACCOUNT'} />
                        <section className="dashboard-body mt-3 flex !h-full flex-row gap-x-5 pb-16">
                            <div className="left flex h-full min-h-full flex-1  flex-col gap-y-2">
                                <section className="dashboard-profile relative flex h-40 w-full items-center justify-center  bg-white">
                                    <div className="profile-wrapper justify-left absolute left-[-12px] flex max-h-full w-full items-center gap-x-3">
                                        <div className="profile-photo flex h-24 w-24 items-center justify-center rounded-full">
                                            {loadingState ? (
                                                <div className="skeleton-pulse h-full rounded-full"></div>
                                            ) : (
                                                <motion.span
                                                    key={loadingState}
                                                    variants={outletVariant}
                                                    animate={'animate'}
                                                    initial={{ opacity: 0.5 }}
                                                    className="user-initial flex h-full w-full items-center justify-center rounded-full !bg-primary text-center font-gotham text-4xl !font-extrabold text-white"
                                                >
                                                    {` ${
                                                        user?.firstName?.toUpperCase()[0]
                                                    }${
                                                        user?.lastName?.toUpperCase()[0]
                                                    }`}
                                                </motion.span>
                                            )}
                                        </div>
                                        <motion.div
                                            key={loadingState}
                                            variants={outletVariant}
                                            animate={'animate'}
                                            initial={{ opacity: 0.5 }}
                                            className="user-name h-full flex-1"
                                        >
                                            {loadingState ? (
                                                <motion.div className="skeleton-pulse mb-2 !h-4 w-3/6 "></motion.div>
                                            ) : (
                                                'Hi,'
                                            )}

                                            {loadingState ? (
                                                <div className="skeleton-pulse h-5 "></div>
                                            ) : (
                                                <motion.span className="block font-gotham text-lg tracking-wider">
                                                    {`${user?.firstName} ${user?.lastName}`}
                                                </motion.span>
                                            )}
                                        </motion.div>
                                    </div>
                                </section>

                                <NavOption
                                    selectOption={selectOption}
                                    loadingState={loadingState}
                                />
                                <button
                                    disabled={loadingState}
                                    onClick={logout}
                                    className={`no-wrap relative flex  h-14 flex-row items-center bg-white px-3 `}
                                >
                                    <div className="mr-6 h-full max-h-9 w-full max-w-[36px]">
                                        {loadingState ? (
                                            <div className=" skeleton-pulse min-h-full min-w-full rounded-[50%] p-0 "></div>
                                        ) : (
                                            <img
                                                className="mr-6 h-9 w-9"
                                                src={signOut_icon}
                                                alt="sign out outline icon with transparent background"
                                            />
                                        )}
                                    </div>
                                    <div
                                        className={`justify-left flex h-full max-h-9 w-full items-center text-s font-light underline-offset-2 hover:underline`}
                                    >
                                        {loadingState ? (
                                            <div className=" skeleton-pulse min-h-full min-w-full p-0 "></div>
                                        ) : (
                                            <p> Sign Out </p>
                                        )}
                                    </div>
                                </button>
                            </div>

                            <motion.section
                                key={loadingState}
                                variants={outletVariant}
                                initial={'initial'}
                                animate={'animate'}
                                exit={'exit'}
                                className={`right relative flex w-full max-w-[568px] flex-[2] flex-col !items-start ${
                                    loadingState ? 'bg-white' : ''
                                }`}
                            >
                                {!loadingState && <Outlet />}
                                <MessageFooter
                                className={'max-w-[568px]'}
                                    isInView={isInView}
                                    footerMessage={footerMessage}
                                    setFooterMessage={setFooterMessage}
                                />
                            </motion.section>
                        </section>
                    </section>
                    <Modal
                        check={modalCheck}
                        setCheck={setModalCheck}
                        ModalContent={view[modalContent.type]}
                    />

                    <footer
                        className="sticky bottom-0 mt-auto flex w-full justify-center bg-white p-5"
                        ref={ref}
                    >
                        <section className="flex  w-full max-w-4xl flex-row items-center px-3">
                            <div className="flex flex-1 items-center justify-between">
                                <p className="text-sm tracking-wide decoration-1 underline-offset-1 hover:underline">
                                    GLAMO Homepage
                                </p>
                                <p className="text-sm tracking-wide decoration-1 underline-offset-1 hover:underline">
                                    Terms & Conditions
                                </p>

                                <p className="text-sm tracking-wide decoration-1 underline-offset-1 hover:underline">
                                    Privacy Policy
                                </p>
                            </div>
                            <p className="flex-1 text-right text-sm tracking-wide decoration-1 underline-offset-1 hover:underline">
                                © GLAMO {dayjs().year()}
                            </p>
                        </section>
                    </footer>
                </section>
            </AnimatePresence>
        </UserDashboardProvider>
    );
}

export default Dashboard;
