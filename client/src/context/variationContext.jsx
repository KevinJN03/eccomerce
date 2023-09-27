import { createContext, useContext, useState } from 'react';

const VariationContext = createContext(null);

export const useVariation = () => {

    return useContext(VariationContext);
};

export default function VariationProvider({ children, value }) {
    return (
        <VariationContext.Provider value={value}>
            {children}
        </VariationContext.Provider>
    )
}
