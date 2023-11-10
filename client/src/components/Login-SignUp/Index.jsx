import '../../CSS/login-signup.css';
import glamo from '../../assets/icons/glamo-black-logo.svg';
import adminLogo from '../../assets/icons/admin.png';
import SignUp from './SignUp';
import Login from './Login';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAuth } from '../../hooks/useAuth';

function LoginSignUp({ loginorSignup, admin, handleSubmit }) {
    const [option, setOption] = useState(loginorSignup);

    const { authenticated } = useAuth();
   
    const navigate = useNavigate();
    useEffect(() => {
        console.log({ authenticated });
        if (authenticated) {
            navigate('/my-account');
        }
    }, []);
    return (
        <>
            <section className="login-signup-page ">
                <section
                    id="login-signup-container"
                    className="sm:w-[90vw] md:w-[500px] lg:w-[600px]"
                >
                    <Link
                        to={!admin && '/'}
                        className="login-logo mt-10 flex w-40 flex-nowrap items-center"
                    >
                        <img loading="lazy" src={glamo} />
                        {admin && (
                            <img
                                src={adminLogo}
                                width={'50px'}
                                height={'50px'}
                                className="object-contain"
                            />
                        )}
                    </Link>
                    <div id="login-signup-option">
                        {!admin && (
                            <>
                                <span
                                    onClick={() => setOption('signup')}
                                    className={
                                        option == 'signup'
                                            ? 'active-option'
                                            : 'not-active-option'
                                    }
                                >
                                    <Link to={!admin && '/signup'}>Join</Link>
                                </span>
                                <span id="midldle-border"></span>
                            </>
                        )}
                        <span
                            onClick={() => setOption('login')}
                            className={
                                option == 'login'
                                    ? 'active-option'
                                    : 'not-active-option'
                            }
                        >
                            <Link to={!admin && '/login'}>Sign In</Link>
                        </span>
                    </div>
                    <section id="form-container">
                        {loginorSignup == 'login' && (
                            <Login admin={admin} handleSubmit={handleSubmit} />
                        )}
                        {loginorSignup == 'signup' && <SignUp />}
                    </section>
                </section>
                <div className="mt-2 flex flex-row gap-2 pb-5 text-xs underline underline-offset-2">
                    <span>
                        <a href="/pages/privacy-policy">Privacy Policy</a>
                    </span>
                    <span className="middle-seperator"></span>
                    <span>
                        <a href="/pages/terms-of-service">Term Of Service</a>
                    </span>
                </div>
            </section>
        </>
    );
}

export default LoginSignUp;
