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
const STRIPE_KEY = import.meta.env.VITE_STRIPE_KEY;
function Add_Payment_Method({}) {
    const navigate = useNavigate();
    // const stripePromise = loadStripe(STRIPE_KEY);
    const { currentLocation } = useCurrentLocation();
    const { authDispatch } = useAuth();
    const { paymentMethods, PaymentMethodsDispatch } = usePaymentMethods();
    const [loadingBtnID, setLoading] = useState();
    const addPaymentMethod = async (obj) => {
        try {
            const { index } = obj;
            setLoading(() => index);
            (obj);

            const result = await axios.post('user/payment-method/add', obj);
            setTimeout(() => {
                PaymentMethodsDispatch({
                    type: 'set',
                    payload: result.data.payment_methods,
                });
                setLoading(() => null);

                navigate('/my-account/payment-methods');
            }, 600);
        } catch (error) {
            ('error at payment methods: ', error);
            logOutUser({ error, authDispatch, navigate });
         
        }
    };

    const handlePaymentClick = async ({ type }) => {
        try {
            // const result = await axios.get(`user/payment-method/${type}`);
            const result = await axios.post('user/payment-method/digital', {type})
            const { url } = result.data;
            ({ url });

            window.open(url, '_self');
        } catch (error) {
            console.error(error);
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
            onClick: () => handlePaymentClick({ type: 'paypal' }),
        },

        {
            index: 3,
            icon: paypal_icon,
            logo: 'paypal',
            text: 'Pay in 3',
            alt: 'paypal icon',
            description: 'with PayPal Pay Later',
            onClick: () => handlePaymentClick({ type: 'paypal' }),
        },
        {
            index: 4,
            icon: klarna_logo,
            logo: 'klarna',
            text: 'Pay Later',
            alt: 'klarna logo',
            description: 'with Klarna',
            onClick: () => handlePaymentClick({ type: 'klarna' }),
        },
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

    ('filteredButtonArray: ', filteredButtonArray);
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
