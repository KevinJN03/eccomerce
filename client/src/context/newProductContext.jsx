import {
    createContext,
    useContext,
    useEffect,
    useReducer,
    useState,
} from 'react';
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
            priceHeader: { on: false },
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
    const [priceValue, setPriceValue] = useState({ value: '', on: false });
    const [stockValue, setStockValue] = useState({ value: '', on: false });
    const [publish, setPublish] = useState({
        firstAttempt: false,
        value: false,
        count: 0,
    });

    // const [delivery, setDelivery] = useState();
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
        publish,
        setPublish,
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
    if (action.type === 'getValidateInput') {
        const size = state.get('validateInput')?.size;

        console.log('sizeee: ', size);
        

        if (size > 0) {
            console.log('update state because size is greater')
            action.isAllInputValid.current = false
        }else {
            action.isAllInputValid.current = true  
        }

        return state;
    }
    if (action == 'clearValidateInput') {
        const newMap = new Map(state);
        newMap.delete('validateInput');
        return newMap;
    }

    if (action.type == 'addToValidateInput2') {
        return action.map;
    }

    if (action.type == 'addToValidateInput') {
        if (!state.has('validateInput')) {
            const map = new Map(state);
            return map.set(
                'validateInput',
                new Map([[action.path, action.error]])
            );
        }
        const getMap = state.get('validateInput');

        if (!getMap.has(action.path)) {
            const map = new Map(getMap);
            map.set(action.path, action.error);

            const newMap = new Map(state).set('validateInput', map);
            return newMap;
        } else {
            return state;
        }
    }
    if (action.type == 'deleteValidateInput') {
        const newMap = new Map(state.get('validateInput'));
        if (newMap.has(action.path)) {
            newMap.delete(action.path);
            const map = new Map(state);

            if (newMap.size <= 1) {
                map.delete('validateInput');
            } else {
                map.set('validateInput', newMap);
            }

            return map;
        } else {
            return state;
        }
    }

    if (action.type == 'set') {
        const map = new Map(state);
        action?.data.forEach((element) => {
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

    throw new Error(`please enter a valid action. ${action} is not valid.`);
}
