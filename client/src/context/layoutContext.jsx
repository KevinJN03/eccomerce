import { createContext, useContext, useState } from 'react';

const LayoutContext = createContext('');

export function useLayoutContext() {
    return useContext(LayoutContext);
}

export function LayoutProvider({ children }) {
    const set = new Set([
        'portal',
        'my-account',
        'checkout',
        'admin',
        'order-success',
        'order-cancel',
        'order-cancelled',
    ]);

    const splitLocation = window.location.href
        .replace(import.meta.env.VITE_CLIENT_URL, '')
        .split('/');

    const [layout, setLayout] = useState(() => !set.has(splitLocation[1]));

    return (
        <LayoutContext.Provider value={{ layout, setLayout }}>
            {children}
        </LayoutContext.Provider>
    );
}

export default LayoutProvider;
