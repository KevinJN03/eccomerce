import glamo_logo from '../../assets/icons/glamo-black-logo.svg';
import digicert_logo from "../../assets/icons/digicert.png"
import { Link } from 'react-router-dom';
function Checkout_Header({}){
  return (
    <div className="checkout-header">
                    <Link to="/" className="checkout-logo-wrapper">
                        <img src={glamo_logo} alt="glamo logo in black"/>
                    </Link>
                    <h1 className="text-3xl font-semibold mr-10">CHECKOUT</h1>
                    <span>
                    <img src={digicert_logo} alt='digicert logo'className="digicert-logo"/>
                    </span>
                </div>
  )
};

export default Checkout_Header
