import {
    ArrowDropDownSharp,
    PersonOutlineTwoTone,
    NorthEastRounded,
} from '@mui/icons-material';
import { useAdminOrderContext } from '../../../../context/adminOrder';
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import { ClickAwayListener } from '@mui/material';
function UserInfo({}) {
    const { orderInfo } = useAdminOrderContext();

    const [show, setShow] = useState(false);
    const variant = {
        initial: {
            opacity: 0,
        },
        animate: {
            opacity: 1,
            transition: {
                duration: 0.3,
            },
        },
        exit: {
            opacity: 0,
        },
    };

    const toggleShow = () => {
        setShow((prevState) => !prevState);
    };

    const onClickAway = () => {
        setShow(() => false);
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
                        className="flex flex-row items-center"
                    >
                        <p className="underline underline-offset-1">
                            {orderInfo.customer?.fullName}
                        </p>
                        <ArrowDropDownSharp />
                    </button>{' '}
                    <p className="align-baseline text-xxs underline underline-offset-1">
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
                                    onClick={toggleShow}
                                    className="px-5 py-2 text-s underline underline-offset-1 hover:bg-dark-gray/20"
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

                <p className="underline underline-offset-1 hover:no-underline">
                    Order history
                </p>
            </section>
        </div>
    );
}

export default UserInfo;
