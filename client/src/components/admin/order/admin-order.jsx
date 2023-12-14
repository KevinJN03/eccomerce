import { useEffect, useState } from 'react';
import Datatable from '../components/users/datatable/datatable';
import axios, { adminAxios } from '../../../api/axios';

import column from './column';
import { useAdminContext } from '../../../context/adminContext';
import actionColumn from '../components/users/datatable/actionColumn';
import { SubjectSharp } from '@mui/icons-material';
function AdminOrder({}) {
    const { orders } = useAdminContext();

    const [loading, setLoading] = useState(false);

    const [selection, setSelection] = useState([]);

    // useEffect(() => {
    //     adminAxios('/orders')
    //         .then(({ data }) => {
    //             setOrders(() => data?.orders);
    //         })
    //         .catch((error) => {
    //             console.error('error while getting orders', error);
    //         });
    // }, []);
    const deleteButtonClick = () => {};
    const dataTableActionColumn = actionColumn({
        selection,
        viewBtn: false,
        deleteButtonClick,
    });
    return (
        <section className="">
            {Object.keys(orders).length > 0 && (
                <Datatable
                    type={'Order'}
                    column={column}
                    row={orders}
                    loading={loading}
                    setLoading={setLoading}
                    actionColumn={dataTableActionColumn}
                />
            )}
        </section>
    );
}

export default AdminOrder;
