import { Outlet } from 'react-router-dom';
import PaymentMethodProvider from '../../../context/paymentMethodContext.jsx';
import Modal from '../../admin/components/modal/modal.jsx';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { useEffect, useState } from 'react';

const STRIPE_KEY = import.meta.env.VITE_STRIPE_KEY;
function Index({}) {
    console.log({ env: STRIPE_KEY });
    const [stripePromise, setStripePromise] = useState(() =>
        loadStripe(STRIPE_KEY)
    );

    return (
        <section className="w-full">
            <Elements stripe={stripePromise}>
                <Outlet />
            </Elements>
        </section>
    );
}

export default Index;
