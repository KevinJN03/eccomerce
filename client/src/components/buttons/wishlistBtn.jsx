import { motion, AnimatePresence } from 'framer-motion';
import { useWishlistContext } from '../../context/wishlistContext';
import { useEffect, useState } from 'react';
import { Favorite, FavoriteBorder } from '@mui/icons-material';
function WishListBtn({ favorite, showAnimation, isHoverFavorite }) {
    return (
        <>
            {isHoverFavorite || favorite ? (
                <motion.span
                    animate={{
                        scale: favorite ? [1, 1.4, 0.8, 1] : 1,
                        transition: {
                            duration: 0.6,
                            //  times: [0, 0.2, 0.5, 0.8, 1],

                            ease: 'easeInOut',
                        },
                    }}
                >
                    <Favorite />
                </motion.span>
            ) : (
                <motion.span>
                    <FavoriteBorder />
                </motion.span>
            )}
            <AnimatePresence>
                {showAnimation && (
                    <div className="absolute left-1 top-1">
                        <motion.span
                            initial={{
                                opacity: 1,
                                left: '0rem',
                                translateX: '0%',
                            }}
                            animate={{
                                scale: 0,
                                opacity: 0,

                                translateX: `1.5rem`,
                                translateY: `2rem`,
                                transition: {
                                    duration: 1.5,
                                    ease: 'easeInOut',
                                },
                            }}
                            className="absolute"
                        >
                            <Favorite className="!fill-dark-gray" />
                        </motion.span>

                        <motion.span
                            initial={{
                                opacity: 1,
                                left: '0rem',
                                translateX: '0%',
                            }}
                            animate={{
                                scale: 0,
                                opacity: 0,

                                translateX: `0.5rem`,
                                translateY: `1.5rem`,
                                transition: {
                                    duration: 1.5,
                                    ease: 'easeInOut',
                                },
                            }}
                            className="absolute"
                        >
                            <Favorite />
                        </motion.span>
                    </div>
                )}
            </AnimatePresence>
        </>
    );
}

export default WishListBtn;
