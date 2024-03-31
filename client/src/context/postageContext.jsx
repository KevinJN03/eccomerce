import { createContext, useContext } from 'react';

const PostageContext = createContext(null);
export const usePostageContext = () => {
    return useContext(PostageContext);
};

function PostageContextProvider({ value, children }) {
    return (
        <PostageContext.Provider value={value}>
            {children}
        </PostageContext.Provider>
    );
}

export default PostageContextProvider;
