import { AnimatePresence, motion } from 'framer-motion';
import CheckCircleOutlineSharpIcon from '@mui/icons-material/CheckCircleOutlineSharp';
import CloseSharpIcon from '@mui/icons-material/CloseSharp';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
function MessageFooter({footerMessage, setFooterMessage, isInView}) {
    const footerVariant = {
        initial: {
            opacity: 0,
            translateY: '50px',
            bottom: '0px',
        },
        animate: {
            opacity: 1,
            translateY: '0px',
            position: isInView ? 'absolute' : 'fixed',
            bottom: isInView ? '-64px' : '0px',

            transition: {
                position: {
                    duration: 0,
                    delay: 0,
                },
                bottom: {
                    duration: 0,
                    delay: 0,
                },
                translateY: {
                    duration: 0.5,
                },
                ease: 'easeInOut',
            },
        },
        exit: {
            translateY: '100px',
            opacity: 0,
            transition: {
                translateY: {
                    duration: 0.5,
                    delay: 0,
                },
            },
        },
    };
    return (
        <AnimatePresence>
            {footerMessage?.text && (
                <motion.footer
                    variants={footerVariant}
                    // transition={transition}
                    initial={'initial'}
                    animate={'animate'}
                    exit={'exit'}
                    className={` flex w-full max-w-[568px] flex-row items-center justify-between ${
                        footerMessage?.success
                            ? 'bg-green-200'
                            : footerMessage?.success == false
                            ? 'bg-red-200'
                            : '!bg-black/80 text-white'
                    } px-4 py-6`}
                >
                    {footerMessage?.success ? (
                        <CheckCircleOutlineSharpIcon className="mr-4" />
                    ) : (
                        footerMessage?.success == false && (
                            <InfoOutlinedIcon className="mr-4" />
                        )
                    )}

                    <p
                        className={`w-fit flex-1 break-words break-all ${
                            footerMessage?.success ||
                            footerMessage?.success == false
                                ? ''
                                : 'text-white'
                        }`}
                    >
                        {footerMessage?.text}
                    </p>

                    <button
                        className="ml-4"
                        onClick={() =>
                            setFooterMessage({
                                text: null,
                                success: null,
                            })
                        }
                    >
                        <CloseSharpIcon
                            alt="x icon"
                            className={`h-4 w-4 ${
                                footerMessage?.success ||
                                footerMessage?.success == false
                                    ? '!fill-dark-gray'
                                    : '!fill-white'
                            }`}
                        />
                    </button>
                </motion.footer>
            )}
        </AnimatePresence>
    );
}

export default MessageFooter;
