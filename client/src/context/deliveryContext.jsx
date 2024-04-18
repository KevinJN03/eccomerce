import { createContext, useContext, useRef, useState } from 'react';
import UserLogout from '../hooks/userLogout';
import { useContent } from './ContentContext';
const DeliveryContext = createContext();

export const useDeliveryContext = () => {
    return useContext(DeliveryContext);
};
function DeliveryContextProvider({ children }) {
    const { setShowAlert } = useContent();
    const { logoutUser } = UserLogout();

    const value = {};
    return (
        <DeliveryContext.Provider value={value}>
            {children}
        </DeliveryContext.Provider>
    );
}

export default DeliveryContextProvider;
