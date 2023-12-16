import { useAdminContext } from '../../../context/adminContext';
import { OrderNumberDate } from '../../dashboard/order/order-info';
import order_icon from '../../../assets/icons/profile-icons/package.svg';
import calendar_icon from '../../../assets/icons/profile-icons/calender.png';
import { useEffect, useState } from 'react';
import { adminAxios } from '../../../api/axios';
import { useNavigate, useParams } from 'react-router-dom';
import dayjs from 'dayjs';
import logos from '../../dashboard/payment-methods/logos';
import { AnimatePresence, motion } from 'framer-motion';
import animationVariant from '../home/animationVariant';

import ErrorMessage, {
    BetaErrorMessage,
} from '../../Login-SignUp/errorMessage.jsx';
import OptionError from '../components/product/new product/variation/error/optionError.jsx';
import { ClickAwayListener } from '@mui/material';

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
    const [submitLoad, setSubmitLoad] = useState(false);
    const {
        modalContent,
        setModalCheck,
        authAdminUserDispatch,
        orders,
        setOrders,
    } = useAdminContext();
    const [order, setOrder] = useState({});
    const [trackingNumber, setTrackingNumber] = useState('');
    const [courier, setCourier] = useState('');
    const [loading, setLoading] = useState(true);
    const [showCustomCourier, setShowCustomCourier] = useState(false);
    const [error, setError] = useState({});
    const [status, setStatus] = useState('');
    const [submitState, setSubmitState] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        adminAxios
            .get(`order/${modalContent?.id}`)
            .then(({ data }) => {
                setOrder(() => data?.order);
            })
            .catch((error) => {
                console.error('get order details: ', error);
            });

        const timeout = setTimeout(() => {
            setLoading(false);
        }, 1000);

        return () => {
            clearTimeout(timeout);
        };
    }, []);

    const orderDate = dayjs(order?.createdAt).format('MMM DD, YYYY');

    const handleCourier = (e) => {
        if (e.target.value === 'Others') {
            setShowCustomCourier(() => true);
            setCourier(() => '');

            return;
        }
        setError((prevError) => ({
            ...prevError,
            courier: null,
        }));
        setShowCustomCourier(() => false);
        setCourier(() => e.target.value);
    };

    const handleSubmit = async () => {
        let success = false;
        try {
            setSubmitState(() => false);
            console.log('in submit');

            if (
                (trackingNumber.length < 12 || courier.length < 3) &&
                status == 'shipped'
            ) {
                if (trackingNumber.length < 12) {
                    setError((prevState) => ({
                        ...prevState,
                        trackingNumber:
                            'Please enter a valid password of 12 or more characters.',
                    }));
                }

                if (courier.length < 3) {
                    setError((prevState) => ({
                        ...prevState,
                        courier:
                            'Please enter a valid courier of 3 or more characters.',
                    }));
                }

                return;
            }

            console.log('in else');

            setSubmitLoad(true);
            const { data } = await adminAxios.put(
                `order/${modalContent?.id}/update`,
                {
                    trackingNumber,
                    courier,
                    status,
                }
            );

            const { data: orderData } = await adminAxios.get('/orders');

            success = true;
            setOrders(() => orderData?.orders);
        } catch (errorResponse) {
            console.error('error while updating order', errorResponse);
            if (errorResponse?.response?.status == 400) {
                setError((prevError) => ({
                    ...prevError,
                    ...errorResponse?.response?.data?.error,
                }));
            }

            if (errorResponse?.response?.status == 401) {
                authAdminUserDispatch({ type: 'LOGOUT' });
                navigate('/admin/login');
            }
        } finally {
            setTimeout(() => {
                setSubmitLoad(false);
                if (success) {
                    setModalCheck(false);
                }
            }, 1000);
        }
    };
    const handleSubmitBtn = () => {
        if (!status) {
            setError((prevError) => ({
                ...prevError,
                status: 'Please select an available option.',
            }));
            return;
        }

        setSubmitState(() => true);
    };
    return (
        <section className="relative w-full">
            {submitLoad && (
                <div className="absolute left-2/4 top-2/4 z-10 translate-x-[-50%] translate-y-[-50%] opacity-100">
                    <div className="relative h-full w-full">
                        <p className="absolute left-2/4 top-2/4 translate-x-[-50%] translate-y-[-60%] font-gotham text-lg">
                            g
                        </p>
                        <div class="spinner-circle [--spinner-color:var(--slate-11)]"></div>
                        {/* <svg
                            className="spinner-circle spinner-lg [--spinner-color:var(--slate-11)]"
                            viewBox="25 25 50 50"
                            strokeWidth="5"
                        >
                            <circle cx="50" cy="50" r="20" />
                        </svg> */}
                    </div>
                </div>
            )}

            {submitState && (
                <ClickAwayListener
                    onClickAway={() => setSubmitState(() => false)}
                >
                    <div className="absolute left-2/4 top-2/4 z-10 flex w-10/12 translate-x-[-50%] translate-y-[-50%] flex-col rounded-lg bg-white p-5 drop-shadow-2xl">
                        <p className="text-center font-gotham text-base">
                            Are you sure you want to update this order?
                        </p>
                        <p className="mt-3 w-9/12 self-center text-center">
                            The following action will notify the user that their
                            order has been
                            {` ${status} ${
                                ['cancelled', 'returned'].includes(status)
                                    ? `and refund the customer £${order?.transaction_cost?.total?.toFixed(
                                          2
                                      )}`
                                    : ''
                            }`}
                            .
                        </p>

                        <div className="mt-6 flex flex-row flex-nowrap gap-x-2">
                            <button
                                onClick={handleSubmit}
                                type="button"
                                className="flex-1 rounded-md bg-green-400 py-2 font-gotham text-white hover:bg-green-600"
                            >
                                YES
                            </button>
                            <button
                                onClick={() => setSubmitState(() => false)}
                                type="button"
                                className="flex-1 rounded-md bg-red-400 py-2 font-gotham text-white hover:bg-red-600"
                            >
                                NO
                            </button>
                        </div>
                    </div>
                </ClickAwayListener>
            )}
            <section
                className={` ${
                    submitLoad || submitState ? 'opacity-50' : 'opacity-100'
                } flex w-full flex-col items-center justify-center gap-y-3`}
            >
                {loading && (
                    <div className="absolute left-2/4 top-2/4 z-10 translate-x-[-50%] translate-y-[-50%] opacity-100">
                        <svg
                            className="spinner-ring spinner-sm [--spinner-color:var(--slate-11)]"
                            viewBox="25 25 50 50"
                            strokeWidth="5"
                        >
                            <circle cx="50" cy="50" r="20" />
                        </svg>
                    </div>
                )}

                {!loading && (
                    <>
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
                            <p className="text-center font-gotham text-lg">
                                ITEM
                            </p>
                            {order?.items?.map((item) => {
                                return (
                                    <div>
                                        <p className="!text-left">{`${item?.quantity} x ${item?.product?.title}`}</p>
                                        <p>
                                            {item?.variation1?.variation}{' '}
                                            {item?.variation2?.variation ? (
                                                <>
                                                    <span className="font-gotham">
                                                        {' '}
                                                        /{' '}
                                                    </span>
                                                    <p className="inline">
                                                        {
                                                            item?.variation2
                                                                ?.variation
                                                        }
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
                            <p className="text-center font-gotham text-lg">
                                TOTAL
                            </p>

                            <p className="flex w-full flex-nowrap justify-between font-semibold">
                                SUB-TOTAL:{' '}
                                <span className="font-normal">
                                    £
                                    {order?.transaction_cost?.subtotal?.toFixed(
                                        2
                                    )}
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
                                    £
                                    {order?.transaction_cost?.total?.toFixed(2)}
                                </span>
                            </p>
                        </div>

                        <div className="flex w-full flex-col gap-y-3 rounded-lg bg-[var(--light-grey)] p-4">
                            <p className="text-center font-gotham text-lg">
                                SHIPPING
                            </p>

                            <p className="flex w-full flex-nowrap justify-between font-semibold">
                                OPTION:{' '}
                                <span className="font-normal">
                                    {order?.shipping_option?.name}
                                </span>
                            </p>

                            <div className="flex w-full flex-nowrap justify-between">
                                <p className=" font-semibold">
                                    TRACKING NUMBER:
                                </p>
                                {order?.status == 'received' ? (
                                    <div className="max-w-[200px]">
                                        <input
                                            type="text"
                                            className="w-full border-2 border-none px-2 text-s"
                                            placeholder="Enter a tracking number"
                                            value={trackingNumber}
                                            onChange={(e) => {
                                                setTrackingNumber(
                                                    e.target.value
                                                );

                                                setError((prevError) => ({
                                                    ...prevError,
                                                    trackingNumber: null,
                                                }));
                                            }}
                                        />
                                        {error?.trackingNumber && (
                                            <OptionError
                                                msg={error?.trackingNumber}
                                                className={'!text-s'}
                                                small={true}
                                            />
                                        )}
                                    </div>
                                ) : (
                                    <p>{order?.trackingNumber}</p>
                                )}
                            </div>

                            <div className="flex w-full flex-nowrap justify-between">
                                <p className=" font-semibold">COURIER:</p>

                                {order?.status == 'received' ? (
                                    <div className="flex max-w-[200px] flex-col gap-y-2">
                                        <select
                                            className="text-s"
                                            onChange={handleCourier}
                                        >
                                            <option
                                                className=""
                                                disabled
                                                selected
                                            >
                                                Select Courier
                                            </option>
                                            {shippingCarriers.map((item) => {
                                                return (
                                                    <option
                                                        value={item}
                                                        className="text-s"
                                                    >
                                                        {item}
                                                    </option>
                                                );
                                            })}
                                        </select>

                                        {showCustomCourier && (
                                            <div className="relative w-full">
                                                <input
                                                    type="text"
                                                    className="w-full border-2 border-none px-2 text-s"
                                                    placeholder="Please enter courier"
                                                    value={courier}
                                                    onChange={(e) => {
                                                        setCourier(
                                                            e.target.value
                                                        );

                                                        setError(
                                                            (prevError) => ({
                                                                ...prevError,
                                                                courier: null,
                                                            })
                                                        );
                                                    }}
                                                />
                                            </div>
                                        )}

                                        {error?.courier && (
                                            <OptionError
                                                msg={error?.courier}
                                                className={'!text-s'}
                                                small={true}
                                            />
                                        )}
                                    </div>
                                ) : (
                                    <p>{order?.courier}</p>
                                )}
                            </div>
                        </div>
                        <div className="flex w-full flex-col gap-y-3 rounded-lg bg-[var(--light-grey)] p-4">
                            <p className="text-center font-gotham text-lg">
                                STATUS
                            </p>
                            <p className="flex w-full flex-nowrap justify-between font-semibold">
                                CURRENT STATUS:{' '}
                                <span className="font-normal">
                                    {order?.status?.toUpperCase()}
                                </span>
                            </p>

                            <div className="flex justify-between">
                                <p className="flex w-full flex-nowrap justify-between font-semibold">
                                    UPDATE STATUS:{' '}
                                </p>
                                <div className="flex w-full max-w-[160px] flex-col">
                                    <select
                                        name="update-status"
                                        id="update-status"
                                        className="min-w-full text-s"
                                        onChange={(e) => {
                                            setStatus(e.target.value);

                                            setError((prevError) => ({
                                                ...prevError,
                                                status: null,
                                            }));
                                        }}
                                    >
                                        <option disabled selected>
                                            Select Status
                                        </option>

                                        {[
                                            'shipped',
                                            'delivered',
                                            'cancelled',
                                            'returned',
                                        ].map((item) => {
                                            return (
                                                <option value={item}>
                                                    {item[0]?.toUpperCase() +
                                                        item?.substring(1)}
                                                </option>
                                            );
                                        })}
                                    </select>
                                    {error?.status && (
                                        <OptionError
                                            msg={error?.status}
                                            className={'!text-s'}
                                            small={true}
                                        />
                                    )}
                                </div>
                            </div>
                        </div>
                        {order?.status == 'received' && (
                            <div className="flex w-full flex-row gap-x-2">
                                <button
                                    disabled={submitLoad}
                                    onClick={handleSubmitBtn}
                                    type="button"
                                    className="w-full rounded-lg !bg-primary p-4 font-gotham text-white transition-all hover:opacity-50"
                                >
                                    SUBMIT
                                </button>
                                <button
                                    disabled={submitLoad}
                                    onClick={() => setModalCheck(false)}
                                    type="button"
                                    className="w-full rounded-lg !bg-red-600 p-4 font-gotham text-white transition-all hover:opacity-50"
                                >
                                    CANCEL
                                </button>
                            </div>
                        )}
                    </>
                )}
            </section>
        </section>
    );
}

export default UpdateOrder;
