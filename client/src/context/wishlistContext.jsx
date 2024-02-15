import { isEqual } from 'lodash';
import { createContext, useContext, useEffect, useReducer } from 'react';

const getWishlistFromLS = () => {
    return JSON.parse(localStorage.getItem('wishlist') || '[]');
};

const WishlistContext = createContext(null);

export const useWishlistContext = () => {
    return useContext(WishlistContext);
};

const reducer = (state, action) => {
    let wishlist = null;
    const wishlistFromLS = getWishlistFromLS();
    const isDifferent = isEqual(state, wishlistFromLS);

    if (isDifferent) {
        wishlist = wishlistFromLS;
    } else {
        wishlist = state;
    }

    if (action.type == 'refresh') {


       
    }
    if (action.type == 'add') {
        const newSet = new Set([action.productId, ...wishlist]);
        return newSet;
    }

    if (action.type == 'delete') {
        const newSet = new Set([...wishlist]);

        newSet.delete(action.productId);
        return newSet;
    }
};
export function WishlistContextProvider({ children }) {
    const [wishlist, wishListDispatch] = useReducer(
        reducer,
        new Set(getWishlistFromLS())
    );

    useEffect(() => {
        localStorage.setItem('wishlist', JSON.stringify(Array.from(wishlist)));
    }, [wishlist]);

    const value = {
        wishlist,
        wishListDispatch,
    };
    return (
        <WishlistContext.Provider value={value}>
            {children}
        </WishlistContext.Provider>
    );
}
