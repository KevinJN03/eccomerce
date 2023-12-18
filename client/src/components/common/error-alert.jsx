import { AnimatePresence, motion } from 'framer-motion';

function Error_Alert({ setError, error, property }) {
    const variants = {
        initial: { opacity: 0 },
        animate: {
            opacity: 1,
            transition: {
                duration: 2,
            },
        },
        exit: { opacity: 0 },
    };

    return (
        <AnimatePresence>
            {error?.[property] && (
                <motion.div
                    className="alert alert-error my-2  rounded-none"
                    variants={variants}
                    initial={'initial'}
                    animate={'animate'}
                    exit={'exit'}
                >
                    <motion.svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 shrink-0 stroke-current transition-all hover:scale-110 hover:cursor-pointer"
                        fill="none"
                        viewBox="0 0 24 24"
                        onClick={() =>
                            setError((prevstate) => ({
                                ...prevstate,
                                general: null,
                            }))
                        }
                    >
                        <motion.path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                    </motion.svg>
                    <span>{error?.[property]}</span>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
export default Error_Alert;
