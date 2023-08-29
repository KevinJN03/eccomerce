import '../../CSS/checkout.css';
import Address from './address';
import Checkout_Header from './checkout_header';
import Checkout_Total from './checkout_total';
import Country_Picker from './country_picker';
import Delivery from './delivery/delivery';
import Email_address from './email-address';
import Payment from './payment/payment';
import Promo from './promo';
function Checkout() {
    return (
        <section id="checkout-page">
            <section id="checkout">
<Checkout_Header/>
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

                    <Checkout_Total/>
                </div>
            </section>
        </section>
    );
}

export default Checkout;
