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

    const divideBy3 = Math.ceil(ordersArray.length / 3);

    const courierLinks = {
        'royal mail':
            'https://www.royalmail.com/track-your-item#/tracking-results/',
        ups: 'https://www.ups.com/track?track=yes&trackNums=',
        fedex: 'https://www.fedex.com/apps/fedextrack/?action=track&trackingnumber=',
        dhl: 'https://www.dhl.com/en/express/tracking.html?AWB=',
        hermes: 'https://www.evri.com/track/parcel/',
        'parcelforce worldwide':
            'https://www.parcelforce.com/track-trace?trackNumber=',
        yodel: 'https://www.yodel.co.uk/track/?parcelNumber=',
        tnt: 'https://www.fedex.com/apps/fedextrack/?action=track&trackingnumber=',
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
                            const shipDate = dayjs(order?.ship_date)?.format(
                                'DD MMM, YYYY'
                            );

                            const returnDate = dayjs(
                                order?.return_date
                            )?.format('DD MMM, YYYY');

                            const cancelDate = dayjs(
                                order?.cancel_date
                            )?.format('DD MMM, YYYY');

                            return (
                                <div className="middle bg-white p-6">
                                    <div>
                                        <p className="font-gotham text-xs font-bold tracking-wider text-dark-gray">
                                            ORDER STATUS:
                                        </p>
                                        <p className="font-gotham text-base font-bold">
                                            {order?.status == 'shipped' ? "WE'VE SENT IT" : `ORDER ${order?.status?.toUpperCase()}`}
                                        </p>
                                        {order?.status == 'cancelled' && (
                                            <p className="text-s tracking-wide">
                                                Looks like you cancelled this
                                                order.
                                            </p>
                                        )}

                                        {
                                            order?.status == 'shipped' && (
                                                <p className='text-green-800'>Estimated delivery {order?.shipping_option?.delivery_date}</p>
                                            )
                                        }
                                    </div>
                                    <section className="mt-4 flex flex-row flex-nowrap border-b-2 pb-4">
                                        <div className="product-images-container flex flex-[1.5] flex-row gap-x-3 overflow-x-auto">
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

                                        {order?.status == 'shipped' && (
                                            <a
                                                target="_blank"
                                                href={`${
                                                    courierLinks?.[
                                                        order?.courier?.toLowerCase()
                                                    ]
                                                }${order?.trackingNumber}`}
                                                className="h-fit flex-[1] border-2 py-2  text-center font-gotham tracking-wider transition-all hover:!bg-[var(--light-grey)]"
                                            >
                                                TRACK ORDER
                                            </a>
                                        )}
                                    </section>

                                    <div className="mt-3 flex flex-row items-center">
                                        <div className="left flex flex-[1.5] flex-col flex-nowrap">
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

                                            {order?.status == 'shipped' && (
                                                <p className="font-gotham text-xs tracking-wider text-dark-gray">
                                                    SHIPPED DATE:{' '}
                                                    <span className="text-sm">
                                                        {shipDate}
                                                    </span>
                                                </p>
                                            )}

                                            {order?.status == 'returned' && (
                                                <p className="font-gotham text-xs tracking-wider text-dark-gray">
                                                    RETURN DATE:{' '}
                                                    <span className="text-sm">
                                                        {returnDate}
                                                    </span>
                                                </p>
                                            )}
                                            {order?.status == 'cancelled' && (
                                                <p className="font-gotham text-xs tracking-wider text-dark-gray">
                                                    CANCEL DATE:{' '}
                                                    <span className="text-sm">
                                                        {cancelDate}
                                                    </span>
                                                </p>
                                            )}
                                        </div>

                                        <Link
                                            to={`${order?._id}`}
                                            type="button"
                                            className="h-full flex-1 border-2 py-2 text-center font-gotham tracking-wider transition-all hover:!bg-[var(--light-grey)]"
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
