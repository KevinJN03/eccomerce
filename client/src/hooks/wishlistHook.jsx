import { useEffect, useState } from 'react';
import { useWishlistContext } from '../context/wishlistContext';

function useWishListHook({ product, variationSelect }) {
    const { wishlist, wishListDispatch } = useWishlistContext();
    const [isHoverFavorite, setIsHoverFavorite] = useState(false);
    const [favorite, setFavorite] = useState(wishlist?.has(product?._id));
    const [showAnimation, setShowAnimation] = useState(false);
    const handleWishlist = () => {
        if (favorite) {
            return;
        }

        console.log({variationSelect})
        wishListDispatch({
            type: 'add',
            productId: product._id,
            product,
            variationSelect,
        });
        setShowAnimation(() => true);
        setFavorite(() => true);
    };
    useEffect(() => {
        setFavorite(() => wishlist?.has(product?._id));
    }, [wishlist, product]);

    return {
        isHoverFavorite,
        setIsHoverFavorite,
        favorite,
        setFavorite,
        handleWishlist,
        showAnimation,
    };
}

export default useWishListHook;
