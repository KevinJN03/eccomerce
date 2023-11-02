import { v4 as uuidV4 } from 'uuid';

import {
    createContext,
    useContext,
    useEffect,
    useReducer,
    useState,
    useRef,
} from 'react';
import { generateVariation } from '../components/admin/components/product/new product/variation/variationData';

import { EditorState, ContentState } from 'draft-js';
import UpdateProduct from '../hooks/updateProduct';
import combineReducer from '../hooks/combineReducer';
import { contentReducer } from '../hooks/contentReducer';
export const newProductContext = createContext(null);

export const useNewProduct = () => {
    return useContext(newProductContext);
};

export const NewProductProvider = (props) => {
    const [variations, setVariations] = useState([]);

    const [combine, combineDispatch] = useReducer(combineReducer, {
        id: uuidV4(),
        on: false,
        options: new Map(),
    });
    const [files, setFiles] = useState([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState(() =>
        EditorState.createWithContent(ContentState.createFromText('yest'))
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

    
    const [priceValue, setPriceValue] = useState({
        value: '',
        on: false,
    });
    const [stockValue, setStockValue] = useState({ value: '', on: false });
    const [publish, setPublish] = useState({
        firstAttempt: false,
        value: false,
        count: 0,
    });

    const [gender, setGender] = useState();
    const isAllInputValid = useRef(true);

    const [modalCheck, setModalCheck] = useState(false);
    const [modalContent, contentDispatch] = useReducer(contentReducer, {
        type: 'main',
    });
    UpdateProduct(props, {
        setTitle,
        setCategory,
        setFiles,
        setGender,
        setProfile,
        setVariations,
        setPriceValue,
        setStockValue,
        combineDispatch,
        contentDispatch,

        setDescription,
    });
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
        isAllInputValid,
        publish,
        setPublish,
        combine,
        combineDispatch,
        modalCheck,
        setModalCheck,
        modalContent,
        contentDispatch,
    };

    return (
        <newProductContext.Provider value={value}>
            {props.children}
        </newProductContext.Provider>
    );
};

function publishError_Reducer(state, action) {
    if (action.type == 'default') {
        const map = new Map(state).set('default', action.data.msg[0]);
        return map;
    }
    if (action.type === 'getValidateInput') {
        const size = state.get('validateInput')?.size;

        if (size > 0) {
            action.isAllInputValid.current = false;
        } else {
            action.isAllInputValid.current = true;
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
        const map = new Map(state);
        const newMap = map.get('validateInput');
        if (newMap.has(action.path)) {
            if (newMap.size <= 1) {
                map.delete('validateInput');
                map.delete('isAllInputValid');
            } else {
                newMap.delete(action.path);
                map.set('validateInput', newMap);
            }
        }
        return map;
    }

    if (action.type == 'set') {
        const map = new Map(state);
        action?.data?.forEach((element) => {
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

    if (action == 'clearAll') {
        return new Map();
    }

    throw new Error(`please enter a valid action. ${action} is not valid.`);
}
