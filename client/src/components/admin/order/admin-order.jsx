import { useEffect, useState } from 'react';
import Datatable from '../components/users/datatable/datatable';
import axios, { adminAxios } from '../../../api/axios';

import column from './column';
import { useAdminContext } from '../../../context/adminContext';
import actionColumn from '../components/users/datatable/actionColumn';
import { SubjectSharp } from '@mui/icons-material';
function AdminOrder({}) {
    const { orders, setModalCheck, adminDispatch } = useAdminContext();

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
    function secondBtnClick(id) {
        console.log('delet button clicked!', id);
        adminDispatch({ type: 'order', id });
        setModalCheck(true);
    }
    const dataTableActionColumn = actionColumn({
        selection,
        viewBtn: false,
        secondBtnClick: (id) => secondBtnClick(id),
        disableDelete : true,
        buttonText: 'Update'
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
                    setSelection={setSelection}
                    selection={selection}
                />
            )}
        </section>
    );
}

export default AdminOrder;
