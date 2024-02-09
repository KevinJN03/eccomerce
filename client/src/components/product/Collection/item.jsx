import Info from '../../common/info';
import { Link, useNavigate } from 'react-router-dom';
import { useGenderCategory } from '../../../hooks/genderCategory';

import variants from '../../common/framerMotionVariants';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { FavoriteBorder, Favorite } from '@mui/icons-material';
import { random } from 'lodash';
function Item({ image, text, url, loading, product }) {
    const [state] = useGenderCategory();

    const [isHover, setIsHover] = useState(false);

    const [favorite, setFavorite] = useState(false);

    const [isHoverFavorite, setIsHoverFavorite] = useState(false);
    const [showAnimation, setShowAnimation] = useState(false);

    const [randomNum, setRandomNum] = useState(() => random(-3, 1));
    const navigate = useNavigate();

    useEffect(() => {
        setRandomNum(() => random(-3, 1));
    }, [showAnimation]);
    console.log(randomNum);
    return (
        <div
            onClick={(e) => {
                if (e.target?.id == 'wishlist-overlay') {
                    return;
                }

                navigate(`/${state.gender}/product/${url}`);
            }}
            onMouseEnter={() => setIsHover(() => true)}
            onMouseLeave={() => setIsHover(() => false)}
            href={`/${state.gender}/product/${url}`}
            className="!box-border  flex min-h-96 w-52 cursor-pointer flex-col gap-3"
            variants={variants}
            animate={'animate'}
            initial={'initial'}
            exit={'exit'}
        >
            <div className="relative">
                <div
                    className="absolute bottom-2 right-3 flex flex-col gap-y-2"
                    onClick={() => {
                        setShowAnimation((prevState) => !prevState);
                        setFavorite((prevState) => !prevState);
                    }}
                    onMouseEnter={() => setIsHoverFavorite(() => true)}
                    onMouseLeave={() => setIsHoverFavorite(() => false)}
                >
                    <div
                        id="wishlist-overlay"
                        className="wishlist-overlay absolute left-0  top-0 z-[1] h-full  w-full rounded-full bg-transparent"
                    ></div>
                    <div className=" relative flex items-center justify-center self-end rounded-full bg-white p-1">
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
                                        <Favorite className='!fill-dark-gray'/>
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
                    </div>
                </div>

                <img
                    className="h-72 w-full object-cover"
                    loading="lazy"
                    src={
                        product?.images?.length >= 2 && isHover
                            ? product?.images[1]
                            : product?.images[0]
                    }
                />
            </div>
            {/* <Info title={title} price={price} text={text} /> */}

            <div className="flex h-full  w-full flex-col gap-3 ">
                <p
                    title={product.title}
                    className="h-9 w-full !overflow-hidden !text-ellipsis font-normal text-[var(--primary-2)] underline-offset-2 hover:underline sm:text-xs"
                >
                    {product.title}
                </p>

                <h2 className=" text-sm font-bold text-[var(--primary-2)]">
                    £{parseFloat(product.additional_data.price?.min).toFixed(2)}
                </h2>

                <div className="flec-row flex gap-2">
                    <span className=" text-primary-gray whitespace-nowrap border  px-2 py-1 font-gotham text-[0.65rem] font-semibold tracking-wide text-white   sm:font-medium">
                        MORE COLOURS
                    </span>
                    <span className=" bg-primary-gray whitespace-nowrap px-2  py-1 font-gotham text-[0.65rem] font-semibold tracking-wide text-white   sm:font-medium">
                        SELLING FAST
                    </span>
                </div>
            </div>
        </div>
    );
}

export default Item;
