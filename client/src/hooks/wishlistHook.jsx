import { useState } from 'react';
import { useWishlistContext } from '../context/wishlistContext';

function useWishListHook({ product }) {
    const { wishlist, wishListDispatch } = useWishlistContext();
    const [isHoverFavorite, setIsHoverFavorite] = useState(false);

    const [favorite, setFavorite] = useState(wishlist?.has(product?._id));
    const [showAnimation, setShowAnimation] = useState(false);
    const handleWishlist = () => {
        if (favorite) {
            return;
        }
        wishListDispatch({ type: 'add', productId: product._id, product });
        setShowAnimation(() => true);
        setFavorite(() => true);
    };

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
