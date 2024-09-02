const variants = {
    initial: {
        opacity: 0.8,
    },
    animate: {
        opacity: 1,

        transition: { duration: 5 },
    },

    exit: {
        opacity: 0,
        transition: { duration: 10, delay: 10 },
    },
};

export default variants;
