import { AnimatePresence, motion } from 'framer-motion';
import { forwardRef } from 'react';

function ThemeBtn({
    text,
    handleClick,
    children,
    bg,
    className,
    isDisableHoverEffect,
    disabled,
}) {
    return (
        <button
            disabled={disabled || false}
            type="button"
            className={` group relative !z-[11] w-fit cursor-pointer disabled:!cursor-not-allowed ${className || 'px-4 py-3'}`}
            onClick={handleClick}
        >
            {!children ? (
                <span className=" relative !z-[1] w-full cursor-pointer text-base font-medium text-white">
                    {text}
                </span>
            ) : (
                <span className="relative !z-[1] ">{children}</span>
            )}

            <div
                className={` absolute left-0 top-0 h-full w-full  cursor-pointer rounded-full  group-disabled:bg-opacity-50 ${bg || 'bg-black'} ${isDisableHoverEffect ? 'group-hover:no-animation' : 'group-hover:!scale-x-[1.03] group-hover:!scale-y-[1.05] group-hover:bg-opacity-80 group-hover:shadow-normal'} transition-all `}
            ></div>
        </button>
    );
}

export default ThemeBtn;
