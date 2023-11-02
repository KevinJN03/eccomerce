import { PasswordSharp } from '@mui/icons-material';
import { useState } from 'react';
import { Link } from 'react-router-dom';
function Login({ handleSubmit, admin }) {
    const [email, setEmail] = useState('');
    const [error, setError] = useState({ email: null, password: null });
    const [password, setPassword] = useState('');
    const onSubmit = () => {
        console.log('user login');
    };
    return (
        <>
            <div className="input-container">
                <div className="relative">
                    {error.email && <ErrorMessage msg={error.email} />}
                    <label htmlFor="email-address">EMAIL ADDRESS: </label>
                    <input
                        type="email"
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
                        id="passworde"
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

                disabled={error.email || error.password}
                onClick={() =>
                    admin
                        ? handleSubmit({ email, password }, setError)
                        : onSubmit
                }
            >
                SIGN IN
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
