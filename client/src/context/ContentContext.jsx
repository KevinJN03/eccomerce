import {
    createContext,
    useContext,
    useEffect,
    useReducer,
    useState,
} from 'react';
const ContentContext = createContext(null);
export const useContent = () => {
    return useContext(ContentContext);
};
const reducer = (state, action) => {
    if (action.type === 'Edit') {
        return { ...state, type: action.type, profile: action.profile };
    }
    if (action.type === 'Main' || action.type === 'New') {
        return { ...state, type: action.type, profile: null };
    }
    if (action.type == 'clear') {
        return null;
    }
};
export function ContentProvider({ children, value }) {
    const [content, contentDispatch] = useReducer(reducer, { type: 'Main' });
    const [profile, setProfile] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);

        const timeout = setTimeout(() => {
            setLoading(false);
        }, 1000);

        return () => {
            clearTimeout(timeout);
        };
    }, [content]);

    const newValue = {
       
        ...value,
        profile,
        setProfile,
        loading,
        setLoading,
    };
    return (
        <ContentContext.Provider value={newValue}>
            {children}
        </ContentContext.Provider>
    );
}
