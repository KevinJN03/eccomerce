import { useRef, useState } from 'react';
import Change_Btn from '../../common/btn/change-btn';
import Customer_Info from '../address form/customer-info';
import Payment_Type from './payment-type';
import Address_Form from '../address form/address-form';
import examplecustomerInfo from '../address form/example-customer-info';
import Address from '../address form/address';
import { useCheckoutContext } from '../../../context/checkOutContext';
import {
    Elements,
    PaymentElement,
    useStripe,
   
} from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const STRIPE_KEY = import.meta.env.VITE_STRIPE_KEY;

export function SubHeader({
    text,
    disablePadding,
    onClick,
    disable,
    className,
    disableChangeBtn
}) {
    const changeBtnRef = useRef();
    return (
        <div
            className={`flex justify-between ${
                disablePadding ? '' : 'mb-0 p-6 pb-0'
            } `}
        >
            <h3 className="font-gotham text-lg text-black">{text}</h3>
          {!disableChangeBtn &&  <button
                type="button"
                id="checkout-change-btn"
                onClick={onClick}
                disabled={disable}
            >
                CHANGE
            </button>}
        </div>
    );
}
function Payment({
    billingAddress,
    setBillingAddress,

    defaultProperty,
}) {

    const stripePromise = loadStripe(STRIPE_KEY);
    const { disableOtherComponents } = useCheckoutContext();

    const disable =
        disableOtherComponents.disable &&
        disableOtherComponents.addressType != 'BILLING';
    return (
        <Elements stripe={stripePromise}>
                 <section className={`!bg-white `}>
            <h1 className="checkout-title mb-0 p-6 pb-0">PAYMENT</h1>
            {/* <SubHeader text={'BILLING ADDRESS'} /> */}

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
                <Payment_Type disable={disableOtherComponents.disable} />
            </div>
        </section>
        </Elements>
   
    );
}

export default Payment;
