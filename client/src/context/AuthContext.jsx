import { createContext, useEffect, useReducer, useState } from 'react';
import axios from '../api/axios';

export const AuthContext = createContext();

const authReducer = (state, action) => {
    switch (action.type) {
        case 'ONMOUNT': {
            return { ...action.payload };
        }

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
    return (
        <AuthContext.Provider value={{ ...authUser, authDispatch }}>
            {children}
        </AuthContext.Provider>
    );
}
