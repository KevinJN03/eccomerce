import { ClickAwayListener } from '@mui/material';
import { AnimatePresence, motion } from 'framer-motion';
import variant from './variant';
import { ArrowDropDownSharp } from '@mui/icons-material';
import { useState } from 'react';
function SelectionInput({
    allIds,
    selectionSet,
    setSelectionSet,

   
}) {

    const [show, setShow] = useState(false);
    const selectAll = () => {
        setSelectionSet((prevSet) => new Set([...prevSet, ...allIds]));
    };

    const toggleSelection = () => {
        if (selectionSet?.size > 0) {
            setSelectionSet(() => new Set());
        } else {
            setSelectionSet(() => new Set([...allIds]));
        }
    };

    const deselect = () => {
        setSelectionSet(() => new Set());
        setShow(() => false);
    };

    const handleClick = (e) => {
        

        if (e.target?.type == 'checkbox') {
            return;
        }
        setShow((prevState) => !prevState);
    };
    const onClickAway = () => {
        setShow(() => false);
    };
    return (
        <section className="relative w-fit">
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
                <ArrowDropDownSharp className="!fill-dark-gray" />
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
    );
}

export default SelectionInput;
