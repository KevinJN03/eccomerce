import { useEffect, useState } from 'react';
import Change_Btn from '../../common/btn/change-btn';
import Customer_Info from '../address form/customer-info';
import Payment_Type from './payment-type';
import Address_Form from '../address form/address-form';
import examplecustomerInfo from '../address form/example-customer-info';
import Address from '../address form/address';
import { useCheckoutContext } from '../../../context/checkOutContext';
import { Elements, PaymentElement, useStripe } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import PaymentMethodProvider from '../../../context/paymentMethodContext';
import axios from '../../../api/axios';

const STRIPE_KEY = import.meta.env.VITE_STRIPE_KEY;

function Payment({
    billingAddress,
    setBillingAddress,

    defaultProperty,
}) {
    const { disableOtherComponents } = useCheckoutContext();
    const [userPaymentMethods, setUserPaymentMethods] = useState([]);
    const { selectedMethod, setSelectedMethod } = useCheckoutContext();
    const disable =
        disableOtherComponents.disable &&
        disableOtherComponents.addressType != 'BILLING';

    useEffect(() => {
        axios
            .get('user/payment-method/all')
            .then(({ data }) => {
                setUserPaymentMethods(() => data.paymentMethods);
                // setSelectedMethod(() => data.paymentMethods[0]);

                setSelectedMethod(() => ({
                    type: 'clearpay',
                    title: 'PAY IN 3',
                }));
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
                />
            </div>

            <div
                className={`mx-4  border-t-[thin] border-black ${
                    disable ? 'opacity-30' : ''
                }`}
            >
                {' '}
            </div>
            <div className="!bg-[var(--light-grey)]">
                <PaymentMethodProvider userPaymentMethods={userPaymentMethods}>
                    <Payment_Type disable={disableOtherComponents.disable} />
                </PaymentMethodProvider>
            </div>
        </section>
        // </Elements>
    );
}

export default Payment;
