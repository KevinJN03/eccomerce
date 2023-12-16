import LoginForm from '../../Login-SignUp/loginForm';
import { useState } from 'react';
import { adminAxios } from '../../../api/axios';
import { useAdminContext } from '../../../context/adminContext.jsx';

import { useNavigate } from 'react-router-dom';
function AdminLogin({}) {
    const [error, setError] = useState({ email: null, password: null });
    const [loading, setLoading] = useState(false);

    const { authAdminUser, adminDispatch } = useAdminContext();

    const navigate = useNavigate();
    const onSubmit = async ({ email, password }) => {
        console.log('test');
        try {
            setLoading(() => true);
            const { data } = await adminAxios.post('login', {
                email,
                password,
            });
            console.log({ data });

            adminDispatch({ type: 'LOGIN', payload: data });

            navigate('/admin');
        } catch (error) {
            console.error('error while login in admin', error);
            setError((prevError) => ({
                ...prevError,
                ...error?.response?.data?.error,
            }));
        } finally {
            setTimeout(() => {
                setLoading(false);
            }, 1000);
        }
    };
    return (
        <LoginForm
            onSubmit={onSubmit}
            error={error}
            setError={setError}
            loading={loading}
        />
    );
}

export default AdminLogin;
