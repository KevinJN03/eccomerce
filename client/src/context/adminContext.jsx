import { createContext, useContext, useReducer, useState } from 'react';
import { AdminReducer } from '../hooks/adminReducer';
import { useNavigate } from 'react-router-dom';
import { adminAxios } from '../api/axios.js';

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
        return {};
    }

    throw new Error(
        'invalid action type for admin Reducer' + JSON.stringify(action)
    );
};

export function AdminContextProvider({ children, newValue }) {
    const getAdminUser = JSON.parse(localStorage.getItem('adminUser'));
    const [authAdminUser, authAdminUserDispatch] = useReducer(
        reducer,
        getAdminUser
    );
    const navigate = useNavigate();
    const [modalCheck, setModalCheck] = useState(false);
    const [loading, setLoading] = useState(false);
    const [modalContent, adminDispatch] = useReducer(AdminReducer, {
        type: 'main',
    });

    const logoutUser = ({ error }) => {
        if (error?.response?.status == 401) {
            authAdminUserDispatch({ type: 'LOGOUT' });
            return navigate('/admin/login');
        }
    };

    const value = {
        logoutUser,
        modalCheck,
        setModalCheck,
        loading,
        setLoading,
        modalContent,
        adminDispatch,
        authAdminUser,
        adminDispatch,
        ...newValue,
        authAdminUserDispatch,
    };
    return (
        <AdminContext.Provider
            value={{ ...value, authAdminUser, adminDispatch }}
        >
            {children}
        </AdminContext.Provider>
    );
}
