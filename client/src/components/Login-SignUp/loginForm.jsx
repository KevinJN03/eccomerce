import { useEffect, useState } from 'react';
import '../../CSS/login-signup.css';
import Input from './input';
import { Link } from 'react-router-dom';

import google_icon from '../../assets/icons/google-icon.png';
import facebook_icon from '../../assets/icons/facebook-icon.png';
import apple_icon from '../../assets/icons/apple-icon.png';
import SocialLogin from './socialRegister/socialLogin';
function LoginForm({ onSubmit, loading, error, setError }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        const handleKeyPress = (e) => {
            console.log('hi', e.key, { password, email });

            if (e.key == 'Enter') {
                onSubmit({ password, email });
            }
        };
        document.addEventListener('keydown', handleKeyPress);

        return () => {
            document.removeEventListener('keydown', handleKeyPress);
        };
    }, []);

    return (
        <section className="flex  h-full w-full flex-col flex-nowrap justify-center">
            <section className="flex h-full  w-8/12 flex-col flex-nowrap  self-center">
                <Input
                    value={email}
                    property={'email'}
                    setValue={setEmail}
                    error={error}
                    setError={setError}
                    label={'EMAIL ADDRESS'}
                    autoComplete={'email'}
                />
                <Input
                    value={password}
                    property={'password'}
                    setValue={setPassword}
                    error={error}
                    setError={setError}
                    label={'PASSWORD'}
                    type={'password'}
                    autoComplete={'current-password'}
                />

                <Link
                    to="/portal/forget-password"
                    className="self-center text-center text-s font-normal tracking-wide underline-offset-4 transition-all hover:underline"
                >
                    Forgot password?
                </Link>
                <button
                    type="button"
                    className="login-signup-btn"
                    disabled={error.email || error.password || loading}
                    onClick={() => onSubmit({ password, email })}
                >
                    {loading ? (
                        <svg
                            className="spinner-ring spinner-sm !m-0 !p-0 ![--spinner-color:var(--test123)]"
                            viewBox="25 25 50 50"
                            strokeWidth="5"
                        >
                            <circle cx="50" cy="50" r="20" />
                        </svg>
                    ) : (
                        <span className="text-white">SIGN IN</span>
                    )}
                </button>
            </section>
            <SocialLogin text={'OR SIGN IN WITH...'} />
        </section>
    );
}

export default LoginForm;
