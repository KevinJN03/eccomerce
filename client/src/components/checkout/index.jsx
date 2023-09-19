import '../../CSS/checkout.css';
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
function Checkout() {
    disableLayout();
    return (
        <PromoProvider>
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
        </PromoProvider>
    );
}

export default Checkout;
