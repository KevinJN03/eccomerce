import { useReducer, useContext, createContext, useEffect } from 'react';
const categoryContext = createContext(null);

export function useGenderCategory() {
    return useContext(categoryContext);
}
const genderFromLocal = JSON.parse(
    localStorage.getItem('genderCategory') || JSON.stringify({ gender: 'men' })
);

function reducer(state, action) {
    if (action.type === 'men') {
        return {
            gender: 'men',
            productCategory: state.productCategory,
        };
    } else if (action.type === 'women') {
        return {
            gender: 'women',
            productCategory: state.productCategory,
        };
    } else if (action.type === 'changeProductCategory') {
        return {
            gender: state.gender,
            productCategory: action.productCategory,
        };
    } else {
        throw Error(
            `Unknown action type, check useGenderCategory Reducer. action: ${JSON.stringify(action)} action.type: ${action?.type}`
        );
    }
}

export function ProductsProvider({ children }) {
    const [state, dispatch] = useReducer(reducer, genderFromLocal);

    useEffect(() => {
        localStorage.setItem('genderCategory', JSON.stringify(state));

        console.log('genderCategory state updated');
    }, [state]);

    return (
        <categoryContext.Provider value={[state, dispatch]}>
            {children}
        </categoryContext.Provider>
    );
}

export default ProductsProvider;
