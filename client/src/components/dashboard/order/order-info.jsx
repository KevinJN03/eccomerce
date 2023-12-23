import order_icon from '../../../assets/icons/profile-icons/package.svg';
import calendar_icon from '../../../assets/icons/profile-icons/calender.png';
import paypal_icon from '../../../assets/icons/payment-icons/paypal.svg';
import duplicate_icon from '../../../assets/icons/duplicate.png';
import logos from '../payment-methods/logos.jsx';
import { useUserDashboardContext } from '../../../context/userContext.jsx';
import { Link, useParams } from 'react-router-dom';
import { useMemo, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import dayjs from 'dayjs';
import Product from './product.jsx';
import { find } from 'lodash';
import CancelContainer from './cancelContainer.jsx';
import courierLinksObject from './courierLinks.js';
import { AnimatePresence } from 'framer-motion';
import submitCancellation from './handleCancelOrder.js';
import GLoader from '../../Login-SignUp/socialRegister/gloader.jsx';
import emoji from '../../../assets/icons/sad-emoji.png';
export function OrderNumberDate({ icon, title, text, className }) {
    return (
        <div className="flex w-full flex-row items-center">
            <div
                className={`flex flex-1 flex-row flex-nowrap items-center gap-x-3 ${
                    className || ''
                }`}
            >
                <img src={icon} alt="box outline icon" className="h-6 w-6" />
                <h3 className="font-gotham text-s text-dark-gray">{title}</h3>
            </div>

            <p className={`flex-1 text-sm ${className || ''}`}>{text}</p>
        </div>
    );
}

function Order_Info({}) {
    const { ordersArray } = useUserDashboardContext();
    const { id } = useParams();
    const findOrder = useMemo(
        () => ordersArray.find((item) => item?._id == id),
        [ordersArray]
    );

    // if (findOrder) {
    //     var orderDate = dayjs(findOrder?.createdAt)?.format('DD MMM, YYYY');
    // }

    const shipDate = dayjs(findOrder?.shipDate).format('dddd, D MMMM, YYYY');
    const orderDate = dayjs(findOrder?.createdAt).format('dddd, D MMMM, YYYY');
    const [error, setError] = useState({});
    const [show, setShow] = useState(false);
    const [courierLinks, setCourierLinks] = useState(courierLinksObject);
    const [loading, setLoading] = useState();

    const { handleCancelOrder } = submitCancellation({
        setLoading,
        setError,
        setShow,
        orderNumber: findOrder?._id,
    });

    const cancelContainerProps = {
        loading,
        setError,
        error,
        setShow,
        handleCancelOrder,
    };
    return (
        <section className="order-info-wrapper h-full w-full">
            {!findOrder && (
                <section className="top flex h-1/4 flex-col items-center justify-center gap-y-1 bg-white p-6  py-8">
                    <img
                        alt="sad emoji icon"
                        src={emoji}
                        className="h-24 w-24"
                    />
                    <p className="text-center text-sm">
                        Uh-oh! We couldn't find any details for the order number
                        you entered.
                    </p>
                    <div className="mt-3 flex flex-row gap-2 ">
                        <Link
                            to={'/my-account/orders'}
                            className="!bg-primary px-5 py-3 font-gotham text-white hover:!bg-black"
                        >
                            MY ORDERS
                        </Link>
                        {/* <button className='!bg-primary text-white py-3 font-gotham px-5 hover:!bg-black'>
                            MY ORDERS
                        </button> */}
                    </div>
                </section>
            )}
            {findOrder && (
                <>
                    <section className="top flex flex-col gap-y-1 bg-white p-6 py-8">
                        <h3 className="font-gotham text-lg">ORDER DETAILS</h3>
                        <p className="text-dark-gray">
                            Thanks for your order! Check out the details below.
                        </p>
                    </section>

                    <section className="middle relative mt-3">
                        <div className="relative flex flex-col gap-y-4 bg-white p-6">
                            {loading && (
                                <div className="absolute left-2/4 top-2/4 z-10 translate-x-[-50%] translate-y-[-50%] ">
                                    <GLoader />
                                </div>
                            )}
                            <OrderNumberDate
                                text={findOrder?._id}
                                title={'ORDER NO.:'}
                                icon={order_icon}
                            />
                            <OrderNumberDate
                                text={orderDate}
                                title={'ORDER DATE:'}
                                icon={calendar_icon}
                            />

                            <div className="border-t-[1px]"></div>

                            <div className="btn-wrapper flex w-6/12 flex-col gap-2">
                                {findOrder?.status == 'received' && !show && (
                                    <button
                                        disabled={loading}
                                        onClick={() => setShow(true)}
                                        className="w-full self-start border-2 px-6 py-[10px] font-gotham text-sm tracking-wider !text-primary hover:!bg-light-grey"
                                    >
                                        CANCEL ORDER
                                    </button>
                                )}

                                <button
                                    type="button"
                                    className="w-full self-start border-2 px-6 py-[10px] font-gotham text-sm tracking-wider !text-primary hover:!bg-light-grey"
                                >
                                    RETURNS INFORMATION
                                </button>
                            </div>
                            <AnimatePresence>
                                {show && (
                                    <CancelContainer
                                        {...cancelContainerProps}
                                        className={
                                            'mt-[-16px] !items-start !justify-start'
                                        }
                                    />
                                )}
                            </AnimatePresence>
                        </div>

                        {findOrder?.status == 'cancelled' && (
                            <div className="mt-3 bg-white p-6">
                                <h3 className="border-b-[1px] pb-4 font-gotham text-s tracking-wide">
                                    CANCELLATION DETAILS
                                </h3>

                                <h3 className="mt-6 font-gotham text-s tracking-wider text-dark-gray">
                                    REASON FOR CANCELLATION:
                                </h3>
                                <p className="mt-2 text-sm ">
                                    {findOrder?.cancel?.reason}
                                </p>
                            </div>
                        )}
                        {['shipped', 'received'].includes(
                            findOrder?.status
                        ) && (
                            <div className="mt-3 bg-white p-6">
                                <p className="mb-3 border-b-[1px] pb-2 font-gotham text-sm">
                                    DELIVERY ADDRESS
                                </p>
                                <p className="text-sm leading-6">
                                    {findOrder?.shipping_address?.name} <br />
                                    {
                                        findOrder?.shipping_address?.address
                                            ?.line1
                                    }{' '}
                                    <br />
                                    {findOrder?.shipping_address?.address
                                        ?.line2 && (
                                        <>
                                            {
                                                findOrder?.shipping_address
                                                    ?.address?.line2
                                            }
                                            <br />
                                        </>
                                    )}
                                    {findOrder?.shipping_address?.address?.city}{' '}
                                    {
                                        findOrder?.shipping_address?.address
                                            ?.postal_code
                                    }{' '}
                                    <br />
                                    {
                                        findOrder?.shipping_address?.address
                                            ?.country
                                    }
                                    {findOrder?.shipping_address?.phone}
                                </p>
                            </div>
                        )}
                        <div className="mt-3 bg-white p-6">
                            <div className="top border-b-2 pb-4">
                                <p className="font-gotham text-s text-dark-gray">
                                    ORDER STATUS:
                                </p>

                                <p className="mb-3 flex flex-row justify-between font-gotham text-sm tracking-wide">
                                    ORDER {findOrder?.status?.toUpperCase()}{' '}
                                    <span>
                                        {' '}
                                        {`${findOrder?.items?.length} ${
                                            findOrder?.items?.length == 1
                                                ? 'Item'
                                                : 'Items'
                                        }`}
                                    </span>
                                </p>

                                <p className="text-s">
                                    {findOrder?.status == 'cancelled' &&
                                        'Looks like you cancelled your order. A confirmation was sent to the email address associated with your GLAMO account.'}

                                    {findOrder?.status == 'shipped' &&
                                        'Your parcel is on its way to a courier and will be with you very soon!'}
                                </p>
                            </div>

                            <div className="middle flex w-full flex-row gap-x-4 overflow-x-scroll hide-scrollbar">
                                {findOrder.items?.map((item) => {
                                    return (
                                        <Product
                                            key={uuidv4()}
                                            id={item?._id}
                                            img={item?.product?.images?.[0]}
                                            variation1={
                                                item?.variation1?.variation
                                            }
                                            variation2={
                                                item?.variation2?.variation
                                            }
                                            title={item.product?.title}
                                            price={item?.price}
                                        />
                                    );
                                })}
                            </div>

                            {['received', 'shipped'].includes(
                                findOrder?.status
                            ) && (
                                <div className="flex w-full flex-col gap-y-2">
                                    <p className="flex w-full items-baseline gap-x-10 text-xs font-semibold text-dark-gray">
                                        <span className="flex-1">
                                            DELIVERY METHOD:
                                        </span>
                                        <span className=" flex-[2.5] text-s font-light">
                                            {findOrder?.shipping_option?.name}
                                        </span>
                                    </p>

                                    <p className=" flex w-full items-baseline gap-x-10 text-xs font-semibold text-dark-gray">
                                        {findOrder?.status == 'shipped' && (
                                            <span className="flex-1">
                                                SHIPPED DATE:
                                            </span>
                                        )}
                                        {findOrder?.status == 'received' && (
                                            <span className=" flex-1">
                                                ORDER DATE:
                                            </span>
                                        )}
                                        <span className="flex-[2.5] text-s font-light">
                                            {findOrder?.status == 'shipped' &&
                                                shipDate}
                                            {findOrder?.status == 'received' &&
                                                orderDate}
                                        </span>
                                    </p>
                                    {['shipped', 'delivered'].includes(
                                        findOrder?.status
                                    ) && (
                                        <a
                                            target="_blank"
                                            href={`${
                                                courierLinks?.[
                                                    findOrder?.courier?.toLowerCase()
                                                ]
                                            }${findOrder?.trackingNumber}`}
                                            className="mt-2 w-7/12 flex-[1] border-2 py-3 text-center  font-gotham text-sm transition-all hover:!bg-[var(--light-grey)]"
                                        >
                                            TRACK PARCEL
                                        </a>
                                    )}
                                </div>
                            )}
                        </div>

                        <div className="mt-3 bg-white p-6">
                            <h3 className="border-b-2 pb-5 font-gotham text-sm">
                                PAYMENT DETAILS
                            </h3>

                            <div className="mt-5 flex flex-row items-center gap-x-4">
                                <img
                                    src={paypal_icon}
                                    alt=""
                                    className="h-8 w-12 rounded-sm border-2"
                                />
                                <p className="text-sm">PayPal</p>
                            </div>
                        </div>

                        <div className="order-details mt-3 bg-white p-6">
                            <h3 className="border-b-2 pb-6 font-gotham text-sm">
                                ORDER TOTAL
                            </h3>
                            <p className="my-6 flex items-center justify-between font-gotham tracking-wider text-dark-gray">
                                SUB-TOTAL:{' '}
                                <span className="text-sm tracking-wider">
                                    {`£${parseFloat(
                                        findOrder.transaction_cost.subtotal ||
                                            ''
                                    ).toFixed(2)}`}
                                </span>
                            </p>

                            <p className="my-6 flex items-center justify-between font-gotham tracking-wider text-dark-gray">
                                DELIVERY:
                                <span className="text-sm tracking-wider">
                                    {`£${
                                        parseFloat(
                                            findOrder?.shipping_option?.cost
                                        ).toFixed(2) || ''
                                    }`}
                                </span>
                            </p>

                            <p className="flex justify-between border-t-2 py-2 pt-6 font-gotham text-base tracking-wider ">
                                TOTAL:{' '}
                                {findOrder?.transaction_cost?.total && (
                                    <span className="font-gotham font-bold tracking-widest">
                                        £
                                        {parseFloat(
                                            findOrder?.transaction_cost?.total
                                        ).toFixed(2)}
                                    </span>
                                )}
                            </p>
                        </div>

                        <div className="mt-3 bg-white p-6">
                            <h3 className="border-b-2 pb-6 font-gotham text-sm">
                                NEED HELP?
                            </h3>
                            <div className="flex cursor-pointer flex-row items-center justify-between pt-5 transition-all hover:underline">
                                <p className="text-sm ">Order Issues FAQ</p>
                                <img
                                    src={duplicate_icon}
                                    alt="duplicate icon"
                                    className="h-8 w-8"
                                />
                            </div>
                        </div>
                    </section>
                </>
            )}
            <section className="bottom"></section>
        </section>
    );
}

export default Order_Info;
