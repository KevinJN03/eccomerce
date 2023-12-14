import { Link, useLocation, useNavigate } from 'react-router-dom';
import order_icon from '../../../assets/icons/profile-icons/package.png';

import Header from '../header';
import Empty_Body from '../empty-body';
import { useEffect, useMemo, useState } from 'react';
import axios from '../../../api/axios';
import logOutUser from '../../common/logoutUser';
import { useAuth } from '../../../hooks/useAuth.jsx';
import dayjs from 'dayjs';
import { useUserDashboardContext } from '../../../context/userContext.jsx';
import Pagination from '../pagination/pagination.jsx';
function My_Orders({}) {
    const navigate = useNavigate();
    const { authDispatch } = useAuth();
    const [page, setPage] = useState(1);

    const { ordersArray } = useUserDashboardContext();
    const newOrdersArray = useMemo(
        () => ordersArray.slice(3 * page - 3, page * 3),
        [page]
    );

    const nextPage = () => {
        console.log('next');

        if (page == Math.ceil(ordersArray.length / 3)) {
            return;
        }
        setPage((prevPage) => prevPage + 1);
    };

    const previousPage = () => {
        console.log('prev');
        if (page == 1) {
            return;
        }
        setPage((prevPage) => prevPage - 1);
    };

    const divideBy3 = Math.ceil(ordersArray.length / 3);

    return (
        <section className="my-orders">
            <Header icon={order_icon} text={'MY ORDERS'} />
            {newOrdersArray.length == 0 && (
                <Empty_Body
                    text={{
                        small: 'Best get shopping GLAMO pronto…',
                        big: 'YOU CURRENTLY HAVE NO ORDERS',
                        btn: 'START SHOPPING',
                    }}
                    link={'/'}
                />
            )}

            {newOrdersArray.length > 0 && (
                <section className="mb-3">
                    <div className="top px-8 py-4">
                        <p>
                            {`Displaying ${newOrdersArray.length} ${
                                newOrdersArray.length == 1 ? 'order' : 'orders'
                            }`}
                        </p>
                    </div>
                    <section className="flex flex-col gap-y-3">
                        {newOrdersArray.map((order) => {
                            const orderDate = dayjs(order?.createdAt)?.format(
                                'DD MMM, YYYY'
                            );
                            return (
                                <div className="middle bg-white p-6">
                                    <div>
                                        <p className="font-gotham text-xs font-bold tracking-wider text-dark-gray">
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
                                            <p className="font-gotham text-xs tracking-wider text-dark-gray">
                                                ORDER REF.:{' '}
                                                <span className="text-sm">
                                                    {order?._id}
                                                </span>
                                            </p>

                                            {order?.status == 'received' && (
                                                <p className="font-gotham text-xs tracking-wider text-dark-gray">
                                                    ORDER DATE:{' '}
                                                    <span className="text-sm">
                                                        {orderDate}
                                                    </span>
                                                </p>
                                            )}
                                        </div>

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
                            );
                        })}
                    </section>

                    <div className="bottom mt-3 bg-white p-8">
                        <p className="text-center">
                            {`Displaying ${newOrdersArray.length} ${
                                newOrdersArray.length == 1 ? 'order' : 'orders'
                            }`}
                        </p>
                    </div>
                </section>
            )}

            {ordersArray.length > 3 && (
                <div className="pagination justify-end">
                    <Pagination
                        divideBy={divideBy3}
                        setPage={setPage}
                        page={page}
                    />
                </div>
            )}
        </section>
    );
}

export default My_Orders;
