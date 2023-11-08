import { createContext, useContext } from 'react';
import PaymentMethodProvider from './paymentMethodContext';

const UserDashboardContext = createContext(null);
export const useUserDashboardContext = () => {
    return useContext(UserDashboardContext);
};
export function UserDashboardProvider({ value, children }) {
    return (
        <UserDashboardContext.Provider value={value}>
            <PaymentMethodProvider>
               {children} 
            </PaymentMethodProvider>
            
        </UserDashboardContext.Provider>
    );
}

export const reducer = (state, action) => {
    if (action.type == 'deletePaymentMethod') {
        const { PaymentMethodsDispatch } = action;
        return { ...state, ...action };
    }
};
