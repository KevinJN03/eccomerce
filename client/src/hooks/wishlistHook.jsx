import { useEffect, useState } from 'react';
import { useWishlistContext } from '../context/wishlistContext';

function useWishListHook({ product, variationSelect }) {
    const { wishlist, addItem, stateMap, formatData } = useWishlistContext();
    const [isHoverFavorite, setIsHoverFavorite] = useState(false);
    const [favorite, setFavorite] = useState(stateMap?.has(product?._id));
    const [showAnimation, setShowAnimation] = useState(false);
    const handleWishlist = () => {
        if (favorite) {
            return;
        }

        console.log({ variationSelect });
        // wishListDispatch({
        //     type: 'ADD',
        //     product_id: product?.product_id,
        //     product,
        //     variationSelect,
        // });
        addItem({ itemData: formatData({ product }) });
        setShowAnimation(() => true);
        setFavorite(() => true);
    };
    useEffect(() => {
        setFavorite(() =>  stateMap?.has(product?._id));
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
