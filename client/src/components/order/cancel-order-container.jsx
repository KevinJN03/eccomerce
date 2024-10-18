import { useState } from 'react';
import { useTemplate } from '../../context/templeteContext.jsx';
import { ErrorMessagePointerUp } from '../portal/errorMessage.jsx';
import Checkout_Item from '../checkout/checkout_total/checkout-item.jsx';
import MessageFooter from '../dashboard/messageFooter.jsx';
import { OrderInfo } from './order-success.jsx';
import cancelOptions from './cancelOptions.js';
import axios from '../../api/axios.js';
import userLogout from '../../hooks/userLogout.jsx';
function OrderCancelContainer({
    loading,
    setLoading,
    errors,
    setErrors,
    cancelOrder,
    order,
    footerMessage,
    setFooterMessage,
}) {
    const { isInView } = useTemplate();

    const [reason, setReason] = useState('');
    const [info, setInfo] = useState('');

    return (
        <section className="relative flex flex-row flex-nowrap gap-3 sm:px-5 sm+md:flex-col-reverse">
            <div
                className="left relative flex max-w-[580px] flex-1 flex-col flex-nowrap
"
            >
                {!loading && (
                    <div className=" relative bg-white px-8 py-6">
                        <section className="lg:w-8/12">
                            {' '}
                            <h3 className="mb-4 font-gotham text-lg tracking-wider !text-primary">
                                CANCEL YOUR ORDER
                            </h3>
                            <div className="mt-6 flex flex-col gap-y-3">
                                <OrderInfo
                                    header={'ORDER TOTAL:'}
                                    pClassName={'pl-14'}
                                    text={
                                        order?.transaction_cost?.total
                                            ? `£ ${parseFloat(
                                                  order.transaction_cost?.total
                                              ).toFixed(2)}`
                                            : ''
                                    }
                                />
                                <OrderInfo
                                    header={'ORDER REFERENCE:'}
                                    text={order?._id}
                                    headerClassName={'w-5'}
                                    pClassName={'pl-14'}
                                />

                                <OrderInfo
                                    header={'ORDER STATUS:'}
                                    pClassName={'pl-14'}
                                    text={
                                        order?.status
                                            ? `${order.status[0].toUpperCase()}${order.status?.slice(
                                                  1
                                              )}`
                                            : ''
                                    }
                                />
                            </div>
                            {<></>}
                            <h6 className="mt-2 font-gotham text-sm !text-dark-gray text-opacity-5">
                                REASON FOR CANCELLATION
                            </h6>
                            <div className="relative">
                                <select
                                    onChange={(e) => {
                                        setReason(() => e.target?.value);

                                        setErrors((prevState) => ({
                                            ...prevState,
                                            reason: null,
                                        }));
                                    }}
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
                                            <option
                                                value={value}
                                                key={index}
                                                defaultValue={reason == value}
                                            >
                                                {value}
                                            </option>
                                        );
                                    })}
                                </select>
                                {errors?.reason && (
                                    <ErrorMessagePointerUp
                                        className={'relative !top-3'}
                                        msg={errors.reason}
                                    />
                                )}
                            </div>
                            <h6 className="mt-7 font-gotham text-sm !text-gray-500 text-opacity-5">
                                ADDITIONAL INFORMATION
                            </h6>
                            <div className="relative">
                                <textarea
                                    onChange={(e) =>
                                        setInfo(() => e.target.value)
                                    }
                                    value={info}
                                    maxLength={'500'}
                                    rows={'8'}
                                    className="mt-2 w-full resize-none  !rounded-none border-2 p-2 text-s"
                                    placeholder="Optional - max 500 characters"
                                />

                                {errors?.additional_information && (
                                    <ErrorMessagePointerUp
                                        className={'relative !top-2 mb-3'}
                                        msg={errors.additional_information}
                                    />
                                )}
                            </div>
                        </section>

                        <button
                            type="button"
                            onClick={() => cancelOrder({ reason, info })}
                            className="mt-6 !bg-primary px-6 py-3 font-gotham text-white opacity-95 hover:opacity-100"
                        >
                            CANCEL ORDER
                        </button>
                    </div>
                )}
                {/* <div className='h-20 '> */}
                <MessageFooter
                    className={'!max-w-[580px]'}
                    footerMessage={footerMessage}
                    setFooterMessage={setFooterMessage}
                    isInView={isInView}
                />
                {/* </div> */}
            </div>
            {order?.items && !loading && (
                <div className="right mt-3 flex flex-[0.5] flex-col gap-y-4 ">
                    <p className="font-gotham text-lg">
                        {order.items?.length}{' '}
                        {order.items?.length > 1 ? 'ITEMS' : 'ITEM'}
                    </p>

                    {order.items.map(
                        (
                            {
                                quantity,
                                price,
                                product,
                                variation1,
                                variation2,
                            },
                            index
                        ) => {
                            return (
                                <Checkout_Item
                                    className={'!text-dark-gray'}
                                    key={index}
                                    image={product?.images?.[0]}
                                    price={price}
                                    quantity={quantity}
                                    variation1={variation1?.variation}
                                    variation2={variation2?.variation}
                                    title={product?.title}
                                    id={product?.id}
                                />
                            );
                        }
                    )}
                </div>
            )}
        </section>
    );
}

export default OrderCancelContainer;
