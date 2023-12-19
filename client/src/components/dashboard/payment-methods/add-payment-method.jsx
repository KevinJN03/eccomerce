import info_icon from '../../../assets/icons/information-icon.png';
import card_icon from '../../../assets/icons/credit-card.png';
import paypal_icon from '../../../assets/icons/payment-icons/paypal.svg';
import klarna_logo from '../../../assets/icons/payment-icons/klarna.svg';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { debounce } from 'lodash';
import Divider from '../divider';
import useCurrentLocation from '../../../hooks/useCurrentLocation';
import { Fragment, useEffect, useState } from 'react';
import Button from './button';
import { usePaymentMethods } from '../../../context/paymentMethodContext';
import { useAuth } from '../../../hooks/useAuth';
import axios from '../../../api/axios';
import logOutUser from '../../common/logoutUser';
import { loadStripe } from '@stripe/stripe-js';
import { useStripe } from '@stripe/react-stripe-js';
import clearpay_icon from '../../../assets/icons/payment-icons/afterpay.png';
import logos from './logos';
import { useUserDashboardContext } from '../../../context/userContext';
const STRIPE_KEY = import.meta.env.VITE_STRIPE_KEY;
function Add_Payment_Method({}) {
    const navigate = useNavigate();
    const stripe = useStripe();
    const { currentLocation } = useCurrentLocation();
    const { authDispatch } = useAuth();

    const { setFooterMessage } = useUserDashboardContext();
    const { paymentMethods, PaymentMethodsDispatch } = usePaymentMethods();
    const [loadingBtnID, setLoading] = useState();
    // const addPaymentMethod = async (obj) => {
    //     try {
    //         const { index } = obj;
    //         setLoading(() => index);

    //         const result = await axios.post('user/payment-method/add', obj);
    //         setTimeout(() => {
    //             PaymentMethodsDispatch({
    //                 type: 'set',
    //                 payload: result.data.payment_methods,
    //             });
    //             setLoading(() => null);

    //             navigate('/my-account/payment-methods');
    //         }, 600);
    //     } catch (error) {
    //         'error at payment methods: ', error;
    //         logOutUser({ error, authDispatch, navigate });
    //     }
    // };

    const handlePaymentClick = async ({ type, index }) => {
        let success = false;
        let allPayments = [];
        try {
            // const result = await axios.get(`user/payment-method/${type}`);
            setLoading(index);
            const { data } = await axios.post('user/payment-method/digital', {
                type,
            });
            // if(data?.clientSecret){

            //      const { setupIntent, error } = await stripe.handleNextAction({
            //         clientSecret: data?.clientSecret,
            // });
            // console.log({ error, setupIntent });
            // }

            allPayments.push(...data?.paymentMethods);
            success = true;
        } catch (error) {
            console.error(error);

            if (error?.response?.status == 401) {
                logOutUser({ error, authDispatch, navigate });
            }
        } finally {
            setTimeout(() => {
                if (success) {
                    PaymentMethodsDispatch({
                        type: 'set',
                        payload: allPayments,
                    });
                    setFooterMessage({
                        success: true,
                        text: 'Payment method added',
                    });
                    navigate('/my-account/payment-methods');
                }
                setLoading('');
            }, 800);
        }
    };
    const buttonsArray = [
        {
            index: 1,
            icon: card_icon,
            type: 'credit-card',
            text: 'CREDIT/DEBIT CARD',
            alt: 'black card icon with transparent background',
            onClick: () => navigate('card'),
        },
        {
            index: 2,
            icon: paypal_icon,
            type: 'paypal',
            text: 'PayPal',
            alt: 'paypal icon',
            onClick: () => handlePaymentClick({ type: 'paypal', index: 2 }),
        },

        // {
        //     index: 3,
        //     icon: paypal_icon,
        //     logo: 'paypal',
        //     text: 'Pay in 3',
        //     alt: 'paypal icon',
        //     description: 'with PayPal Pay Later',
        //     onClick: () => handlePaymentClick({ type: 'paypal', index: 3 }),
        // },
        // {
        //     index: 4,
        //     icon: klarna_logo,
        //     logo: 'klarna',
        //     text: 'Pay Later',
        //     alt: 'klarna logo',
        //     description: 'with Klarna',
        //     onClick: () => handlePaymentClick({ type: 'klarna', index: 4 }),
        // },

        // {
        //     index: 5,
        //     icon: clearpay_icon,
        //     logo: 'clearpay',
        //     text: 'Pay Later',
        //     alt: 'clearpay logo',
        //     description: 'with ClearPay',
        //     onClick: () => handlePaymentClick({ type: 'afterpay_clearpay', index: 5 }),
        // },
    ];
    const filteredButtonArray = buttonsArray.filter(
        (item) => !paymentMethods.some((method) => method.type == item.type)
        // paymentMethods.some((method) => item.index == method?.index)
    );
    useEffect(() => {
        if (
            filteredButtonArray.length == 1 &&
            filteredButtonArray[0].index == 1
        ) {
            navigate('card');
        }
    }, []);

    'filteredButtonArray: ', filteredButtonArray;
    return (
        <section className="add-payment-method bg-white p-4">
            {currentLocation == 'add' ? (
                <>
                    {' '}
                    <h2 className="mb-2 text-xl font-bold">
                        {'ADD PAYMENT METHOD'}
                    </h2>
                    {paymentMethods.length < 1 && (
                        <span className="flex flex-row items-center gap-x-4">
                            <img
                                src={info_icon}
                                alt="black information icon with transparent background"
                                className="h-6 w-6"
                            />

                            <p>
                                You currently have no saved payment methods. Get
                                started by adding one.
                            </p>
                        </span>
                    )}
                    <div className="mb-10 mt-4 flex flex-col !items-center">
                        {filteredButtonArray.map(
                            (
                                {
                                    icon,
                                    text,
                                    alt,
                                    onClick,
                                    description,
                                    type,
                                    index,
                                },
                                idx
                            ) => {
                                if (idx == 0) {
                                    return (
                                        <Fragment key={index}>
                                            <Button
                                                loading={loadingBtnID == index}
                                                icon={icon}
                                                text={text}
                                                alt={alt}
                                                onClick={onClick}
                                            />
                                            <Divider />
                                        </Fragment>
                                    );
                                }
                                return (
                                    <Button
                                        key={index}
                                        icon={icon}
                                        text={text.toUpperCase()}
                                        alt={alt}
                                        description={description}
                                        loading={loadingBtnID == index}
                                        onClick={onClick}
                                    />
                                );
                            }
                        )}
                    </div>
                </>
            ) : (
                <Outlet />
            )}
        </section>
    );
}

export default Add_Payment_Method;
