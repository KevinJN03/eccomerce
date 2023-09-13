import { useState } from 'react';
import Promo_Voucher_header from './promo-voucher-header';
import Address_Form from './address form/address-form';
import Customer_Info from './address form/customer-info';
import Change_Btn from '../common/btn/change-btn';

function Address({}) {
    const [change, setChange] = useState(false);
    return (
        <section id="address">
            <h1 className="checkout-title">DELIVERY ADDRESS</h1>
            <div id="address-container">
                <div className="address-header">
                    <h2 className="mb-4 text-lg font-semibold">
                        POSTAL ADDRESS
                    </h2>
                    {change ? (
                        <Address_Form setChange={setChange} />
                    ) : (
                        <div className="adress-info-container flex flex-row items-baseline justify-between">
                            <Customer_Info />
                            {/* <button type="button" id="checkout-change-btn" onClick={()=> setChange(!change)}>Change</button> */}
                            <Change_Btn setChange={setChange} change={change} />
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}

export default Address;
