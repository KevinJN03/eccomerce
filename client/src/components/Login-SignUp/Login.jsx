import { PasswordSharp } from '@mui/icons-material';
import { useState } from 'react';
import { Link,  useNavigate } from 'react-router-dom';
import axios from '../../api/axios';

import ErrorMessage from './errorMessage';
import Input from './input';
import { useAuth } from '../../hooks/useAuth';
function Login({ handleSubmit, admin }) {
    const [email, setEmail] = useState('');
    const [error, setError] = useState({ email: null, password: null });
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { authDispatch } = useAuth();
    const onSubmit = (e) => {
        e.preventDefault();
        console.log('user login', e);

        setLoading(true);

        axios
            .post('user/login', { email, password })
            .then((res) => {
                setTimeout(() => {
                    setLoading(() => false);
                }, 1000);

                console.log('login data: ', res.data);
                authDispatch({ type: 'LOGIN', payload: res.data });
                navigate(-1)
            })
            .catch((error) => {
                setTimeout(() => {
                    setLoading(() => false);
                    setError(error.response.data);
                }, 1000);
                console.log('error at user login: ', error);
            });
    };
    return (
        <>
            <Input
                value={email}
                property={'email'}
                setValue={setEmail}
                error={error}
                setError={setError}
                label={'EMAIL ADDRESS'}
            />
            <Input
                value={password}
                property={'password'}
                setValue={setPassword}
                error={error}
                setError={setError}
                label={'PASSWORD'}
            />

            <Link
                to="/forget-password"
                className="text-s font-normal tracking-wide"
            >
                Forgot password?
            </Link>
            <button
                type="button"
                className="login-signup-btn "
                disabled={error.email || error.password || loading}
                onClick={(e) =>
                    admin
                        ? handleSubmit({ email, password }, setError)
                        : onSubmit(e)
                }
            >
                {loading ? (
                    <svg
                        className="spinner-ring spinner-sm !m-0 !p-0 [--spinner-color:var(--test123)]"
                        viewBox="25 25 50 50"
                        strokeWidth="5"
                    >
                        <circle cx="50" cy="50" r="20" />
                    </svg>
                ) : (
                    <span className="text-white">SIGN IN</span>
                )}
            </button>
        </>
    );
}

export default Login;
