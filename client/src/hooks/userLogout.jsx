import { useEffect, useRef, useState } from 'react';
import { useAuth } from './useAuth';
import { useNavigate } from 'react-router-dom';

function userLogout() {
    const { authDispatch } = useAuth();

    const navigate = useNavigate();
    const [logout, setLogout] = useState();
    const logoutRef = useRef(null);

    useEffect(() => {
        const logoutFunction = ({ error }) => {
            if (error?.response?.status == 401) {
                authDispatch({ type: 'LOGOUT' });
                return navigate('/portal/login');
            }
        };
        setLogout(() => logoutFunction);

        logoutRef.current = logoutFunction;
    }, []);

    return { logoutUser: logoutRef.current };
}

export default userLogout;
