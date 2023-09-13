import { useState } from 'react';
import Change_Btn from '../../common/btn/change-btn';
import Customer_Info from '../address form/customer-info';
import Payment_Type from './payment-type';
import Address_Form from '../address form/address-form';

function Payment({}) {
    const [change, setChange] = useState(false);

    return (
        <section id="payment">
            <h1 className="checkout-title">PAYMENT</h1>
            <div className="payment-sub-header">
                <p className="font-gotham font-semibold tracking-widest">
                    BILLING ADDRESS
                </p>
                {!change && <Change_Btn setChange={setChange} change={change} />}
            </div>
            {!change &&  <Customer_Info className="border-b-primary pb-4" />}
           {change && <Address_Form setChange={setChange} buttontext='SAVE BILLING ADDRESS'/>}
            <Payment_Type />
        </section>
    );
}

export default Payment;
