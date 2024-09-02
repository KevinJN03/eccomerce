import { useState } from 'react';
import OrderItem from './orderItem';

import { ClickAwayListener } from '@mui/material';
import { v4 as uuidV4 } from 'uuid';
import Drawer from '../drawerContent/drawerContainer';
import OrderList from './orderList';
import { useAdminOrderContext } from '../../../../context/adminOrderContext';
import GLoader from '../../../Login-SignUp/socialRegister/gloader';

import boxIcon from '../../../../assets/icons/magic-box.png';
import _ from 'lodash';
import { CloseRounded } from '@mui/icons-material';
import { getName } from 'country-list';
import { AnimatePresence, motion } from 'framer-motion';
function Containers({ ordersByDate }) {
    const {
        setFilterList,
        filterList,
        status,
        defaultFilterList,
        setLoading,
        ordersData,
        searchParams,
        setSearchParams,
    } = useAdminOrderContext();
    return (
        <section className="mb-10 flex w-full flex-col gap-4">
            {ordersData?.ordersByDate?.length >= 1 ? (
                <>
                    {ordersData?.ordersByDate?.map((item, idx) => {
                        return (
                            <OrderList
                                orderObj={item}
                                key={item?._id}
                                orderListIndex={idx}
                            />
                        );
                    })}
                </>
            ) : (
                <div className="mt-10 flex w-full flex-col items-center justify-center gap-1 ">
                    <div className="mb-2 rounded-full bg-light-grey p-5">
                        <img
                            src={boxIcon}
                            className="h-20 w-20"
                            alt="open-delivered-box"
                        />
                    </div>

                    <p className="text-center text-base font-semibold text-black/80">
                        No orders here right now
                    </p>

                    <div>
                        {!_.isEqual(
                            filterList?.[status],
                            defaultFilterList?.[status]
                        ) && (
                            <section className="flex flex-col gap-3">
                                <p className="text-center text-sm">
                                    Try removing some filters
                                </p>

                                <div className="flex w-full flex-row flex-nowrap justify-center gap-2">
                                    {_.toPairs(filterList?.[status]).map(
                                        ([key, value], idx) => {
                                            return (
                                                <>
                                                    {!_.isEqual(
                                                        filterList?.[status]?.[
                                                            key
                                                        ],
                                                        defaultFilterList?.[
                                                            status
                                                        ]?.[key]
                                                    ) &&
                                                        key != 'sort_by' && (
                                                            <div className="flex flex-row  items-center border border-dark-gray">
                                                                <p className="px-3 py-2">
                                                                    {_.upperFirst(
                                                                        _.isBoolean(
                                                                            value
                                                                        )
                                                                            ? key
                                                                            : getName(
                                                                                  value
                                                                              ) ||
                                                                                  value
                                                                    ).replaceAll(
                                                                        '_',
                                                                        ' '
                                                                    )}
                                                                </p>

                                                                <button
                                                                    type="button"
                                                                    className="border-l border-dark-gray px-2 py-2 "
                                                                    onClick={() => {
                                                                        setLoading(
                                                                            () =>
                                                                                true
                                                                        );
                                                                        searchParams.set(
                                                                            key,
                                                                            _.get(
                                                                                defaultFilterList,
                                                                                [
                                                                                    status,
                                                                                    key,
                                                                                ]
                                                                            )
                                                                        );
                                                                        setSearchParams(
                                                                            searchParams
                                                                        );

                                                                        setFilterList(
                                                                            (
                                                                                prevState
                                                                            ) => ({
                                                                                ...prevState,
                                                                                [status]:
                                                                                    {
                                                                                        ...prevState?.[
                                                                                            status
                                                                                        ],
                                                                                        [key]: _.get(
                                                                                            defaultFilterList,
                                                                                            [
                                                                                                status,
                                                                                                key,
                                                                                            ]
                                                                                        ),
                                                                                    },
                                                                            })
                                                                        );
                                                                    }}
                                                                >
                                                                    <CloseRounded />
                                                                </button>
                                                            </div>
                                                        )}
                                                </>
                                            );
                                        }
                                    )}
                                </div>
                            </section>
                        )}
                    </div>
                </div>
            )}
        </section>
    );
}

export default Containers;
