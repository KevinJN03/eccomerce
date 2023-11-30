import glamo_logo from '../../assets/icons/glamo-black-logo.svg';
import digicert_logo from '../../assets/icons/digicert.png';
import { Link } from 'react-router-dom';
function Checkout_Header({ text, disableIcon, className }) {
    return (
        <div className="checkout-header">
            <Link to="/" className="checkout-logo-wrapper">
                <img
                    loading="lazy"
                    src={glamo_logo}
                    alt="glamo logo in black"
                />
            </Link>
            <h1 className={`${className || ''} mr-10 text-3xl font-semibold sm:text-xl md:text-2xl`}>
                {text}
            </h1>
            {!disableIcon && <span className="sm+md:h-10 ">
                <img
                    src={digicert_logo}
                    alt="digicert logo"
                    className="digicert-logo"
                />
            </span>}
        </div>
    );
}

export default Checkout_Header;
