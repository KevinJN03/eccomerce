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

    console.log({ product });
    if (action.type == 'add') {
        const foundItemInCart = cart.map((item) => {
            if (
                item.id == product.id &&
                item.variationSelect.color.id ==
                    product.variationSelect.color.id &&
                item.variationSelect.size.id == product.variationSelect.size.id
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

    if (action.type == 'edit item') {
        const newCart = cart.map((item) => {
            if (item.cartId === action.cartId) {
                console.log('found item');
                const newItem = {
                    ...item,
                    quantity: action.quantity,
                    variationSelect: {
                        ...item.variationSelect,
                        size: { ...action.size },
                    },
                };

                return newItem;
            }
            return item;
        });

        return newCart;
    } else {
        throw new Error(
            `${action.type} is not valid, please use either add or remove`
        );
    }
};
const cartContext = createContext(null);
export function CartProvider({ children }) {
    let testData = {
        id: '30e5e22a-f54e-498f-aa23-59fe035a76d2',
        title: 'ASOS DESIGN knitted oversized v-neck jumper in cheetah print in multi',
        images: [
            'https://images.asos-media.com/products/asos-design-knitted-oversized-v-neck-jumper-in-cheetah-print-in-multi/205013257-1-grey?$n_640w$&wid=513&fit=constrain',
            'https://images.asos-media.com/products/asos-design-knitted-oversized-v-neck-jumper-in-cheetah-print-in-multi/205013257-4?$n_640w$&wid=513&fit=constrain',
            'https://images.asos-media.com/products/asos-design-knitted-oversized-v-neck-jumper-in-cheetah-print-in-multi/205013257-2?$n_640w$&wid=513&fit=constrain',
            'https://images.asos-media.com/products/asos-design-knitted-oversized-v-neck-jumper-in-cheetah-print-in-multi/205013257-3?$n_640w$&wid=513&fit=constrain',
            'https://images.asos-media.com/products/asos-design-knitted-oversized-v-neck-jumper-in-cheetah-print-in-multi/205013257-4?$n_640w$&wid=513&fit=constrain',
        ],
        price: { current: 35 },
        selectedSize: 'S',
        size: [
            { size: '2XS - Chest 34', stock: 9 },
            { size: 'XS - Chest 36', stock: 4 },
            { size: 'S - Chest 38', stock: 17 },
            { size: 'M - Chest 40', stock: 15 },
            { size: 'L - Chest 42', stock: 15 },
            { size: 'XL - Chest 44', stock: 12 },
            { size: '2XL - Chest 46-48', stock: 9 },
        ],
        color: 'Black',
        details: [
            'Available In Dark Brown.',
            'Crew Neck',
            'Short Sleeve',
            '100% Cotton',
            'Imported',
        ],
        url: 'https://www.asos.com/asos-design/asos-design-knitted-oversized-v-neck-jumper-in-cheetah-print-in-multi/prd/205013257?clr=grey&colourWayId=205013307&cid=27110',
    };
    const [cart, dispatch] = useReducer(reducer, cartFromLocalStorage);
    const [promo, setPromo] = useState([{ bool: false }]);
    const [deliveryOption, setDeliveryOption] = useState({ cost: 0.0 });

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
        console.log('state updated');
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
