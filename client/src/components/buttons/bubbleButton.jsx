import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
function BubbleButton({ handleClick, children, className }) {
    const [isHover, setIsHover] = useState(false);

    const variant = {
        initial: {
            scale: 0.5,
        },

        animate: {
            scale: [0.5, 1.2, 1],
            transition: { duration: 0.3 },
        },
        exit: {
            scale: 0,
            opacity: 0,
            transition: {
                duration: 0.3,
            },
        },
    };
    return (
        <AnimatePresence>
            <motion.button
                onMouseEnter={() => {
                    setIsHover(() => true);
                }}
                onMouseLeave={() => {
                    setIsHover(() => false);
                }}
                className={`left relative  rounded-full ${className || 'px-5 py-3'}`}
                onClick={handleClick}
            >
                {children ? (
                    <span className="relative !z-[1] ">{children}</span>
                ) : (
                    <span className=" relative !z-[1] w-full text-base font-medium">
                        Cancel
                    </span>
                )}

                <AnimatePresence>
                    {isHover && (
                        <motion.div
                            variants={variant}
                            initial={'initial'}
                            animate={'animate'}
                            exit={'exit'}
                            className="absolute left-0 top-0  h-full w-full  rounded-inherit  bg-light-grey"
                        ></motion.div>
                    )}
                </AnimatePresence>
            </motion.button>
        </AnimatePresence>
    );
}

export default BubbleButton;
