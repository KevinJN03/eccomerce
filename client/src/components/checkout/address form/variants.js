export default {
    initial: {
        opacity: 0,
        translateY: 50,
        height: 'auto',
    },
    animate: {
        opacity: 1,

        translateY: 0,
        height: 'auto',
        transition: { duration: 0.7, ease: 'easeIn' },
    },

    exit: {
        opacity: 0,
        translateX: 50,
        height: 'auto',
        transition: {
            duration: 0.5,
            ease: 'easeOut',
        },
    },
};
