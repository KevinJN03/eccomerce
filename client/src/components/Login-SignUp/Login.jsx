import { PasswordSharp } from '@mui/icons-material';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from '../../api/axios';
function Login({ handleSubmit, admin }) {
    const [email, setEmail] = useState('');
    const [error, setError] = useState({ email: null, password: null });
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const onSubmit = (e) => {
        e.preventDefault();
        console.log('user login', e);

        setLoading(true);

        axios
            .post('/user/login', { email, password })
            .then((res) => {
                setTimeout(() => {
                    setLoading(() => false);
                }, 1000);

                console.log(res.data);
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
            <div className="input-container">
                <div className="relative">
                    {error.email && <ErrorMessage msg={error.email} />}
                    <label htmlFor="email-address">EMAIL ADDRESS: </label>
                    <input
                        type="email"
                        name="email"
                        id="email-address"
                        className="login-signup-input"
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);

                            setError((prevState) => ({
                                ...prevState,
                                email: null,
                            }));
                        }}
                    />
                </div>
            </div>
            <div className="input-container">
                <div className="relative">
                    {error.password && <ErrorMessage msg={error.password} />}
                    <label htmlFor="password">PASSWORD: </label>

                    <input
                        type="password"
                        id="password"
                        name="password"
                        className="login-signup-input"
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value);
                            setError((prevState) => ({
                                ...prevState,
                                password: null,
                            }));
                        }}
                    />
                </div>
            </div>

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

export function ErrorMessage({ msg }) {
    return (
        <section className=" absolute !top-[-15px] right-0 !z-10 !max-w-[80%]">
            <div className="promo-error border-1 relative  flex w-full border-red-500 bg-red-100 p-2">
                <p className=" whitespace-[initial] w-full break-words font-light tracking-wider">
                    {msg}
                </p>
                <span className="triangle absolute bottom-[-15px] left-3 !z-[1] h-0 w-0 border-l-[10px] border-r-[10px] border-t-[15px] border-l-transparent border-r-transparent border-t-red-500">
                    <span className="inner-triangle relative right-2.5 top-[-4px] h-0  w-0 border-l-[10px] border-r-[10px] border-t-[12px] border-l-transparent border-r-transparent border-t-red-100  "></span>
                </span>
            </div>
        </section>
    );
}
