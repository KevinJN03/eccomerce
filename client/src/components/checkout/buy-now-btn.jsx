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
dayjs.extend(customParseFormat);
const CLIENT_URL = import.meta.env.VITE_CLIENT_URL;

function Buy_Now_Btn({ disable }) {
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
    } = useCheckoutContext();
    const [paymentIntentInfo, setPaymentIntentInfo] = useState(null);

    const { user } = useAuth();
    const { cart } = useCart();
    const stripe = useStripe();
    const elements = useElements();

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
        });

        const { id, clientSecret } = data;
        setPaymentIntentInfo({ id, clientSecret });
    };

    useEffect(() => {
        if (
            Object.keys(billingAddress).length == 0 &&
            Object.keys(shippingAddress).length == 0
        ) {
            return;
        }
        fetchPaymentIntent();
    }, [billingAddress, shippingAddress]);

    const submitOrder = async () => {
        try {
            setOrderSubmit(() => true);

            if (selectedMethod['type'] == 'card') {
                var { error, paymentIntent } = await stripe.confirmCardPayment(
                    paymentIntentInfo.clientSecret,
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

            if (selectedMethod['type'] == 'paypal') {
                var { error, paymentIntent } =
                    await stripe.confirmPayPalPayment(
                        paymentIntentInfo.clientSecret,
                        {
                            return_url: `${CLIENT_URL}/order/success`,
                        }
                    );
            }

            if (selectedMethod['type'] == 'klarna') {
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

                const klarnaDObFormat = `${klarnaDob['year']}-${klarnaDob['month']}-${klarnaDob['day']}`;
                const isKlarnaDobValid = dayjs(
                    klarnaDObFormat,
                    'YYYY-MM-DD',
                    true
                ).isValid();

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
                        paymentIntentInfo.clientSecret,
                        {
                            payment_method: {
                                billing_details,
                            },
                            return_url: `${CLIENT_URL}/order/success`,
                        }
                    );
            }
            if (error) {
                console.error('error with payment intent', error);
                setError((prevState) => ({
                    ...prevState,
                    msg: error.message,
                }));
            } else {
                console.log({ paymentIntent });
            }
        } catch (error) {
            console.error('error whil setingg up paymnetIntent: ', error);
        } finally {
            setTimeout(() => {
                setOrderSubmit(() => false);
            }, 2000);
        }
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
                <span className="flex flex-row items-center justify-center">
                    <p className="text-lg font-[400] text-black">Pay with</p>
                    <img
                        src={paypal_icon}
                        alt="paypal icon"
                        className="h-16 "
                    />
                </span>
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
                <button
                    className={`${
                        selectedMethod['type'] == 'paypal' ||
                        selectedMethod['type'] == 'paypal-pay-in-3'
                            ? 'bg-amber-400'
                            : 'bg-primary-green'
                    } flex h-14 h-full max-h-20 w-full items-center justify-center self-center font-gotham font-bold transition-all hover:mix-blend-overlay disabled:opacity-40`}
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
                </button>
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
