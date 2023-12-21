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
import { usePaymentMethods } from '../../../context/paymentMethodContext';
import MountCardComponents from '../../../hooks/mountCardComponents';

export default function Add_Card({}) {
    const { setView, setLoading } = usePaymentTypeContext();
    const stripe = useStripe();
    const elements = useElements();
    const [clientSecret, setClientSecret] = useState('');
    const [defaultCheck, setDefaultCheck] = useState(false);
    const [error, setError] = useState({});
    const [name, setName] = useState('');
    const { billingAddress, setIsFirstPaymentSet, setSelectedMethod } =
        useCheckoutContext();

    const [btnLoad, setBtnLoad] = useState(false);
    const errorProps = {
        error,
        setError,
        asterisk: false,
    };
    const { PaymentMethodsDispatch } = usePaymentMethods();
    MountCardComponents({ elements, setError: setError });

    useEffect(() => {
        axios
            .get('user/payment-method/card/save')
            .then(({ data }) => {
                setClientSecret(() => data.client_secret || '');
            })
            .catch((error) => {
                'error while getting secret: ', error;
            });
    }, []);

    const saveCard = async () => {
        try {
            setBtnLoad(true);

            // const cvvNumber = document.querySelectorAll(
            //     '[data-elements-stable-field-name="cardCvc"]'
            // );
            // const check2 = document.querySelectorAll('.InputContainer');
            // console.log({ cvvNumber, check2 });
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
                    name: 'Please enter a name.',
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
                setIsFirstPaymentSet(() => true);

                console.log({ setupIntent });
                setError(() => ({
                    general: null,
                }));
                setBtnLoad(false);
                setLoading(true);
                // setView(() => 'selectedMethod');
                const { data } = await axios.get('user/payment-method/all');
                const findPaymentMethod = data?.paymentMethods?.find(
                    (item) => item.id == setupIntent?.payment_method
                );

                console.log({ findPaymentMethod });
                setSelectedMethod({
                    type: 'card',
                    ...findPaymentMethod,
                });
                PaymentMethodsDispatch({
                    type: 'set',
                    payload: data?.paymentMethods,
                });
                setTimeout(() => {
                    setLoading(false);
                    setView(() => 'selectedMethod');
                }, 1500);

                // setLoading(false)
            }
        } catch (error) {
            console.error(error);
            setError((prevState) => ({
                ...prevState,
                general: error.message,
            }));
        } finally {
            setTimeout(() => {
                setBtnLoad(false);
            }, 1000);
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
                    autoComplete={'name'}
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
                    {/* <input
                        type="checkbox"
                        className="daisy-checkbox rounded-none"
                        name="default"
                        id="default-payment-check"
                        checked={defaultCheck}
                        onChange={() => setDefaultCheck(!defaultCheck)}
                    />

                    <p>Save card details for next time</p> */}
                </div>
                <button
                    onClick={saveCard}
                    type="button"
                    className="flex h-12 w-7/12 items-center justify-center !bg-primary text-base font-bold tracking-wider text-white opacity-90 transition-all hover:opacity-100"
                >
                    {btnLoad ? (
                        <svg
                            className="spinner-ring spinner-sm [--spinner-color:var(--slate-1)]"
                            viewBox="25 25 50 50"
                            strokeWidth="5"
                        >
                            <circle cx="50" cy="50" r="20" />
                        </svg>
                    ) : (
                        'USE THIS CARD'
                    )}
                </button>
            </div>
        </motion.section>
    );
}
