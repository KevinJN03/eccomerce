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

function Add_Payment_Method({}) {
    const navigate = useNavigate();

    const { currentLocation } = useCurrentLocation();
    const { authDispatch } = useAuth();
    const { paymentMethods, PaymentMethodsDispatch } = usePaymentMethods();
    const [loadingBtnID, setLoading] = useState();
    const addPaymentMethod = async (obj) => {
        try {
            const { index } = obj;
            setLoading(() => index);
            console.log(obj);

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
            console.log('error at payment methods: ', error);

            if (error.response.status == 401) {
                authDispatch({ type: 'LOGOUT' });
                navigate('/login');
            }
        }
    };

    const handlePayPalClick = async () => {
        try {
            const result = await axios.get('user/payment-method/paypal');

            const { url } = result.data;
            console.log({ url });

            window.open(url, '_self');
        } catch (error) {
            console.error(error);
        }
    };
    const buttonsArray = [
        {
            index: 1,
            icon: card_icon,
            logo: 'credit-card',
            text: 'CREDIT/DEBIT CARD',
            alt: 'black card icon with transparent background',
            onClick: () => navigate('card'),
        },
        {
            index: 2,
            icon: paypal_icon,
            logo: 'paypal',
            text: 'PayPal',
            alt: 'paypal icon',
            onClick: handlePayPalClick,
        },

        {
            index: 3,
            icon: paypal_icon,
            logo: 'paypal',
            text: 'Pay in 3',
            alt: 'paypal icon',
            description: 'with PayPal Pay Later',
            onClick: handlePayPalClick,
        },
        {
            index: 4,
            icon: klarna_logo,
            logo: 'klarna',
            text: 'Pay Later',
            alt: 'klarna logo',
            description: 'with Klarna',
        },
    ];
    const filteredButtonArray = buttonsArray.filter(
        (item) => !paymentMethods.some((method) => item.index === method.index)
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

    console.log('filteredButtonArray: ', filteredButtonArray);
    return (
        <section className="add-payment-method bg-white p-4">
            {currentLocation == 'add' ? (
                <>
                    {' '}
                    <h2 className="mb-2 text-xl font-bold">
                        {'ADD PAYMENT METHOD'}
                    </h2>
                    <span className="flex flex-row items-center gap-x-4">
                        <img
                            src={info_icon}
                            alt="black information icon with transparent background"
                            className="h-6 w-6"
                        />
                        {paymentMethods.length < 1 && (
                            <p>
                                You currently have no saved payment methods. Get
                                started by adding one.
                            </p>
                        )}
                    </span>
                    <div className="mt-4 flex flex-col !items-center">
                        {filteredButtonArray.map(
                            (
                                {
                                    icon,
                                    text,
                                    alt,
                                    onClick,
                                    description,
                                    logo,
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
                                        onClick={() =>
                                            onClick() ||
                                            addPaymentMethod({
                                                index,
                                                text,
                                                alt,
                                                description,
                                                logo,
                                            })
                                        }
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
