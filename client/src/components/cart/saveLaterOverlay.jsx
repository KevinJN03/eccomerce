import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../../context/cartContext';
import { useWishlistContext } from '../../context/wishlistContext';
import { Favorite } from '@mui/icons-material';

function SaveLaterOverLay({ isRemoving, cartItem, setIsRemoving }) {
    const { removeItem } = useCart();
    const { addItem } = useWishlistContext();
    return (
        <>
            {[
                {
                    left: 40,

                    fontSize: 1,

                    bottom: 1,
                },
                {
                    left: 42,
                    fontSize: 0.8,

                    bottom: 2.3,
                },

                {
                    fontSize: 0.6,
                    left: 45,

                    bottom: 1.7,
                },
                {
                    left: 45,

                    fontSize: 0.45,

                    bottom: 3,
                },
            ].map(({ left, top, fontSize, ml, bottom, mb }, idx) => {
                const variants = {
                    initial: { opacity: 0 },
                    animate: {
                        opacity: 1,
                        transition: {
                            duration: 0.3,
                            delay: 0.2 * (idx + 1),
                        },
                    },
                    exit: {
                        opacity: 0,
                        transition: {
                            duration: 0.3,
                            delay: (4 - idx) * 0.2,
                        },
                    },
                };
                return (
                    <AnimatePresence key={`${cartItem}-save-later-${bottom}`}>
                        {!isRemoving?.showOverlayOpacityOff && (
                            <motion.div
                                style={{
                                    // marginBottom: `${mb}rem`

                                    bottom: `${bottom}rem`,
                                    left: `${left}%`,
                                }}
                                className={`absolute`}
                                key={`heart-${idx + 1}-${cartItem._id}`}
                                variants={variants}
                                initial={'initial'}
                                animate={'animate'}
                                exit={'exit'}
                                onAnimationComplete={(e) => {
                                    if (idx == 0 && e == 'exit') {
                                        // handleWishlist();
                                        // handleRemove();
                                        addItem({
                                            itemData: cartItem,
                                        });
                                        removeItem({
                                            itemId: cartItem?._id,
                                        });
                                    }
                                    if (idx == 3 && e == 'animate') {
                                        setIsRemoving((prevState) => ({
                                            ...prevState,
                                            showOverlayOpacityOff: true,
                                            // showOverlay: false,
                                        }));
                                    }
                                }}
                            >
                                <Favorite
                                    className="!fill-black/80"
                                    sx={{
                                        fontSize: fontSize + 'rem',
                                    }}
                                />
                            </motion.div>
                        )}
                    </AnimatePresence>
                );
            })}
        </>
    );
}

export default SaveLaterOverLay;
