import { useEffect, useState } from 'react';
import Datatable from '../components/users/datatable/datatable';
import axios, { adminAxios } from '../../../api/axios';

import column from './column';
import { useAdminContext } from '../../../context/adminContext';
function AdminOrder({}) {
    const { orders } = useAdminContext();

    const [loading, setLoading] = useState(false);

    // useEffect(() => {
    //     adminAxios('/orders')
    //         .then(({ data }) => {
    //             setOrders(() => data?.orders);
    //         })
    //         .catch((error) => {
    //             console.error('error while getting orders', error);
    //         });
    // }, []);
    return (
        <section className="">
            {Object.keys(orders).length > 0 && (
                <Datatable
                    type={'Order'}
                    column={column}
                    row={orders}
                    loading={loading}
                    setLoading={setLoading}
                />
            )}
        </section>
    );
}

export default AdminOrder;
