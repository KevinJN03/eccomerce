import {
    useReducer,
    createContext,
    useContext,
    useEffect,
    useState,
    useRef,
} from 'react';
import _, { cloneDeep, isEqual } from 'lodash';
import cartReducer, { getCartFromLocalStorage } from '../hooks/cartReducer';
import axios from '../api/axios';

export const useCart = () => {
    return useContext(CartContext);
};
const CartContext = createContext(null);
export function CartProvider({ children }) {
    const [cart, dispatch] = useReducer(cartReducer, getCartFromLocalStorage());
    const [promo, setPromo] = useState([{ bool: false }]);
    const [deliveryOption, setDeliveryOption] = useState({});
    const [cartLoading, setCartLoading] = useState(false);
    const [cartRefresh, setCartRefresh] = useState(false);
    const abortControllerRef = useRef(new AbortController());
    useEffect(() => {
        // if (cartRefresh) {
        //     setCartLoading(() => true);
        // }
        localStorage.setItem('cart', JSON.stringify(cart));
        // const timeout = setTimeout(() => {
        //     setCartLoading(() => false);
        //     setCartRefresh(() => false);
        // }, 1500);

        // return () => {
        //     clearTimeout(timeout);
        // };

        const updateCart = async () => {
            try {
                abortControllerRef.current?.abort();
                abortControllerRef.current = new AbortController();
                const cartId = localStorage.getItem('cart_id');
                if (cartId) {
                    const { data } = await axios.put(
                        `/cart/update/${cartId}`,
                        { items: cart },
                        {
                            signal: abortControllerRef.current?.signal,
                        }
                    );
                } else {
                    const { data } = await axios.post(
                        `/cart/create`,
                        { items: cart },
                        {
                            signal: abortControllerRef.current?.signal,
                        }
                    );

                    localStorage.setItem('cart_id', data.cart_id);
                }
            } catch (error) {
                console.error('at cartContext update: ', error);
            }
        };

        updateCart();
    }, [cart]);

    useEffect(() => {
        dispatch({ type: 'refresh' });
    }, [cartRefresh]);

    const value = {
        cart,
        dispatch,
        deliveryOption,
        setDeliveryOption,
        promo,
        setPromo,
        cartLoading,
        setCartLoading,
        cartRefresh,
        setCartRefresh,
    };

    return (
        <CartContext.Provider value={value}>{children}</CartContext.Provider>
    );
}
