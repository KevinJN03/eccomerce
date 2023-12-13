import { createContext, useContext, useReducer, useState } from 'react';
import { AdminReducer } from '../hooks/adminReducer';

const AdminContext = createContext(null);

export const useAdminContext = () => {
    return useContext(AdminContext);
};

const reducer = (state, action) => {
    if (action.type == 'LOGIN') {
        localStorage.setItem('adminUser', JSON.stringify(action?.payload));
        return { ...action?.payload };
    }
    if (action.type == 'LOGOUT') {
        return;
    }

    throw new Error('invalid action type for admin Reducer');
};



export function AdminContextProvider({ children }) {
    const getAdminUser = JSON.parse(localStorage.getItem('adminUser'));
    const [authAdminUser, authAdminUserDispatch] = useReducer(reducer, getAdminUser);
    const [modalCheck, setModalCheck] = useState(false);
    const [loading, setLoading] = useState(false);
    const [modalContent, adminDispatch] = useReducer(AdminReducer, {
        type: 'main',
    });
    const value = {
        modalCheck,
        setModalCheck,
        loading,
        setLoading,
        modalContent,
        adminDispatch,
        authAdminUser,
        adminDispatch,
    };
    return (
        <AdminContext.Provider
            value={{ ...value, authAdminUser, adminDispatch }}
        >
            {children}
        </AdminContext.Provider>
    );
}
