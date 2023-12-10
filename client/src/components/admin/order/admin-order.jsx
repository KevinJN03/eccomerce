import { useEffect, useState } from 'react';
import Datatable from '../components/users/datatable/datatable';
import axios, { adminAxios } from '../../../api/axios';
import dayjs from 'dayjs';
import { v4 as uuidv4 } from 'uuid';
function AdminOrder({}) {
    const [orders, setOrders] = useState({});

    const [loading, setLoading] = useState(false);
    const column = [
        { field: '_id', headerName: 'TRANSACTION ID', width: 200 },

        {
            field:'items',
            headerName: 'PRODUCT',
            width: 150,
            renderCell: (param) => {
                return (
                    <div className='flex flex-row'>
                        {param?.row?.items?.map((item) => {
                            return (
                                <span
                                    key={uuidv4()}
                                    className="tooltip tooltip-bottom"
                                    data-tooltip={'hjk'}
                                >
                                    <img
                                        src={item?.product?.images?.[0]}
                                        alt=""
                                        className="h-10 w-10 rounded-full object-cover"
                                    />
                                </span>
                            );
                        })}
                    </div>
                );
            },
        },
        {
            field: 'shipping_address.name',
            headerName: 'CUSTOMER',
            width: 120,
            renderCell: (param) => {
                return <p>{param?.row?.shipping_address?.name}</p>;
            },
        },
        {
            field: 'createdAt',
            headerName: 'DATE',
            width: 150,
            renderCell: (param) => {
                return (
                    <p>{dayjs(param?.row?.createdAt).format('DD MMM, YYYY')}</p>
                );
            },
        },
        {
            headerName: 'AMOUNT',
            width: 100,
            renderCell: (param) => {
                return (
                    <p>£ {param?.row?.transaction_cost?.total?.toFixed(2)}</p>
                );
            },
        },
        { field: 'paymentType', headerName: 'PAYMENT', width: 100 },
        { field: 'status', headerName: 'STATUS', width: 100, renderCell: (param )=> {
            return (<p className={`status ${param?.row?.status}`}>
                {param?.row?.status[0].toUpperCase() + param?.row?.status?.substring(1)}
            </p>
                )
        } },
    ];

    useEffect(() => {
        adminAxios('/orders')
            .then(({ data }) => {
                setOrders(() => data?.orders);
            })
            .catch((error) => {
                console.error('error while getting orders', error);
            });
    }, []);
    return (
        <section className="">
            {Object.keys(orders).length > 0 && (
                <Datatable
                    type={'Order'}
                    column={column}
                    row={orders}
                    loading={loading}
                    setLoading={setLoading}
                />
            )}
        </section>
    );
}

export default AdminOrder;
