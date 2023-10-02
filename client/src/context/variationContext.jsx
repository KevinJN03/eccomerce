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
    if (action.type == 'select') {
        return {
            ...state,
            type: action.type,
            currentVariation: action.currentVariation,
            title: action.title,
            default: action.default,
        };
    }

    if (action.type == 'update') {
        return {
            ...state,
            type: action.type,
            category: action.category,
            selected: action.selected,
            setUpdate : action.setUpdate,
            update: action.update
        };
    }

    if (action.type == 'main' || action.type == 'manage' || action.type) {
        return { ...state, type: action.type, currentVariation: null };
    }

    throw new Error('Invalid type for Variation Reducer');
};

export function VariationProvider({ children, value }) {
    return (
        <VariationContext.Provider value={value}>
            {children}
        </VariationContext.Provider>
    );
}
