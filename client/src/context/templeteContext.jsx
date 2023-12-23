import { createContext, useContext, useState } from 'react';

const TemplateContext = createContext();

export const useTemplate = () => {
    return useContext(TemplateContext);
};
function TemplateProvider({ children, value }) {
    return (
        <TemplateContext.Provider value={value}>
            {children}
        </TemplateContext.Provider>
    );
}

export default TemplateProvider;
