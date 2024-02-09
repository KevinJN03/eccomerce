import { createContext, useContext, useEffect, useReducer } from 'react';

const wishListFromLocalStorage = JSON.parse(
    localStorage.getItem('wishlist') || '[]'
);

const WishlistContext = createContext(null);

export const useWishlistContext = () => {
    return useContext(WishlistContext);
};

const reducer = (state, action) => {
    if (action.type == 'add') {
        const newSet = new Set([...state, action.productId]);
        return newSet;
    }

    if (action.type == 'delete') {
        const newSet = new Set([...state]);

        newSet.delete(action.productId);
        return newSet;
    }
};
export function WishlistContextProvider({ children }) {
    const [wishlist, wishListDispatch] = useReducer(
        reducer,
        new Set(wishListFromLocalStorage)
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
