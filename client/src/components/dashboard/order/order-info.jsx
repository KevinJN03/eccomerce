import order_icon from '../../../assets/icons/profile-icons/package.svg';
import calendar_icon from '../../../assets/icons/profile-icons/calender.png';
import paypal_icon from '../../../assets/icons/payment-icons/paypal.svg';
import duplicate_icon from '../../../assets/icons/duplicate.png';
import logos from '../payment-methods/logos.jsx';
import { useUserDashboardContext } from '../../../context/userContext.jsx';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import {v4 as uuidv4} from 'uuid'
import dayjs from 'dayjs';
import Product from './product.jsx';
export function OrderNumberDate({ icon, title, text, className }) {
    return (
        <div className="flex flex-row items-center w-full">
            <div className={`flex flex-1 flex-row flex-nowrap items-center gap-x-3 ${className || ''}`}>
                <img src={icon} alt="box outline icon" className="h-6 w-6" />
                <h3 className="text-dark-gray font-gotham text-s">{title}</h3>
            </div>

            <p className={`flex-1 text-sm ${className || ''}`}>{text}</p>
        </div>
    );
}

function Order_Info({}) {
    const { ordersArray } = useUserDashboardContext();
    const { id } = useParams();
    const [findOrder, setFindOrder] = useState(() =>
        ordersArray.find((item) => item?._id == id)
    );

    if (findOrder) {
        var orderDate = dayjs(findOrder?.createdAt)?.format('DD MMM, YYYY');
    }
    return (
        <section className="order-info-wrapper">
            {findOrder && (
                <>
                    <section className="top flex flex-col gap-y-1 bg-white p-6 py-8">
                        <h3 className="font-gotham text-lg">ORDER DETAILS</h3>
                        <p className="text-dark-gray">
                            Thanks for your order! Check out the details below.
                        </p>
                    </section>

                    <section className="middle mt-3">
                        <div className="flex flex-col gap-y-4 bg-white p-6">
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

                            <button
                                type="button"
                                className="self-start border-2 px-6 py-[10px] font-gotham tracking-wider !text-primary hover:!bg-[var(--light-grey)]"
                            >
                                RETURNS INFORMATION
                            </button>
                        </div>

                        <div className="mt-3 bg-white p-6">
                            <h3 className="border-b-[1px] pb-4 font-gotham text-s tracking-wide">
                                CANCELLATION DETAILS
                            </h3>

                            <h3 className="text-dark-gray mt-6 font-gotham text-s tracking-wider">
                                REASON FOR CANCELLATION:
                            </h3>
                            <p className="mt-2 text-sm ">No longer required</p>
                        </div>

                        <div className="mt-3 bg-white p-6">
                            <div className="top border-b-2 pb-6">
                                <p className="text-dark-gray font-gotham text-s">
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
                                    Looks like you cancelled your order. A
                                    confirmation was sent to the email address
                                    associated with your ASOS account.
                                </p>
                            </div>

                            <div className="middle flex flex-row gap-x-4 overflow-x-scroll hide-scrollbar">
                                {findOrder.items?.map(
                                    (item) => {
                                        console.log({ item });

                                        return (
                                            <Product
                                            key={uuidv4()}
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
                                    }
                                )}
                            </div>
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
                            <p className="text-dark-gray my-6 flex items-center justify-between font-gotham tracking-wider">
                                SUB-TOTAL:{' '}
                                <span className="text-sm tracking-wider">
                                    {`£${parseFloat(
                                        findOrder.transaction_cost.subtotal ||
                                            ''
                                    ).toFixed(2)}`}
                                </span>
                            </p>

                            <p className="text-dark-gray my-6 flex items-center justify-between font-gotham tracking-wider">
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
