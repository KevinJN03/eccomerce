import { createContext, useContext } from 'react';

const PaymentTypeContext = createContext(null);

export const usePaymentTypeContext = () => {
    return useContext(PaymentTypeContext);
};



function PaymentTypeProvider({ children, value }) {
    return (
        <PaymentTypeContext.Provider value={value}>
            {children}
        </PaymentTypeContext.Provider>
    );
}

export default PaymentTypeProvider;
