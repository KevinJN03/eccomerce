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
import _ from 'lodash';
export const NewProductContext = createContext(null);

export const useNewProduct = () => {
    return useContext(NewProductContext);
};

export const NewProductProvider = (props) => {
    const [variations, setVariations] = useState([]);
    const [loading, setLoading] = useState(false);
    const [combine, combineDispatch] = useReducer(combineReducer, {
        id: uuidV4(),
        on: false,
        options: new Map(),
    });
    const [files, setFiles] = useState([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [profile, setProfile] = useState({});

    const [category, setCategory] = useState();
    const [publishError, publishErrorDispatch] = useReducer(
        publishError_Reducer,
        {}
    );

    // const [priceValue, setPriceValue] = useState({
    //     value: '',
    //     on: false,
    // });
    const [priceValue, setPriceValue] = useState(null);
    const [stockValue, setStockValue] = useState(null);

    // const [stockValue, setStockValue] = useState({ value: '', on: false });
    const [publish, setPublish] = useState({
        firstAttempt: false,
        value: false,
        count: 0,
    });

    const [gender, setGender] = useState(null);
    const [modalCheck, setModalCheck] = useState(false);
    const [modalContent, contentDispatch] = useReducer(contentReducer, {
        type: 'main',
    });

    const [currentSection, setCurrentSection] = useState('available');
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
        loading,
        setLoading,
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

        publishError,
        publishErrorDispatch,
        priceValue,
        setPriceValue,
        stockValue,
        setStockValue,

        publish,
        setPublish,
        combine,
        combineDispatch,
        modalCheck,
        setModalCheck,
        modalContent,
        contentDispatch,
        product: props?.singleValue,
        currentSection,
        setCurrentSection,
    };

    return (
        <NewProductContext.Provider value={value}>
            {props.children}
        </NewProductContext.Provider>
    );
};

function publishError_Reducer(state, action) {
    if (action.type == 'SET') {
        // action?.data?.forEach((element) => {
        //     const { path } = element;
        //     map.set(path, element);
        // });
        return action.data;
    }

    if (action.type == 'ADD') {
        const newState = _.cloneDeep(state);
        _.set(newState, action.path, action.msg);

        return newState;
    }

    if (action.type == 'default') {
        return { ...state, default: _.get(action, 'data.msg.0') };
    }
    if (action.type === 'getValidateInput') {
        // const size = _.get(state, 'validateInput')?.length;

        // if (size > 0) {
        //     action.isAllInputValid.current = false;
        // } else {
        //     action.isAllInputValid.current = true;
        // }

        return state;
    }
    if (action == 'clearValidateInput') {
        const newState = _.cloneDeep(state);
        _.unset(newState, 'validateInput');
        return newState;
    }

    // if (action.type == 'addToValidateInput2') {
    //     return action.map;
    // }

    // if (action.type == 'addToValidateInput') {

    //     const newState = _.cloneDeep(state)
    //     if (!_.has(newState, 'validateInput')) {
    //         const map = new Map(state);
    //         return map.set(
    //             'validateInput',
    //             new Map([[action.path, action.error]])
    //         );
    //     }
    //     const getMap = state.get('validateInput');

    //     if (!getMap.has(action.path)) {
    //         const map = new Map(getMap);
    //         map.set(action.path, action.error);

    //         const newMap = new Map(state).set('validateInput', map);
    //         return newMap;
    //     } else {
    //         return state;
    //     }
    // }
    if (action.type == 'deleteValidateInput') {
        const newState = _.cloneDeep(newState);
        const validateInputObj = _.get(newState, 'validateInput');

        if (_.has(validateInputObj, action.path)) {
            if (_.keys(validateInputObj).length <= 1) {
                _.unset(newState, 'validateInput');
                _.unset(newState, 'isAllInputValid');
            } else {
                _.unset(validateInputObj, action.path);
                _.set(newState, 'validateInput', validateInputObj);
            }
        }

        return newState;
        // if (newMap.has(action.path)) {
        //     if (newMap.size <= 1) {
        //         map.delete('validateInput');
        //         map.delete('isAllInputValid');
        //     } else {
        //         newMap.delete(action.path);
        //         map.set('validateInput', newMap);
        //     }
        // }
        // return map;
    }

    if (action.type == 'CLEAR') {
        const newState = _.cloneDeep(state);
        _.unset(newState, action.path);

        return newState;
    }

    if (action == 'clearAll') {
        return {};
    }

    throw new Error(`please enter a valid action. ${action} is not valid.`);
}
