import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { useAdminOrderContext } from '../../../../context/adminOrder';
function OptionSelection({ options, status, setStatus, className }) {
    const [hover, setHover] = useState('');

    const variant = ({ currentStatus }) => {
        return {
            initial: { scaleX: 0 },
            animate: {
                backgroundColor:
                    currentStatus == status
                        ? 'rgba(0, 0, 0, 1)'
                        : hover == currentStatus && 'rgba(0, 0, 0, 0.5)',

                scaleX: 1,
                transition: {
                    duration: 0.2,
                },
            },
            exit: {
                scaleX: 0,
                transition: { duration: 0.2 },
            },

            hover: {
                backgroundColor: 'rgba(0, 0, 0, .1)',
                scaleX: 1,
            },
        };
    };

    return (
        <section className={`${className || ''} mb-4 flex flex-col gap-x-5`}>
            <div className="flex flex-row gap-6">
                {options.map((option) => {
                    return (
                        <div
                            onClick={() => {
                                if (option?.handleClick) {
                                    option?.handleClick();
                                } else {
                                    setStatus(() => option.select);
                                }
                            }}
                            className="relative cursor-pointer"
                            onMouseEnter={() => setHover(() => option.select)}
                            onMouseLeave={() => setHover(() => null)}
                        >
                            <p className="flex flex-row flex-nowrap items-center gap-1 pb-3 text-base">
                                {option.text}
                                {option?.amount && (
                                    <span className="text-sm pl-1">
                                        { option.amount}
                                    </span>
                                )}
                            </p>
                            <AnimatePresence>
                                {(status == option.select ||
                                    hover == option.select) && (
                                    <motion.div
                                        variants={variant({
                                            currentStatus: option.select,
                                        })}
                                        animate={'animate'}
                                        initial={'initial'}
                                        exit={'exit'}
                                        className={`bottom-[calc(0px - 2px)] absolute h-[2px] w-full `}
                                    />
                                )}
                            </AnimatePresence>
                        </div>
                    );
                })}
            </div>
            <div className=" m-0 h-[2px] w-full bg-light-grey !py-0"></div>
        </section>
    );
}

export default OptionSelection;
