import { useEffect, useState } from 'react';
import Promo_Voucher_header from './promo-voucher-header';
import Address_Form from './address form/address-form';
import Customer_Info from './address form/customer-info';
import Change_Btn from '../common/btn/change-btn';
import { Helmet } from 'react-helmet';
import customerData from './address form/examplecustomerInfo.jsx';

function Address({}) {
    const [change, setChange] = useState(false);
    const [customer, setCustomer] = useState(customerData);

    const customerInfo = {
        firstName: 'John',
        lastName: 'Doe',
        country: 'UK',
        postCode: 'BR5 3QW',
        mobile: '00000000000',
        city: 'London',
        county: 'Orpington',
        address1: 'Unit 2',
        address2: 'Faraday Way',
    };

    useEffect(() => {
        setCustomer(customerInfo);
    }, []);

    return (
        <section id="address">
            <Helmet>
                <script
                    type="text/javascript"
                    src="http://api.addressnow.co.uk/js/addressnow-2.20.min.js?key=hk78-xb99-fb17-wb83"
                ></script>
            </Helmet>
            <h1 className="checkout-title">DELIVERY ADDRESS</h1>
            <div id="address-container">
                <div className="address-header">
                    <h2 className="mb-4 text-lg font-semibold">
                        POSTAL ADDRESS
                    </h2>
                    {change ? (
                        <Address_Form
                            setChange={setChange}
                            change={change}
                            customer={customer}
                        />
                    ) : (
                        <div className="adress-info-container flex flex-row items-baseline justify-between">
                            <Customer_Info customer={customerInfo} />
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
