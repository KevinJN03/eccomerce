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
        .split('/')[1]
        .split('?');
    console.log(splitLocation);
    const [layout, setLayout] = useState(() => !set.has(splitLocation[0]));
    const [isHover, setIsHover] = useState({ on: false, menu: null });
    return (
        <LayoutContext.Provider
            value={{ layout, setLayout, isHover, setIsHover }}
        >
            {children}
        </LayoutContext.Provider>
    );
}

export default LayoutProvider;
