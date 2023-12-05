import { Link, useLocation, useNavigate } from 'react-router-dom';
import order_icon from '../../../assets/icons/profile-icons/package.png';

import Header from '../header';
import Empty_Body from '../empty-body';
import { useEffect, useState } from 'react';
import axios from '../../../api/axios';
import logOutUser from '../../common/logoutUser';
import { useAuth } from '../../../hooks/useAuth.jsx';
import dayjs from 'dayjs';
function My_Orders({}) {
    const navigate = useNavigate();
    const { authDispatch } = useAuth();
    const [ordersArray, setOrdersArray] = useState([]);
    useEffect(() => {
        axios
            .get('user/orders')
            .then(({ data }) => {
                console.log({ data });
                setOrdersArray(() => data?.orders);
            })
            .catch((error) => {
                console.error('error while fetching user orders', error);

                if (error.response.status == 401) {
                    logOutUser({ error, navigate, authDispatch });
                }
            });
    }, []);
    return (
        <section className="my-orders">
            <Header icon={order_icon} text={'MY ORDERS'} />
            {ordersArray.length == 0 && (
                <Empty_Body
                    text={{
                        small: 'Best get shopping GLAMO pronto…',
                        big: 'YOU CURRENTLY HAVE NO ORDERS',
                        btn: 'START SHOPPING',
                    }}
                    link={'/'}
                />
            )}
            <div className="top px-8 py-4">
                <p>
                    {`Displaying ${ordersArray.length} ${
                        ordersArray.length == 1 ? 'order' : 'orders'
                    }`}
                </p>
            </div>
            {ordersArray.length > 0 && (
                <>
                    {ordersArray.map((order) => {
                        const orderDate = dayjs(order?.createdAt)?.format(
                            'DD MMM, YYYY'
                        );
                        return (
                            <section className="mb-3">
                                <div className="middle bg-white p-6">
                                    <div>
                                        <p className="text-dark-gray font-gotham text-xs font-bold tracking-wider">
                                            ORDER STATUS:
                                        </p>
                                        <p className="font-gotham text-base font-bold">
                                            ORDER {order?.status?.toUpperCase()}
                                        </p>
                                        {order?.status == 'cancelled' && (
                                            <p className="text-s tracking-wide">
                                                Looks like you cancelled this
                                                order.
                                            </p>
                                        )}
                                    </div>

                                    <div className="product-images-container mt-8 flex flex-row gap-x-3 overflow-x-hidden border-b-2 pb-4">
                                        {order.items.map((item) => {
                                            console.log(item);
                                            return (
                                                <img
                                                    className="h-28 w-[86px] object-cover object-center "
                                                    src={
                                                        item?.product
                                                            ?.images?.[0]
                                                    }
                                                    alt=""
                                                />
                                            );
                                        })}
                                    </div>

                                    <div className="mt-3 flex flex-row items-center">
                                        <div className="left flex flex-1 flex-col flex-nowrap">
                                            <p className="text-dark-gray font-gotham text-xs tracking-wider">
                                                ORDER REF.:{' '}
                                                <span className="text-sm">
                                                    {order?._id}
                                                </span>
                                            </p>

                                            {order?.status == 'received' && (
                                                <p className="text-dark-gray font-gotham text-xs tracking-wider">
                                                    ORDER DATE:{' '}
                                                    <span className="text-sm">
                                                        {orderDate}
                                                    </span>
                                                </p>
                                            )}
                                        </div>
                                        {/* <div className="right flex-1"> */}
                                        <Link
                                            to={`${order?._id}`}
                                            type="button"
                                            className="h-full flex-[0.8] border-2 py-2 text-center font-gotham tracking-wider transition-all hover:!bg-[var(--light-grey)]"
                                        >
                                            VIEW ORDER
                                        </Link>
                                        {/* </div> */}
                                    </div>
                                </div>
                            </section>
                        );
                    })}
                </>
            )}

            <div className="bottom mt-3 bg-white p-8">
                <p className="text-center">
                    {`Displaying ${ordersArray.length} ${
                        ordersArray.length == 1 ? 'order' : 'orders'
                    }`}
                </p>
            </div>
        </section>
    );
}

export default My_Orders;
