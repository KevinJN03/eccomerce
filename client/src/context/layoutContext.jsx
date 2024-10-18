import _, { toLower } from 'lodash';
import { createContext, useContext, useState } from 'react';
import { useLocation } from 'react-router-dom';

const LayoutContext = createContext('');

export function useLayoutContext() {
    return useContext(LayoutContext);
}

export function LayoutProvider({ children }) {

    const location = useLocation();

    const getRoute = () => {

        const route = toLower(location.pathname.split('/')[1])


        debugger
        //  split( location.pathname, '/').split('?')
        
        //location.pathname.split('/')[1].split('?').join('');
    
        const set = new Set([
            'portal',
            'my-account',
            'checkout',
            'admin',
            'order-success',
            'order-cancel',
            'order-cancelled',
            // 'home'
        ]);
        return !set.has(route);
    };

    const [layout, setLayout] = useState(() => getRoute());
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
