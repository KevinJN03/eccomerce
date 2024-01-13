import secure_icon from '../../../../assets/icons/secure-document.png';

import { useAdminContext } from '../../../../context/adminContext';
import { useAdminOrderContext } from '../../../../context/adminOrder';
import countryLookup from 'country-code-lookup';
// import CloseSharpIcon from '@mui/icons-material/CloseSharp';
import { useState } from 'react';
import dayjs from 'dayjs';
import AddressContainer from './addressContainer';
import Receipt from './reciept';
import {
    CloseSharp,
    PersonOutlineTwoTone,
    AddRounded,
    ArrowDropDownSharp,
    CheckRounded,
    PrintSharp,
    Inventory2Sharp,
    RedeemSharp,
} from '@mui/icons-material';
import PrivateNote from './privateNote';
import UserInfo from './userInfo';
import { AnimatePresence, motion } from 'framer-motion';
import containerVariants from '../containerVariants';
import { ClickAwayListener } from '@mui/material';
import { adminAxios } from '../../../../api/axios';

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
    const {
        orderInfo,
        setOpenDrawer,
        setSearchText,
        setSearchingOrder,
        setSearchResult,
    } = useAdminOrderContext();

    const { logoutUser } = useAdminContext();
    const { setModalCheck, adminOrderModalContentDispatch } =
        useAdminOrderContext();
    const [country, setCountry] = useState(
        () =>
            countryLookup.byIso(orderInfo.shipping_address.address?.country)
                ?.country
    );

    const [showActions, setShowActions] = useState(false);

    const printOrder = () => {
        console.log('clicked');
        adminOrderModalContentDispatch({
            type: 'printOrder',
            orders: [orderInfo?._id],
        });
        setModalCheck(true);
        setShowActions(false);
    };

    const orderHistory = async () => {
        try {
            setOpenDrawer(() => false);
            setSearchingOrder(() => true);
            setSearchText(() => orderInfo.customer?._id);

            const { data } = await adminAxios('searchOrder', {
                searchText: orderInfo.customer?._id,
            });

            setSearchResult(() => data.searchResult);
        } catch (error) {
            logoutUser({ error });
        }
    };
    return (
        <div className=" relative flex w-full flex-row gap-1 ">
            <div className="relative h-fit w-12 bg-transparent">
                <div
                    onClick={() => setOpenDrawer(false)}
                    className="fixed top-2 flex cursor-pointer  items-center justify-center rounded-md border-2 border-white p-2"
                >
                    <CloseSharp className="!fill-primary/80" />
                </div>
            </div>
            <div className="!h-full w-full !bg-white p-8">
                <header className="flex flex-row justify-between">
                    <div className="left">
                        <h3 className="text-xl font-semibold ">
                            Order from {orderInfo.shipping_address?.name}
                        </h3>
                        <p className="text-xxs underline ring-offset-1">
                            #{orderInfo?._id}
                        </p>
                        <p className="text-xxs">
                            {orderInfo?.items?.length} item, £
                            {parseFloat(
                                orderInfo.transaction_cost?.total
                            )?.toFixed(2)}
                        </p>
                    </div>
                    <div className="right">
                        <p className="text-sm font-semibold">Pre-transit</p>
                        <p className="text-xxs">
                            {`Ordered ${dayjs(orderInfo?.createdAt).format(
                                'HH:mm, ddd, DD MMM, YYYY'
                            )}`}
                            <p className="text-xxs">
                                Deliver to{' '}
                                {`${orderInfo.shipping_address.address?.city}, ${country}`}
                            </p>
                        </p>
                    </div>
                </header>

                <div className="flex flex-row gap-5">
                    <span className="flex flex-row flex-nowrap items-center gap-3">
                        <CheckRounded />
                        <p className="text-s font-semibold">Completed</p>
                    </span>
                    <div className="relative flex flex-col">
                        <section className="relative">
                            <AnimatePresence>
                                <Label setShowActions={setShowActions} />

                                {showActions && (
                                    <ClickAwayListener
                                        onClickAway={() => {
                                            if (showActions) {
                                                setShowActions(() => false);
                                            }
                                        }}
                                    >
                                        <motion.div
                                            key={'more-action'}
                                            variants={containerVariants}
                                            className="absolute left-0 top-[0px] z-[1] flex w-fit flex-col rounded-lg border-transparent bg-white pt-[0.6rem]  shadow-3xl"
                                        >
                                            <button
                                                onClick={() =>
                                                    setShowActions(
                                                        (prevState) =>
                                                            !prevState
                                                    )
                                                }
                                                className="flex flex-row flex-nowrap items-center  pl-[0.875rem] font-semibold"
                                            >
                                                <p className="whitespace-nowrap text-xs font-semibold">
                                                    More actions
                                                </p>
                                                <ArrowDropDownSharp />
                                            </button>

                                            {[
                                                {
                                                    text: 'Print',
                                                    icon: (
                                                        <PrintSharp fontSize="small" />
                                                    ),
                                                    handleClick: printOrder,
                                                },
                                                {
                                                    text: 'Add a package',
                                                    icon: (
                                                        <Inventory2Sharp fontSize="small" />
                                                    ),
                                                },
                                                {
                                                    text: 'Mark as gift',
                                                    icon: (
                                                        <RedeemSharp fontSize="small" />
                                                    ),
                                                },
                                            ].map(
                                                (
                                                    { text, icon, handleClick },
                                                    idx
                                                ) => {
                                                    return (
                                                        <button
                                                            key={text}
                                                            onClick={
                                                                handleClick
                                                            }
                                                            className={`flex cursor-pointer flex-row flex-nowrap items-center gap-3 py-2 pl-3 pr-6 hover:bg-light-grey  ${
                                                                idx == 2
                                                                    ? 'rounded-b-inherit'
                                                                    : ''
                                                            }`}
                                                        >
                                                            <span>{icon}</span>
                                                            <p className=" whitespace-nowrap">
                                                                {' '}
                                                                {text}
                                                            </p>
                                                        </button>
                                                    );
                                                }
                                            )}
                                        </motion.div>
                                    </ClickAwayListener>
                                )}
                            </AnimatePresence>
                        </section>
                    </div>
                </div>

                <UserInfo />

                <PrivateNote />

                <div className="mb-3">
                    <p className="text-sm font-semibold">Pre-transit</p>
                    <p className="text-xxs">
                        Estimated delivery: 27 Dec-18 Jan
                    </p>
                </div>
                <AddressContainer country={country} />
                <Receipt />
            </div>
        </div>
    );
}

export default DrawerContainer;
