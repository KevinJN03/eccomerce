import {
    Elements,
    PaymentElement,
    useStripe,
    useElements,
} from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
const CLIENT_URL = import.meta.env.VITE_CLIENT_URL;
function PayPalSetUp({ clientSecret }) {
    const [btnLoad, setBtnLoad] = useState(false);
    const stripe = useStripe();
    const elements = useElements();

    const [errorMessage, setError] = useState('');

    const handleClick = async (e) => {
        e.preventDefault();
        if (!stripe || !elements) {
            return;
        }
        const return_url = `${CLIENT_URL}/my-account/payment-methods`;
        const { error, setupIntent } = await stripe.confirmPayPalSetup(
            clientSecret,
            { paypal: elements.getElement('paypal'), return_url }
        );

        if (error) {
            setError(() => error.message);
        }
        ({ error, setupIntent, CLIENT_URL, return_url });
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

    return (
        <>
            <AnimatePresence>
                {errorMessage && (
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
                            onClick={() => setError(null)}
                        >
                            <motion.path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </motion.svg>
                        <span>{errorMessage}</span>
                    </motion.div>
                )}
            </AnimatePresence>
            <PaymentElement />

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
                    'SAVE PAYPAL'
                )}
            </button>
        </>
    );
}

export default PayPalSetUp;
