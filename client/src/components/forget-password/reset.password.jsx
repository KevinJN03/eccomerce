import { useState } from 'react';
import Input from '../Login-SignUp/input';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import axios from '../../api/axios';
import { AnimatePresence, motion } from 'framer-motion';

function ResetPassword({}) {
    const [submit, setSubmit] = useState(false);
    const [error, setError] = useState({});
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [testPassword, setTestPassword] = useState('');
    const [searchParams, setSearchParams] = useSearchParams();

    const [email, setEmail] = useState(() => searchParams.get('email'));

    const [token, setToken] = useState(() => searchParams.get('pwrt'));

    const navigate = useNavigate();
    const inputProps = {
        error,
        setError,
        asterisk: false,
        manyProperty: false,
        errorMsgClassName: 'top-[-50px]',
    };

    const onSubmit = async () => {
        try {
            setSubmit(() => true);

            if (password.length < 10) {
                setError((prevState) => ({
                    ...prevState,
                    password: 'Password must be between 10 to 20 characters.',
                }));
                return;
            }
            if (password != confirmPassword) {
                setError((prevState) => ({
                    ...prevState,
                    confirmPassword: 'Password does not match.',
                }));
                return;
            }
            const { data } = await axios.post('reset-password', {
                email,
                token,
                password,
                confirmPassword,
            });

            navigate('/portal/login');
        } catch (error) {
            console.error('error while resetting password:', error);

            if (error.response?.status == 400) {
                setError(() => error.response.data?.error);
            }

            if (error.response?.status == 500) {
                console.log(error.response.data);

                if (error.response.data?.expired) {
                    setError((prevState) => ({
                        ...prevState,
                        general:
                            'Your reset password link has expired. Please request a new reset link',
                    }));
                } else {
                    setError((prevState) => ({
                        ...prevState,
                        general:
                            'Your reset password link is invalid. Please request a new reset link',
                    }));
                }
                setError((prevState) => ({
                    ...prevState,
                    general: error.response.data,
                }));
            }
        } finally {
            console.log('finally');
            setTimeout(() => {
                setSubmit(() => false);
            }, 1000);
        }
    };

    const variants = {
        initial: {
            opacity: 0,
            // width: 0,
            translateX: 50,
        },
        animate: {
            opacity: 1,
            // width: 'auto',
            translateX: 0,
            transition: { duration: 0.8 },
        },
        exit: {
            opacity: 0,
            translateX: 50,
            transition: { duration: 0.8 },
        },
    };

    const removeError = (e) => {
        e.preventDefault();
        console.log('remove error');
        setError((prevState) => ({
            ...prevState,
            general: null,
        }));
    };

    const onFocus = (e) => {
        e.target.setAttribute('autocomplete', 'off');
    };

    const errorMessage = () => {
        if (error?.general?.expired) {
            return (
                <p>
                    Your reset password link has expired. Please request a new{' '}
                    <Link
                        to={'/portal/forget-password'}
                        className="underline decoration-1 underline-offset-4"
                    >
                        {' '}
                        reset link
                    </Link>
                    .
                </p>
            );
        } else if (error.general?.invalid) {
            return (
                <p>
                    Your reset password link is invalid. Please request a{' '}
                    <Link
                        to={'/portal/forget-password'}
                        className="underline decoration-1 underline-offset-4"
                    >
                        {' '}
                        reset link
                    </Link>
                    .
                </p>
            );
        } else {
            return (
                <p>
                    An error eccured while trying to reset your password. Please
                    try again later
                </p>
            );
        }
    };
    return (
        <section className="mb-8 flex w-8/12 flex-col flex-nowrap items-center">
            <h3 className="mb-8 font-gotham text-lg">RESET YOUR PASSWORD</h3>
            <AnimatePresence>
                {error?.general && (
                    <motion.div
                        variants={variants}
                        animate={'animate'}
                        exit={'exit'}
                        initial={'initial'}
                        role="alert"
                        className="alert alert-error mb-4 w-full !rounded-none"
                    >
                        <svg
                            onClick={removeError}
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6 shrink-0 cursor-pointer stroke-current transition-all hover:scale-105"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                        <span>{errorMessage()}</span>
                    </motion.div>
                )}
            </AnimatePresence>
            <div className={`input-container`}>
                <label htmlFor="email-display p-0 m-0">EMAIL :</label>
                <p className="!m-0 flex h-12 cursor-not-allowed items-center border-[1px] border-black px-4 !text-sm">
                    {email}
                </p>
            </div>
            <Input
                {...inputProps}
                setValue={setPassword}
                value={password}
                property={'password'}
                name={'newPassword1'}
                label={'PASSWORD'}
                autoComplete={'off'}
                type={'password'}
            />
            <Input
                {...inputProps}
                setValue={setConfirmPassword}
                value={confirmPassword}
                property={'confirmPassword'}
                label={'CONFIRM PASSWORD'}
                autoComplete={'off'}
                name={'newPassword2'}
                type={'password'}
            />

            <button
                onClick={onSubmit}
                type="button"
                className={`${
                    submit ? 'opacity-50' : 'opacity-100'
                } w-full bg-[#2d2d2d] py-3 font-gotham text-sm tracking-wider text-white transition-all hover:opacity-50`}
            >
                FINISHED!
            </button>
        </section>
    );
}

export default ResetPassword;
