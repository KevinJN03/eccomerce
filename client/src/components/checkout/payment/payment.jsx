import { useState } from 'react';
import Change_Btn from '../../common/btn/change-btn';
import Customer_Info from '../address form/customer-info';
import Payment_Type from './payment-type';
import Address_Form from '../address form/address-form';
import examplecustomerInfo from '../address form/example-customer-info';
function Payment({}) {
    const [billingAddress, setBillingAddress] = useState(examplecustomerInfo);
    const [change, setChange] = useState(false);

    return (
        <section id="payment">
            <h1 className="checkout-title">PAYMENT</h1>
            <div className="payment-sub-header">
                <p className="font-gotham font-semibold tracking-widest">
                    BILLING ADDRESS
                </p>
                {!change && (
                    <Change_Btn setChange={setChange} change={change} />
                )}
            </div>
            {!change && (
                <Customer_Info
                    customer={billingAddress}
                    className="border-b-primary pb-4"
                />
            )}
            {change && (
                <Address_Form
                    setChange={setChange}
                    address={billingAddress}
                    buttontext="SAVE BILLING ADDRESS"
                />
            )}
            <Payment_Type />
        </section>
    );
}

export default Payment;
