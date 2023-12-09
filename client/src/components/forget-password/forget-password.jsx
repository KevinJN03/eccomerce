import { useState } from 'react';
import Input from '../Login-SignUp/input';

function ForgetPassword({}) {
    const [error, setError] = useState({});
    const [email, setEmail] = useState('');


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
        className: 'text-dark-gray'
    };
    return (
        <section className="mb-12 flex flex-col items-center w-9/12 ">
            <h3 className="mb-5 font-gotham text-lg font-semibold tracking-wider font-black">
                RESET YOUR PASSWORD
            </h3>
            <p className="mb-12 text-s ">
                Type in your email address below and we'll send you an email
                with instructions on how to create a new password
            </p>

            <section className='w-9/12'>
                <Input {...props} />
                <button className="w-full bg-[#2d2d2d] py-3 text-center font-gotham text-sm font-semibold text-white transition-all hover:opacity-70">
                    RESET PASSWORD
                </button>
            </section>
        </section>
    );
}

export default ForgetPassword;
