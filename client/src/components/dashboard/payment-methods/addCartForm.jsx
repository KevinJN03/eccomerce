import {
    Elements,
    PaymentElement,
    useStripe,
    useElements,
} from '@stripe/react-stripe-js';
import { useState } from 'react';

import { motion, AnimatePresence } from 'framer-motion';
export function AddCartForm({}) {
    const [error, setError] = useState(null);
    const stripe = useStripe();
    const elements = useElements();

    const handleClick = async (e) => {
        e.preventDefault();
        if (!stripe || !elements) {
            // Stripe.js hasn't yet loaded.
            // Make sure to disable form submission until Stripe.js has loaded.
            return;
        }

        const { error } = await stripe.confirmPayment({
            //`Elements` instance that was used to create the Payment Element
            elements,
            confirmParams: {
                return_url: './my-account',
            },
        });

        if (error) {
            // This point will only be reached if there is an immediate error when
            // confirming the payment. Show error to your customer (for example, payment
            // details incomplete)
            setError(error.message);
        } else {
            // Your customer will be redirected to your `return_url`. For some payment
            // methods like iDEAL, your customer will be redirected to an intermediate
            // site first to authorize the payment, then redirected to the `return_url`.
        }
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
                {error && (
                    <motion.div
                        className="alert alert-error"
                        variants={variants}
                        initial={'initial'}
                        animate={'animate'}
                        exit={'exit'}
                        onClick={() => setError(() => null)}
                    >
                        <motion.svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6 shrink-0 stroke-current"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <motion.path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </motion.svg>
                        <span>{error}</span>
                    </motion.div>
                )}
            </AnimatePresence>
            <PaymentElement />
            <button
                disabled={!stripe}
                onClick={handleClick}
                type="button"
                className="mt-4 w-full !bg-primary py-3 text-base font-bold tracking-wider text-white opacity-90 transition-all hover:opacity-100"
            >
                SAVE CARD
            </button>
        </>
    );
}

export default AddCartForm;
