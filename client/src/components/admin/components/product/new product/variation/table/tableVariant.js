import { easeInOut } from 'framer-motion';

const tableRowVariants = {
    hover: {
        backgroundColor: '#eee',
        duration: 0,
        transition: {
            type: 'spring',
            stiffness: 30,
            duration: 0.1,
            backgroundColor: { ease: easeInOut, duration: 0.1 },
        },
    },
    initial: {
        opacity: 1,
        y: '0%',
        backgroundColor: '#dcf8d2',
    },
    animate: {
        opacity: 1,
        y: '0%',
        backgroundColor: '#FFFFFF',
        transition: {
            duration: 1,
            backgroundColor: { ease: easeInOut, duration: 1 },
        },
    },
    exit: {
        backgroundColor: '#FFFFFF',
        transition: { backgroundColor: { ease: easeInOut, duration: 0.2 } },
    },
};

export default tableRowVariants;
