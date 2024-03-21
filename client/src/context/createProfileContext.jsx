import { createContext, useContext, useRef } from 'react';

const CreateProfileContext = createContext(null);

export const useCreateProfileContext = () => {
    return useContext(CreateProfileContext);
};

function CreateProfileContextProvider({ children, value }) {
    const clickAwayRefs = useRef({});

    const values = {
       ...value
    
    };
    return (
        <CreateProfileContext.Provider value={values}>
            {children}
        </CreateProfileContext.Provider>
    );
}

export default CreateProfileContextProvider;
