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
import userLogout from '../../../hooks/userLogout';

import AdminOrderContextProvider from '../../../context/adminOrder';
import { Drawer } from '@mui/material';
import DrawerContainer from './drawerContent/drawerContainer';

function AdminOrder({}) {
    const { setModalCheck, adminDispatch } = useAdminContext();

    const [loading, setLoading] = useState(false);

    const [selection, setSelection] = useState([]);
    const [ordersByDate, setOrdersByDate] = useState([]);
    const [status, setStatus] = useState('New');
    const { logoutUser } = userLogout();
    const [totalOrders, setTotalOrders] = useState(0);
    const [openDrawer, setOpenDrawer] = useState(false);
    const [orderInfo, setOrderInfo] = useState({});
    useEffect(() => {
        adminAxios
            .post('/orders/all', { status })
            .then(({ data }) => {
                setOrdersByDate(() => data?.ordersByDate || []);
                setTotalOrders(() => data?.totalCount);
            })
            .catch((error) => {
                console.error('error while getting orders', error);
                logoutUser({ error });
            });
    }, []);
    // function secondBtnClick(id) {
    //     adminDispatch({ type: 'order', id });
    //     setModalCheck(true);
    // }
    // const dataTableActionColumn = actionColumn({
    //     selection,
    //     viewBtn: false,
    //     secondBtnClick: (id) => secondBtnClick(id),
    //     disableDelete: true,
    //     buttonText: 'Update',
    // });

    const value = {
        loading,
        setLoading,
        ordersByDate,
        setOrdersByDate,
        status,
        setStatus,
        totalOrders,
        setTotalOrders,
        openDrawer,
        setOpenDrawer,
        orderInfo,
        setOrderInfo,
    };
    return (
        <AdminOrderContextProvider value={value}>
            <section className="order-page w-full">
                <Header />
                <section className="flex flex-row gap-7">
                    <section className="left flex-[4]">
                        <SubHeader />
                        <NewComplete />

                        <PageOptions />

                        <Containers ordersByDate={ordersByDate} />
                        {/* <EmptyOrders /> */}
                    </section>
                    <SideContainer />
                </section>
            </section>
            <Drawer
                anchor="right"
                open={openDrawer}
                onClose={() => setOpenDrawer(false)}
                PaperProps={{
                    sx: {
                        backgroundColor: 'transparent',
                        boxShadow: 'none',
                        width: '50%',
                        minHeight: '100vh',
                        
                    },
                }}

                //  sx={{
                //     backgroundColor: '#eee'
                //  }}
            >
                <DrawerContainer />
            </Drawer>
        </AdminOrderContextProvider>
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
