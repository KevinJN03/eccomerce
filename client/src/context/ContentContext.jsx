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
};
export function ContentProvider({ children, value }) {
    const [content, dispatch] = useReducer(reducer, { type: 'Main' });
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
        // content,
        // dispatch,
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
