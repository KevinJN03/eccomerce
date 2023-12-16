import { useState } from 'react';
import '../../CSS/login-signup.css';
import Input from './input';
import { Link } from 'react-router-dom';
function LoginForm({onSubmit, loading, error, setError}) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    return (
        <section className="flex w-8/12 flex-col flex-nowrap">
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
                type={'password'}
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
                onClick={() => onSubmit({password, email})}
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
        </section>
    );
}

export default LoginForm;
