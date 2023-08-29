import '../../CSS/checkout.css';
import logo from '../../assets/icons/glamo-black-logo.svg';
import Address from './address';
import Country_Picker from './country_picker';
import Delivery from './delivery/delivery';
import Email_address from './email-address';
import Payment from './payment/payment';
import Promo from './promo';
function Checkout() {
    return (
        <section id="checkout-page">
            
            <section id="checkout">
                <div className="checkout-header">
                  <span className='checkout-logo-wrapper'>
                    <img src={logo} />
                  </span>
                  <h1 className='font-semibold text-3xl'>CHECKOUT</h1>
                    
                </div>
                <div className='checkout-body'>
                  <Country_Picker/>
                  <Promo/>
                  <Email_address/>
                  <Address/>
                  <Delivery/>
                  <Payment/>
                  <div className='buy-now-btn-wrapper'>
                    <button className='buy-now-btn' type="button" disabled>
                    BUY NOW
                  </button>
                  </div>
                  
                </div>
                
            </section>
        </section>
    );
}

export default Checkout;
