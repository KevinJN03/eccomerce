import { useEffect, useState } from 'react';
import { useAuth } from './useAuth';
import { useNavigate } from 'react-router-dom';

function userLogout() {
    const { authDispatch } = useAuth();

    const navigate = useNavigate();
    const [logout, setLogout] = useState();

    useEffect(() => {
        const logoutFunction = ({ error }) => {
            if (error?.response?.status == 401) {
                authDispatch({ type: 'LOGOUT' });
                return navigate('/portal/login');
            }
        };
        setLogout(() => logoutFunction);
    }, []);

    return { logoutUser: logout };
}

export default userLogout;
