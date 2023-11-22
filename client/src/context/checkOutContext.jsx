import { createContext, useContext } from 'react';

const CheckoutContext = createContext(null);

export const useCheckoutContext = () => {
    return useContext(CheckoutContext);
};
function CheckOutProvider({ children, value }) {
    return (
        <CheckoutContext.Provider value={value}>
            {children}
        </CheckoutContext.Provider>
    );
}

export default CheckOutProvider;
