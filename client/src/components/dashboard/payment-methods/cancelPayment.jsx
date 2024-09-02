import icon from '../../../assets/icons/paymentfail.png';
import cancel_icon from '../../../assets/icons/cancel.gif';
import warning_icon from '../../../assets/icons/warning.png';
import { Link } from 'react-router-dom';
function Cancel_Payment({}) {
    return (
        <section className="cancel-payment flex min-h-[400px] flex-col items-center justify-center gap-y-5 bg-white p-4 ">
            <img src={warning_icon} alt="no money outline icon" />
            <p className="w-5/6 text-center text-base font-medium">
                You payment setup was unsuccessful due to an abnormality. Please
                try again later or use a different payment method
            </p>
            <Link
                to={'/my-account/payment-methods'}
                className="!bg-primary px-5 py-4 font-gotham font-medium tracking-wider text-white opacity-90 transition-all hover:opacity-100"
            >
                View All Payment Methods
            </Link>
        </section>
    );
}

export default Cancel_Payment;
