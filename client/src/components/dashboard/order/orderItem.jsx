import dayjs from 'dayjs';
import { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import courierLinksObject from './courierLinks';
import CancelOrderBtn from './cancel-order';
import { ErrorMessagePointerUp } from '../../Login-SignUp/errorMessage';
import cancelOptions from '../../order/cancelOptions';
import { AnimatePresence, motion } from 'framer-motion';
import { initial } from 'lodash';
import axios from '../../../api/axios';
import logOutUser from '../../common/logoutUser';
import { useAuth } from '../../../hooks/useAuth';
import { useUserDashboardContext } from '../../../context/userContext';
import GLoader from '../../Login-SignUp/socialRegister/gloader';
import CancelContainer from './cancelContainer';
import submitCancellation from './handleCancelOrder';
function OrderItem({ order }) {
    const [show, setShow] = useState(false);
    const [courierLinks, setCourierLinks] = useState(courierLinksObject);
    const orderDate = dayjs(order?.createdAt)?.format('DD MMM, YYYY');
    const shipDate = dayjs(order?.ship_date)?.format('DD MMM, YYYY');
    const returnDate = dayjs(order?.return_date)?.format('DD MMM, YYYY');
    const cancelDate = dayjs(order?.cancel_date)?.format('DD MMM, YYYY');
    const [error, setError] = useState({});

    const { setFooterMessage, setOrdersArray } = useUserDashboardContext();
    const navigate = useNavigate();

    const { adminDispatch } = useAuth();
    const [loading, setLoading] = useState(false);
    const containerVariants = {
        initial: {
            opacity: 0,
        },
        animate: {
            opacity: 1,

            transition: {
                duration: 0.5,
            },
        },

        exit: {
            opacity: 0,
            height: '0px',

            transition: {
                duration: 0.6,
                delay: 1.2,
            },
        },
    };

    const contentVariant = (count) => {
        return {
            exit: {
                opacity: 0,
                // translateX: 50,
                translateY: -100,
                transition: {
                    duration: 0.2 * count,
                    delay: 0.1 * count,
                },
            },
        };
    };

    const { handleCancelOrder } = submitCancellation({
        setLoading,
        setError,
        setShow,
        orderNumber: order?._id
    });

    const cancelContainerProps = {
        loading,
        setError,
        error,
        setShow,
        handleCancelOrder,
        
    };
    return (
        // <AnimatePresence>
        <section className="relative w-full">
            {loading && (
                <div className="absolute left-2/4 top-2/4 z-10 translate-x-[-50%] translate-y-[-50%]">
                    <GLoader />
                </div>
            )}
            <div className={` middle relative bg-white p-6`}>
                <div>
                    <p className="font-gotham text-xs font-bold tracking-wider text-dark-gray">
                        ORDER STATUS:
                    </p>
                    <p className="font-gotham text-base font-bold">
                        {order?.status == 'shipped'
                            ? "WE'VE SENT IT"
                            : `ORDER ${order?.status?.toUpperCase()}`}
                    </p>
                    {order?.status == 'cancelled' && (
                        <p className="text-s tracking-wide">
                            Looks like you cancelled this order.
                        </p>
                    )}

                    {order?.status == 'shipped' && (
                        <p className="text-green-800">
                            Estimated delivery{' '}
                            {order?.shipping_option?.delivery_date}
                        </p>
                    )}
                </div>
                <section className="mt-4 flex flex-row flex-nowrap border-b-2 pb-4">
                    <div className="product-images-container flex flex-[1.5] flex-row gap-x-3 overflow-x-auto">
                        {order.items.map((item) => {
                            return (
                                <img
                                    className="h-28 w-[86px] object-cover object-center "
                                    src={item?.product?.images?.[0]}
                                    alt=""
                                />
                            );
                        })}
                    </div>

                    {order?.status == 'shipped' && (
                        <a
                            target="_blank"
                            href={`${
                                courierLinks?.[order?.courier?.toLowerCase()]
                            }${order?.trackingNumber}`}
                            className="h-fit flex-[1] border-2 py-2 text-center font-gotham text-sm tracking-wider transition-all hover:!bg-[var(--light-grey)]"
                        >
                            TRACK ORDER
                        </a>
                    )}
                </section>

                <div className="mt-3 flex flex-row ">
                    <div className="left flex flex-[1.5] flex-col flex-nowrap">
                        <p className="font-gotham text-xs tracking-wider text-dark-gray">
                            ORDER REF.:{' '}
                            <span className="text-sm">{order?._id}</span>
                        </p>

                        {order?.status == 'received' && (
                            <p className="font-gotham text-xs tracking-wider text-dark-gray">
                                ORDER DATE:{' '}
                                <span className="text-sm">{orderDate}</span>
                            </p>
                        )}

                        {order?.status == 'shipped' && (
                            <p className="font-gotham text-xs tracking-wider text-dark-gray">
                                SHIPPED DATE:{' '}
                                <span className="text-sm">{shipDate}</span>
                            </p>
                        )}

                        {order?.status == 'returned' && (
                            <p className="font-gotham text-xs tracking-wider text-dark-gray">
                                RETURN DATE:{' '}
                                <span className="text-sm">{returnDate}</span>
                            </p>
                        )}
                        {order?.status == 'cancelled' && (
                            <p className="font-gotham text-xs tracking-wider text-dark-gray">
                                CANCEL DATE:{' '}
                                <span className="text-sm">{cancelDate}</span>
                            </p>
                        )}
                    </div>
                    <div className="flex flex-1 flex-col gap-y-1">
                        <button
                            disabled={loading}
                            onClick={() => navigate(order?._id)}
                            // to={`${order?._id}`}
                            type="button"
                            className="h-full w-full border-2 py-2 text-center font-gotham text-sm tracking-wider transition-all hover:!bg-[var(--light-grey)] disabled:cursor-not-allowed"
                        >
                            VIEW ORDER
                        </button>
                        {order?.status == 'received' && (
                            <CancelOrderBtn
                                show={show}
                                setShow={setShow}
                                disabled={loading}
                            />
                        )}
                    </div>
                </div>
                <AnimatePresence>
                    {show && <CancelContainer {...cancelContainerProps} />}
                </AnimatePresence>
            </div>
        </section>
        // </AnimatePresence>
    );
}

export default OrderItem;
