import { useEffect, useState } from 'react';
import Promo_Voucher_header from './promo-voucher-header';
import Address_Form from './address form/address-form';
import Customer_Info from './address form/customer-info';
import Change_Btn from '../common/btn/change-btn';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import customerData from './address form/example-customer-info.jsx';

function Address({ shippingAddress, setShippingAddress }) {
    const [temporaryShippingAddress, setTemporaryShippingAddress] =
        useState(shippingAddress);
    const [change, setChange] = useState(false);

    const cancel = () => {
        setTemporaryShippingAddress(() => shippingAddress);
        setChange(() => false);
    };

    const handleClick = () => {
        setShippingAddress(() => temporaryShippingAddress);
        setChange(() => false);
    };
    return (
        <section id="address">
            <HelmetProvider>
                <Helmet>
                    <script
                        type="text/javascript"
                        src="http://api.addressnow.co.uk/js/addressnow-2.20.min.js?key=hk78-xb99-fb17-wb83"
                    ></script>
                </Helmet>
            </HelmetProvider>

            <h1 className="checkout-title">DELIVERY ADDRESS</h1>
            <div id="address-container">
                <div className="address-header">
                    <h2 className="mb-4 text-lg font-semibold">
                        POSTAL ADDRESS
                    </h2>
                    {change ? (
                        <Address_Form
                            setChange={setChange}
                            cancel={cancel}
                            address={temporaryShippingAddress}
                            setAddress={setTemporaryShippingAddress}
                            handleClick={handleClick}
                        />
                    ) : (
                        <div className="adress-info-container flex flex-row items-baseline justify-between">
                            <Customer_Info customer={shippingAddress} />
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
