import { useEffect, useState } from 'react';
import { OrderInfo } from './order-success';
import Template from './template';
import SocialIcons from './social-icons';
import { Link, useSearchParams } from 'react-router-dom';
import axios from '../../api/axios';

function OrderCancelled({}) {
    const [order, setOrder] = useState({});
    const [searchParams, setSearchParams] = useSearchParams();
    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const { data } = await axios.get(
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
            <section className='w-full'>
                <section className="flex w-full flex-nowrap gap-x-3 sm+md:flex-col lg:flex-row ">
                    <div className="left flex w-full flex-1 flex-col flex-nowrap">
                        <div className=" bg-white px-8 py-6 sm+md:mx-3">
                            <h3 className="mb-4 font-gotham text-lg tracking-wider !text-primary">
                                CANCEL YOUR ORDER
                            </h3>
                            <p>
                                Your order cancellation request has been
                                recieved. Cancellation will be confirmed by
                                email to {order?.email}
                            </p>
                            <section className="mb-6 mt-6 flex flex-col gap-y-2 lg:w-8/12">
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
                            </section>
                        </div>
                    </div>

                    <div className="flex-[0.5]">
                        <SocialIcons />
                    </div>
                </section>

                <div className="mt-7 flex w-full sm:flex-col  flex-row flex-nowrap  gap-4 sm+md:px-2 sm+md:self-center lg:justify-end lg:pl-20">
                    <a
                        href={'/'}
                        type="button"
                        className="flex-1 !bg-primary border-primary border-2 py-3 text-center  font-gotham text-sm tracking-wide text-white transition-all hover:!bg-black hover:border-black"
                    >
                        CONTINUE SHOPPING
                    </a>
                    <Link
                        to={'/my-account'}
                        type="button"
                        className="flex-1 border-2 bg-white py-3 text-center font-gotham text-sm tracking-wide transition-all hover:bg-white/50"
                    >
                        MY ACCOUNT
                    </Link>
                </div>
            </section>
        </Template>
    );
}

export default OrderCancelled;
