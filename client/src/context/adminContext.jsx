import { createContext, useContext } from 'react';


const AdminContext = createContext(null);

export const useAdminContext = () => {
    return useContext(AdminContext);
};
export function AdminContextProvider({ children, value }) {
    return (
        <AdminContext.Provider value={value}>{children}</AdminContext.Provider>
    );
}
