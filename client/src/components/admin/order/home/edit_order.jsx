import { OrderNumberDate } from '../../../dashboard/order/order-info';
import order_icon from '../../../../assets/icons/profile-icons/package.svg';
import calendar_icon from '../../../../assets/icons/profile-icons/calender.png';
import { useEffect, useState } from 'react';
import { adminAxios } from '../../../../api/axios';
import { useParams } from 'react-router-dom';
import dayjs from 'dayjs';
import logos from '../../../dashboard/payment-methods/logos';
import { AnimatePresence, motion } from 'framer-motion';
import animationVariant from '../../home/animationVariant';
import { useAdminContext } from '../../../../context/adminContext';
function Order_Edit({}) {
    const [order, setOrder] = useState({});

    const { id } = useParams();
    const { modalContent } = useAdminContext();
    console.log('id: ', id, modalContent?.id);
    useEffect(() => {
        adminAxios
            .get(`order/${id || modalContent?.id}`)
            .then(({ data }) => {
                setOrder(() => data?.order);
            })
            .catch((error) => {
                console.error('get order details: ', error);
            });
    }, []);
    const orderDate = dayjs(order?.createdAt).format('MMM DD, YYYY');
    return (
        <AnimatePresence>
            <motion.section
                className="p-6 "
                variants={animationVariant(1)}
                initial="initial"
                animate="animate"
            >
                <section className="flex w-full max-w-[600px] flex-col gap-y-3 bg-[var(--light-grey)] p-5">
                    <div className="top bg-white p-4">
                        <h3 className="mb-4 font-gotham text-lg">
                            ORDER DETAILS
                        </h3>
                        <div className="flex w-full flex-col gap-y-3">
                            <OrderNumberDate
                                text={order?._id}
                                title={'ORDER NO.:'}
                                icon={order_icon}
                            />
                            <OrderNumberDate
                                text={orderDate}
                                title={'ORDER DATE:'}
                                icon={calendar_icon}
                            />
                        </div>
                    </div>
                    <div className="middle bg-white">
                        <div className=" p-4">
                            <h3 className="font-gotham text-lg">
                                ORDER STATUS:{' '}
                            </h3>
                            <h4 className="flex flex-row justify-between">
                                ORDER {order?.status?.toUpperCase()}
                                <span>
                                    {order?.items?.length}{' '}
                                    {order?.items?.length > 1
                                        ? 'Items'
                                        : 'Item'}{' '}
                                </span>
                            </h4>

                            <div className="my-4 border-t-2"></div>

                            <div className="box-border flex flex-col gap-y-2">
                                {order?.items?.map((item) => {
                                    return (
                                        <div className="flex flex-row gap-x-2">
                                            <img
                                                src={item?.product?.images[0]}
                                                className="h-32 w-20 object-cover"
                                            />
                                            <div className="box-border flex h-full w-full flex-col gap-y-1">
                                                <p className="font-gotham">
                                                    {item?.product?.title?.toUpperCase()}
                                                </p>

                                                <p>
                                                    {
                                                        item?.variation1
                                                            ?.variation
                                                    }
                                                    {item?.variation2
                                                        ?.variation &&
                                                        ` / ${item?.variation2?.variation}`}
                                                </p>

                                                <p className="font-gotham">
                                                    QTY:{' '}
                                                    <span>
                                                        {item?.quantity}
                                                    </span>
                                                </p>
                                                <p className="text-sm font-light tracking-wider">
                                                    £{item?.price?.toFixed(2)}
                                                </p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-4">
                        <h3 className="font-gotham tracking-wider">
                            PAYMENT DETAIL
                        </h3>
                        <div className="my-4 border-t-2"></div>
                        <div className="flex flex-row items-center gap-x-2">
                            <img
                                src={logos?.[order?.paymentType]}
                                className="w-12 border-2"
                                alt={`${
                                    order?.paymentType || 'payment method'
                                } icon`}
                            />
                            <p>{order?.paymentType}</p>
                        </div>
                    </div>

                    <div className="flex flex-col gap-y-3 bg-white p-4">
                        <h3 className="font-gotham tracking-wider">
                            ORDER TOTAL
                        </h3>
                        <div className="my-2 border-t-2"></div>
                        <p className="flex w-full flex-row justify-between text-sm font-semibold tracking-wider">
                            SUB-TOTAL:{' '}
                            <span className="font-light tracking-wider">
                                £{order?.transaction_cost?.subtotal?.toFixed(2)}
                            </span>
                        </p>
                        <p className="flex w-full flex-row justify-between text-sm font-semibold tracking-wider">
                            DELIVERY:{' '}
                            <span className="font-light">
                                £{order?.shipping_option?.cost?.toFixed(2)}
                            </span>
                        </p>
                        <div className="my-2 border-t-2"></div>
                        <p className="flex w-full flex-row justify-between text-sm font-semibold tracking-wider">
                            TOTAL:{' '}
                            <span>
                                £{order?.transaction_cost?.total?.toFixed(2)}
                            </span>
                        </p>
                    </div>
                </section>
            </motion.section>
        </AnimatePresence>
    );
}

export default Order_Edit;
