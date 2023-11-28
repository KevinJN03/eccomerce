import { useEffect, useState } from 'react';
import ErrorMessage from '../../Login-SignUp/errorMessage';
import Input from '../../Login-SignUp/input';
import logos from '../../dashboard/payment-methods/logos';
import credit_icon from '../../../assets/icons/credit-card.png';
import dayjs from 'dayjs';
import cvv_icon from '../../../assets/icons/cvv-icon.png';
import { SubHeader } from './SubHeader';
import { useStripe, useElements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { ElementDiv } from './element-div';
import axios from '../../../api/axios';
import Error_Alert from '../../common/error-alert';
import { useCheckoutContext } from '../../../context/checkOutContext';
import { usePaymentTypeContext } from '../../../context/paymentTypeContext';
import { AnimatePresence, motion } from 'framer-motion';
export default function Add_Card({}) {
    const { setView } = usePaymentTypeContext();
    const stripe = useStripe();
    const elements = useElements();
    const [clientSecret, setClientSecret] = useState('');
    const [defaultCheck, setDefaultCheck] = useState(false);
    const [error, setError] = useState({});
    const [name, setName] = useState('');
    const { billingAddress } = useCheckoutContext();
    const errorProps = {
        error,
        setError,
        asterisk: false,
    };

    useEffect(() => {
        const cardNumberElement = elements.create('cardNumber', {
            classes: {
                base: 'card-number-input',
            },
            placeholder: '',
        });
        const cardCvcElement = elements.create('cardCvc', {
            classes: {
                base: 'card-number-input',
            },

            placeholder: '',
        });

        const cardExpiryDateElement = elements.create('cardExpiry', {
            classes: {
                base: 'card-number-input',
            },
        });
        cardExpiryDateElement.mount('#cardExpiry');
        cardNumberElement.mount('#cardNumber');
        cardCvcElement.mount('#cardCvc');

        cardCvcElement.on('change', () => {
            setError((prevState) => ({ ...prevState, cvc: null }));
        });

        cardExpiryDateElement.on('change', () => {
            setError((prevState) => ({ ...prevState, expiryDate: null }));
        });

        cardNumberElement.on('change', () => {
            setError((prevState) => ({ ...prevState, number: null }));
        });

        return () => {
            console.log('cleaning up elements', cardNumberElement);
            cardNumberElement.destroy();
            cardCvcElement.destroy();
            cardExpiryDateElement.destroy();
            // elements.off();
        };
    }, []);

    const tenYearsfromNow = dayjs().add(10, 'year').year();
    const range = (start, stop, step, sliceStart) =>
        Array.from({ length: (stop - start) / step + 1 }, (_, i) =>
            ('0' + (start + i * step)).toString().slice(sliceStart)
        );

    const months = range(1, 12, 1, -2);
    const years = range(dayjs().year(), tenYearsfromNow, 1, -4);

    useEffect(() => {
        axios
            .get('user/payment-method/card/save')
            .then(({ data }) => {
                setClientSecret(() => data.client_secret || '');
            })
            .catch((error) => {
                console.log('error while getting secret: ', error);
            });
    }, []);

    const saveCard = async () => {
        try {
            console.log('clientSecret', clientSecret);
            if (!clientSecret || !stripe || !elements) {
                setError((prevState) => ({
                    ...prevState,
                    general: 'Please try again in a few seconds.',
                }));
                return;
            }

            const address = {
                city: billingAddress['city'],
                country: billingAddress['country'],
                line1: billingAddress['address_1'],
                line2: billingAddress['address_2'],
                postal_code: billingAddress['postCode'],
                state: billingAddress['county'],
            };

            if (!name) {
                setError((prevState) => ({
                    ...prevState,
                    name: 'Please enter a nome.',
                }));
                return;
            }

            const { error, setupIntent } = await stripe.confirmCardSetup(
                clientSecret,
                {
                    payment_method: {
                        card: elements.getElement('cardNumber'),
                        billing_details: {
                            name,
                            address,
                        },
                    },
                }
            );

            if (error) {
                console.error(error);
                const splitCode = error.code.split('_')[1];
                if (splitCode == 'cvc') {
                    setError((prevState) => ({
                        ...prevState,
                        cvc: error.message,
                    }));
                } else if (splitCode == 'number') {
                    setError((prevState) => ({
                        ...prevState,
                        number: error.message,
                    }));
                } else if (splitCode == 'expiry') {
                    setError((prevState) => ({
                        ...prevState,
                        expiryDate: error.message,
                    }));
                } else {
                    setError((prevState) => ({
                        ...prevState,
                        general: error.message,
                    }));
                }
            } else {
                console.log({ setupIntent });

                setError({
                    general: null,
                });
            }
        } catch (error) {
            console.error(error);
            setError((prevState) => ({
                ...prevState,
                general: error.message,
            }));
        }
    };
    return (
        <motion.section className="add-card">
            <SubHeader
                text={'ADD CREDIT/DEBIT CARD'}
                disablePadding={true}
                disableChangeBtn={true}
                enableCancelBtn={true}
                cancelBtnClick={() => setView('options')}
            />
            <Error_Alert
                property={'general'}
                error={error}
                setError={setError}
            />
            <div className="mb-4 mt-4 w-4/6">
                <ElementDiv
                    label={'CARD NUMBER'}
                    id={'cardNumber'}
                    icon={{ img: credit_icon, alt: 'credit card icon' }}
                    className={'w-full'}
                    error={error}
                    property={'number'}
                />

                <ElementDiv
                    label={'EXPIRY DATE'}
                    id={'cardExpiry'}
                    className={'w-2/6'}
                    error={error}
                    property={'expiryDate'}
                />
                <Input
                    value={name}
                    setValue={setName}
                    label={'NAME ON CARD'}
                    property={'name'}
                    autoComplete={'country'}
                    {...errorProps}
                />

                <ElementDiv
                    label={'CVC'}
                    id={'cardCvc'}
                    icon={{ img: cvv_icon, alt: 'cvc icon' }}
                    className={'w-2/6'}
                    error={error}
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
                        onChange={() => setDefaultCheck(!defaultCheck)}
                    />

                    <p>Save card details for next time</p>
                </div>
                <button
                    onClick={saveCard}
                    type="button"
                    className="w-7/12 !bg-primary py-3 text-base font-bold tracking-wider text-white opacity-90 transition-all hover:opacity-100"
                >
                    USE THIS CARD
                </button>
            </div>
        </motion.section>
    );
}
