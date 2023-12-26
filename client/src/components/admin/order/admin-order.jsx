import { useEffect, useState } from 'react';
import Datatable from '../components/users/datatable/datatable';
import axios, { adminAxios } from '../../../api/axios';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import column from './column';
import { useAdminContext } from '../../../context/adminContext';
import actionColumn from '../components/users/datatable/actionColumn';
import { SubjectSharp } from '@mui/icons-material';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import Header from './header';
import SubHeader from './subheader';

import PageOptions from './pageOption';
import OrderItem from './orderItem';
import Containers from './containers';
import SideContainer from './sideContainer';
import NewComplete from './new-complete';
import EmptyOrders from './empty-orders';

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
        adminDispatch({ type: 'order', id });
        setModalCheck(true);
    }
    const dataTableActionColumn = actionColumn({
        selection,
        viewBtn: false,
        secondBtnClick: (id) => secondBtnClick(id),
        disableDelete: true,
        buttonText: 'Update',
    });
    return (
        <section className="order-page w-full">
            <Header />
            <section className="flex flex-row gap-7">
                <section className="left flex-[4]">
                    <SubHeader />
                    <NewComplete />

                    <PageOptions />

                    <Containers />
                    {/* <EmptyOrders /> */}
                </section>
                <SideContainer />
            </section>
        </section>
    );
}

export default AdminOrder;
{
    /* {Object.keys(orders).length > 0 && (
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
            )} */
}
