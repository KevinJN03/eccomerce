import {
    AccountBalanceRounded,
    ArrowBackRounded,
    ArrowForwardRounded,
    CreditCardRounded,
    CurrencyExchangeRounded,
    SyncAltRounded,
} from '@mui/icons-material';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Pagination, PaginationItem } from '@mui/material';
import CollapseExpandIcon from './collapseExpandIcon';
function ActivityTable({ activities, setLoading, page, setPage }) {
    const icons = {
        payout: <SyncAltRounded fontSize="large" />,
        bank: <AccountBalanceRounded fontSize="large" />,
        card: <CreditCardRounded fontSize="large" />,
        payment_refund: <CurrencyExchangeRounded fontSize="large" />,
    };
    const getSlicedActivities = (value) => {
        const startSlice = (value - 1) * 10;
        const endSlice = value * 10;
        const slicedActivities = activities?.slice(startSlice, endSlice) || [];

        return slicedActivities;
    };
    const [pageActivities, setPageActivities] = useState(() =>
        getSlicedActivities(page)
    );
    const getVariants = (idx) => {
        return {
            initial: {
                marginLeft: idx == 0 ? '0rem' : '-2rem',
            },
            whileHover: {
                marginLeft: idx == 0 ? '0rem' : '-0.5rem',
                transition: {
                    duration: 0.5,
                },
            },
            transition: {
                duration: 0.5,
            },
        };
    };

    return (
        <section className="h-full w-full">
            {activities?.length <= 0 ? (
                <div className="mt-12">
                    <p className="text-sm">No recent activity</p>
                </div>
            ) : (
                <>
                    <div className="flex w-full overflow-x-auto">
                        <table className="table">
                            <colgroup>
                                <col style={{ width: '15%' }} />
                                <col style={{ width: '10%' }} />
                                <col style={{ width: '15%' }} />
                                <col style={{ width: '30%' }} />
                                <col style={{ width: '10%' }} />
                                <col style={{ width: '10%' }} />
                                <col style={{ width: '10%' }} />
                                {/* <col style={{ width: '10%' }} /> */}
                            </colgroup>
                            <thead>
                                <tr>
                                    <th className=""></th>
                                    <th className="!font-semibold">Date</th>
                                    <th className="!font-semibold">Type</th>
                                    <th className="!font-semibold">
                                        Description
                                    </th>
                                    <th className="!font-semibold">Amount</th>
                                    <th className="!w-full   !font-semibold">
                                        Fee and tax{' '}
                                    </th>
                                    <th className="!font-semibold">Net</th>
                                    {/* <th className="!font-semibold">Balance</th> */}
                                </tr>
                            </thead>
                            <tbody>
                                {pageActivities.map(
                                    ({
                                        id,
                                        created,
                                        description,
                                        amount,
                                        fee,
                                        type,
                                        reporting_category,
                                        order,
                                        net,
                                        sourceObject,
                                    }) => {
                                        return (
                                            <tr key={id}>
                                                <th className="">
                                                    <section className="!w-full">
                                                        {order ? (
                                                            <CollapseExpandIcon
                                                                array={[
                                                                    ...order.items,
                                                                    // ...order.items, ...order.items,
                                                                ]}
                                                            />
                                                        ) : (
                                                            // <div className=" flex !w-32 flex-row flex-nowrap overflow-hidden">
                                                            //     {[
                                                            //         ...order.items,
                                                            //     ]?.map(
                                                            //         (
                                                            //             {
                                                            //                 images,
                                                            //                 ...item
                                                            //             },
                                                            //             idx
                                                            //         ) => {
                                                            //             return (
                                                            //                 <motion.img
                                                            //                     variants={getVariants(
                                                            //                         idx
                                                            //                     )}
                                                            //                     initial={
                                                            //                         'initial'
                                                            //                     }
                                                            //                     whileHover={
                                                            //                         'whileHover'
                                                            //                     }
                                                            //                     transition={
                                                            //                         'transition'
                                                            //                     }
                                                            //                     key={`tester-${idx}`}
                                                            //                     className={`inset-0 h-14 w-14 min-w-14 cursor-pointer ${idx == 0 ? 'rounded-lg' : 'rounded-r-lg'} object-cover`}
                                                            //                     src={
                                                            //                         images[0]
                                                            //                     }
                                                            //                     style={{
                                                            //                         zIndex:
                                                            //                             order
                                                            //                                 .items
                                                            //                                 ?.length +
                                                            //                             1 -
                                                            //                             idx,
                                                            //                     }}
                                                            //                 />
                                                            //             );
                                                            //         }
                                                            //     )}

                                                            //     {order?.items
                                                            //         ?.length >
                                                            //         2 && (
                                                            //         <motion.div
                                                            //             variants={getVariants(
                                                            //                 1
                                                            //             )}
                                                            //             initial={
                                                            //                 'initial'
                                                            //             }
                                                            //             whileHover={
                                                            //                 'whileHover'
                                                            //             }
                                                            //             transition={
                                                            //                 'transition'
                                                            //             }
                                                            //             style={{
                                                            //                 zIndex: 1,
                                                            //             }}
                                                            //             className=" inset-0 flex h-14 w-14 cursor-pointer items-center justify-center rounded-r-lg bg-black/50 "
                                                            //         >
                                                            //             <p className="text-sm text-white">
                                                            //                 {`+${
                                                            //                     order
                                                            //                         ?.items
                                                            //                         ?.length -
                                                            //                     2
                                                            //                 }`}
                                                            //             </p>
                                                            //         </motion.div>
                                                            //     )}
                                                            // </div>
                                                            <div className="flex h-14 w-14 items-center justify-center">
                                                                {icons[type] ||
                                                                    icons[
                                                                        'bank'
                                                                    ]}
                                                            </div>
                                                        )}
                                                    </section>
                                                </th>
                                                <td className="">
                                                    {dayjs
                                                        .unix(created)
                                                        .format('DD MMM, YYYY')}
                                                </td>
                                                <td className=" capitalize">
                                                    {type.replaceAll('_', ' ')}
                                                </td>
                                                <td className="h-full w-full max-w-32 whitespace-normal text-wrap break-all">
                                                    <p className="h-full w-full whitespace-normal text-wrap break-all  !text-base">
                                                        {type == 'payment' &&
                                                        order ? (
                                                            <span>
                                                                Payment for{' '}
                                                                <Link
                                                                    to={`/admin/orders/complete?orderId=${order?._id}`}
                                                                    className="cursor-pointer underline decoration-[1.5px] underline-offset-2"
                                                                >
                                                                    Order #
                                                                    {order._id}
                                                                </Link>
                                                            </span>
                                                        ) : type ==
                                                              'payment_refund' &&
                                                          order ? (
                                                            <span>
                                                                Refund to buyer
                                                                for{' '}
                                                                <Link
                                                                    to={`/admin/orders/complete?orderId=${order?._id}`}
                                                                    className="cursor-pointer underline decoration-[1.5px] underline-offset-2"
                                                                >
                                                                    Order #
                                                                    {order._id}
                                                                </Link>
                                                            </span>
                                                        ) : type == 'payout' ? (
                                                            `£${parseFloat(Math.abs(amount) / 100).toFixed(2)} sent to your ${_.replace(sourceObject?.type, /_/g, ' ')}`
                                                        ) : (
                                                            description
                                                        )}
                                                    </p>
                                                </td>
                                                <td
                                                    className={`${amount < 0 ? '!text-red-800 ' : ''}`}
                                                >
                                                    {parseFloat(
                                                        amount / 100
                                                    ).toLocaleString('en-GB', {
                                                        style: 'currency',
                                                        currency: 'GBP',
                                                    })}
                                                </td>
                                                <td
                                                    className={`${fee < 0 ? '!text-red-800' : ''} !text-right`}
                                                >
                                                    {parseFloat(
                                                        fee / 100
                                                    ).toLocaleString('en-GB', {
                                                        style: 'currency',
                                                        currency: 'GBP',
                                                    })}
                                                </td>
                                                <td
                                                    className={`${net < 0 ? '!text-red-800' : ''}`}
                                                >
                                                    {parseFloat(
                                                        net / 100
                                                    ).toLocaleString('en-GB', {
                                                        style: 'currency',
                                                        currency: 'GBP',
                                                    })}
                                                </td>
                                            </tr>
                                        );
                                    }
                                )}
                            </tbody>
                        </table>
                    </div>
                    <section className="mt-6 flex w-full items-center justify-center">
                        <Pagination
                            page={page}
                            size="large"
                            // variant="outlined"
                            // color="primary"
                            renderItem={(item) => (
                                <PaginationItem
                                    slots={{
                                        previous: ArrowBackRounded,
                                        next: ArrowForwardRounded,
                                    }}
                                    sx={{
                                        width: '50px',
                                        height: '50px',
                                        bgcolor: '#eee',
                                        transition: 'all 0.2s ease-in-out',
                                        borderRadius: '100%',
                                        textAlign: 'center',
                                        cursor: 'pointer',

                                        '& .MuiPaginationItem-text': {
                                            fontSize: 'inherit',
                                        },
                                        '&.Mui-selected': {
                                            border: '2px solid black',
                                        },

                                        '&:hover': {
                                            // transform: 'scale(1.1)',
                                            //                                    backgroundColor: 'lightblue',
                                        },
                                    }}
                                    {...item}
                                />
                            )}
                            count={Math.ceil(activities?.length / 10)}
                            defaultPage={page}
                            onChange={(e, value) => {
                                if (value != page) {
                                    setLoading(() => true);

                                    const slicedActivities =
                                        getSlicedActivities(value);

                                    setPageActivities(() => slicedActivities);

                                    setPage(() => value);

                                    setTimeout(() => {
                                        setLoading(() => false);
                                    }, 1000);
                                }
                            }}
                        />
                    </section>
                </>
            )}
        </section>
    );
}

export default ActivityTable;
