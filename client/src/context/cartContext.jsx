import {
    useReducer,
    createContext,
    useContext,
    useEffect,
    useState,
} from 'react';
const cartFromLocalStorage = JSON.parse(localStorage.getItem('cart') || '[]');
export const useCart = () => {
    return useContext(cartContext);
};

const reducer = (cart, action) => {
    // JSON.parse(cart)

    let isProductInCart = false;

    const { product } = action;

    ({ product });
    if (action.type == 'add') {
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
            return [...cart, action.product];
        }
    }

    if (action.type == 'remove') {
        return cart.filter((product) => product.cartId !== action.cartId);
    }

    if (action.type == 'edit quantity') {
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

    if (action.type == 'edit variation') {
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

    if (action.type == 'remove items') {
        const cartIds = action?.cartIds;
        const newCart = cart.filter((item) => !cartIds.includes(item.cartId));

        console.log({ newCart, cartIds });
        return newCart;
    }

    throw new Error(
        `${action.type} is not valid, please use either add or remove`
    );
};
const cartContext = createContext(null);
export function CartProvider({ children }) {
    const [cart, dispatch] = useReducer(reducer, cartFromLocalStorage);
    const [promo, setPromo] = useState([{ bool: false }]);
    const [deliveryOption, setDeliveryOption] = useState({});

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    const value = {
        cart,
        dispatch,
        deliveryOption,
        setDeliveryOption,
        promo,
        setPromo,
    };

    return (
        <cartContext.Provider value={value}>{children}</cartContext.Provider>
    );
}
