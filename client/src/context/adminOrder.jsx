import { createContext, useContext } from 'react';

const AdminOrderContext = createContext(null);

export const useAdminOrderContext = () => {
    return useContext(AdminOrderContext);
};

export default function AdminOrderContextProvider({ children, value }) {
    return (
        <AdminOrderContext.Provider value={value}>
            {children}
        </AdminOrderContext.Provider>
    );
}
