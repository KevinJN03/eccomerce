import dayjs from 'dayjs';
import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import courierLinksObject from './courierLinks';
import CancelOrderBtn from './cancel-order';
import { ErrorMessagePointerUp } from '../../Login-SignUp/errorMessage';
import cancelOptions from '../../order/cancelOptions';
import { AnimatePresence, motion } from 'framer-motion';
import { initial } from 'lodash';
function OrderItem({ order }) {
    const [show, setShow] = useState(false);

    const [courierLinks, setCourierLinks] = useState(courierLinksObject);

    const orderDate = dayjs(order?.createdAt)?.format('DD MMM, YYYY');
    const shipDate = dayjs(order?.ship_date)?.format('DD MMM, YYYY');

    const returnDate = dayjs(order?.return_date)?.format('DD MMM, YYYY');

    const cancelDate = dayjs(order?.cancel_date)?.format('DD MMM, YYYY');

    const [error, setError] = useState({});

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
                duration: 0.5, delay: 1.2
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
                    duration: 0.2 * count, delay: 0.1 * count
                },
            },
        };
    };
    return (
        // <AnimatePresence>
        <div className="middle bg-white p-6">
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

            <div className="mt-3 flex flex-row items-center">
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
                <div className="flex flex-1 flex-col gap-4">
                    <Link
                        to={`${order?._id}`}
                        type="button"
                        className="h-full w-full border-2 py-2 text-center font-gotham text-sm tracking-wider transition-all hover:!bg-[var(--light-grey)]"
                    >
                        VIEW ORDER
                    </Link>
                    {order?.status == 'received' && (
                        <CancelOrderBtn show={show} setShow={setShow} />
                    )}
                </div>
            </div>
            <AnimatePresence >
                {show && (
                    <motion.section
                        variants={containerVariants}
                        animate={'animate'}
                        initial={'initial'}
                        exit={'exit'}
                        className="cancel-container flex w-full flex-col items-center justify-center"
                        tabIndex="0"
                    >
                        <section className="w-7/12 mt-4">
                            <motion.h4
                                variants={contentVariant(1)}
                                
                                exit={'exit'}
                                className="font-gotham text-dark-gray text-s"
                            >
                                REASON FOR CANCELLATION:
                            </motion.h4>
                            <motion.div
                                variants={contentVariant(2)}
                              
                                exit={'exit'}
                                className="relative"
                            >
                                <select
                                    onChange={(e) =>
                                        setSelect(() => e.target?.value)
                                    }
                                    type="text"
                                    className="mt-2 w-full border-2 p-2 text-s"
                                >
                                    <option
                                        value="Please Select"
                                        selected
                                        disabled
                                    >
                                        Please Select
                                    </option>
                                    {cancelOptions.map((value, index) => {
                                        return (
                                            <option value={value} key={index}>
                                                {value}
                                            </option>
                                        );
                                    })}
                                </select>
                                {error?.msg && (
                                    <ErrorMessagePointerUp
                                        className={'relative !top-3'}
                                        msg={error.msg}
                                    />
                                )}
                            </motion.div>

                            <motion.h4
                                variants={contentVariant(3)}
                                
                                exit={'exit'}
                                className="mt-4 font-gotham text-s !text-dark-gray text-opacity-5"
                            >
                                ADDITIONAL INFORMATION
                            </motion.h4>
                            <motion.textarea
                            variants={contentVariant(4)}
                         
                            exit={'exit'}
                                maxLength={'500'}
                                rows={'5'}
                                className="mt-2 w-full resize-none  rounded-none border-2 p-2 text-s"
                                placeholder="Optional - max 500 characters"
                            />

                            <motion.button
                                variants={contentVariant(5)}
                              
                                exit={'exit'}
                                type="button"
                                className="mt-2 w-full !bg-primary px-6 py-2 font-gotham text-s text-white opacity-95 hover:opacity-100"
                            >
                                CANCEL ORDER
                            </motion.button>
                            <motion.button
                                variants={contentVariant(6)}
                             
                                exit={'exit'}
                                onClick={() => setShow(false)}
                                type="button"
                                className="hover:bg-light-grey mt-2 w-full border-2 bg-white px-6 py-2  font-gotham text-s opacity-95"
                            >
                                CANCEL ORDER
                            </motion.button>
                        </section>
                    </motion.section>
                )}
            </AnimatePresence>
        </div>
        // </AnimatePresence>
    );
}

export default OrderItem;
