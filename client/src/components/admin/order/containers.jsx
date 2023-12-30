import { useState } from 'react';
import OrderItem from './orderItem';

import { ClickAwayListener } from '@mui/material';

import Drawer from './drawer';
import OrderList from './orderList';
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

            <Drawer />
        </section>
    );
}

export default Containers;
