import disableLayout from '../../hooks/disableLayout.jsx';
import Checkout_Header from '../checkout/checkout_header.jsx';
import recycle_logo from '../../assets/icons/recycle.png';

import image from '../../assets/images/order-photo-women.jpg';
import { Link, useSearchParams } from 'react-router-dom';
import { useEffect, useRef, useState, useReducer } from 'react';
import axios from '../../api/axios.js';
import { useCart } from '../../context/cartContext.jsx';
import SocialIcons from './social-icons.jsx';
import Template from './template.jsx';
import LoadingPage from './loadingPage.jsx';
import { AnimatePresence, motion } from 'framer-motion';

export function OrderInfo({ header, text, headerClassName, pClassName }) {
    return (
        <div className="flex flex-row flex-nowrap">
            <span className="flex-1">
                <h3
                    className={`${
                        headerClassName || ''
                    } font-gotham !text-dark-gray text-opacity-5`}
                >
                    {header}
                </h3>
            </span>

            <p
                className={` ${pClassName} flex-1 self-center text-sm tracking-wide`}
            >
                {text}
            </p>
        </div>
    );
}

function Tooltip({ text }) {
    const [visibility, setVisibility] = useState(false);

    return (
        <div
            className="relative flex flex-col"
            onMouseEnter={() => setVisibility(() => true)}
            onMouseLeave={() => setVisibility(() => false)}
        >
            <p
                className={`z-1 absolute bottom-4 hidden whitespace-nowrap bg-gray-100 px-3 py-2 font-sans text-xs font-medium ${
                    (visibility && '!block') || ''
                }`}
            >
                {text}
            </p>
            <p className="w-[100px] truncate font-gotham !text-dark-gray">
                {text?.toUpperCase()}
            </p>
        </div>
    );
}
function Order_Success({}) {
    const [searchParams, setSearchParams] = useSearchParams();
    const [loading, setLoading] = useState(true);
    const [order, setOrder] = useState({});
    const { dispatch } = useCart();
    const abortController = useRef(new AbortController());
    useEffect(() => {
        const orderNumber = searchParams.get('order-number');

        abortController.current?.abort();

        abortController.current = new AbortController();
        axios
            .get(`order/${orderNumber}`, {
                signal: abortController.current?.signal,
            })
            .then(({ data }) => {
                setOrder(() => ({ ...data.order }));
                if (data.order?.status == 'received') {
                    console.log(data.order?.status);
                    dispatch({
                        type: 'DELETE',
                        cartIds: data.order?.cartIds,
                    });
                }
            })
            .catch((error) => {
                console.error(error);
            })
            .finally(() => {
                setTimeout(() => {
                    setLoading(false);
                }, 1000);
            });

        return () => {
            abortController.current?.abort();
        };
    }, []);

    return (
        <AnimatePresence>
            <motion.section className="relative h-full w-full">
                <AnimatePresence>{loading && <LoadingPage />}</AnimatePresence>

                {!loading && (
                    <Template>
                        <section className="flex flex-row flex-nowrap gap-3  sm:px-4 sm+md:flex-col ">
                            <div className="left flex max-w-[580px] flex-1 flex-col flex-nowrap">
                                <div className=" bg-white px-8 py-6">
                                    <h3 className="mb-4 font-gotham text-lg tracking-wider !text-primary">
                                        THANK YOU FOR YOUR ORDER
                                    </h3>

                                    <p className="text-s text-gray-500">
                                        Please check your inbox, as a
                                        confirmation email is on its way.
                                    </p>

                                    <div className="mt-6 flex flex-col gap-y-3">
                                        <OrderInfo
                                            header={'ORDER TOTAL:'}
                                            text={
                                                order?.transaction_cost?.total
                                                    ? `£ ${parseFloat(
                                                          order.transaction_cost
                                                              .total
                                                      ).toFixed(2)}`
                                                    : ''
                                            }
                                        />
                                        <OrderInfo
                                            header={'ORDER REFERENCE:'}
                                            text={order?._id}
                                            headerClassName={'w-5'}
                                        />

                                        {order?.status != 'cancelled' && (
                                            <OrderInfo
                                                header={'DELIVERY:'}
                                                text={
                                                    order?.shipping_option
                                                        ?.delivery_date
                                                        ? `Delivered on or before ${order?.shipping_option?.delivery_date}.`
                                                        : ''
                                                }
                                            />
                                        )}

                                        <OrderInfo
                                            header={'ORDER STATUS:'}
                                            text={
                                                order?.status
                                                    ? `${order.status[0].toUpperCase()}${order.status.slice(
                                                          1
                                                      )}`
                                                    : ''
                                            }
                                        />
                                    </div>
                                </div>

                                <div className="mt-3 flex  flex-col flex-nowrap gap-y-4 bg-white p-8 pt-3 ">
                                    {order?.items && (
                                        <section className="">
                                            <h2 className=" border-b-[1px] py-4 font-gotham text-xl font-bold tracking-wider">
                                                {`${order.items.length} ${
                                                    order.items.length > 1
                                                        ? 'ITEMS'
                                                        : 'ITEM'
                                                }`}
                                            </h2>
                                            <section className="scrollbar flex max-h-[300px] flex-col flex-nowrap overflow-y-auto">
                                                {order.items.map(
                                                    ({
                                                        title,
                                                        images,
                                                        price,
                                                        _id,
                                                        ...item
                                                    }) => {
                                                        return (
                                                            <section
                                                                key={_id}
                                                                className="box-content flex max-h-[120px] flex-row gap-x-4 border-b-[1px] py-6"
                                                            >
                                                                <div className="left flex-1">
                                                                    <img
                                                                        className="h-full w-full object-cover"
                                                                        src={
                                                                            images[0]
                                                                        }
                                                                        alt=""
                                                                    />
                                                                </div>
                                                                <div className="right flex flex-[4] flex-col gap-y-2">
                                                                    <p className="h-fit text-base font-bold !text-dark-gray">
                                                                        {parseFloat(
                                                                            price
                                                                        ).toLocaleString(
                                                                            'en-US',
                                                                            {
                                                                                style: 'currency',
                                                                                currency:
                                                                                    'GBP',
                                                                            }
                                                                        )}
                                                                    </p>

                                                                    <p className="h-fit w-3/6 text-sm">
                                                                        {title}
                                                                    </p>

                                                                    <div className="flex flex-row gap-x-4 font-bold tracking-wider ">
                                                                        {item?.isVariation1Present && (
                                                                            <p className="font-gotham !text-dark-gray">
                                                                                {item.variation1?.variation?.toUpperCase()}
                                                                            </p>
                                                                        )}

                                                                        {item?.isVariation2Present && (
                                                                            <Tooltip
                                                                                text={
                                                                                    item
                                                                                        .variation2
                                                                                        ?.variation ||
                                                                                    null
                                                                                }
                                                                            />
                                                                        )}
                                                                    </div>

                                                                    <p className="text-sm tracking-wide text-dark-gray">
                                                                        Qty:
                                                                        <span className="ml-2 font-gotham font-bold">
                                                                            {
                                                                                item?.quantity
                                                                            }
                                                                        </span>
                                                                    </p>
                                                                </div>
                                                            </section>
                                                        );
                                                    }
                                                )}
                                            </section>
                                        </section>
                                    )}

                                    {order?.status == 'received' && (
                                        <Link
                                            to={`/order-cancel?order-number=${order?._id}`}
                                            className="cursor-pointer text-sm font-[400] hover:underline"
                                        >
                                            Cancel this order
                                        </Link>
                                    )}
                                    <Link
                                        to={'/my-account'}
                                        className="cursor-pointer text-sm font-[400] hover:underline"
                                    >
                                        My Account
                                    </Link>
                                    <Link
                                        to={'/return-policy'}
                                        className="cursor-pointer text-sm font-[400] hover:underline"
                                    >
                                        Returns Policy
                                    </Link>
                                </div>

                                <div className="mt-3 flex flex-row items-center gap-x-4 bg-white p-6">
                                    <img
                                        src={recycle_logo}
                                        alt="recyle logo"
                                        className="h-7 w-7 object-contain"
                                    />
                                    <p>
                                        Our plastic bags and cardboard boxes are
                                        100% recyclable
                                    </p>
                                </div>

                                <button className=" mt-8 w-10/12 self-center !bg-primary py-3 font-gotham tracking-wider text-white transition-all hover:!bg-black">
                                    CONTINUE SHOPPING
                                </button>
                            </div>
                            <div className="right flex-[0.6]">
                                <div className="top flex w-full flex-col items-center gap-y-5 bg-blue-200 p-7 pt-8">
                                    <h3 className="font-gotham text-lg">
                                        HAVE YOUR SAY
                                    </h3>
                                    <p className="w-3/4 text-center">
                                        Take our two-minute survey and tell us
                                        what you think…
                                    </p>

                                    <button
                                        type="button"
                                        className="w-full border-2 bg-white py-3 font-gotham hover:bg-opacity-80"
                                    >
                                        LET'S GO
                                    </button>
                                </div>

                                <SocialIcons />
                                <div className="bottom relative mt-4 h-[340px] w-full ">
                                    <img
                                        src={image}
                                        alt=""
                                        className="h-full w-full bg-black object-cover object-bottom mix-blend-darken blur-[0.5px]"
                                    />

                                    <div className="absolute left-2/4 top-2/4 mx-auto w-full translate-x-[-50%] translate-y-[-50%] p-6 text-center ">
                                        <h3 className="order-shadow font-gotham text-5xl leading-[1.2] text-white">
                                            Looking for more ?
                                        </h3>

                                        <p className="order-shadow mt-7 font-gotham text-lg leading-6 text-white">
                                            Discover over 700 vintage boutiques
                                            and independent brands on out sister
                                            site, GLAMO Marketplace
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </Template>
                )}
            </motion.section>
        </AnimatePresence>
    );
}

export default Order_Success;
