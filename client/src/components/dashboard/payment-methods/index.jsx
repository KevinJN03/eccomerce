import { Outlet } from 'react-router-dom';
import PaymentMethodProvider from '../../../context/paymentMethodContext.jsx';
import Modal from '../../admin/components/modal/modal.jsx'
function Index({}) {
    return (
        <PaymentMethodProvider>
            <Outlet />
        </PaymentMethodProvider>
    );
}

export default Index;
