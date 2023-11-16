import disableLayout from '../../hooks/disableLayout';
import Checkout_Header from '../checkout/checkout_header.jsx';
import '../../CSS/user-dashboard.scss';
import { useEffect, useReducer, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import Modal from '../admin/components/modal/modal.jsx';
import signOut_icon from '../../assets/icons/signout-icon.png';
import { UserDashboardProvider, reducer } from '../../context/userContext.jsx';
import DeletePaymentMethod from './payment-methods/delete-payment-method.jsx';
import NavOption from './navOptions.jsx';
import { useAuth } from '../../hooks/useAuth.jsx';
import axios from '../../api/axios.js';
import dayjs from 'dayjs';
import DeleteAddress from './address/deleteAddress.jsx';

import { motion, AnimatePresence } from 'framer-motion';
import useCurrentLocation from '../../hooks/useCurrentLocation.jsx';
function Dashboard() {
    disableLayout();
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

    useEffect(() => {
        axios
            .get('user/userData')
            .then(async (res) => {
                try {
                    const result = await axios.get('user/payment-method/all');
                    setDob(() => dayjs(res.data.user.dob).toISOString());
                    setContactPreference(
                        () => res.data.user.contact_preferences
                    );
                    setAddress(() => res.data.user.address);

                    console.log('pm: ', res.data.user?.payment_methods);
                    setUserPaymentMethods(() => [
                        ...result.data.paymentMethods,
                        ...res.data.user.payment_methods,
                    ]);
                    setDefaultAddresses(() => res.data.user?.default_address);

                    setTimeout(() => {
                        setLoadingState(false);
                    }, 1000);
                } catch (error) {
                    console.log(
                        'error while checking if user is authenticated: ',
                        error
                    );
                }
            })
            .catch((error) => {
                console.log(
                    'error while checking if user is authenticated: ',
                    error
                );

                if (error.response.status == 401) {
                    authDispatch({ type: 'LOGOUT' });
                    navigate('/login');
                }
            });
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
        console.log('split: ', pathname.split('/'));

        setSelectionOption(() => getRoute());
    }, [pathname]);

    const [modalContent, modalContentDispatch] = useReducer(reducer, {});
    const [modalCheck, setModalCheck] = useState(false);
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
    };

    const view = {
        deletePaymentMethod: <DeletePaymentMethod />,
        deleteAddress: <DeleteAddress />,
    };

    const logout = async () => {
        try {
            await axios.get('user/logout');
            authDispatch({ type: 'LOGOUT' });

            navigate('/home');
        } catch (error) {
            console.log('error while loging out: ', error);
        }
    };

    const outletVariant = {
        initial: { opacity: 0 },
        animate: {
            opacity: 1,
            transition: { ease: 'easeInOut', duration: 0.6 },
        },
        exit: {
            opacity: 0,
        },
    };

    return (
        <UserDashboardProvider value={value}>
            <AnimatePresence>
                <section className="user-dashboard flex h-full min-h-screen w-screen flex-col !items-center bg-[var(--light-grey)] pb-10">
                    <section className="dashboard-wrapper w-full max-w-4xl px-3">
                        <Checkout_Header text={'MY ACCOUNT'} />
                        <section className="dashboard-body mt-3 flex h-full flex-row gap-x-5">
                            <div className="left flex min-h-full flex-1  flex-col gap-y-2">
                                <section className="dashboard-profile relative flex h-40 w-full items-center justify-center  bg-white">
                                    <div className="profile-wrapper justify-left absolute left-[-12px] flex w-full items-center gap-x-3">
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
                                                    KJ
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
                            <motion.div
                                key={loadingState}
                                variants={outletVariant}
                                initial={'initial'}
                                animate={'animate'}
                                className={`right min-h-full flex-[2] ${
                                    loadingState ? 'bg-white' : ''
                                }`}
                            >
                                {!loadingState && <Outlet />}
                            </motion.div>
                        </section>
                    </section>
                    <Modal
                        check={modalCheck}
                        setCheck={setModalCheck}
                        ModalContent={view[modalContent.type]}
                    />
                </section>
            </AnimatePresence>
        </UserDashboardProvider>
    );
}

export default Dashboard;
