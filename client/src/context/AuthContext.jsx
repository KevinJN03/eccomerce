import { createContext, useEffect, useReducer, useRef, useState } from 'react';
export const AuthContext = createContext();

const authReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN': {
            localStorage.setItem('user', JSON.stringify(action.payload));
            return { ...action.payload };
        }

        case 'LOGOUT': {
            localStorage.removeItem('user');
            return { authenticated: false, user: null };
        }
        default:
            return state;
    }
};
export function AuthContextProvider({ children }) {
    const getUser = JSON.parse(localStorage.getItem('user'));
    const [authUser, authDispatch] = useReducer(authReducer, getUser);

    // const logoutFunction = ({ error }) => {
    //     console.error(error);
    //     if (error?.response?.status == 401) {
    //         authDispatch({ type: 'LOGOUT' });
    //         return navigate('/portal/login');
    //     }
    // };
    // logoutRef.current = logoutFunction;
    return (
        <AuthContext.Provider value={{ ...authUser, authDispatch }}>
            {children}
        </AuthContext.Provider>
    );
}
