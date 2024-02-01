import AdminOrderContextProvider from '../../../../context/adminOrder';
import OrderPageContent from './orderPageCOntent';

function AdminOrder({}) {
    return (
        <AdminOrderContextProvider>
            <OrderPageContent />
        </AdminOrderContextProvider>
    );
}

export default AdminOrder;
