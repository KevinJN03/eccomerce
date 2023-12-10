import { useState } from 'react';
import Input from '../Login-SignUp/input';
import emailValidator from 'email-validator';
import { useNavigate } from 'react-router-dom';
import axios from '../../api/axios';
function ForgetPassword({}) {
    const [error, setError] = useState({});
    const [email, setEmail] = useState('');
    const [submit, setSubmit] = useState(false);
    const navigate = useNavigate();
    const props = {
        error,
        value: email,
        setValue: setEmail,
        property: 'email',
        label: 'EMAIL ADDRESS',
        setError,
        asterisk: false,
        autoComplete: 'email',
        manyProperty: false,
        className: 'text-dark-gray',
        errorMsgClassName: 'top-[-50px]',
    };

    const onSubmit = async (e) => {
        try {
            e.preventDefault();

            setSubmit(true);

            const isValid = emailValidator.validate(email);
            console.log({ isValid });

            if (!isValid) {
                setError({
                    email: 'Email fail! Please type in your correct email address',
                });
                setSubmit(() => false);
                return;
            } else {
                const { data } = await axios.post('/forget-password', {
                    email,
                });
                console.log({ data });
                navigate('sent');
            }
        } catch (error) {
            console.error('error while sending password reset link', error);

            if (error?.response?.status == 404) {
                setError(() => ({ ...error.response.data.error }));
            }
        } finally {
            setTimeout(() => {
                setSubmit(false);
            }, 1000);
        }
    };
    return (
        <section className="mb-12 flex w-9/12 flex-col items-center ">
            <h3
                className={`mb-5 font-gotham text-lg font-black font-semibold tracking-wider`}
            >
                RESET YOUR PASSWORD
            </h3>
            <p className="mb-12 text-s ">
                Type in your email address below and we'll send you an email
                with instructions on how to create a new password
            </p>

            <section className="w-9/12">
                <Input {...props} />
                <button
                    type="button"
                    onClick={onSubmit}
                    className={`w-full bg-[#2d2d2d] py-3 text-center font-gotham text-sm font-semibold text-white transition-all hover:opacity-70  ${
                        submit ? 'opacity-50' : 'bg-opacity-100'
                    }`}
                >
                    {submit ? 'SUBMITTING' : 'RESET PASSWORD'}
                </button>
            </section>
        </section>
    );
}

export default ForgetPassword;
