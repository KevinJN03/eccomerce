import { useAdminOrderContext } from '../../../../context/adminOrderContext';
import countryLookup from 'country-code-lookup';
import { useState } from 'react';

import dayjs from 'dayjs';
import AddressContainer from './addressContainer';
import Receipt from './reciept';
import {
    ArrowDropDownSharp,
    CheckRounded,
    PublishedWithChangesRounded,
    RedeemSharp,
} from '@mui/icons-material';
import PrivateNote from './privateNote';
import UserInfo from './userInfo';
import { motion } from 'framer-motion';
import Actions from './action';
import _ from 'lodash';
import BubbleButton from '../../../buttons/bubbleButton';

function Label({ setShowActions }) {
    return (
        <motion.button
            onClick={() => setShowActions((prevState) => !prevState)}
            type="button"
            className="flex flex-row flex-nowrap items-center rounded-full border-2 border-black px-3 py-2  font-semibold transition-all hover:scale-x-105 hover:shadow-3xl"
        >
            <p className="whitespace-nowrap text-xs">More actions</p>
            <ArrowDropDownSharp />
        </motion.button>
    );
}
function DrawerContainer() {
    const { orderInfo, status, addToPackage } = useAdminOrderContext();

    const [country, setCountry] = useState(
        () =>
            countryLookup.byIso(orderInfo.shipping_address.address?.country)
                ?.country
    );

    const [estimatedDate, setEstimateDate] = useState(() => {
        const startDates = [];

        const endDates = [];
        const itemsByProfile = _.get(orderInfo, 'itemsByProfile');
        _.forEach(itemsByProfile, ({ shippingInfo }) => {
            startDates.push(dayjs(shippingInfo.startDate));
            endDates.push(dayjs(shippingInfo.endDate));
        });

        const formatString = 'DD MMM';
        const startDate = dayjs.min(startDates);
        const endDate = dayjs.max(endDates);
        if (startDate.get('month') == endDate.get('month')) {
            return `${startDate.format('DD')}-${endDate.format('DD MMM')}`;
        }

        return `${startDate.format(formatString)}-${endDate.format(formatString)}`;
    });
    const [showActions, setShowActions] = useState(false);

    return (
        <div className=" relative flex w-full flex-row gap-1 ">
            <div className="min-h-screen w-full !bg-white p-8">
                <header className="flex flex-row justify-between">
                    <div className="left">
                        <h3 className="text-xl font-semibold ">
                            Order from {orderInfo.shipping_address?.name}
                        </h3>
                        <a
                            href={`/admin/orders/${status}?searchText=${orderInfo?._id}&orderId=${orderInfo?._id}`}
                            target="_blank"
                            className="cursor-pointer text-xs underline ring-offset-1"
                        >
                            #{orderInfo?._id}
                        </a>
                        <p className="text-xs">
                            {orderInfo?.items?.length} item, £
                            {parseFloat(
                                orderInfo.transaction_cost?.total
                            )?.toFixed(2)}
                        </p>
                    </div>
                    <div className="right">
                        <p
                            className={`text-sm font-semibold ${orderInfo.status == 'cancelled' ? 'text-red-700' : 'text-black'}`}
                        >
                            {_.upperFirst(orderInfo.status)}
                        </p>
                        <p className="text-xs">
                            {`Ordered ${dayjs(orderInfo?.createdAt).format(
                                'HH:mm, ddd, DD MMM, YYYY'
                            )}`}
                            <p className="text-xs">
                                Deliver to{' '}
                                {`${orderInfo.shipping_address.address?.city}, ${country}`}
                            </p>
                        </p>
                    </div>
                </header>

                <div className="mt-2 flex flex-row gap-5">
                    {orderInfo?.status == 'received' ? (
                        <BubbleButton
                            className={'!py-0 px-2.5'}
                            handleClick={() =>
                                addToPackage({ orderId: orderInfo._id, mark_as_completed: true })
                            }
                        >
                            <div className="flex flex-nowrap items-center justify-center gap-3">
                                <PublishedWithChangesRounded />
                                <p className="font-medium">Mark as Complete</p>
                            </div>
                        </BubbleButton>
                    ) : (
                        <span className="flex flex-row flex-nowrap items-center gap-3">
                            <CheckRounded />
                            <p className="text-base font-semibold">Completed</p>
                        </span>
                    )}
                    <div className="relative flex flex-col">
                        <section className="relative">
                            <motion.button
                                onClick={() =>
                                    setShowActions((prevState) => !prevState)
                                }
                                type="button"
                                className="group flex flex-row flex-nowrap items-center rounded-full border-2 border-transparent px-3 py-2  font-semibold transition-all hover:shadow-normal"
                            >
                                <span className="z-[2] flex flex-nowrap items-center">
                                    <p className="whitespace-nowrap text-sm">
                                        More actions
                                    </p>
                                    <ArrowDropDownSharp />
                                </span>

                                <div className="absolute left-0 top-0 h-full  w-full origin-center rounded-inherit border-2 border-black bg-white  transition-all group-hover:scale-[1.03]"></div>
                            </motion.button>

                            {showActions && (
                                <button
                                    onClick={() =>
                                        setShowActions(
                                            (prevState) => !prevState
                                        )
                                    }
                                    className="  absolute left-0 top-0 z-[3] flex flex-row flex-nowrap items-center border-2 border-transparent  px-3 py-2 font-semibold"
                                >
                                    <p className="whitespace-nowrap text-sm font-semibold">
                                        More actions
                                    </p>
                                    <ArrowDropDownSharp />
                                </button>
                            )}
                            <Actions
                                {...{
                                    showActions,
                                    setShowActions,
                                    orderId: orderInfo?._id,
                                    order: orderInfo,
                                }}
                            />
                        </section>
                    </div>
                </div>

                <UserInfo />

                <PrivateNote />

                <div className="mb-3">
                    <p
                        className={`text-base font-semibold ${orderInfo.status == 'cancelled' ? 'text-red-700' : 'text-black'}`}
                    >
                        {_.upperFirst(orderInfo.status)}
                    </p>
                    <p className="text-xs">
                        Estimated delivery: {estimatedDate}
                    </p>
                </div>
                <AddressContainer country={country} />
                {orderInfo?.mark_as_gift && (
                    <div className="mt-4 flex flex-col gap-3">
                        <h3 className="text-base font-semibold">
                            Gift Details
                        </h3>

                        <div className="flex w-full flex-row flex-nowrap items-center gap-2 rounded border px-3 pb-7 pt-4">
                            <RedeemSharp
                                className="!fill-green-800"
                                fontSize="small"
                            />
                            <p className="text-xs">Marked as gift</p>
                        </div>
                    </div>
                )}
                <Receipt />
            </div>
        </div>
    );
}

export default DrawerContainer;
