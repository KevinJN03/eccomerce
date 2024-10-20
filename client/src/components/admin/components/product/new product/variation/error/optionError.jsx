import ErrorOutlinedIcon from '@mui/icons-material/ErrorOutlined';

import { motion, AnimatePresence } from 'framer-motion';

const variants = {
    initial: {
        opacity: 0,
    },
    animate: {
        opacity: 1,

        transition: {
            opacity: { delay: 0, duration: 0.4, ease: 'easeInOut' },
        },
    },
    exit: {
        // opacity: 0,
        opacity: 1,

        transition: {
            opacity: { delay: 0, duration: 0 },
        },
    },
};
function OptionError({ msg, className, small, disableIcon }) {
    return (
        <motion.div
            variants={variants}
            initial="initial"
            animate="animate"
            exit="exit"
            className={`${className} flex flex-row items-center justify-start gap-3 p-3 `}
        >
            {!disableIcon && (
                <ErrorOutlinedIcon
                    className={` ${small ? '!text-lg' : ''} !fill-red-800`}
                />
            )}
            <p
                className={`${small ? 'text-xs' : 'text-base'} max-w-full break-words text-red-800`}
            >
                {msg}
            </p>
        </motion.div>
    );
}

export default OptionError;
