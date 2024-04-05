import { createContext, useContext } from 'react';

const ProductContext = createContext(null);

export const useProductContext = () => {
    return useContext(ProductContext);
};

function ProductContextProvider({ children, value }) {
    return (
        <ProductContext.Provider value={value}>
            {children}
        </ProductContext.Provider>
    );
}

export default ProductContextProvider;
