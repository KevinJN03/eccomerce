import { motion, AnimatePresence } from 'framer-motion';
import { useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

function BubbleButton({
    handleClick,
    children,
    className,
    hoverClassName,
    text,
    disabled,
}) {
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
                disabled={disabled || false}
                onMouseEnter={() => {
                    setIsHover(() => true);
                }}
                onMouseLeave={() => {
                    setIsHover(() => false);
                }}
                className={`${className || 'px-5 py-3'} relative  !cursor-pointer rounded-full `}
                onClick={handleClick}
            >
                {children ? (
                    <span className="relative !z-[1] ">{children}</span>
                ) : (
                    <span
                        className={`${disabled ? 'text-black/60' : 'text-black'} relative !z-[1] w-full text-base font-medium`}
                    >
                        {text || 'Cancel'}
                    </span>
                )}

                <AnimatePresence>
                    {isHover && (
                        <motion.div
                            variants={variant}
                            initial={'initial'}
                            animate={'animate'}
                            exit={'exit'}
                            className={`absolute left-0 top-0  h-full w-full  rounded-inherit ${hoverClassName || 'bg-light-grey'} `}
                        ></motion.div>
                    )}
                </AnimatePresence>
            </motion.button>
        </AnimatePresence>
    );
}

export default BubbleButton;
