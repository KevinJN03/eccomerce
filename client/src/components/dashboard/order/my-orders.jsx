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

    const pagination = () => {
        if (divideBy3 > 4) {
            return (
                <>
                    {[1, 2].map((item) => {
                        return (
                            <button
                                onClick={() => setPage(() => item)}
                                className={`btn ${
                                    page == item ? 'btn-active' : ''
                                }`}
                                key={item}
                            >
                                {item}
                            </button>
                        );
                    })}
                   { (page >= 4) && <button disabled className="btn">...</button>}
                    {page > 2 && page < divideBy3 && (
                        <button
                            // onClick={() => setPage(divideBy3)}
                            className={`btn btn-active`}
                        >
                            {page}
                        </button>
                    )}
                      {(page < (divideBy3 - 1) && page >= 1)  && <button disabled className="btn">
                        ...
                    </button>}
                    <button
                        onClick={() => setPage(divideBy3)}
                        className={`btn ${
                            page == divideBy3 ? 'btn-active' : ''
                        }`}
                    >
                        {divideBy3}
                    </button>
                </>
            );
        } else {
            return(
                <>
                {Array(divideBy3)
                .fill(1)
                .map((item, idx) => {
                    console.log({item})
                    return (
                        <button
                            onClick={() => setPage(() => idx + 1)}
                            className={`btn ${
                                page == idx + 1 ? 'btn-active' : ''
                            }`}
                            key={idx + 1}
                        >
                            {idx + 1}
                        </button>
                    );
                })}
                </>
            )
        
        }
    };
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

            {ordersArray.length > 3 && <div className="pagination justify-end">
                <button
                    className="btn"
                    onClick={previousPage}
                    disabled={page == 1}
                >
                    <svg
                        width="18"
                        height="18"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M12.2574 5.59165C11.9324 5.26665 11.4074 5.26665 11.0824 5.59165L7.25742 9.41665C6.93242 9.74165 6.93242 10.2667 7.25742 10.5917L11.0824 14.4167C11.4074 14.7417 11.9324 14.7417 12.2574 14.4167C12.5824 14.0917 12.5824 13.5667 12.2574 13.2417L9.02409 9.99998L12.2574 6.76665C12.5824 6.44165 12.5741 5.90832 12.2574 5.59165Z"
                            fill="#969696"
                        />
                    </svg>
                </button>
                {pagination()}

                <button
                    className="btn"
                    onClick={nextPage}
                    disabled={page == divideBy3}
                >
                    <svg
                        width="18"
                        height="18"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M7.74375 5.2448C7.41875 5.5698 7.41875 6.0948 7.74375 6.4198L10.9771 9.65314L7.74375 12.8865C7.41875 13.2115 7.41875 13.7365 7.74375 14.0615C8.06875 14.3865 8.59375 14.3865 8.91875 14.0615L12.7437 10.2365C13.0687 9.91147 13.0687 9.38647 12.7437 9.06147L8.91875 5.23647C8.60208 4.9198 8.06875 4.9198 7.74375 5.2448Z"
                            fill="#969696"
                        />
                    </svg>
                </button>
            </div>}
        </section>
    );
}

export default My_Orders;
