import { useEffect, useState } from 'react';
import Change_Btn from '../../common/btn/change-btn';
import Customer_Info from '../address/customer-info';
import Payment_Type from './payment-type';
import Address_Form from '../address/address-form';
import examplecustomerInfo from '../address/example-customer-info';
import Address from '../address/address';
import { useCheckoutContext } from '../../../context/checkOutContext';
import { Elements, PaymentElement, useStripe } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import PaymentMethodProvider from '../../../context/paymentMethodContext';
import axios from '../../../api/axios';
import { AnimatePresence, motion } from 'framer-motion';

function Payment({
    billingAddress,
    setBillingAddress,

    defaultProperty,
}) {
    const { disableOtherComponents } = useCheckoutContext();
    const [userPaymentMethods, setUserPaymentMethods] = useState([]);

    const [loading, setLoading] = useState(true);
    const {
        selectedMethod,
        setSelectedMethod,
        isFirstPaymentSet,
        setIsFirstPaymentSet,
    } = useCheckoutContext();

    const [initialView, setInitialView] = useState(null);
    const [disableAddress, setDisableAddress] = useState(false);
    const disable =
        disableOtherComponents?.disable &&
        disableOtherComponents.addressType != 'BILLING';

    useEffect(() => {
        axios
            .get('user/payment-method/all')
            .then(({ data }) => {
                setUserPaymentMethods(() => data.paymentMethods);

                if (data.paymentMethods[0]) {
                    // setSelectedMethod(() => data.paymentMethods[0]);
                    setSelectedMethod(() => ({ type: 'paypal' }));
                    setInitialView(() => 'selectedMethod');
                } else {
                    setInitialView(() => 'options');
                }
            })
            .catch((error) => {
                console.error('error while fetching payment methods', error);
            });
    }, []);

    return (
        <section className={`!bg-white `}>
            <h1 className="checkout-title mb-0 p-6 pb-0">PAYMENT</h1>

            <div className="!bg-[var(--light-grey)]">
                <Address
                    subHeader={{
                        text: 'BILLING ADDRESS',
                        disablePadding: true,
                    }}
                    disableHeader={true}
                    disableChangeBtn={true}
                    mainAddress={billingAddress}
                    setMainAddress={setBillingAddress}
                    defaultProperty={defaultProperty}
                    addressType={'BILLING'}
                    enableAddressEdit={false}
                    disable={
                        disableOtherComponents?.disableAddress
                            ? disableOtherComponents?.disableAddress
                            : disableOtherComponents?.disable &&
                              disableOtherComponents.addressType != 'BILLING'
                    }
                />
            </div>

            <div
                className={`mx-4  border-t-[thin] border-black ${
                    disable ? 'opacity-30' : ''
                }`}
            >
                {' '}
            </div>
            <AnimatePresence mode="wait">
                <motion.div className="relative !bg-[var(--light-grey)]">
                    <PaymentMethodProvider
                        userPaymentMethods={userPaymentMethods}
                    >
                        <Payment_Type
                            disable={disable}
                            initialView={initialView}
                            disableAddress={disableAddress}
                            setDisableAddress={setDisableAddress}
                        />
                    </PaymentMethodProvider>
                </motion.div>
            </AnimatePresence>
        </section>
        // </Elements>
    );
}

export default Payment;
