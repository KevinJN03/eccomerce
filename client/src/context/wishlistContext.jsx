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
import Cart_Wishlist_Context from './cart_wishlist_context';

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

            // product.price.current = price?.current || product.price.current;
            return [
                product._id,
                { ...product, variationSelect, wishlistId, wishListTimestamp },
            ];
        });
        const productMap = new Map(refreshedProducts);

        return productMap;
    }
    if (action.type == 'ADD') {
        const newSet = new Map([
            [
                action.product_id,
                {
                    wishListTimestamp: dayjs().toISOString(),
                    wishlistId: uuidv4(),
                    ...action.product,
                    variationSelect:
                        action?.variationSelect ||
                        action.product?.variationSelect,
                },
            ],
            ...wishlist,
        ]);
        return newSet;
    }

    if (action.type == 'updateVariationSelect') {
        const wishlistItem = { ...wishlist.get(action.product_id) };

        wishlistItem.variationSelect = action.variationSelect;
        const newMap = new Map(wishlist);
        newMap.set(action.product_id, wishlistItem);

        return newMap;
    }

    if (action.type == 'delete') {
        const newSet = new Map([...wishlist]);

        newSet.delete(action.product_id);
        return newSet;
    }
};
export function WishlistContextProvider({ children }) {
    // const [wishlistProducts, setWishlistProduct] = useState([]);
    // const [wishlist, wishListDispatch] = useReducer(
    //     reducer,
    //     new Map(getWishlistFromLS())
    // );
    // const [wishlistLoading, setWishListLoading] = useState(true);

    // const [wishlistRefresh, setWishlistRefresh] = useState(false);
    // const abortControllerRef = useRef(new AbortController());
    // useEffect(() => {
    //     abortControllerRef.current?.abort();
    //     abortControllerRef.current = new AbortController();
    //     const convertMapToArray = Array.from(wishlist);
    //     localStorage.setItem('wishlist', JSON.stringify(convertMapToArray));
    //     console.log('updateWishlist');

    //     const wishlistId = localStorage.getItem('wishlist_id');

    //     const updateWishlist = async () => {
    //         try {
    //             if (wishlistId) {
    //                 var { data } = await axios.put(
    //                     `/wishlist/update/${wishlistId}`,

    //                     {
    //                         items: wishlist,
    //                     },
    //                     {
    //                         signal: abortControllerRef.current?.signal,
    //                     }
    //                 );
    //             } else {
    //                 var { data } = await axios.post(
    //                     `/wishlist/create`,
    //                     {
    //                         items: wishlist,
    //                     },

    //                     {
    //                         signal: abortControllerRef.current?.signal,
    //                     }
    //                 );

    //                 localStorage.setItem('wishlist_id', data._id);
    //             }
    //             localStorage.setItem('wishlist_id', data._id);

    //             console.log('wishlist data: ', data);
    //             // await axios.post(
    //             //     '/user/wishlist/update',
    //             //     {
    //             //         wishlist: convertMapToArray.map(
    //             //             ([key, value]) => value
    //             //         ),
    //             //     },
    //             //     { signal: abortControllerRef.current?.signal }
    //             // );
    //         } catch (error) {
    //             console.error(error);
    //         }
    //     };

    //     updateWishlist();

    //     return () => {
    //         abortControllerRef.current?.abort();
    //     };
    // }, [wishlist]);

    // const value = {
    //     wishlist,
    //     wishListDispatch,
    //     wishlistLoading,
    //     setWishListLoading,
    //     wishlistProducts,
    //     setWishlistProduct,
    //     wishlistRefresh,
    //     setWishlistRefresh,
    //     getWishlistFromLS,
    // };
    return (
        <Cart_Wishlist_Context Context={WishlistContext} property={'wishlist'}>
            {children}
        </Cart_Wishlist_Context>
        // <WishlistContext.Provider value={value}>
        //
        // </WishlistContext.Provider>
    );
}
