import { createContext, useContext } from 'react';
import PaymentMethodProvider from './paymentMethodContext';

const UserDashboardContext = createContext(null);
export const useUserDashboardContext = () => {
    return useContext(UserDashboardContext);
};
export function UserDashboardProvider({ value, children }) {
    const { userPaymentMethods } = value;
   
    return (
        <UserDashboardContext.Provider value={value}>
            <PaymentMethodProvider userPaymentMethods={userPaymentMethods}>
                {children}
            </PaymentMethodProvider>
        </UserDashboardContext.Provider>
    );
}

export const reducer = (state, action) => {
    if (
        action.type == 'deletePaymentMethod' ||
        action.type == 'deleteAddress'
    ) {
        return { ...state, ...action };
    }
};
