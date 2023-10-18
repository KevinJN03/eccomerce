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
    const [publishError, setPublishError] = useState([]);
    const [priceValue, setPriceValue] = useState('');
    const [stockValue, setStockValue] = useState('');
    const [delivery, setDelivery] = useState();
    const [triggerGlobalUpdate, TriggerGlobalUpdate_Dispatch] = useReducer(globalUpdateTrigger_Reducer, false);
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
        setPublishError,
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

    if(action == 'trigger'){
        return !state
    } else {
        throw new Error('invalid action for global trigger')
    }

}