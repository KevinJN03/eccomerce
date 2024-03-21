import { createContext, useContext, useRef } from 'react';

const DeliveryContext = createContext();

export const useDeliveryContext = () => {
    return useContext(DeliveryContext);
};
function DeliveryContextProvider({ value, children }) {
    const clickAwayRefs = useRef();
    const values = { ...value, clickAwayRefs, test: 1 };
    return (
        <DeliveryContext.Provider value={values}>
            {children}
        </DeliveryContext.Provider>
    );
}

export default DeliveryContextProvider;
