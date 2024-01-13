import ArrowDropDownSharpIcon from '@mui/icons-material/ArrowDropDownSharp';
import { useState } from 'react';
import { useAdminOrderContext } from '../../../context/adminOrder';
import { forEach } from 'lodash';
import { AnimatePresence, motion } from 'framer-motion';
import { ClickAwayListener } from '@mui/material';
import variant from './variant';
import { useAdminContext } from '../../../context/adminContext';

function SubHeader({}) {
    const [check, setCheck] = useState(false);
    const [show, setShow] = useState(false);
    const [showAction, setShowAction] = useState(false);

    const { selectionSet, setSelectionSet, allOrderPerPage , setModalCheck, adminOrderModalContentDispatch} =
        useAdminOrderContext();

    const getIdsFromPage = () => {
        const orderIdArray = [];
        const newAllOrderPerPage = [...allOrderPerPage];
        newAllOrderPerPage.forEach((obj) => {
            const getOnlyIds = obj.orders?.map((order) => order?._id);

            orderIdArray.push(...getOnlyIds);
        });

        return orderIdArray;
    };
    const toggleSelection = () => {
        const orderNumberArray = [];
        if (selectionSet?.size > 0) {
            setSelectionSet(() => new Set());
        } else {
            const ids = getIdsFromPage();
            setSelectionSet(() => new Set(ids));
        }
    };
    const toggleShow = () => {
        setShow((prevState) => !prevState);
    };

    const onClickAway = () => {
        setShow(() => false);
    };

    const deselect = () => {
        setSelectionSet(() => new Set());
        setShow(() => false);
    };

    const selectAll = () => {
        const ids = getIdsFromPage();
        const newArray = [...selectionSet, ...ids];
        console.log({ newArray });
        setSelectionSet(() => new Set(newArray));
    };

    const handleClick = (e) => {
        console.log(e.target.type);

        if (e.target?.type == 'checkbox') {
            return;
        }
        setShow((prevState) => !prevState);
    };

    const toggleAction = () => {
        setShowAction((prevState) => !prevState);
    };

    const printOrders = () => {
        adminOrderModalContentDispatch({type: 'printOrder', orders: Array.from(selectionSet)})
        setModalCheck(true)
    };

    const markAsGift = () => {};

    const actionClickAway = () => {
        setShowAction(() => false);
    };
    return (
        <section className="subheader flex flex-row gap-x-3  pb-6 pt-5">
            <section className="relative">
                <div
                    onClick={handleClick}
                    className={`${
                        selectionSet?.size ? 'bg-black text-white' : ''
                    } flex max-w-20 flex-row items-center rounded-sm border-[1px] p-2`}
                >
                    <input
                        checked={selectionSet?.size}
                        onChange={toggleSelection}
                        type="checkbox"
                        className="daisy-checkbox daisy-checkbox-xs mr-2 rounded-sm checked:border-orange-400"
                    />
                    <p className="font-gotham text-sm text-inherit">
                        {selectionSet?.size}
                    </p>
                    <ArrowDropDownSharpIcon className="!fill-dark-gray" />
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
                                className="absolute top-11 z-10 flex flex-col rounded-sm border-[1px] bg-white py-2"
                            >
                                <div
                                    // onClick={toggleShow}
                                    className="flex flex-row flex-nowrap items-center gap-1 px-5 py-2 hover:bg-dark-gray/20"
                                >
                                    <p
                                        onClick={selectAll}
                                        className="whitespace-nowrap text-s"
                                    >
                                        Select all on page
                                    </p>
                                </div>

                                <p
                                    onClick={deselect}
                                    className="whitespace-nowrap px-5 py-2 text-s hover:bg-dark-gray/20"
                                >
                                    Deselect all
                                </p>
                            </motion.div>
                        </ClickAwayListener>
                    )}
                </AnimatePresence>
            </section>

            <button
                disabled
                class=" !rounded-sm border-[1px] bg-white px-3 text-sm font-medium disabled:bg-light-grey/40"
            >
                Print postage labels
            </button>
            <section className="relative">
                <button
                    disabled={selectionSet?.size == 0}
                    onClick={toggleAction}
                    class="h-full !rounded-sm border-[1px] bg-white px-3 text-sm font-medium disabled:bg-light-grey/40"
                >
                    More actions
                    <ArrowDropDownSharpIcon className="ml-1 !fill-dark-gray" />
                </button>
                <AnimatePresence>
                    {showAction && (
                        <ClickAwayListener onClickAway={actionClickAway}>
                            <motion.div
                                // ref={clickAwayRef}
                                variants={variant}
                                animate={'animate'}
                                initial={'initial'}
                                exit={'exit'}
                                className="absolute top-11 z-10 flex flex-col rounded-sm border-[1px] bg-white py-2"
                            >
                                <div className="flex flex-row cursor-pointer flex-nowrap items-center gap-1 px-5 py-2 hover:bg-dark-gray/20">
                                    <p
                                        onClick={printOrders}
                                        className="whitespace-nowrap pr-12 text-s"
                                    >
                                        Print Order(s)
                                    </p>
                                </div>

                                <p
                                    onClick={markAsGift}
                                    className="whitespace-nowrap px-5 py-2 text-s cursor-pointer hover:bg-dark-gray/20"
                                >
                                    Mark as gift(s)
                                </p>
                            </motion.div>
                        </ClickAwayListener>
                    )}
                </AnimatePresence>
            </section>
        </section>
    );
}

export default SubHeader;
