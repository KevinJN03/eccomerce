import { Outlet } from 'react-router-dom';
import '../../../CSS/payment.scss';
function PaymentIndex({}) {
    return (
        <section id='payment-container' className="payment h-full w-full p-10">
            <Outlet />
        </section>
    );
}

export default PaymentIndex;
