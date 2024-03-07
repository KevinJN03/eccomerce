const getCartItemVariants = ({
    idx,
    disableTranslateY,
    scaleYExit,
    heightExit,
}) => {
    const sectionExit = {};

    if (scaleYExit) {
        sectionExit.scaleY = 0;
    }

    if (heightExit) {
        sectionExit.height = '0px';
    }
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
                        ease: 'easeIn',
                        // ease: [0.11, 0, 0.5, 0],
                    },
                },

                exit: {
                    height: '0px',
                    transition: {
                        duration: 0.4,
                    },
                },
            },
            text: {
                initial: { opacity: 0, scale: 0.9 },
                animate: {
                    opacity: 1,
                    scale: 1,
                    transition: {
                        duration: 0.3,
                        delay: 0.5,
                        ease: 'easeIn',
                    },
                },
                exit: {
                    scale: 0.5,
                    opacity: 0,
                    transition: {
                        duration: 0.7,
                        delay: 0.5,
                    },
                },
            },
        },
        product: {
            exit: {
                opacity: 0,
                // height: '0px',
                transition: {
                    duration: 0,
                    delay: 2,
                },
            },
        },
        section: {
            initial: {
                height: 'auto',
                translateY: disableTranslateY ? 0 : 50,
                scale: 1,
            },
            animate: {
                translateY: 0,
                height: 'auto',
                scale: 1,
                transition: {
                    duration: 2,
                    delay: 2,
                    translateY: {
                        duration: disableTranslateY ? 0 : 0.7,
                        delay: disableTranslateY ? 0 : 0.2 * idx,
                    },
                },
            },
            exit: {
                // opacity: 0,
                // scaleY: 0,
                ...sectionExit,
                transition: {
                    duration: 0.4,
                    // delay: 2,
                    // height: {
                    //     duration: 0.7,
                    //     delay: 10,
                    // },
                },
            },
        },
    };
};

export default getCartItemVariants;
