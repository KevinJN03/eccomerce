import { PasswordSharp } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from '../../api/axios.js';
import '../../CSS/login-signup.css';
import ErrorMessage from './errorMessage';
import Input from './input';
import { useAuth } from '../../hooks/useAuth';
import LoginForm from './loginForm';
import { usePortalContext } from '../../context/portalContext';

const URL = import.meta.env.VITE_BACKEND_URL;
function Login({}) {
    const [error, setError] = useState({ email: null, password: null });

    const [loadState, setLoadState] = useState(false);
    const navigate = useNavigate();
    const { authDispatch } = useAuth();

    const onSubmit = ({ email, password }) => {
        setLoadState(true);

        axios
            .post('user/login', { email, password })
            .then((res) => {
                setTimeout(() => {
                    setLoadState(() => false);
                }, 1000);

                authDispatch({ type: 'LOGIN', payload: res.data });
                navigate(-1);
            })
            .catch((error) => {
                setTimeout(() => {
                    setLoadState(() => false);
                    setError(error.response.data);
                }, 1000);
                'error at user login: ', error;
            });
    };

    return (
        <LoginForm
            onSubmit={onSubmit}
            loading={loadState}
            error={error}
            setError={setError}
        />
    );
}

export default Login;
