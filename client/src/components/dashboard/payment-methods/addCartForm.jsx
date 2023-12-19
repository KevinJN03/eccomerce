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
import credit_icon from '../../../assets/icons/credit-card.png';
import cvv_icon from '../../../assets/icons/cvv-icon.png';
import { motion, AnimatePresence } from 'framer-motion';
import Form from './form';
import Input from '../../Login-SignUp/input';
import logos from './logos';
import ErrorMessage from '../../Login-SignUp/errorMessage';
import { useNavigate } from 'react-router-dom';
import axios from '../../../api/axios';
import { usePaymentMethods } from '../../../context/paymentMethodContext';
import Error_Alert from '../../common/error-alert';
import ElementDiv from '../../checkout/payment/element-div';
import MountCardComponents from '../../../hooks/mountCardComponents';
import '../../../CSS/checkout.scss';
import { useUserDashboardContext } from '../../../context/userContext';
export function AddCartForm({ clientSecret }) {
    const { setFooterMessage } = useUserDashboardContext();
    const [errors, setErrors] = useState({});
    const [isDefault, setDefault] = useState(false);
    const [btnLoad, setBtnLoad] = useState(false);

    const { PaymentMethodsDispatch } = usePaymentMethods();
    const [name, setName] = useState('');
    const [defaultCheck, setDefaultCheck] = useState();
    const stripe = useStripe();
    const elements = useElements();
    const navigate = useNavigate();

    MountCardComponents({ elements, setError: setErrors });
    const errorProps = {
        error: errors,
        setError: setErrors,
        asterisk: false,
    };

    const handleClick = async (e) => {
        let success = false;
        try {
            if (!stripe || !elements) {
                return;
            }
            if (!name) {
                setErrors((prevState) => ({
                    ...prevState,
                    name: 'Please enter your full name.',
                }));
                return;
            }
            setBtnLoad(true);

            const { error, setupIntent } = await stripe.confirmCardSetup(
                clientSecret,
                {
                    payment_method: {
                        card: elements.getElement('cardNumber'),
                        billing_details: {
                            name,
                        },
                    },
                }
            );

            if (error) {
                console.error(error);
                const splitCode = error.code.split('_')[1];
                if (splitCode == 'cvc') {
                    setErrors((prevState) => ({
                        ...prevState,
                        cvc: error.message,
                    }));
                } else if (splitCode == 'number') {
                    setErrors((prevState) => ({
                        ...prevState,
                        number: error.message,
                    }));
                } else if (splitCode == 'expiry') {
                    setErrors((prevState) => ({
                        ...prevState,
                        expiryDate: error.message,
                    }));
                } else {
                    setErrors((prevState) => ({
                        ...prevState,
                        general: error.message,
                    }));
                }
            } else {
                success = true;
                let paymentMethodArray = [];
                if (isDefault) {
                    const result = await axios.post(
                        `user/payment-method/changedefault/${setupIntent.payment_method}`
                    );
                    const { paymentMethods } = result.data;
                    paymentMethodArray = paymentMethods;
                } else {
                    const result = await axios.get(`user/payment-method/all`);
                    const { paymentMethods } = result.data;
                    paymentMethodArray = paymentMethods;
                }
                PaymentMethodsDispatch({
                    type: 'set',
                    payload: paymentMethodArray,
                });
            }
        } catch (error) {
            console.error('error while adding card', error);
        } finally {
            setTimeout(() => {
                setBtnLoad(() => false);
                if (success) {
                    setFooterMessage({
                        success: true,
                        text: 'Payment Method Added',
                    });
                    navigate('/my-account/payment-methods');
                }
            }, 800);
        }
    };

    return (
        <section className="w-full">
            <Error_Alert
                property={'general'}
                error={errors}
                setError={setErrors}
            />
            <div className="mb-4 mt-4 w-5/6">
                <ElementDiv
                    label={'CARD NUMBER'}
                    id={'cardNumber'}
                    icon={{ img: credit_icon, alt: 'credit card icon' }}
                    className={'w-full'}
                    error={errors}
                    property={'number'}
                />

                <ElementDiv
                    label={'EXPIRY DATE'}
                    id={'cardExpiry'}
                    className={'w-2/6'}
                    error={errors}
                    property={'expiryDate'}
                />
                <Input
                    value={name}
                    setValue={setName}
                    label={'NAME ON CARD'}
                    property={'name'}
                    autoComplete={'name'}
                    {...errorProps}
                />

                <ElementDiv
                    label={'CVC'}
                    id={'cardCvc'}
                    icon={{ img: cvv_icon, alt: 'cvc icon' }}
                    className={'w-2/6'}
                    error={errors}
                    property={'cvc'}
                />
                <div
                    className="my-6 flex flex-row items-center justify-start gap-x-3 hover:cursor-pointer"
                    onClick={() => setDefaultCheck((prevState) => !prevState)}
                >
                    <input
                        type="checkbox"
                        className="daisy-checkbox rounded-none"
                        name="default"
                        id="default-payment-check"
                        checked={defaultCheck}
                        readOnly={true}
                        onChange={() => setDefaultCheck(!defaultCheck)}
                    />

                    <p>Save card details for next time</p>
                </div>
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
        </section>
    );
}

export default AddCartForm;
