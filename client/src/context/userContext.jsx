import { createContext, useContext, useRef } from 'react';
import PaymentMethodProvider from './paymentMethodContext';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const UserDashboardContext = createContext(null);
export const useUserDashboardContext = () => {
    return useContext(UserDashboardContext);
};
export function UserDashboardProvider({ value, children }) {
    const { userPaymentMethods } = value;
    const { authDispatch } = useAuth();
    const navigate = useNavigate();
    const logoutRef = useRef(({ error }) => {
        console.error(error);
        if (error?.response?.status == 401) {
            authDispatch({ type: 'LOGOUT' });
            return navigate('/portal/login');
        }
    });

    return (
        <UserDashboardContext.Provider
            value={{ ...value, logoutUser: logoutRef.current }}
        >
            <PaymentMethodProvider userPaymentMethods={userPaymentMethods}>
                {children}
            </PaymentMethodProvider>
        </UserDashboardContext.Provider>
    );
}

export const reducer = (state, action) => {
    if (
        action.type == 'deletePaymentMethod' ||
        action.type == 'deleteAddress' ||
        action.type == 'unsavedDetails'
    ) {
        return { ...state, ...action };
    }
};
