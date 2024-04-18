import { Favorite } from '@mui/icons-material';
import { motion } from 'framer-motion';
function Hearts({ idx, cartItem, bottom, left, fontSize, variants }) {
    return (
        <motion.div
            className={`!bottom-[${bottom}] relative left-[${left}%]`}
            key={`heart-${idx + 1}-${cartItem._id}`}
            variants={variants}
            initial={'initial'}
            animate={'animate'}
            exit={'exit'}
            onAnimationComplete={(e) => {
                // if (
                //     idx ==
                //         0 &&
                //     e ==
                //         'exit'
                // ) {
                //     handleWishlist();
                //     handleRemove();
                // }
                // if (
                //     idx ==
                //         3 &&
                //     e ==
                //         'animate'
                // ) {
                //     setIsRemoving(
                //         (
                //             prevState
                //         ) => ({
                //             ...prevState,
                //             showOverlayOpacityOff: true,
                //             // showOverlay: false,
                //         })
                //     );
                // }
            }}
        >
            <Favorite
                sx={{
                    fontSize: fontSize + 'rem',
                }}
            />
        </motion.div>
    );
}

export default Hearts;
