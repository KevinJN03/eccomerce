import {
    ArrowDropDownSharp,
    PersonOutlineTwoTone,
    NorthEastRounded,
} from '@mui/icons-material';
import { useAdminOrderContext } from '../../../../context/adminOrderContext';
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import variant from '../home/variant';
import { ClickAwayListener } from '@mui/material';
import { useAdminContext } from '../../../../context/adminContext';
import { adminAxios } from '../../../../api/axios.js';
function UserInfo({}) {
    const {
        orderInfo,
        setOpenDrawer,

        setSearchingOrder,
        setSearchText,
        searchForOrder,
    } = useAdminOrderContext();
    const { logoutUser } = useAdminContext();
    const [show, setShow] = useState(false);

    const toggleShow = () => {
        setShow((prevState) => !prevState);
    };

    const onClickAway = () => {
        setShow(() => false);
    };

    const orderHistory = async () => {
        // setSearchText(() => orderInfo.customer?._id);
        searchForOrder(orderInfo.customer?._id);
        setOpenDrawer(() => false);
        // try {
        //     const { data } = await adminAxios.post('searchOrder', {
        //         searchText: orderInfo.customer?._id,
        //     });
        //     setSearchText(() => orderInfo.customer?._id);
        // } catch (error) {
        //     console.error('error while fetching order history: ', error);
        //     logoutUser({ error });
        // } finally {
        //     setOpenDrawer(() => false);
        //     setSearchingOrder(() => true);
        // }
    };
    return (
        <div className="my-3 flex flex-row gap-3 rounded-sm border-[1px]  p-4">
            <div className="h-fit w-fit rounded-full bg-dark-gray/20 p-2">
                <PersonOutlineTwoTone />
            </div>
            <section className="relative">
                <div className="flex flex-row items-center gap-3">
                    <button
                        onClick={toggleShow}
                        className="flex flex-row items-center gap-[2px]"
                    >
                        <p className="text-xs underline underline-offset-1">
                            {`${orderInfo.customer?.firstName} ${orderInfo.customer?.lastName}`}
                        </p>
                        <ArrowDropDownSharp className="!text-xl" />
                    </button>
                    <p className="align-baseline !text-xs underline underline-offset-1">
                        {orderInfo.customer?._id}
                    </p>
                </div>
                <AnimatePresence>
                    {show && (
                        <ClickAwayListener onClickAway={onClickAway}>
                            <motion.div
                                // ref={clickAwayRef}
                                variants={variant}
                                animate={'animate'}
                                initial={'initial'}
                                exit={'exit'}
                                className="absolute top-5 flex flex-col rounded-sm border-[1px] bg-white py-2"
                            >
                                <div
                                    onClick={toggleShow}
                                    className="flex flex-row flex-nowrap items-center gap-1 px-5 py-2 hover:bg-dark-gray/20"
                                >
                                    <p className="text-s">View user profile</p>
                                    <NorthEastRounded className="!text-lg" />
                                </div>

                                <p
                                    onClick={orderHistory}
                                    className="cursor-pointer px-5 py-2 text-s underline underline-offset-1 hover:bg-dark-gray/20"
                                >
                                    Order history
                                </p>
                                <a
                                    onClick={toggleShow}
                                    href={`mailto: ${orderInfo.customer?.email}`}
                                    className="px-5 py-2 text-s underline underline-offset-1 hover:bg-dark-gray/20"
                                >
                                    {orderInfo.customer?.email}
                                </a>
                            </motion.div>
                        </ClickAwayListener>
                    )}
                </AnimatePresence>

                {/* <button
                    onClick={orderHistory}
                > */}
                <p
                    onClick={orderHistory}
                    className="underline-offset !cursor-pointer text-xs underline hover:no-underline"
                >
                    Order history
                </p>
                {/* </button> */}
            </section>
        </div>
    );
}

export default UserInfo;
