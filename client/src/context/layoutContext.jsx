import { createContext, useContext, useState } from 'react';
import { useLocation } from 'react-router-dom';

const LayoutContext = createContext('');

export function useLayoutContext() {
    return useContext(LayoutContext);
}

export function LayoutProvider({ children }) {
    const [layout, setLayout] = useState(true);

    const value = { layout, setLayout };

    

    return (
        <LayoutContext.Provider value={value}>
            {children}
        </LayoutContext.Provider>
    );
}

export default LayoutProvider;
