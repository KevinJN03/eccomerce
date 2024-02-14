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
        <AnimatePresence>
            {isHover && (
                <motion.div
                    variants={variants}
                    initial={'initial'}
                    animate={'animate'}
                    exit={'exit'}

                    id='pointer'
                    className="pointer-up ignore absolute bottom-[-0.5rem] left-1/2 h-0 w-0 translate-x-[-50%] translate-y-[-50%]  border-x-[0.8rem] border-b-[0.8rem] border-x-transparent border-b-light-grey "
                />
            )}
        </AnimatePresence>
    );
}

export default Pointer;
