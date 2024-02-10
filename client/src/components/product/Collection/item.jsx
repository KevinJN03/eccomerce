import Info from '../../common/info';
import { Link, useNavigate } from 'react-router-dom';
import { useGenderCategory } from '../../../hooks/genderCategory';

import variants from '../../common/framerMotionVariants';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { FavoriteBorder, Favorite } from '@mui/icons-material';
import { random } from 'lodash';
import { useWishlistContext } from '../../../context/wishlistContext';
import WishListBtn from '../../buttons/wishlistBtn';
import useWishListHook from '../../../hooks/wishlistHook';
function Item({ image, text, loading, product }) {
    const [state] = useGenderCategory();
    const [isHover, setIsHover] = useState(false);
    const { isHoverFavorite, setIsHoverFavorite, favorite, setFavorite, handleWishlist, showAnimation } =
        useWishListHook({ product });
    const [randomNum, setRandomNum] = useState(() => random(-3, 1));
    const navigate = useNavigate();

    useEffect(() => {
        setRandomNum(() => random(-3, 1));
    }, [showAnimation]);

    return (
        <div
            onClick={(e) => {
                if (e.target?.id == 'wishlist-overlay') {
                    return;
                }

                navigate(`/${state.gender}/product/${product?._id}`);
            }}
            onMouseEnter={() => setIsHover(() => true)}
            onMouseLeave={() => setIsHover(() => false)}
            className="!box-border  flex min-h-96 w-52 cursor-pointer flex-col gap-3"
            variants={variants}
            animate={'animate'}
            initial={'initial'}
            exit={'exit'}
        >
            <div className="relative">
                <div
                    className="absolute bottom-2 right-3 flex flex-col gap-y-2"
                    onClick={handleWishlist}
                    onMouseEnter={() => setIsHoverFavorite(() => true)}
                    onMouseLeave={() => setIsHoverFavorite(() => false)}
                >
                    <div
                        id="wishlist-overlay"
                        className="wishlist-overlay absolute left-0  top-0 z-[1] h-full  w-full rounded-full bg-transparent"
                    ></div>
                    <div className=" relative flex items-center justify-center self-end rounded-full bg-white p-1">
                        <WishListBtn
                            {...{
                            
                                favorite,
                                showAnimation,
                                isHoverFavorite,
                            }}
                        />
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
            <div className="flex h-full  w-full flex-col gap-3 ">
                <p
                    title={product.title}
                    className="h-9 w-full !overflow-hidden !text-ellipsis font-normal text-[var(--primary-2)] underline-offset-2 hover:underline sm:text-xs"
                >
                    {product.title}
                </p>

                <h2 className=" text-sm font-bold text-[var(--primary-2)]">
                    £
                    {parseFloat(
                        product.additional_data?.price?.min || 0
                    ).toFixed(2)}
                </h2>

                <div className="flec-row flex gap-2">
                    <span className=" whitespace-nowrap border px-2  py-1 font-gotham text-[0.65rem] font-semibold tracking-wide text-primary-gray   sm:font-medium">
                        MORE COLOURS
                    </span>
                    <span className=" whitespace-nowrap bg-primary-gray px-2  py-1 font-gotham text-[0.65rem] font-semibold tracking-wide text-white   sm:font-medium">
                        SELLING FAST
                    </span>
                </div>
            </div>
        </div>
    );
}

export default Item;
