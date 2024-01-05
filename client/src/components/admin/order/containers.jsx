import { useState } from 'react';
import OrderItem from './orderItem';

import { ClickAwayListener } from '@mui/material';

import Drawer from './drawerContent/drawerContainer';
import OrderList from './orderList';
import { useAdminOrderContext } from '../../../context/adminOrder';
import GLoader from '../../Login-SignUp/socialRegister/gloader';
function Containers({ ordersByDate }) {
    const onClickAway = () => {
        if (check) {
            console.log('clickaway');
            setTimeout(() => {
                setCheck(() => false);
            }, 1000);
        }
    };
    return (
        <section className="flex w-full flex-col gap-4 p-5">
            {ordersByDate?.map((item) => {
                return <OrderList orderObj={item} key={item?._id} />;
            })}
        </section>
    );
}

export default Containers;
