import icon from '../../../assets/icons/paymentfail.png';
import cancel_icon from '../../../assets/icons/cancel.gif';
import warning_icon from '../../../assets/icons/warning.png';
import { Link } from 'react-router-dom';
function Cancel_Payment({}) {
    return (
        <section className="cancel-payment min-h-[400px] bg-white p-4 flex justify-center items-center flex-col gap-y-5 ">
            <img src={warning_icon} alt="no money outline icon"  />
            <p className='font-medium text-base text-center w-5/6'>
                You payment setup was unsuccessful due to an abnormality.
                Please try again later or use a different payment method
            </p>
            <Link to={'/my-account/payment-methods'} className='!bg-primary text-white py-4 px-5 font-gotham tracking-wider opacity-90 hover:opacity-100 font-medium transition-all'>
              View All Payment Methods
            </Link>
        </section>
    );
}

export default Cancel_Payment;
