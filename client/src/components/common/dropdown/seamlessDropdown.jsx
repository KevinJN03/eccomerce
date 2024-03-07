import { ClickAwayListener } from '@mui/material';
import { AnimatePresence, motion } from 'framer-motion';

function SeamlessDropdown({ show, setShow, children, options }) {
    return (
        <AnimatePresence mode="wait">
            {show && (
                <ClickAwayListener onClickAway={() => setShow(() => false)}>
                    <motion.div
                        initial={{
                            scale: 0.9,
                        }}
                        animate={{
                            scale: [0.9, 1.01, 1],
                            transition: {
                                duration: 0.2,
                                ease: 'easeIn',
                            },
                        }}
                        exit={{
                            scale: 0,
                            opacity: 0,

                            transition: {
                                ease: 'easeOut',
                                scale: {
                                    duration: 0.3,
                                },
                                opacity: {
                                    duration: 0.2,
                                },
                            },
                        }}
                        className="absolute left-0 top-[-0.25rem] z-[2] w-fit origin-top-left  rounded-xl border bg-white box-content pt-1 shadow-normal"
                    >
                        {children || (
                            <ul className="relative mt-7 w-full list-none">
                                {options.map(({ text, handleClick }, idx) => {
                                    return (
                                        <li
                                            key={text}
                                            onClick={() => {
                                                handleClick();
                                                setShow(() => false);
                                            }}
                                            className={`w-full whitespace-nowrap rounded-b-inherit py-3 pl-4 pr-8 text-sm hover:bg-light-grey ${idx == options.length - 1 ? 'rounded-b-xl' : 'rounded-none'}`}
                                        >
                                            {text}
                                        </li>
                                    );
                                })}
                            </ul>
                        )}
                    </motion.div>
                </ClickAwayListener>
            )}
        </AnimatePresence>
    );
}

export default SeamlessDropdown;
