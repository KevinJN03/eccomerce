const animationVariant = (idx) => {
    return {
        initial: {
            opacity: 0,
            translateX: 50,
        },

        animate: {
            opacity: 1,
            translateX: 0,
            transition: { duration: 0.5, delay: 0.5 * idx },
        },
    };
};

export default animationVariant;
