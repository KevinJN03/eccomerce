import { useState } from 'react';
import '../../CSS/login-signup.css';
import Input from './input';
import { Link } from 'react-router-dom';

import google_icon from '../../assets/icons/google-icon.png';
import facebook_icon from '../../assets/icons/facebook-icon.png';
import apple_icon from '../../assets/icons/apple-icon.png';
function LoginForm({ onSubmit, loading, error, setError, googleLogin,appleLogin,
    facebookLogin  }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <section className="flex w-full flex-col flex-nowrap justify-center">
            <section className="flex w-8/12 flex-col flex-nowrap  self-center">
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
                    onClick={() => onSubmit({ password, email })}
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

            <section className="flex w-full flex-col justify-center self-center">
                <h3 className="mb-8 text-center font-gotham text-base">
                    OR SIGN IN WITH...
                </h3>

                <div className="mb-8 flex w-full justify-center gap-x-3 px-12">
                    {[
                        {
                            text: 'GOOGLE',
                            icon: google_icon,
                            onClick: googleLogin,
                        },
                        { text: 'APPLE', icon: apple_icon, onClick: appleLogin },
                        {
                            text: 'FACEBOOK',
                            icon: facebook_icon,
                            onClick: facebookLogin,
                            className:
                                'brightness-0 invert',
                        },
                    ].map(({ icon, text, onClick, className }, idx) => {
                        return (
                            <button
                                className={`flex flex-1 flex-row flex-nowrap items-center gap-x-3 border-2 px-4 py-3 `}
                                onClick={onClick}
                            >
                                <div
                                    className={`h-5 w-5 self-start ${idx == 2 ? 'bg-[#4267B2] p-1' : ''} rounded-full flex justify-center items-center`}
                                >
                                    <img
                                        className={` h-full w-full ${
                                            className || ''
                                        }`}
                                        src={icon}
                                        alt={`${text?.toLowerCase()} icon`}
                                    />
                                </div>

                                <p className="mx-auto font-gotham tracking-wide">
                                    {text}
                                </p>
                            </button>
                        );
                    })}
                </div>
            </section>
        </section>
    );
}

export default LoginForm;
