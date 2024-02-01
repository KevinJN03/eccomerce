import { useState } from 'react';
import { useAdminContext } from '../../../context/adminContext';
import { useListingPageContext } from '../../../context/listingPageContext';
import SelectionInput from '../order/home/selectionIput';
import { ArrowDropDownSharp } from '@mui/icons-material';
import { useContent } from '../../../context/ContentContext';
import { ClickAwayListener } from '@mui/material';
import { AnimatePresence, motion } from 'framer-motion';

import variant from '../order/home/variant';
function SubHeader({}) {
    const { selectionSet, setSelectionSet, checks, productIds } =
        useListingPageContext();
    const { setModalCheck, setModalContent } = useContent();

    const [showAction, setShowAction] = useState(false);

    const handleDelete = () => {
        setModalContent({
            type: 'delete',
            ids: Array.from(selectionSet),
            setSelectionSet,
            draft: checks?.listing_status == 'draft',
            checks,
        });
        setModalCheck(() => true);
    };
    return (
        <div className="subheader mb-3 flex flex-row  flex-nowrap gap-3">
            <SelectionInput
                {...{ allIds: productIds, selectionSet, setSelectionSet }}
            />

            <div className="flex w-fit flex-row flex-nowrap rounded border border-dark-gray/50">
                <button
                    disabled={!selectionSet?.size}
                    type="button"
                    className="rounded-l-inherit px-3 text-xs font-medium text-black/70 hover:bg-light-grey/60 disabled:cursor-default disabled:bg-orange-50/50"
                >
                    Renew
                </button>
                <button
                    disabled={!selectionSet?.size}
                    type="button"
                    className="border-x border-dark-gray/50 px-3 text-xs font-medium text-black/70 hover:bg-light-grey/60 disabled:cursor-default disabled:bg-orange-50/50"
                >
                    Deactivate
                </button>
                <button
                    onClick={handleDelete}
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
                                                    products:
                                                        Array.from(
                                                            selectionSet
                                                        ),
                                                }));
                                            }}
                                            className="whitespace-nowrap px-5 py-2 hover:bg-dark-gray/20 cursor-pointer"
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
