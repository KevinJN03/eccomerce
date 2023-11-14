import info_icon from '../../../assets/icons/information-icon.png';
import card_icon from '../../../assets/icons/credit-card.png';
import paypal_icon from '../../../assets/icons/payment-icons/paypal.svg';
import klarna_logo from '../../../assets/icons/payment-icons/klarna.svg';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { debounce } from 'lodash';
import Divider from '../divider';
import useCurrentLocation from '../../../hooks/useCurrentLocation';
import { Fragment } from 'react';
import Button from './button';
import { usePaymentMethods } from '../../../context/paymentMethodContext';
import { useAuth } from '../../../hooks/useAuth';
import axios from '../../../api/axios';

function Add_Payment_Method({}) {
    const navigate = useNavigate();

    const { currentLocation } = useCurrentLocation();
    const { authDispatch } = useAuth();
    const { PaymentMethodsDispatch } = usePaymentMethods();

    const addPaymentMethod = async (obj) => {
        try {
            console.log(obj);

            const result = await axios.post('user/payment-method/add', obj);

            PaymentMethodsDispatch({
                type: 'set',
                payload: result.data.payment_methods,
            });
            
        } catch (error) {
            console.log('error at payment methods: ', error);

            if (error.response.status == 401) {
                authDispatch({ type: 'LOGOUT' });
                navigate('/login');
            }
        }
    };
    const buttonsArray = [
        {
            icon: card_icon,
            logo: 'credit-card',
            text: 'CREDIT/DEBIT CARD',
            alt: 'black card icon with transparent background',
            onClick: () => navigate('card'),
        },
        {
            icon: paypal_icon,
            logo: 'paypal',
            text: 'PAYPAL',
            alt: 'paypal icon',
        },

        {
            icon: paypal_icon,
            logo: 'paypal',
            text: 'PAYPAL',
            alt: 'paypal icon',
            description: 'with PayPal Pay Later',
        },
        {
            icon: klarna_logo,
            logo: 'klarna',
            text: 'PAY LATER',
            alt: 'klarna logo',
            description: 'with Klarna',
        },
    ];
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
                        <p>
                            You currently have no saved payment methods. Get
                            started by adding one.
                        </p>
                    </span>
                    <div className="mt-4 flex flex-col !items-center">
                        {buttonsArray.map(
                            (
                                { icon, text, alt, onClick, description, logo },
                                idx
                            ) => {
                                if (idx == 0) {
                                    return (
                                        <Fragment key={idx}>
                                            <Button
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
                                        key={idx}
                                        icon={icon}
                                        text={text}
                                        alt={alt}
                                        description={description}
                                        onClick={() =>
                                            addPaymentMethod({
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
