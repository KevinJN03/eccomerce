import {
    useState,
    useReducer,
    useEffect,
    useContext,
    createContext,
} from 'react';

const VariationContext = createContext(null);

export const useVariation = () => {
    return useContext(VariationContext);
};

export const variationReducer = (state, action) => {
    if (action.type == 'main' || action.type == 'manage') {
        return { ...state, type: action.type,  currentVariation: null };
    }

    if (action.type == 'select') {
        return {
            ...state,
            type: action.type,
            currentVariation: action.currentVariation,
            title: action.title
        };
    }
    return new Error('Invalid type for Variation Reducer');
};

export function VariationProvider({ children, value }) {
    return (
        <VariationContext.Provider value={value}>
            {children}
        </VariationContext.Provider>
    );
}
