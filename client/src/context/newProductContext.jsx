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
import publishError_Reducer from '../hooks/publishErrorReducer';
export const NewProductContext = createContext(null);

export const useNewProduct = () => {
    return useContext(NewProductContext);
};

export const NewProductProvider = (props) => {
    const [temporaryVariation, setTemporaryVariation] = useState([]);
    const [variations, setVariations] = useState([]);
    const [loading, setLoading] = useState(false);
    const [combine, combineDispatch] = useReducer(combineReducer, {
        _id: uuidV4(),
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
        temporaryVariation,
        setTemporaryVariation,
        setDescription,
    });
    const value = {
        temporaryVariation,
        setTemporaryVariation,
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


