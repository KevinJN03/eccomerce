import { Outlet } from 'react-router-dom';
import PaymentMethodProvider from '../../../context/paymentMethodContext.jsx';

function Index({}) {
    return (
        <PaymentMethodProvider>
            <Outlet />
        </PaymentMethodProvider>
    );
}

export default Index;
