import { Outlet } from 'react-router-dom';
import AdminOrderContextProvider from '../../../../context/adminOrderContext';
import OrderPageContent from './orderPageContent';

function AdminOrder({}) {
    return (
        <AdminOrderContextProvider>
            <OrderPageContent/>
          
        </AdminOrderContextProvider>
    );
}

export default AdminOrder;
