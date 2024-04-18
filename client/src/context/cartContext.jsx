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
import { useLayoutContext } from './layoutContext';
import Cart_Wishlist_Context from './cart_wishlist_context.jsx';

const CartContext = createContext(null);

export const useCart = () => {
    return useContext(CartContext);
};
export function CartProvider({ children }) {
    return (
        <Cart_Wishlist_Context Context={CartContext} property={'cart'}>
            {children}
        </Cart_Wishlist_Context>
    );
}
