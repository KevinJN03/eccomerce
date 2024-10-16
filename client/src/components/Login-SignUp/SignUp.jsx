import '../../CSS/login-signup.css';
import glamo from '../../assets/icons/glamo-black-logo.svg';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useState } from 'react';
import { SetMealRounded } from '@mui/icons-material';
import { async } from 'postcss-js';
import axios from '../../api/axios.js';
import ErrorMessage from './errorMessage';
import Button from './button';
import Interest from './interest';
import DobPicker from './dobPicker';
import SocialLogin from './socialRegister/socialLogin';
function SignUp() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [dob, setDob] = useState('');
    const [interest, setInterest] = useState('womenswear');
    const [error, setError] = useState({});
    const [visible, setVisible] = useState(false);
    const submit = async () => {
        try {
            await axios.post('user/signup', {
                firstName,
                lastName,
                email,
                password,
                dob,
                interest,
            });
        } catch (error) {
            'error while creating user:', error.response.data;

            setError(() => error.response.data);
        }
    };
    return (
        <section className="flex w-full flex-col items-center justify-center">
            <SocialLogin text={'SIGN UP WITH...'} description={true} />
            <section className="flex w-8/12 flex-col flex-nowrap">
                <h1 className="mb-9 text-center font-gotham text-base">
                    OR SIGN UP WITH EMAIL
                </h1>
                <div className="input-container">
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
                    <p>We'll send your order confirmation here</p>
                </div>

                <div className="input-container">
                    {error.firstName && <ErrorMessage msg={error.firstName} />}
                    <label htmlFor="first-name">FIRST NAME: </label>
                    <input
                        type="text"
                        id="first-name"
                        className="login-signup-input"
                        value={firstName}
                        onChange={(e) => {
                            setFirstName(e.target.value);
                            setError((prevState) => ({
                                ...prevState,
                                firstName: null,
                            }));
                        }}
                    />
                </div>
                <div className="input-container">
                    {error.lastName && <ErrorMessage msg={error.lastName} />}
                    <label htmlFor="last-name">LAST NAME: </label>
                    <input
                        type="text"
                        id="last-name"
                        className="login-signup-input"
                        value={lastName}
                        onChange={(e) => {
                            setLastName(e.target.value);
                            setError((prevState) => ({
                                ...prevState,
                                lastName: null,
                            }));
                        }}
                    />
                </div>
                <div className="input-container">
                    {error.password && <ErrorMessage msg={error.password} />}
                    <label htmlFor="password">PASSWORD: </label>

                    <div className="relative">
                        <input
                            id="password"
                            className="login-signup-input"
                            value={password}
                            type={visible ? 'text' : 'password'}
                            onChange={(e) => {
                                setPassword(e.target.value);
                                setError((prevState) => ({
                                    ...prevState,
                                    password: null,
                                }));
                            }}
                        />
                        {password.length > 0 && (
                            <button
                                onClick={() =>
                                    setVisible((prevState) => !prevState)
                                }
                                className="absolute right-2 top-1/2 translate-y-[-50%] font-bold"
                            >
                                {visible ? 'HIDE' : 'SHOW'}
                            </button>
                        )}
                    </div>
                    <p>Must be 10 or more characters</p>
                </div>

                <DobPicker
                    error={error}
                    setError={setError}
                    setDob={setDob}
                    showDescription={true}
                />
                <Interest setInterest={setInterest} interest={interest} />

                <Button text={'JOIN GLAMO'} error={error} submit={submit} />
            </section>
        </section>
    );
}

export default SignUp;
