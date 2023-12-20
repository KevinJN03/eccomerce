import { PasswordSharp } from '@mui/icons-material';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from '../../api/axios';
import '../../CSS/login-signup.css';
import ErrorMessage from './errorMessage';
import Input from './input';
import { useAuth } from '../../hooks/useAuth';
import LoginForm from './loginForm';

const URL = import.meta.env.VITE_BACKEND_URL;
function Login({}) {
    const [error, setError] = useState({ email: null, password: null });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { authDispatch } = useAuth();
    const onSubmit = ({ email, password }) => {
        setLoading(true);

        axios
            .post('user/login', { email, password })
            .then((res) => {
                setTimeout(() => {
                    setLoading(() => false);
                }, 1000);

            
                authDispatch({ type: 'LOGIN', payload: res.data });
                navigate(-1);
            })
            .catch((error) => {
                setTimeout(() => {
                    setLoading(() => false);
                    setError(error.response.data);
                }, 1000);
                'error at user login: ', error;
            });
    };

    const googleLogin = () => {
        window.open(`${URL}/user/login/google`, '_self');
    };

    const appleLogin = () => {

    }
   const facebookLogin = () => {

   }
    return (
        <LoginForm
            onSubmit={onSubmit}
            loading={loading}
            error={error}
            setError={setError}
          
        />
    );
}

export default Login;
