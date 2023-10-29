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
function Checkout() {
    disableLayout();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [cart] = useCart();
    useEffect(() => {
        if (cart.length == 0) {
            setLoading(() => true);

            const timeout = setTimeout(() => {
                navigate('/home');
                setLoading(false);
            }, 3000);
            return () => {
                clearTimeout(timeout);
            };
        }
    }, [cart]);
    return (
        <PromoProvider>
            {loading && (
                <div className="flex h-screen w-full flex-col items-center justify-center max-w-[400px] gap-y-4">
                    <img src={RedirectImage}  className='w-28 h-28'/>
                    <p className='text-lg text-center'>
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
                                <Address />
                                <Delivery />
                                <Payment />
                                <div className="buy-now-btn-wrapper">
                                    <button
                                        className="buy-now-btn"
                                        type="button"
                                        disabled
                                    >
                                        BUY NOW
                                    </button>
                                </div>
                            </section>

                            <Checkout_Total />
                        </div>
                    </section>
                </section>
            )}
        </PromoProvider>
    );
}

export default Checkout;
