const containerVariants = {
    initial: {
        // opacity: 0,
        scale: 0.95,
    },
    animate: {
        opacity: 1,
        scale: 1,
        transition: {
            duration: 0.1,
            ease: 'easeIn',
        },
    },
    exit: {
        scale: 0,
        translateY: -100,
        translateX: -60,
        opacity: 0,
        transition: {
            duration: 0.3,

            ease: 'easeOut',
        },
    },
};

export default containerVariants;
