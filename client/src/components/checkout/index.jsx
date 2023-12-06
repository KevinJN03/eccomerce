import '../../CSS/checkout.scss';

import RedirectImage from '../../assets/icons/forwarding.png';
import disableLayout from '../../hooks/disableLayout';
import Address from './address form/address.jsx';
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
} from 'framer-motion';
import exampleCustomerInfo from './address form/example-customer-info.jsx';
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
function Checkout() {
    disableLayout();

    const [stripePromise, setStripePromise] = useState(() =>
        loadStripe(STRIPE_KEY)
    );
    const [error, setError] = useState({
        msg: null,
        positionY: '0px',
    });
    const { authDispatch } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
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
    const { cart } = useCart();
    const [selectedMethod, setSelectedMethod] = useState({});
    const [klarnaDob, setKlarnaDob] = useState({});

    const abortControllerRef = useRef(new AbortController());

    useEffect(() => {
        abortControllerRef.current?.abort();
        abortControllerRef.current = new AbortController();

        const fetchData = async () => {
            try {
                const result = await axios.get('user/userData', {
                    signal: abortControllerRef.current.signal,
                });

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
                const findAddress = (property, setState) => {
                    if (default_address[property]) {
                        const foundAddress = user.address.find(
                            (item) => item._id == default_address[property]
                        );

                        setState(() => foundAddress);
                    }
                };

                findAddress('shipping_address', setShippingAddress);
                findAddress('billing_address', setBillingAddress);

                setAddresses(() => user.address);
            } catch (error) {
                console.error(
                    'error while trying to get logged in user data',
                    error
                );

                logOutUser({ error, authDispatch, navigate });
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        if (cart.length == 0) {
            setLoading(() => true);

            const timeout = setTimeout(() => {
                navigate('/home');
                setLoading(false);
            }, 5000);
            return () => {
                clearTimeout(timeout);
            };
        }
    }, [cart]);

    return (
        <CheckOutProvider
            value={{
                loading,
                setLoading,
                error,
                setError,
                addresses,
                setAddresses,
                shippingAddress,
                setShippingAddress,
                billingAddress,
                setBillingAddress,
                defaultAddresses,
                setDefaultAddresses,
                error,
                setError,
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
                deliveryDate, setDeliveryDate
            }}
        >
            <Elements stripe={stripePromise}>
                {loading && (
                    <div className="flex h-screen w-full max-w-[400px] flex-col items-center justify-center gap-y-4">
                        <img src={RedirectImage} className="h-28 w-28" />
                        <p className="text-center text-lg">
                            Your cart is Empty, you will get redirected to the
                            Home Page in a few seconds.
                        </p>
                        <span className="loading loading-infinity loading-lg"></span>
                    </div>
                )}

                {!loading && (
                    <section id="checkout-page">
                        <section
                            id="checkout"
                            variants={variants}
                            animate={'animate'}
                            initial={'initial'}
                            exit={'exit'}
                        >
                            <Checkout_Header text={'CHECKOUT'} />
                            <div className="checkout-body">
                                <section id="checkout-body-wrapper">
                                    <section className="left flex flex-col !bg-[var(--light-grey)]">
                                        <section className="top relative flex min-h-screen flex-col gap-y-3 !bg-[var(--light-grey)]">
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
                                            <Address
                                                mainAddress={shippingAddress}
                                                setMainAddress={
                                                    setShippingAddress
                                                }
                                                defaultProperty={
                                                    'shipping_address'
                                                }
                                                addressType={'DELIVERY'}
                                                enableAddressEdit={true}
                                            />

                                            <Delivery
                                                disable={
                                                    disableOtherComponents?.disable
                                                }
                                            />
                                            {/* <Payment
                                                defaultProperty={
                                                    'billing_address'
                                                }
                                                billingAddress={billingAddress}
                                                setBillingAddress={
                                                    setBillingAddress
                                                }
                                            /> */}
                                        </section>
                                        <div className="bottom mt-5 flex flex-col gap-y-3">
                                            <Buy_Now_Btn
                                                disable={
                                                    disableOtherComponents?.disable
                                                }
                                                isOrderSubmit={isOrderSubmit}
                                            />
                                        </div>
                                    </section>
                                </section>

                                <Checkout_Total />
                            </div>
                            <footer className="relative left-[calc(-50vw+50%)] mt-5 min-w-[100vw] self-start bg-white  py-6 text-center">
                                GLAMO Help
                            </footer>
                        </section>
                    </section>
                )}
            </Elements>
        </CheckOutProvider>
    );
}

export default Checkout;
