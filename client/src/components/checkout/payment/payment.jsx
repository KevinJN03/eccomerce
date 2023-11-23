import { useState } from 'react';
import Change_Btn from '../../common/btn/change-btn';
import Customer_Info from '../address form/customer-info';
import Payment_Type from './payment-type';
import Address_Form from '../address form/address-form';
import examplecustomerInfo from '../address form/example-customer-info';
import Address from '../address form/address';
function Payment({
    billingAddress,
    setBillingAddress,

    defaultProperty,
}) {
    return (
        <section id="payment">
            <Address
                mainAddress={billingAddress}
                setMainAddress={setBillingAddress}
                defaultProperty={defaultProperty}
                addressType={'BILLING'}
            />

            <div className="border-b-[1px] border-black mx-4"> </div>
            <Payment_Type />
        </section>
    );
}

export default Payment;
