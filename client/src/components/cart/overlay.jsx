import { CloseRounded } from '@mui/icons-material';
import { AnimatePresence, motion } from 'framer-motion';
import getCartItemVariants from './cartItemVariants';

function Overlay({
    handleRemove,
    isRemoving,
    setIsRemoving,
    disableImg,
    enableBodyExit,
}) {
    const cartItemVariant = getCartItemVariants({ idx: 0 });
    const handleAnimationComplete = (e) => {
        console.log('cartItemRemoveAnimation', e);

        if (e == 'exit') {
            handleRemove();

            setIsRemoving((prevState) => ({
                ...prevState,
                complete: true,
                // body: false,
            }));
        }
    };

    const handleOverlayBody = (e) => {
        if (e == 'animate') {
            setIsRemoving((prevState) => ({
                ...prevState,
                text: false,
            }));
        }
        // if (e == 'exit') {
        //     handleRemove();
        // }
    };

    return (
        <>
            <AnimatePresence>
                {isRemoving.body && (
                    <motion.div
                        style={{}}
                        onAnimationComplete={handleOverlayBody}
                        variants={cartItemVariant.overlay.body}
                        animate={'animate'}
                        initial={'initial'}
                        exit={'exit'}
                        className={` absolute left-0 top-0 z-[1] flex h-full w-full origin-top-right bg-light-grey`}
                    />
                )}
            </AnimatePresence>

            <AnimatePresence>
                {isRemoving.text && (
                    <motion.div
                        onAnimationComplete={handleAnimationComplete}
                        variants={cartItemVariant.overlay.text}
                        animate={'animate'}
                        initial={'initial'}
                        exit={'exit'}
                        className={`  absolute left-0 top-0 z-[1] flex h-full w-full flex-col items-center justify-center  `}
                    >
                        {!disableImg && <CloseRounded className="!text-3xl " />}
                        <p className="text-sm !text-black">Item Deleted</p>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}

export default Overlay;
