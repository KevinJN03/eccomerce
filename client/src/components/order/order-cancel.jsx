import { useEffect, useState } from 'react';
import Template from './template';
import { OrderInfo } from './order-success';
import cancelOptions from './cancelOptions';
import { useSearchParams } from 'react-router-dom';
import { ErrorMessagePointerUp } from '../Login-SignUp/errorMessage';
import defaultAxios from '../../api/axios';
import Checkout_Item from '../checkout/checkout_total/checkout-item';
function OrderCancel({}) {
    const [order, setOrder] = useState({});

    const [searchParams, setSearchParams] = useSearchParams();

    const [error, setError] = useState({});
    const [select, setSelect] = useState('');

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const { data } = await defaultAxios.get(
                    `order/${searchParams.get('order-number')}`
                );
                setOrder(() => data?.order);
            } catch (error) {
                console.error('error message', error);
            } finally {
            }
        };

        fetchOrder();
    }, []);
    return (
        <Template>
            <section className="flex flex-row flex-nowrap gap-x-3 ">
                <div className="left flex max-w-[580px] flex-1 flex-col flex-nowrap">
                    <div className=" bg-white px-8 py-6">
                        <section className="w-8/12">
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
                            <h6 className="mt-2 font-gotham text-sm !text-gray-500 text-opacity-5">
                                REASON FOR CANCELLATION
                            </h6>
                            <div className="relative">
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
                            </div>
                            <h6 className="mt-7 font-gotham text-sm !text-gray-500 text-opacity-5">
                                ADDITIONAL INFORMATION
                            </h6>
                            <textarea
                                maxLength={'500'}
                                rows={'8'}
                                className="mt-2 w-full resize-none  rounded-none border-2 p-2 text-s"
                                placeholder="Optional - max 500 characters"
                            />
                        </section>

                        <button
                            type="button"
                            className="mt-6 !bg-primary px-6 py-3 font-gotham text-white opacity-95 hover:opacity-100"
                        >
                            CANCEL ORDER
                        </button>
                    </div>
                </div>
                {order?.items && (
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
        </Template>
    );
}

export default OrderCancel;
