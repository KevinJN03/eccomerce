import '../../CSS/login-signup.css';
import glamo from '../../assets/icons/glamo-black-logo.svg';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useState } from 'react';
import { SetMealRounded } from '@mui/icons-material';
import { async } from 'postcss-js';
import axios from '../../api/axios';
import { ErrorMessage } from './Login';
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
            console.log('error while creating user:', error.response.data);

            setError(() => error.response.data);
        }
    };
    return (
        <>
            <h1 className="mb-9 text-center text-xl font-bold">
                SIGN UP WITH EMAIL
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
                        type="password"
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

            <div className="input-container">
                {error.dob && <ErrorMessage msg={error.dob} />}
                <label htmlFor="dob">DATE OF BIRTH: </label>
                {/* <input type="date" id="passworde" class="login-signup-input"/> */}
                <div className="date-picker">
                    <DatePicker
                        views={['day', 'month', 'year']}
                        slotProps={{
                            textField: { size: 'small', fullWidth: true },
                        }}
                        onChange={(e) => {
                            setDob(e.format());
                            setError((prevState) => ({
                                ...prevState,
                                dob: null,
                            }));
                        }}
                    />
                </div>

                <p>
                    You need to be 18 or over to use{' '}
                    <span className="tracking-wider">GLAMO</span>
                </p>
            </div>
            <div className="input-container">
                <label>MOSTLY INTERESTED IN:</label>
                <div id="radio-wrapper">
                    <div className="radio-containers">
                        <input
                            type="radio"
                            name="interest"
                            id="womenswear"
                            value={'womenswear'}
                            defaultChecked
                            onChange={(e) => setInterest(e.target.value)}
                        />
                        <label htmlFor="womenswear">Womenswear</label>
                    </div>
                    <div className="radio-containers">
                        <input
                            type="radio"
                            name="interest"
                            id="menswear"
                            value={'menswear'}
                            onChange={(e) => setInterest(e.target.value)}
                        />
                        <label htmlFor="womenswear">Menswear</label>
                    </div>
                </div>
            </div>

            <button
                type="button"
                className="login-signup-btn"
                onClick={submit}
                disabled={Object.values(error).some((item) => item != null)}
            >
                JOIN GLAMO
            </button>
        </>
    );
}

export default SignUp;
