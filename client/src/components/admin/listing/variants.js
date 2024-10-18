export const variants = {

    initial: {
        opacity: 1,
        //scale: 0.95
    },
    animate: {
        opacity: 0,
        //scale: 1,

        transition: {
            duration:1,
            repeat: Infinity,
            repeatDelay: 1,

            repeatType: 'reverse'
        },
    },
}