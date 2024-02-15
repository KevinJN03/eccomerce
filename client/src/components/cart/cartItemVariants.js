const getCartItemVariants = ({idx, disableTranslateY}) => {
    return {
        overlay: {
            body: {
                initial: {
                    scaleX: 0,
                },
                animate: {
                    scaleX: 1,
                    transition: {
                        duration: 0.8,
                    },
                },
            },
            text: {
                initial: { opacity: 0, scale: 0.9 },
                animate: {
                    opacity: 1,
                    scale: 1,
                    transition: {
                        duration: 0.5,
                        delay: 0.3,
                        ease: 'easeInOut',
                    },
                },
                exit: {
                    backgroundColor: '#00000',
                    transition: {
                        duration: 0.2,
                    },
                },
            },
        },
        product: {
            exit: {
                opacity: 0,
                transition: {
                    delay: 0.6,
                },
            },
        },
        section: {
            initial: { height: 'auto', translateY: disableTranslateY ? 0 : 50, scale: 1 },
            animate: {
                translateY: 0,
                height: 'auto',
                scale: 1,
                transition: {
                    duration: 2,
                    delay: 2,
                    translateY: {
                        duration: disableTranslateY ? 0 :  0.7,
                        delay: disableTranslateY ? 0 : 0.2 * idx,
                    },
                },
            },
            exit: {
                height: '0px',
                opacity: 0,
                scale: 0.8,
                backgroundColor: '#00000',
                transition: {
                    duration: 0.7,
                    delay: 1.2,
                    height: {
                        duration: 0.7,
                        delay: 1.2,
                    },

                    scale: {
                        delay: 1,
                        duration: 0.2,
                    },
                    opacity: {
                        delay: 1,
                        duration: 0.2,
                    },
                },
            },
        },
    };
};

export default getCartItemVariants;
