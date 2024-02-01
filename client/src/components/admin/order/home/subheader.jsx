import ArrowDropDownSharpIcon from '@mui/icons-material/ArrowDropDownSharp';
import { useEffect, useState } from 'react';
import { useAdminOrderContext } from '../../../../context/adminOrder';
import { forEach } from 'lodash';
import { AnimatePresence, motion } from 'framer-motion';
import { ClickAwayListener } from '@mui/material';
import variant from './variant';
import { useAdminContext } from '../../../../context/adminContext';
import SelectionInput from './selectionIput';

function SubHeader({}) {
    const {
        selectionSet,
        setSelectionSet,
        allOrderPerPage,
        setModalCheck,
        adminOrderModalContentDispatch,
        resultMap,
        currentPage,
    } = useAdminOrderContext();

   
  
    const [showAction, setShowAction] = useState(false);
    const [allOrderIds, setAllOrdersId] = useState();

    const getIdsFromPage = () => {
        const orderIdArray = [];
        const newAllOrderPerPage = [...resultMap.get(currentPage)];
        newAllOrderPerPage.forEach((obj) => {
            const getOnlyIds = obj.orders?.map((order) => order?._id);

            orderIdArray.push(...getOnlyIds);
        });

        return orderIdArray;
    };
    useEffect(() => {
        if (resultMap.size > 0) {
            setAllOrdersId(() => getIdsFromPage());
        }
    }, [currentPage, resultMap]);

    const toggleAction = () => {
        setShowAction((prevState) => !prevState);
    };

    const printOrders = () => {
        console.log('clikced');
        adminOrderModalContentDispatch({
            type: 'printOrder',
            orders: Array.from(selectionSet),
        });
        setModalCheck(true);
    };

    const markAsGift = () => {};

    const actionClickAway = () => {
        setShowAction(() => false);
    };
    return (
        <section className="subheader flex flex-row gap-x-3  pb-6 pt-5">
            <SelectionInput
                {...{
                    allIds: allOrderIds,
                    setSelectionSet,
                    selectionSet,
                 
                   
                  
                }}
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
                                    onClick={markAsGift}
                                    className="cursor-pointer whitespace-nowrap px-5 py-2 text-s hover:bg-dark-gray/20"
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
