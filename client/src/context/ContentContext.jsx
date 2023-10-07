import {
    createContext,
    useContext,
    useEffect,
    useReducer,
    useState,
} from 'react';
import Main from '../components/admin/components/product/new product/delivery/Main';
import New from '../components/admin/components/product/new product/delivery/New';
const ContentContext = createContext(null);
export const useContent = () => {
    return useContext(ContentContext);
};
const reducer = (state, action) => {

    if (action.type === 'Edit') {
        return { ...state, type: action.type, profile: action.profile };
    }

    if (action.type === 'Main' || action.type === 'New') {
        return { ...state, type: action.type,  profile: null };
    }
    
};
export function ContentProvider({ children }) {
    const [content, dispatch] = useReducer(reducer, { type: 'Main' });
    const [modalCheck, setModalCheck] = useState(false);
    const [profile, setProfile] = useState([]);
    const [loading, setLoading] = useState(false);
    const value = {
        content,
        dispatch,
        modalCheck,
        setModalCheck,
        profile,
        setProfile,
        loading,
        setLoading,
    };
    return (
        <ContentContext.Provider value={value}>
            {children}
        </ContentContext.Provider>
    );
}
