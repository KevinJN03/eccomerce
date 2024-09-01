import { Outlet } from 'react-router-dom';
import '../../../CSS/payment.scss';
import FinanceContextProvider from '../../../context/financeContext';
function PaymentIndex({}) {
    return (
        <FinanceContextProvider>
            <section
                id="payment-container"
                className="payment h-full w-full p-10"
            >
                <Outlet />
            </section>
        </FinanceContextProvider>
    );
}

export default PaymentIndex;
