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
const shippingCarriers = [
    'Royal Mail',
    'DHL',
    'Hermes',
    'UPS',
    'FedEx',
    'Parcelforce Worldwide',
    'Yodel',
    'TNT',
    'Others',
];
function UpdateOrder({}) {
    const { modalContent } = useAdminContext();
    const [order, setOrder] = useState({});
    const [trackingNumber, setTrackingNumber] = useState('');
    const [courier, setCourier] = useState('');
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
            <div className="flex w-full flex-col items-center justify-center gap-y-3 rounded-lg bg-[var(--light-grey)] p-4">
                <p className="font-gotham text-lg">ORDER DETAIL</p>
                <OrderNumberDate
                    icon={order_icon}
                    text={modalContent?.id}
                    title={'ORDER NO.:'}
                    className={'text-right'}
                />
                <OrderNumberDate
                    icon={calendar_icon}
                    text={orderDate}
                    title={'ORDER DATE:'}
                    className={'text-right'}
                />
            </div>

            <div className="flex w-full flex-col gap-y-3 rounded-lg bg-[var(--light-grey)] p-4">
                <p className="text-center font-gotham text-lg">ITEM</p>
                {order?.items?.map((item) => {
                    return (
                        <div>
                            <p className="!text-left">{`${item?.quantity} x ${item?.product?.title}`}</p>
                            <p>
                                {item?.variation1?.variation}{' '}
                                {item?.variation2?.variation ? (
                                    <>
                                        <span className="font-gotham"> / </span>
                                        <p className="inline">
                                            {item?.variation2?.variation}
                                        </p>
                                    </>
                                ) : (
                                    ''
                                )}
                            </p>
                            <p className="font-bold tracking-wider">
                                £{item?.price?.toFixed(2)}
                            </p>
                        </div>
                    );
                })}
            </div>

            <div className="flex w-full flex-col gap-y-3 rounded-lg bg-[var(--light-grey)] p-4">
                <p className="text-center font-gotham text-lg">TOTAL</p>

                <p className="flex w-full flex-nowrap justify-between font-semibold">
                    SUB-TOTAL:{' '}
                    <span className="font-normal">
                        £{order?.transaction_cost?.subtotal?.toFixed(2)}
                    </span>
                </p>
                <p className="flex w-full flex-nowrap justify-between font-semibold">
                    DELIVERY:{' '}
                    <span className="font-normal">
                        £{order?.shipping_option?.cost?.toFixed(2)}
                    </span>
                </p>
                <p className="flex w-full flex-nowrap justify-between font-semibold">
                    TOTAL:{' '}
                    <span className="font-normal">
                        £{order?.transaction_cost?.total?.toFixed(2)}
                    </span>
                </p>
            </div>

            <div className="flex w-full flex-col gap-y-3 rounded-lg bg-[var(--light-grey)] p-4">
                <p className="text-center font-gotham text-lg">SHIPPING</p>

                <p className="flex w-full flex-nowrap justify-between font-semibold">
                    OPTION:{' '}
                    <span className="font-normal">
                        {order?.shipping_option?.name}
                    </span>
                </p>

                <div className="flex w-full flex-nowrap justify-between">
                    <p className=" font-semibold">TRACKING NUMBER:</p>
                    {order?.status == 'received' ? (
                        <input
                            type="text"
                            className="border-2 border-none px-2 text-s"
                            placeholder="Enter a tracking number"
                            value={trackingNumber}
                            onChange={(e) => setTrackingNumber(e.target.value)}
                        />
                    ) : (
                        <p>{order?.trackingNumber}</p>
                    )}
                </div>

                <div className="flex w-full flex-nowrap justify-between">
                    <p className=" font-semibold">COURIER:</p>

                    {order?.status == 'received' ? (
                        <div className="flex flex-col gap-y-2">
                            <select
                                className="text-s"
                                onChange={(e) => setCourier(e.target.value)}
                            >
                                {shippingCarriers.map((item) => {
                                    return (
                                        <option value={item} className="text-s">
                                            {item}
                                        </option>
                                    );
                                })}
                            </select>

                          {courier == 'Others' &&  <input
                                type="text"
                                className="border-2 border-none px-2 text-s"
                                placeholder="Please enter courier"
                                value={trackingNumber}
                                onChange={(e) =>
                                    setTrackingNumber(e.target.value)
                                }
                            />}
                        </div>
                    ) : (
                        <p>{order?.courier}</p>
                    )}
                </div>
            </div>
        </section>
    );
}

export default UpdateOrder;
