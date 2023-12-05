import { useElements, useStripe } from '@stripe/react-stripe-js';
import axios from '../../api/axios';
import { useCart } from '../../context/cartContext';
import { useCheckoutContext } from '../../context/checkOutContext';
import { useEffect, useRef, useState } from 'react';

import paypal_icon from '../../assets/icons/payment-icons/paypal.svg';
import { useAuth } from '../../hooks/useAuth';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import dayjs from 'dayjs';
import paypal_pp_icon from '../../assets/icons/paypal-pp-logo.svg';
import { AnimatePresence, motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
dayjs.extend(customParseFormat);
const CLIENT_URL = import.meta.env.VITE_CLIENT_URL;

function Buy_Now_Btn({ disable }) {
    console.log('rerender');
    const {
        isOrderSubmit,
        setOrderSubmit,
        billingAddress,
        shippingAddress,
        selectedMethod,
        setError,
        error,

        klarnaDob,
        setKlarnaDob,
        deliveryDate,
    } = useCheckoutContext();
    // const [paymentIntentInfo, setPaymentIntentInfo] = useState(null);

    const { user } = useAuth();
    const { cart, deliveryOption } = useCart();
    const stripe = useStripe();
    const elements = useElements();
    const navigate = useNavigate();
    const paymentIntentInfo = useRef();
    const fetchPaymentIntent = async () => {
        const { data } = await axios.post('/order/create-payment-intent', {
            billing: {
                address: {
                    city: billingAddress.city,
                    country: billingAddress.country,
                    line1: billingAddress.address_1,
                    line2: billingAddress.address_2,
                    postal_code: billingAddress.postCode,
                    state: billingAddress.county,
                },
                name: `${billingAddress.firstName} ${billingAddress.lastName}`,
            },
            shipping: {
                address: {
                    city: shippingAddress.city,
                    country: shippingAddress.country,
                    line1: shippingAddress.address_1,
                    line2: shippingAddress.address_2,
                    postal_code: shippingAddress.postCode,
                    state: shippingAddress.county,
                },
                name: `${shippingAddress.firstName} ${shippingAddress.lastName}`,
            },
            cart,
            deliveryOption,
            deliveryDate,
        });

        return data;
    };

    const submitOrder = async () => {
        let isCardPaymentSuccessful = false;
        try {
            console.log({ deliveryOption });
            setOrderSubmit(() => true);
            if (true) {
                const info = await fetchPaymentIntent();

                paymentIntentInfo.current = info;
                // setPaymentIntentInfo({
                //     id: info.id,
                //     clientSecret: info.clientSecret,
                // });
            } else {
                clientSecret = paymentIntentInfo.clientSecret;
            }
            const billing_details = {
                address: {
                    city: billingAddress.city,
                    country: billingAddress.country,
                    line1: billingAddress.address_1,
                    line2: billingAddress.address_2,
                    postal_code: billingAddress.postCode,
                    state: billingAddress.county,
                },
                name: `${billingAddress.firstName} ${billingAddress.lastName}`,
                email: user.email,
            };

            if (selectedMethod['type'] == 'card') {
                var { error, paymentIntent } = await stripe.confirmCardPayment(
                    paymentIntentInfo.current.clientSecret,
                    {
                        payment_method: selectedMethod.id,
                        payment_method_options: {
                            card: {
                                cvc: elements.getElement('cardCvc'),
                            },
                        },
                    }
                );
            }
            const return_url = `${CLIENT_URL}/order-success?order-number=${paymentIntentInfo.current.orderNumber.toLowerCase()}`;
            if (selectedMethod['type'] == 'paypal') {
                var { error, paymentIntent } =
                    await stripe.confirmPayPalPayment(
                        paymentIntentInfo.current.clientSecret,
                        {
                            return_url,
                        }
                    );
            }

            if (selectedMethod['type'] == 'klarna') {
                const klarnaDObFormat = `${klarnaDob['year']}-${klarnaDob['month']}-${klarnaDob['day']}`;
                const isKlarnaDobValid = dayjs(
                    klarnaDObFormat,
                    'YYYY-MM-DD',
                    true
                ).isValid();
                console.log({ isKlarnaDobValid });
                if (!isKlarnaDobValid) {
                    setKlarnaDob((prevState) => ({
                        ...prevState,
                        error: "Oops! This doesn't appear to be a valid date of birth.",
                    }));

                    setOrderSubmit(() => false);
                    return;
                }
                var { error, paymentIntent } =
                    await stripe.confirmKlarnaPayment(
                        paymentIntentInfo.current.clientSecret,
                        {
                            payment_method: {
                                billing_details,
                            },
                            return_url,
                        }
                    );
            }

            if (selectedMethod['type'] == 'clearpay') {
                var { error, paymentIntent } =
                    await stripe.confirmAfterpayClearpayPayment(
                        paymentIntentInfo.current.clientSecret,
                        {
                            payment_method: { billing_details },
                            return_url,
                        }
                    );
            }
            if (error) {
                console.error('error with payment intent', error);

                if (error.code == 'incomplete_cvc') {
                    setError((prevState) => ({
                        ...prevState,
                        cvc: error.message,
                    }));
                } else {
                    setError((prevState) => ({
                        ...prevState,
                        msg: error.message,
                    }));
                }

                setOrderSubmit(() => false);
            } else {
                if (selectedMethod?.type == 'card') {
                    isCardPaymentSuccessful = true;
                }
            }
        } catch (error) {
            console.error('error whil setingg up paymnetIntent: ', error);
        } finally {
            setTimeout(() => {
                if (isCardPaymentSuccessful) {
                    navigate(
                        `/order-success?order-number=${paymentIntentInfo.current.orderNumber.toLowerCase()}`
                    );
                }
                setOrderSubmit(() => false);
            }, 2000);
        }
    };

    const pVariant = {
        initial: {
            opacity: 0,
        },
        animate: {
            opacity: 1,

            transition: { duration: 0.2, delay: 0.4 },
        },
    };

    const imgVariant = {
        initial: {
            opacity: 1,
            display: 'hidden',
            content: '',
            translateX: -50,
        },
        animate: {
            opacity: 1,
            translateX: 0,
            transition: { duration: 0.5, delay: 0.2 },
        },
    };
    const buttonContent = () => {
        if (selectedMethod['type'] == 'paypal-pay-in-3') {
            return (
                <span className="flex flex-row items-center justify-center gap-x-2">
                    <img
                        src={paypal_pp_icon}
                        alt="paypal icon"
                        className="h-6 w-6 "
                    />
                    <p className="text-lg font-[400] text-black">Pay Later</p>
                </span>
            );
        } else if (selectedMethod['type'] == 'paypal') {
            return (
                <AnimatePresence>
                    <motion.span className="flex flex-row items-center justify-center">
                        <motion.p
                            className="text-lg font-[400] text-black"
                            variants={pVariant}
                            animate={'animate'}
                            initial={'initial'}
                        >
                            Pay with
                        </motion.p>
                        <motion.img
                            variants={imgVariant}
                            animate={'animate'}
                            initial={'initial'}
                            src={paypal_icon}
                            alt="paypal icon"
                            className="h-16"
                        />
                    </motion.span>
                </AnimatePresence>
            );
        } else {
            return (
                <span className="text-white">
                    {selectedMethod?.title
                        ? `${selectedMethod.title}`
                        : 'BUY NOW'}
                </span>
            );
        }
    };
    return (
        <div className="flex w-11/12 flex-col gap-y-4 self-center">
            <div className="h-12 w-full bg-[#000000] bg-opacity-50">
                <AnimatePresence>
                    <motion.button
                        className={`${
                            selectedMethod['type'] == 'paypal' ||
                            selectedMethod['type'] == 'paypal-pay-in-3'
                                ? 'bg-amber-400'
                                : 'bg-primary-green'
                        } flex h-14 h-full max-h-20 w-full items-center justify-center self-center font-gotham font-bold transition-all hover:mix-blend-overlay disabled:cursor-not-allowed disabled:opacity-40`}
                        type="button"
                        onClick={submitOrder}
                        disabled={disable}
                    >
                        {isOrderSubmit ? (
                            <svg
                                className="spinner-ring spinner-sm !m-0 !p-0 [--spinner-color:var(--test123)]"
                                viewBox="25 25 50 50"
                                strokeWidth="5"
                            >
                                <circle cx="50" cy="50" r="20" />
                            </svg>
                        ) : (
                            <>{buttonContent()}</>
                        )}
                    </motion.button>
                </AnimatePresence>
            </div>

            <p className="mb-12 w-11/12 self-start">
                By placing your order you agree to our Terms & Conditions,
                privacy and returns policies . You also consent to some of your
                data being stored by GLAMO, which may be used to make future
                shopping experiences better for you.
            </p>
        </div>
    );
}

export default Buy_Now_Btn;
