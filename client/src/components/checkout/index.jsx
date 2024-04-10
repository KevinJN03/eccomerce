import '../../CSS/checkout.scss';

import RedirectImage from '../../assets/icons/forwarding.png';

import Address from './address/address.jsx';
import Address_Container from './address/addressContainer.jsx';
import Checkout_Header from './checkout_header';
import Checkout_Total from './checkout_total/Checkout_Total.jsx';
import Country_Picker from './country_picker';
import Delivery from './delivery/delivery';
import Email_address from './email-address';
import Payment from './payment/payment';
import Promo from './promo';
import { PromoProvider } from '../../hooks/promoContext';
import { useEffect, useRef, useState } from 'react';
import { useCart } from '../../context/cartContext';
import { useNavigate } from 'react-router-dom';
import {
    motion,
    AnimatePresence,
    useScroll,
    useMotionValueEvent,
    useInView,
} from 'framer-motion';
import exampleCustomerInfo from './address/example-customer-info.jsx';
import axios from '../../api/axios.js';
import variants from '../common/framerMotionVariants.jsx';
import logOutUser from '../common/logoutUser.js';
import { useAuth } from '../../hooks/useAuth.jsx';
import CheckOutProvider from '../../context/checkOutContext.jsx';
import { Elements, PaymentElement, useStripe } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Buy_Now_Btn from './buy-now-btn.jsx';
const STRIPE_KEY = import.meta.env.VITE_STRIPE_KEY;
import dayjs from 'dayjs';

