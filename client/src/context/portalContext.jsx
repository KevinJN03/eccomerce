import { createContext, useContext } from 'react';

const PortalContext = createContext();

export const usePortalContext = () => {
    return useContext(PortalContext);
};

function PortalProvider({ value, children }) {
    return (
        <PortalContext.Provider value={value}>
            {children}
        </PortalContext.Provider>
    );
}

export default PortalProvider;
