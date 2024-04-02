import { useEffect, useRef, useState } from 'react';
import { useAuth } from './useAuth';
import { useNavigate } from 'react-router-dom';

function UserLogout() {
    const { authDispatch } = useAuth();

    const navigate = useNavigate();

    const logoutRef = useRef(null);
    const logoutFunction = ({ error }) => {
        console.error(error);
        if (error?.response?.status == 401) {
            authDispatch({ type: 'LOGOUT' });
            return navigate('/portal/login');
        }
    };
    logoutRef.current = logoutFunction;

    return { logoutUser: logoutRef.current };
}

export default UserLogout;
