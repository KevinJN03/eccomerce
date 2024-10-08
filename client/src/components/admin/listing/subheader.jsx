import { useState } from 'react';
import { useAdminContext } from '../../../context/adminContext';
import { useListingPageContext } from '../../../context/listingPageContext';
import SelectionInput from '../order/home/selectionInput';
import { ArrowDropDownSharp } from '@mui/icons-material';
import { useContent } from '../../../context/ContentContext';
import { ClickAwayListener } from '@mui/material';
import { AnimatePresence, motion } from 'framer-motion';

import variant from '../order/home/variant';
function SubHeader({}) {
    const {
        selectionSet,
        setSelectionSet,
        checks,
        productIds,
        handleClick,
        text,
        setTriggerSearch,
    } = useListingPageContext();
    const { setModalCheck, setModalContent } = useContent();

    const [showAction, setShowAction] = useState(false);
    const selectAll = () => {
        setSelectionSet((prevSet) => new Set([...prevSet, ...productIds]));
    };
    const deselect = () => {
        setSelectionSet(() => new Set());
    };

    // const toggleSelection = () => {
    //     if (selectionSet?.size > 0) {
    //         setSelectionSet(() => new Set());
    //     } else {
    //         setSelectionSet(() => new Set([...productIds]));
    //     }
    // };
    return (
        <div className="subheader mb-3 flex flex-row  flex-nowrap gap-3">
            <SelectionInput
                deselect={deselect}
                selectAll={selectAll}
                selectionSet={selectionSet}
            />

            <div className="flex w-fit flex-row flex-nowrap rounded border border-dark-gray/50">
                {/* <button
                    disabled={!selectionSet?.size}
                    type="button"
                    className="rounded-l-inherit px-3 text-xs font-medium text-black/70 hover:bg-light-grey/60 disabled:cursor-default disabled:bg-orange-50/50"
                >
                    Renew
                </button> */}
                {text[checks?.listing_status] && (
                    <button
                        onClick={() =>
                            handleClick({
                                productIds: Array.from(selectionSet),
                                type: text[
                                    checks?.listing_status
                                ]?.toLowerCase(),
                            })
                        }
                        disabled={!selectionSet?.size}
                        type="button"
                        className="border-r border-dark-gray/50 px-3 text-xs font-medium text-black/70 hover:bg-light-grey/60 disabled:cursor-default disabled:bg-orange-50/50"
                    >
                        {text[checks?.listing_status]}
                    </button>
                )}
                <button
                    onClick={() =>
                        handleClick({
                            productIds: Array.from(selectionSet),
                            type: 'delete',
                        })
                    }
                    disabled={!selectionSet?.size}
                    type="button"
                    className="rounded-r-inherit px-3 text-xs font-medium text-black/70 hover:bg-light-grey/60 disabled:cursor-default disabled:bg-orange-50/50"
                >
                    Delete
                </button>
            </div>
            <section className="relative">
                <button
                    onClick={() => setShowAction((prevState) => !prevState)}
                    disabled={!selectionSet?.size}
                    type="button"
                    className="flex h-full flex-row items-center rounded border border-dark-gray/50 px-3 text-xs font-medium  hover:bg-light-grey/60 disabled:cursor-default disabled:bg-orange-50/50"
                >
                    <p className="text-black/70">Editing options</p>
                    <ArrowDropDownSharp />
                </button>
                <AnimatePresence>
                    {showAction && (
                        <ClickAwayListener
                            onClickAway={() => setShowAction(() => false)}
                        >
                            <motion.div
                                // ref={clickAwayRef}
                                variants={variant}
                                animate={'animate'}
                                initial={'initial'}
                                exit={'exit'}
                                className="absolute top-11 z-10 flex flex-col rounded-sm border-[1px] bg-white py-2"
                            >
                                {[
                                    { title: 'Edit titles', id: 'edit_title' },
                                    {
                                        title: 'Edit description',
                                        id: 'edit_description',
                                    },
                                    { title: 'Edit prices', id: 'edit_price' },
                                    {
                                        title: 'Change delivery profiles',
                                        id: 'edit_delivery',
                                    },
                                    {
                                        title: 'Change section',
                                        id: 'change_section',
                                    },
                                ].map(({ title, id }) => {
                                    return (
                                        <p
                                            onClick={() => {
                                                setShowAction(() => false);
                                                setModalCheck(() => true);
                                                setModalContent(() => ({
                                                    type: id,
                                                    setTriggerSearch,
                                                    clearSelection: () => {
                                                        setSelectionSet(
                                                            new Set()
                                                        );
                                                    },
                                                    productIds:
                                                        Array.from(
                                                            selectionSet
                                                        ),
                                                }));
                                            }}
                                            className="cursor-pointer whitespace-nowrap px-5 py-2 hover:bg-dark-gray/20"
                                            id={id}
                                            key={id}
                                        >
                                            {title}
                                        </p>
                                    );
                                })}
                            </motion.div>
                        </ClickAwayListener>
                    )}
                </AnimatePresence>
            </section>
        </div>
    );
}

export default SubHeader;
