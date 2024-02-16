import {
    useReducer,
    createContext,
    useContext,
    useEffect,
    useState,
} from 'react';
import { isEqual } from 'lodash';

const getCartFromLocalStorage = () => {
    return JSON.parse(localStorage.getItem('cart') || '[]');
};
export const useCart = () => {
    return useContext(cartContext);
};

const reducer = (state, action) => {
    // JSON.parse(cart)

    let isProductInCart = false;

    const { product, type } = action;
    let cart = null;
    const cartFromLS = getCartFromLocalStorage();
    const isSame = isEqual(state, cartFromLS);

    if (isSame) {
        cart = state;
    } else {
        cart = cartFromLS;
    }

    if (type == 'refresh') {
        return cart;
    }

    if (type == 'add') {
        const foundItemInCart = cart.map((item) => {
            if (
                item.id == product.id &&
                item?.variationSelect?.variation1?.variation ==
                    product?.variationSelect?.variation1?.variation &&
                item?.variationSelect?.variation2?.variation ==
                    product?.variationSelect?.variation2?.variation
            ) {
                isProductInCart = true;
                return { ...item, quantity: item.quantity + 1 };
            }

            return item;
        });

        if (isProductInCart) {
            return foundItemInCart;
        } else {
            return [action.product, ...cart];
        }
    }

    if (type == 'remove') {
        return cart.filter((product) => product.cartId !== action.cartId);
    }

    if (type == 'edit quantity') {
        const newCart = cart.map((item) => {
            if (item.cartId === action.cartId) {
                const newItem = {
                    ...item,
                    quantity: action.quantity,
                };

                return newItem;
            }
            return item;
        });

        return newCart;
    }

    if (type == 'edit variation') {
        const newCart = cart.map((item) => {
            if (item.cartId === action.cartId) {
                const newItem = {
                    ...item,
                    variationSelect: {
                        ...action.variationSelect,
                    },
                };

                return newItem;
            }
            return item;
        });

        return newCart;
    }

    if (type == 'remove items') {
        const cartIds = action?.cartIds;
        const newCart = cart.filter((item) => !cartIds.includes(item.cartId));

        console.log({ newCart, cartIds });
        return newCart;
    }

    throw new Error(`${type} is not valid, please use either add or remove`);
};
const cartContext = createContext(null);
export function CartProvider({ children }) {
    const [cart, dispatch] = useReducer(reducer, getCartFromLocalStorage());
    const [promo, setPromo] = useState([{ bool: false }]);
    const [deliveryOption, setDeliveryOption] = useState({});
    const [cartLoading, setCartLoading] = useState(false);
    const [cartRefresh, setCartRefresh] = useState(false);
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
        <cartContext.Provider value={value}>{children}</cartContext.Provider>
    );
}
