import dayjs from 'dayjs';
import { isEqual } from 'lodash';
import {
    createContext,
    useContext,
    useEffect,
    useReducer,
    useRef,
    useState,
} from 'react';
import { v4 as uuidv4 } from 'uuid';
import axios from '../api/axios';

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
    const isBothWishListEqual = isEqual(state, wishlistFromLS);

    if (isBothWishListEqual) {
        wishlist = state;
    } else {
        wishlist = new Map(wishlistFromLS);
    }

    if (action.type == 'latestWishlist') {
        return wishlist;
    }

    if (action.type == 'refresh') {
        const refreshedProducts = action.products.map((product) => {
            const currentWishlistItem = wishlist.get(product?._id);
            const { price, variationSelect, wishlistId, wishListTimestamp } =
                currentWishlistItem;

            product.price.current = price?.current || product.price.current;
            return [
                product._id,
                { ...product, variationSelect, wishlistId, wishListTimestamp },
            ];
        });
        const productMap = new Map(refreshedProducts);

        return productMap;
    }
    if (action.type == 'add') {
        const newSet = new Map([
            [
                action.productId,
                {
                    wishListTimestamp: dayjs().toISOString(),
                    wishlistId: uuidv4(),
                    ...action.product,
                    variationSelect: action?.variationSelect || action.product?.variationSelect
                },
            ],
            ...wishlist,
        ]);
        return newSet;
    }

    if (action.type == 'updateVariationSelect') {
        const wishlistItem = { ...wishlist.get(action.productId) };

        wishlistItem.variationSelect = action.variationSelect;
        const newMap = new Map(wishlist);
        newMap.set(action.productId, wishlistItem);

        return newMap;
    }

    if (action.type == 'delete') {
        const newSet = new Map([...wishlist]);

        newSet.delete(action.productId);
        return newSet;
    }
};
export function WishlistContextProvider({ children }) {
    const [wishlistProducts, setWishlistProduct] = useState([]);
    const [wishlist, wishListDispatch] = useReducer(
        reducer,
        new Map(getWishlistFromLS())
    );
    const [wishlistLoading, setWishListLoading] = useState(true);

    const [wishlistRefresh, setWishlistRefresh] = useState(false);
    const abortControllerRef = useRef(new AbortController());
    useEffect(() => {
        abortControllerRef.current?.abort();
        abortControllerRef.current = new AbortController();
        const convertMaptoArray = Array.from(wishlist);
        localStorage.setItem('wishlist', JSON.stringify(convertMaptoArray));

        const updateWishlist = async () => {
            try {
                await axios.post(
                    '/user/wishlist/update',
                    {
                        wishlist: convertMaptoArray.map(
                            ([key, value]) => value
                        ),
                    },
                    { signal: abortControllerRef.current?.signal }
                );
            } catch (error) {
                console.error(error);
            }
        };

        updateWishlist();
    }, [wishlist]);

    const value = {
        wishlist,
        wishListDispatch,
        wishlistLoading,
        setWishListLoading,
        wishlistProducts,
        setWishlistProduct,
        wishlistRefresh,
        setWishlistRefresh,
        getWishlistFromLS,
    };
    return (
        <WishlistContext.Provider value={value}>
            {children}
        </WishlistContext.Provider>
    );
}
