import { AnimatePresence, motion } from 'framer-motion';

function ThemeBtn({ text, handleClick, children }) {
    return (
        <button
            type="button"
            className=" group relative w-fit px-4 py-3"
            onClick={handleClick}
        >
            {!children ? (
                <span className=" relative !z-[1] w-full text-base font-medium text-white">
                    {text}
                </span>
            ) : (
                <span className="relative !z-[1] ">{children}</span>
            )}

            <div className=" absolute left-0 top-0  h-full w-full  rounded-full bg-black transition-all group-hover:!scale-x-[1.03] group-hover:!scale-y-[1.05] group-hover:bg-opacity-80 group-hover:shadow-normal"></div>
        </button>
    );
}

export default ThemeBtn;
