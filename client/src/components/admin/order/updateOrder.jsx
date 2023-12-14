import { useAdminContext } from '../../../context/adminContext';
import { OrderNumberDate } from '../../dashboard/order/order-info';
import order_icon from '../../../assets/icons/profile-icons/package.svg';
import calendar_icon from '../../../assets/icons/profile-icons/calender.png';
import { useEffect, useState } from 'react';
import { adminAxios } from '../../../api/axios';
import { useParams } from 'react-router-dom';
import dayjs from 'dayjs';
import logos from '../../dashboard/payment-methods/logos';
import { AnimatePresence, motion } from 'framer-motion';
import animationVariant from '../home/animationVariant';

function UpdateOrder({}) {
    const { modalContent } = useAdminContext();
    const [order, setOrder] = useState({});

    useEffect(() => {
        adminAxios
            .get(`order/${modalContent?.id}`)
            .then(({ data }) => {
                setOrder(() => data?.order);
            })
            .catch((error) => {
                console.error('get order details: ', error);
            });
    }, []);

    const orderDate = dayjs(order?.createdAt).format('MMM DD, YYYY');
    return (
        <section className="flex w-full flex-col items-center justify-center gap-y-3">
       <div className='flex w-full flex-col items-center justify-center gap-y-3 rounded-lg bg-[var(--light-grey)] p-4'>
        <p className='font-gotham text-lg'>ORDER DETAIL</p>
            <OrderNumberDate icon={order_icon} text={modalContent?.id} title={'ORDER NO.:'} className={'text-right'}/>
            <OrderNumberDate icon={calendar_icon} text={orderDate} title={'ORDER DATE:'} className={'text-right'}/>
       </div>

       <div className='flex w-full flex-col items-center justify-center gap-y-3 rounded-lg bg-[var(--light-grey)] p-4'>
       <p className='font-gotham text-lg'>ITEM</p>
       {order?.items?.map(()=> {
     
       })}
       </div>

        </section>
    );
}

export default UpdateOrder;
