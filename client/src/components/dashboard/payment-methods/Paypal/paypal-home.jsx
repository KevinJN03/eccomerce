import {
    Elements,
    PaymentElement,
    useStripe,
    useElements,
} from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useEffect, useState } from 'react';
import PayPalSetUp from './paypal-setup.jsx';
import axios from '../../../../api/axios.js';
const STRIPE_KEY = import.meta.env.VITE_STRIPE_KEY;

function PayPalHome({}) {
    const [loading, setLoading] = useState(true);
    const stripePromise = loadStripe(STRIPE_KEY);
    const [options, setOptions] = useState({});

    useEffect(() => {
        axios('user/payment-method/paypal')
            .then(({ data }) => {
                data;
                debugger;
                setOptions((prevState) => ({
                    ...prevState,
                    clientSecret: data.client_secret,
                }));
                setTimeout(() => {
                    setLoading(false);
                }, 1000);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);
    return (
        <>
            {loading ? (
                <svg
                    className="spinner-ring spinner-sm ![--spinner-color:var(--slate-12)]"
                    viewBox="25 25 50 50"
                    strokeWidth="5"
                >
                    <circle cx="50" cy="50" r="20" />
                </svg>
            ) : (
                <section className="paypal-setup">
                    <Elements stripe={stripePromise} options={options}>
                        <PayPalSetUp clientSecret={options.clientSecret} />
                    </Elements>
                </section>
            )}
        </>
    );
}

export default PayPalHome;
