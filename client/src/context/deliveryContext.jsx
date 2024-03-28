import { createContext, useContext, useRef, useState } from 'react';

const DeliveryContext = createContext();

export const useDeliveryContext = () => {
    return useContext(DeliveryContext);
};
function DeliveryContextProvider({  children }) {
    const [profiles, setProfiles] = useState([]);
const value = {
    profiles, setProfiles
}
    return (
        <DeliveryContext.Provider value={value}>
            {children}
        </DeliveryContext.Provider>
    );
}

export default DeliveryContextProvider;