import findAddress from '../common/findaddress.jsx';
import PaymentMethodProvider from '../../context/paymentMethodContext.jsx';
function Checkout() {
    const [stripePromise, setStripePromise] = useState(() =>
        loadStripe(STRIPE_KEY)
    );
    const [footerMessage, setFooterMessage] = useState({
        success: null,
        text: null,
    });
    const { authDispatch } = useAuth();
    const navigate = useNavigate();

    const [isOrderSubmit, setOrderSubmit] = useState(false);
    const [addresses, setAddresses] = useState([]);
    const [shippingAddress, setShippingAddress] = useState({});
    const [billingAddress, setBillingAddress] = useState({});
    const [defaultAddresses, setDefaultAddresses] = useState({});
    const [select, setSelect] = useState('GB');
    const [disableOtherComponents, SetDisableOtherComponents] = useState({
        disable: false,
        addressType: null,
    });
    const [deliveryDate, setDeliveryDate] = useState('');
    const { cart, fetchItems } = useCart();
    const [selectedMethod, setSelectedMethod] = useState({});
    const [klarnaDob, setKlarnaDob] = useState({});
    const [isDataSet, setIsDataSet] = useState(false);
    const [isDeliveryAddressFill, setIsDeliveryAddressFill] = useState(false);
    const [isFirstPaymentSet, setIsFirstPaymentSet] = useState(false);
    const [userPaymentMethods, setUserPaymentMethods] = useState([]);
    const [initialView, setInitialView] = useState(null);
    const abortControllerRef = useRef(new AbortController());
    const [error, setError] = useState({});
    const [loading, setLoading] = useState(true);
    const [cartLoading, setCartLoading] = useState();

    // useEffect(() => {
    //     if (cart.length == 0) {
    //         setCartLoading(() => true);
    //         setLoading(() => true);

    //         const timeout = setTimeout(() => {
    //             // navigate('/home');

    //             window.location = '/home';
    //         }, 4000);
    //         return () => {
    //             clearTimeout(timeout);
    //         };
    //     }
    // }, [cart]);

    useEffect(() => {
        abortControllerRef.current?.abort();
        abortControllerRef.current = new AbortController();
        // const data = fetchItems();

        // console.log(data)
        // if (items.length == 0) {
        //     setCartLoading(() => true);

        //     const timeout = setTimeout(() => {
        //         // navigate('/home');

        //         window.location = '/home';
        //     }, 4000);
        //     return () => {
        //         clearTimeout(timeout);
        //     };
        // }

        const fetchData = async () => {
            try {
                // const result = await axios.get('user/userData', {
                //     signal: abortControllerRef.current.signal,
                // });
                const [result, { data: paymentData }] = await Promise.all([
                    axios.get('user/userData', {
                        signal: abortControllerRef.current.signal,
                    }),
                    axios.get('user/payment-method/all', {
                        signal: abortControllerRef.current.signal,
                    }),
                ]);
                console.log({ paymentData });
                setUserPaymentMethods(() => paymentData?.paymentMethods);
                if (paymentData.paymentMethods?.[0]) {
                    // setSelectedMethod(() => data.paymentMethods[0]);
                    setSelectedMethod(() => paymentData.paymentMethods?.[0]);
                    setInitialView(() => 'selectedMethod');
                } else {
                    setInitialView(() => 'options');
                }
                const { user } = result.data;

                const dobDayjs = dayjs(user.dob);
                const dobOBj = {
                    year: dobDayjs.year(),
                    month: dobDayjs.month() + 1,
                    day: dobDayjs.date(),
                };
                setKlarnaDob(dobOBj);
                const default_address = user?.default_address;
                setDefaultAddresses(() => user?.default_address || {});

                const findShipping = findAddress({
                    property: 'shipping_address',
                    default_address,
                    addresses: user?.address,
                });
                const findBilling = findAddress({
                    property: 'billing_address',
                    default_address,
                    addresses: user?.address,
                });
                setShippingAddress(() => findShipping);
                setBillingAddress(() => findBilling);

                setAddresses(() => user.address);

                if (user?.address?.length >= 1) {
                    setIsDeliveryAddressFill(() => true);
                }
            } catch (error) {
                console.error(
                    'error while trying to get logged in user data',
                    error
                );

                logOutUser({ error, authDispatch, navigate });
            } finally {
                setIsDataSet(() => true);
                setLoading(() => false);

                setCartLoading(() => false);
            }
        };

        fetchData();
    }, []);

    return (
        <CheckOutProvider
            value={{
                loading,
                setLoading,
                footerMessage,
                setFooterMessage,
                addresses,
                setAddresses,
                shippingAddress,
                setShippingAddress,
                billingAddress,
                setBillingAddress,
                defaultAddresses,
                setDefaultAddresses,

                select,
                setSelect,
                disableOtherComponents,
                SetDisableOtherComponents,
                isOrderSubmit,
                setOrderSubmit,
                selectedMethod,
                setSelectedMethod,
                klarnaDob,
                setKlarnaDob,
                deliveryDate,
                setDeliveryDate,
                isDataSet,
                isFirstPaymentSet,
                setIsFirstPaymentSet,
                setIsDeliveryAddressFill,
                initialView,
                setInitialView,
                error,
                setError,
            }}
        >
            <section className="checkout-page-wrapper m-0 flex h-full min-h-screen w-full  max-w-[100vw] items-center justify-center p-0">
                <Elements stripe={stripePromise}>
                    {cartLoading ? (
                        <div className="flex h-full w-full max-w-[400px] flex-col items-center justify-center gap-y-4">
                            <img src={RedirectImage} className="h-28 w-28" />
                            <p className="text-center text-lg">
                                Your cart is Empty, you will get redirected to
                                the Home Page in a few seconds.
                            </p>
                            <span className="loading loading-infinity loading-lg"></span>
                        </div>
                    ) : (
                        !cartLoading &&
                        !loading && (
                            <section
                                id="checkout-page"
                                className="m-0 flex h-full w-full flex-col items-center justify-center p-0"
                            >
                                <section
                                    id="checkout"
                                    variants={variants}
                                    animate={'animate'}
                                    initial={'initial'}
                                    exit={'exit'}
                                >
                                    <Checkout_Header text={'CHECKOUT'} />
                                    <div
                                        id="checkout-body"
                                        className="relative mt-5 flex max-w-[100vw] flex-row gap-3 bg-light-grey sm+md:flex-col-reverse"
                                    >
                                        <section
                                            id="checkout-body-wrapper"
                                            className="h-full !bg-light-grey lg:w-[600px]"
                                        >
                                            <section className="left flex flex-col">
                                                <section className="top relative flex min-h-screen flex-col gap-y-3 !bg-light-grey">
                                                    <Country_Picker
                                                        disable={
                                                            disableOtherComponents?.disable
                                                        }
                                                        select={select}
                                                        setSelect={setSelect}
                                                    />
                                                    <Promo
                                                        disable={
                                                            disableOtherComponents?.disable
                                                        }
                                                    />
                                                    <Email_address
                                                        disable={
                                                            disableOtherComponents?.disable
                                                        }
                                                    />
                                                    <Address_Container
                                                        mainAddress={
                                                            shippingAddress
                                                        }
                                                        setMainAddress={
                                                            setShippingAddress
                                                        }
                                                        defaultProperty={
                                                            'shipping_address'
                                                        }
                                                        addressType={'DELIVERY'}
                                                        enableAddressEdit={true}
                                                        disable={
                                                            disableOtherComponents?.disable &&
                                                            disableOtherComponents.addressType !=
                                                                'DELIVERY'
                                                        }
                                                    />

                                                    {isDeliveryAddressFill ? (
                                                        <Delivery
                                                            disable={
                                                                disableOtherComponents?.disable
                                                            }
                                                        />
                                                    ) : (
                                                        <div className="border-2 px-6 py-4">
                                                            <p className="text-lg font-bold opacity-20">
                                                                DELIVERY OPTIONS
                                                            </p>
                                                        </div>
                                                    )}

                                                    {isDeliveryAddressFill ? (
                                                        <PaymentMethodProvider
                                                            userPaymentMethods={
                                                                userPaymentMethods
                                                            }
                                                        >
                                                            <Payment
                                                                defaultProperty={
                                                                    'billing_address'
                                                                }
                                                                billingAddress={
                                                                    billingAddress
                                                                }
                                                                setBillingAddress={
                                                                    setBillingAddress
                                                                }
                                                            />
                                                        </PaymentMethodProvider>
                                                    ) : (
                                                        <div className="border-2 px-6 py-4">
                                                            <p className="text-lg font-bold opacity-20">
                                                                PAYMENT
                                                            </p>
                                                        </div>
                                                    )}
                                                </section>
                                                <div className="bottom flex flex-col gap-y-3 bg-light-grey pt-5">
                                                    <Buy_Now_Btn
                                                        disable={
                                                            disableOtherComponents?.disable ||
                                                            !isDeliveryAddressFill ||
                                                            !selectedMethod?.type
                                                        }
                                                        isOrderSubmit={
                                                            isOrderSubmit
                                                        }
                                                    />
                                                </div>
                                            </section>
                                        </section>

                                        <Checkout_Total />
                                    </div>
                                </section>

                                <footer className="mt-5 w-full self-start bg-white  py-6 text-center">
                                    GLAMO Help
                                </footer>
                            </section>
                        )
                    )}
                </Elements>
            </section>
        </CheckOutProvider>
    );
}

export default Checkout;
