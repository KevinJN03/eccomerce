import { useReducer, createContext, useContext } from 'react';


export const useCart = () => {
    return useContext(cartContext)
}

const reducer = (cart, action) => {
if(action.type == 'add'){
    return [...cart, action.product];
} else if (action.type == 'remove'){
    return cart.filter(product => product.id !== action.product.id)
}else{
    throw new Error(`${action.type} is not valid, please use either add or remove`)
}
}
const cartContext = createContext(null);
export function CartProvider({ children }) {
    const [state, dispatch] = useReducer(reducer, [])
    const value = [
        state,
        dispatch
    ]
    return (
        <cartContext.Provider value={value}>{children}</cartContext.Provider>
    );
}
