import '../../CSS/checkout.css';

import RedirectImage from '../../assets/icons/forwarding.png';
import disableLayout from '../../hooks/disableLayout';
import Address from './address';
import Checkout_Header from './checkout_header';
import Checkout_Total from './checkout_total/Checkout_Total.jsx';
import Country_Picker from './country_picker';
import Delivery from './delivery/delivery';
import Email_address from './email-address';
import Payment from './payment/payment';
import Promo from './promo';
import { PromoProvider } from '../../hooks/promoContext';
import { useEffect, useState } from 'react';
import { useCart } from '../../context/cartContext';
import { useNavigate } from 'react-router-dom';

import exampleCustomerInfo from './address form/example-customer-info.jsx';
function Checkout() {
    disableLayout();

    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [isOrderSubmit, setOrderSubmit] = useState(false);

    const [shippingAddress, setShippingAddress] = useState(exampleCustomerInfo);
    const [billingAddress, setBillingAddress] = useState({});
    const { cart } = useCart();
    useEffect(() => {
        if (cart.length == 0) {
            setLoading(() => true);

            const timeout = setTimeout(() => {
                navigate('/home');
                setLoading(false);
            }, 5000);
            return () => {
                clearTimeout(timeout);
            };
        }
    }, [cart]);

    const submitOrder = () => {
        setOrderSubmit(true);
        setTimeout(() => {
            console.log('hey');
            setOrderSubmit(false);
        }, 2000);
    };
    return (
        <>
            {loading && (
                <div className="flex h-screen w-full max-w-[400px] flex-col items-center justify-center gap-y-4">
                    <img src={RedirectImage} className="h-28 w-28" />
                    <p className="text-center text-lg">
                        Your cart is Empty, you will get redirected to the Home
                        Page in a few seconds.
                    </p>
                    <span className="loading loading-infinity loading-lg"></span>
                </div>
            )}

            {!loading && (
                <section id="checkout-page">
                    <section id="checkout">
                        <Checkout_Header />
                        <div className="checkout-body">
                            <section id="checkout-body-wrapper">
                                <Country_Picker />
                                <Promo />
                                <Email_address />
                                <Address
                                    shippingAddress={shippingAddress}
                                    setShippingAddress={setShippingAddress}
                                />
                                <Delivery />
                                <Payment />

                                <button
                                    className="buy-now-btn mb-10 bg-primary-green opacity-95 transition-all hover:opacity-100"
                                    type="button"
                                    onClick={submitOrder}
                                    // disabled
                                >
                                    {isOrderSubmit ? (
                                        <svg
                                            className="spinner-ring spinner-sm !m-0 !p-0 [--spinner-color:var(--test123)]"
                                            viewBox="25 25 50 50"
                                            strokeWidth="5"
                                        >
                                            <circle cx="50" cy="50" r="20" />
                                        </svg>
                                    ) : (
                                        <span className="text-white">
                                            BUY NOW
                                        </span>
                                    )}
                                </button>
                            </section>

                            <Checkout_Total />
                        </div>
                    </section>
                </section>
            )}
        </>
    );
}

export default Checkout;
