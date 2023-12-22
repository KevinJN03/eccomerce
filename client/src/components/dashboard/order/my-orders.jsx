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
import CancelOrderBtn from './cancel-order.jsx';
import OrderItem from './orderItem.jsx';
function My_Orders({}) {
    const navigate = useNavigate();
    const { authDispatch } = useAuth();
    const [page, setPage] = useState(1);

    const { ordersArray } = useUserDashboardContext();
    const newOrdersArray = useMemo(
        () => ordersArray.slice(3 * page - 3, page * 3),
        [page]
    );

    const divideBy3 = Math.ceil(ordersArray.length / 3);



    return (
        <section className="my-orders w-full">
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
                            return <OrderItem order={order} key={order?._id} />;
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
