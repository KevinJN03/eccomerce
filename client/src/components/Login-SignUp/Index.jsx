import '../../CSS/login-signup.css';
import glamo from '../../assets/icons/glamo-black-logo.svg';
import adminLogo from '../../assets/icons/admin.png';
import SignUp from './SignUp';
import Login from './Login';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import disableLayout from '../../hooks/disableLayout';

function LoginSignUp({ loginorSignup, admin, handleSubmit }) {
    disableLayout();
    const [option, setOption] = useState(loginorSignup);

    const location = useLocation();

    useEffect(() => {
        console.log({ location });
        const route = location.pathname.split('/').slice(-1)[0];

        if (
            route == 'portal' ||
            route == 'forget-password' ||
            route == 'sent'
        ) {
            setOption(() => 'login');
        } else {
            setOption(() => route);
        }
        console.log(route);
    }, [location.pathname]);
    const { authenticated } = useAuth();

    const navigate = useNavigate();
    useEffect(() => {
        ({ authenticated });
        if (authenticated) {
            navigate('/my-account');
        }
    }, []);
    return (
        <>
            <section className="login-signup-page min-h-screen">
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
                    <div id="login-signup-option" className="relative">
                        {!admin && (
                            <>
                                <Link
                                    to={!admin && 'signup'}
                                    onClick={() => setOption('signup')}
                                    className={
                                        option == 'signup'
                                            ? 'active-option'
                                            : 'not-active-option'
                                    }
                                >
                                    JOIN
                                </Link>
                                {/* <span id="midldle-border"></span> */}
                            </>
                        )}
                        <div className="divider absolute top-2/4 m-0 h-3/6 w-[2px] translate-y-[-50%] bg-[var(--light-grey)] p-0"></div>
                        <Link
                            to={!admin && 'login'}
                            onClick={() => setOption('login')}
                            className={
                                option == 'login'
                                    ? 'active-option'
                                    : 'not-active-option'
                            }
                        >
                            SIGN IN
                        </Link>
                    </div>
                    <section className="mt-10 flex w-full flex-col items-center justify-center">
                        <Outlet />
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
