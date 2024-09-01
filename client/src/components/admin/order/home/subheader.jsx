import ArrowDropDownSharpIcon from '@mui/icons-material/ArrowDropDownSharp';
import { useEffect, useState } from 'react';
import { useAdminOrderContext } from '../../../../context/adminOrderContext';
import _, { forEach } from 'lodash';
import { AnimatePresence, motion } from 'framer-motion';
import { ClickAwayListener } from '@mui/material';
import variant from './variant';
import { useAdminContext } from '../../../../context/adminContext';
import SelectionInput from './selectionInput';
import { useContent } from '../../../../context/ContentContext';

function SubHeader({}) {
    const {
        selectionSet,
        setSelectionSet,
        ordersData,
        allOrderIds,
        setAllOrdersId,
        markGiftSelection,
        setMarkGiftSelection,
        allMarkGiftSelection,
        defaultMarkGiftSelection,
        handleMarkGift,
    } = useAdminOrderContext();
    const { setModalCheck, setModalContent } = useContent();

    const [showAction, setShowActions] = useState(false);

    const toggleAction = () => {
        setShowActions((prevState) => !prevState);
    };

    const printOrders = () => {
        setModalContent({
            type: 'printOrder',
            orders: Array.from(selectionSet),
        });
        setModalCheck(true);
    };

    const markAsGift = () => {};

    const actionClickAway = () => {
        setShowActions(() => false);
    };

    const selectAll = () => {
        setSelectionSet((prevSet) => new Set([...prevSet, ...allOrderIds]));

        setMarkGiftSelection((prevSet) => allMarkGiftSelection);
    };
    const deselect = () => {
        setSelectionSet(() => new Set());
        setMarkGiftSelection(() => defaultMarkGiftSelection);
    };

    // const toggleSelection = () => {
    //     if (selectionSet?.size > 0) {
    //         // setSelectionSet(() => new Set());
    //         deselect();
    //     } else {
    //         // setSelectionSet(() => new Set([...allOrderIds]));
    //         selectAll();
    //     }
    // };
    return (
        <section className="subheader flex flex-row gap-x-3  pb-6 pt-5">
            <SelectionInput
                deselect={deselect}
                selectAll={selectAll}
                selectionSet={selectionSet}
            />

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
                                <div className="flex cursor-pointer flex-row flex-nowrap items-center gap-1 px-5 py-2 hover:bg-dark-gray/20">
                                    <p
                                        onClick={printOrders}
                                        className="whitespace-nowrap pr-12 text-s"
                                    >
                                        Print Order(s)
                                    </p>
                                </div>

                                <p
                                    onClick={() =>
                                        handleMarkGift({
                                            orderId: Array.from(selectionSet),
                                            setShowActions,
                                            mark_as_gift:
                                                markGiftSelection.false >= 1
                                                    ? true
                                                    : false,
                                        })
                                    }
                                    className="cursor-pointer whitespace-nowrap px-5 py-2 text-s hover:bg-dark-gray/20"
                                >
                                    {/* if a false value is present, set value to  set mark_as_gift to true else false */}
                                    {markGiftSelection.false >= 1
                                        ? 'Mark as gift(s)'
                                        : 'Unmark as gift(s)'}
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
