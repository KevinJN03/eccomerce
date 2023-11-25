import {
    Elements,
    PaymentElement,
    useStripe,
    useElements,
    CardCvcElement,
    CardExpiryElement,
    CardNumberElement,
    AddressElement,
    CardElement,
} from '@stripe/react-stripe-js';
import { useEffect, useState } from 'react';

import { motion, AnimatePresence } from 'framer-motion';
import Form from './form';
import Input from '../../Login-SignUp/input';
import logos from './logos';
import ErrorMessage from '../../Login-SignUp/errorMessage';
import { useNavigate } from 'react-router-dom';
import axios from '../../../api/axios';
import { usePaymentMethods } from '../../../context/paymentMethodContext';
import  Error_Alert  from '../../common/error-alert';

export function AddCartForm({ clientSecret }) {
    const [error, setError] = useState({});
    const [isDefault, setDefault] = useState(false);
    const [btnLoad, setBtnLoad] = useState(false);
    const [cardNumber, setCardNumber] = useState('');
    const { PaymentMethodsDispatch } = usePaymentMethods();
    const [name, setName] = useState('');
    const [cvc, setCvc] = useState('');
    const stripe = useStripe();
    const elements = useElements();
    const navigate = useNavigate();
    const handleClick = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) {
            return;
        }
        if (!name) {
            setError((prevState) => ({
                ...prevState,
                name: 'Please enter your full name.',
            }));
            return;
        }
        setBtnLoad(true);

        stripe
            .confirmCardSetup(clientSecret, {
                payment_method: {
                    card: elements.getElement('card'),
                    billing_details: {
                        name,
                    },
                },
            })
            .then(({ error, setupIntent }) => {
                setTimeout(async () => {
                    try {
                        let paymentMethodArray = [];
                        if (isDefault) {
                            const result = await axios.post(
                                `user/payment-method/changedefault/${setupIntent.payment_method}`
                            );
                            const { paymentMethods } = result.data;
                            paymentMethodArray = paymentMethods;
                        } else {
                            const result = await axios.get(
                                `user/payment-method/all`
                            );
                            const { paymentMethods } = result.data;
                            paymentMethodArray = paymentMethods;
                        }
                        PaymentMethodsDispatch({
                            type: 'set',
                            payload: paymentMethodArray,
                        });
                        if (error) {
                            console.log(error);

                            if (error.message.includes('card number')) {
                                setError((prevState) => ({
                                    ...prevState,
                                    card: error.message,
                                }));
                            }
                            setError((prevState) => ({
                                ...prevState,
                                general: error.message,
                            }));
                        } else {
                            navigate('/my-account/payment-methods');
                        }
                        setBtnLoad(() => false);
                    } catch (error) {
                        console.error(error);
                    }
                }, 1200);
            });
    };

    return (
        <>
            <Error_Alert
                property={'general'}
                error={error}
                setError={setError}
            />
            <div className="relative">
                <label className="font-semibold tracking-wide">
                    Card Number :
                </label>
                <CardElement
                    onChange={(e) => setError({})}
                    className="mb-3 mt-2 border-[1px] border-black px-2 py-5"
                    options={{ hidePostalCode: true }}
                />
            </div>

            <Input
                value={name}
                error={error}
                setError={setError}
                setValue={setName}
                property={'name'}
                label={'Name'}
                className={''}
            />
            <div className="my-8 flex items-center gap-x-3">
                <input
                    onChange={() => setDefault(!isDefault)}
                    checked={isDefault}
                    type="checkbox"
                    className="daisy-checkbox rounded-none"
                />
                <p>Set as default Payment</p>
            </div>
            <button
                onClick={handleClick}
                type="button"
                className="mb-8 flex w-full items-center justify-center !bg-primary py-3 text-base font-bold tracking-wider text-white opacity-90 transition-all hover:opacity-100"
            >
                {btnLoad ? (
                    <svg
                        className="spinner-ring spinner-sm [--spinner-color:var(--gray-1)]"
                        viewBox="25 25 50 50"
                        strokeWidth="5"
                    >
                        <circle cx="50" cy="50" r="20" />
                    </svg>
                ) : (
                    'SAVE CARD'
                )}
            </button>
            <div className="mt-2 flex w-[150%] flex-row items-center gap-x-3 border-t-2 pt-4">
                <p className="whitespace-nowrap text-lg font-bold">
                    WE ACCEPT:{' '}
                </p>
                <div className="flex flex-row gap-x-2">
                    {Object.values(logos).map((icon) => {
                        return <img src={icon} className="h-10 w-10" />;
                    })}
                </div>
            </div>
        </>
    );
}

export default AddCartForm;
