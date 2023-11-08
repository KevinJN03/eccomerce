import { createContext, useContext, useState } from 'react';
const PaymentMethodContext = createContext();

export const usePaymentMethods = () => {
    return useContext(PaymentMethodContext);
};

export function PaymentMethodProvider({ value, children }) {
    return (
        <PaymentMethodContext.Provider value={value}>
            {children}
        </PaymentMethodContext.Provider>
    );
}

export default PaymentMethodProvider;
