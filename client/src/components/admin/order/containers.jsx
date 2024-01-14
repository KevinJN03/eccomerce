import { useState } from 'react';
import OrderItem from './orderItem';

import { ClickAwayListener } from '@mui/material';
import { v4 as uuidV4 } from 'uuid';
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
        <section className="flex w-full flex-col gap-4">
            {ordersByDate?.map((item, idx) => {
                return (
                    <OrderList
                        orderObj={item}
                        key={item?._id}
                        orderListIndex={idx}
                    />
                );
            })}
        </section>
    );
}

export default Containers;
