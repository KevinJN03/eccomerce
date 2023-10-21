import { createContext, useContext, useReducer, useState } from 'react';
import { generateVariation } from '../components/admin/components/product/new product/variation/variationData';

import { EditorState, ContentState } from 'draft-js';
export const newProductContext = createContext(null);

export const useNewProduct = () => {
    return useContext(newProductContext);
};

export const NewProductProvider = ({ children }) => {
    const [variations, setVariations] = useState([
        {
            id: 1,
            name: 'Colour',
            options: generateVariation('Colour'),
            disabled: false,
            default: true,
            quantityHeader: { on: true },
            priceHeader: { on: true },
        },
        {
            id: 2,
            name: 'Size',
            options: generateVariation('Size'),
            disabled: false,
            default: true,
            quantityHeader: { on: false },
            priceHeader: { on: true },
        },
    ]);
    const [files, setFiles] = useState([]);
    const [title, setTitle] = useState('test');
    const [description, setDescription] = useState(() =>
        EditorState.createWithContent(ContentState.createFromText('test'))
    );
    const [profile, setProfile] = useState([]);
    const [globalUpdate, setGlobalUpdate] = useState({
        price: null,
        quantity: null,
    });
    const [category, setCategory] = useState();
    const [publishError, publishErrorDispatch] = useReducer(
        publishError_Reducer,
        new Map()
    );
    const [priceValue, setPriceValue] = useState({ value: null, on: false });
    const [stockValue, setStockValue] = useState({ value: null, on: false });
    const [delivery, setDelivery] = useState();
    const [triggerGlobalUpdate, TriggerGlobalUpdate_Dispatch] = useReducer(
        globalUpdateTrigger_Reducer,
        false
    );
    const [gender, setGender] = useState();
    const value = {
        variations,
        setVariations,
        title,
        setTitle,
        files,
        setFiles,
        description,
        setDescription,
        category,
        setCategory,
        gender,
        setGender,
        profile,
        setProfile,
        globalUpdate,
        setGlobalUpdate,
        publishError,
        publishErrorDispatch,
        priceValue,
        setPriceValue,
        stockValue,
        setStockValue,
        triggerGlobalUpdate,
        TriggerGlobalUpdate_Dispatch,
    };

    return (
        <newProductContext.Provider value={value}>
            {children}
        </newProductContext.Provider>
    );
};

function globalUpdateTrigger_Reducer(state, action) {
    if (action == 'trigger') {
        return !state;
    } else {
        throw new Error('invalid action for global trigger');
    }
}

function publishError_Reducer(state, action) {
    if (action.type == 'set') {
        const map = new Map();
        action.data.forEach((element) => {
            const { path } = element;
            map.set(path, element);
        });

        return map;
    }
    if (action.type == 'clear') {
        const newMap = new Map(state);

        newMap.delete(action.path);

        return newMap;
    }
}
