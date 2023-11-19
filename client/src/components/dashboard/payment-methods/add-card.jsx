import { useEffect, useState } from 'react';
import Input from '../../Login-SignUp/input';
import '../../../CSS/user-dashboard.scss';
import card_logo from '../../../assets/icons/credit-card.png';
import visa_logo from '../../../assets/icons/payment-icons/visa.svg';
import discover_logo from '../../../assets/icons/payment-icons/discover.svg';

import maestro_logo from '../../../assets/icons/payment-icons/maestro.svg';
import masterCard_logo from '../../../assets/icons/payment-icons/mastercard-alt.svg';

import american_express_logo from '../../../assets/icons/payment-icons/american-express.svg';
import axios from '../../../api/axios';
import {
    Elements,
    PaymentElement,
    useStripe,
    useElements,
} from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import AddCartForm from './addCartForm';
const STRIPE_KEY = import.meta.env.VITE_STRIPE_KEY;

function Add_Card({}) {
    console.log('env: ', STRIPE_KEY);
    const stripePromise = loadStripe(STRIPE_KEY);

    const [loading, setLoading] = useState(true);
    const [options, setOptions] = useState({
        appeareance: {
            variables: {
                borderRadius: '0px',
            },
        },
    });
    const [cardNumber, setCardNumber] = useState('');
    const [error, setError] = useState({});
    const [name, setName] = useState('');
    const errorProps = {
        error,
        setError,
        asterisk: false,
    };
    const numberInputOnWheelPreventChange = (e) => {
        // Prevent the input value change
        e.target.blur();

        // Prevent the page/container scrolling
        e.stopPropagation();

        // Refocus immediately, on the next tick (after the current function is done)
        setTimeout(() => {
            e.target.focus();
        }, 0);
    };

    useEffect(() => {
        axios
            .get('user/payment-method/card/save')
            .then((res) => {
                console.log(res.data.client_secret);
                setOptions((prevState) => ({
                    ...prevState,
                    clientSecret: res.data.client_secret,
                }));

                 setLoading(() => false);
            })
            .catch((error) => {
                console.logo('error while getting secret: ', error);
                 setLoading(() => false);
            });
    }, []);

    return (
        <section className="add-card">
            <h2 className="mb-2 text-xl font-bold">{'ADD CARD'}</h2>
            <p>
                Now please enter your card details exactly as they are printed.
            </p>
            <div className="mb-4 mt-4 w-4/6 flex flex-col justify-center">
                {loading ? (
                    <svg
                        className="spinner-ring spinner-sm [--spinner-color:var(--slate-12)]"
                        viewBox="25 25 50 50"
                        strokeWidth="5"
                    >
                        <circle cx="50" cy="50" r="20" />
                    </svg>
                ) : (
                    <Elements stripe={stripePromise} options={options}>
                        <AddCartForm clientSecret={options.clientSecret} />
                    </Elements>
                )}
            </div>
        </section>
    );
}

export default Add_Card;
