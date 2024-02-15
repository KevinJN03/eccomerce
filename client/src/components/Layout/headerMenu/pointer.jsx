import { AnimatePresence, motion } from 'framer-motion';

function Pointer({ isHover }) {
    const variants = {
        initial: {
            opacity: 0,
        },
        animate: {
            opacity: 1,
            transition: {
                duration: 0.3,
                // delay: 0.1
            },
        },
        exit: {
            opacity: 0,
            transition: {
                duration: 0.2,
            },
        },
    };
    return (
        <div className="ignore  pointer absolute bottom-[-0.2rem] w-full flex justify-center">
            <AnimatePresence>
                {isHover && (
                    <motion.div
                        variants={variants}
                        initial={'initial'}
                        animate={'animate'}
                        exit={'exit'}
                        // id='pointer'
                        className=" pointer ignore  h-0 w-0   border-x-[0.8rem] border-b-[0.8rem] border-x-transparent border-b-light-grey "
                    />
                )}
            </AnimatePresence>
        </div>
    );
}

export default Pointer;
