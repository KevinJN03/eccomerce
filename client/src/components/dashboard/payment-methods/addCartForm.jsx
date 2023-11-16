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
export function AddCartForm({ clientSecret }) {
    const [error, setError] = useState({});
    const [check, setCheck] = useState(false);
    const [btnLoad, setBtnLoad] = useState(false);
    const [cardNumber, setCardNumber] = useState('');
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
        console.log(elements.getElement('card'));

        const { error, setupIntent } = await stripe.confirmCardSetup(
            clientSecret,
            {
                payment_method: {
                    card: elements.getElement('card'),
                    billing_details: {
                        name,
                    },
                },
            }
        );

        setTimeout(() => {
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
        }, 1000);
    };

    const variants = {
        initial: { opacity: 0 },
        animate: {
            opacity: 1,
            transition: {
                duration: 2,
            },
        },
        exit: { opacity: 0 },
    };

    const handleCardNumber = (e) => {
        setCardNumber(e.target.value);
    };

    return (
        <>
            <AnimatePresence>
                {error?.general && (
                    <motion.div
                        className="alert alert-error mb-2  rounded-none"
                        variants={variants}
                        initial={'initial'}
                        animate={'animate'}
                        exit={'exit'}
                    >
                        <motion.svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6 shrink-0 stroke-current transition-all hover:scale-110 hover:cursor-pointer"
                            fill="none"
                            viewBox="0 0 24 24"
                            onClick={() =>
                                setError((prevstate) => ({
                                    ...prevstate,
                                    general: null,
                                }))
                            }
                        >
                            <motion.path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </motion.svg>
                        <span>{error.general}</span>
                    </motion.div>
                )}
            </AnimatePresence>
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
                    onChange={() => setCheck(!check)}
                    checked={check}
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
