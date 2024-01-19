import {
    useState,
    useReducer,
    useEffect,
    useContext,
    createContext,
} from 'react';
import { useNewProduct } from './newProductContext';

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
            setUpdate: action.setUpdate,
            update: action.update,
            setCheckAll: action.setCheckAll,
        };
    }

    if (action.type == 'main' || action.type == 'manage' || action.type) {
        return { ...state, type: action.type, currentVariation: null };
    }

    throw new Error('Invalid type for Variation Reducer');
};

export function VariationProvider({ children }) {
    const { variations, setVariations, modalCheck } = useNewProduct();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [content, dispatch] = useReducer(variationReducer, {
        type: 'main',
    });

    const [temporaryVariation, setTemporaryVariation] = useState([]);

    useEffect(() => {
        setTemporaryVariation(() => variations);
    }, [modalCheck]);

    const value = {
        content,
        dispatch,
        variations,
        setVariations,
        temporaryVariation,
        setTemporaryVariation,
        loading,
        setLoading,
        error,
        setError,
    };
    return (
        <VariationContext.Provider value={value}>
            <section className="new-product">
                <div className="new-product-container">
                    <section className="flex justify-center">
                        {children}
                    </section>
                </div>
            </section>
        </VariationContext.Provider>
    );
}
