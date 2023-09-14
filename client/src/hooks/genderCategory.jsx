import { useReducer, useContext, createContext } from 'react';
const categoryContext = createContext(null);

export function useGenderCategory() {
    return useContext(categoryContext);
}

function reducer(state, action) {
    if (action.type === 'men') {
        return {
            category: 'men',
        };
    } else if (action.type === 'women') {
        return {
            category: 'women',
        };
    } else {
        throw Error('Unknown action type, type must be men or women');
    }
}

export function ProductsProvider({ children }) {
    const [state, dispatch] = useReducer(reducer, { category: 'men' });

    return (
        <categoryContext.Provider value={[state, dispatch]}>
            {children}
        </categoryContext.Provider>
    );
}

export default ProductsProvider;
