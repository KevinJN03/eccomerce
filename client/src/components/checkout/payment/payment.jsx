import { useState } from 'react';
import Change_Btn from '../../common/btn/change-btn';
import Customer_Info from '../address form/customer-info';
import Payment_Type from './payment-type';
import Address_Form from '../address form/address-form';
import examplecustomerInfo from '../address form/example-customer-info';
import Address from '../address form/address';
import { useCheckoutContext } from '../../../context/checkOutContext';
function Payment({
    billingAddress,
    setBillingAddress,

    defaultProperty,
}) {
    const { disableOtherComponents } = useCheckoutContext();

    const disable =
        disableOtherComponents.disable &&
        disableOtherComponents.addressType != 'BILLING';
    return (
        <section className={`!bg-white `}>
            <div className="!bg-[var(--light-grey)]">
                <Address
                    mainAddress={billingAddress}
                    setMainAddress={setBillingAddress}
                    defaultProperty={defaultProperty}
                    addressType={'BILLING'}
                    enableAddressEdit={false}
                />
            </div>

            <div
                className={`mx-4 border-b-[1px] border-black ${
                    disable ? 'opacity-30' : ''
                }`}
            >
                {' '}
            </div>
            <div className="!bg-[var(--light-grey)]">
                <Payment_Type disable={disableOtherComponents.disable} />
            </div>
        </section>
    );
}

export default Payment;
