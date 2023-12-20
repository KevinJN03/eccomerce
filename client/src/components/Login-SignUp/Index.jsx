import '../../CSS/login-signup.css';
import glamo from '../../assets/icons/glamo-black-logo.svg';
import adminLogo from '../../assets/icons/admin.png';
import SignUp from './SignUp';
import Login from './Login';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import disableLayout from '../../hooks/disableLayout';
import { AnimatePresence, motion } from 'framer-motion';

function LoginSignUp({ loginorSignup, admin, handleSubmit }) {
    disableLayout();
    const [option, setOption] = useState(loginorSignup);

    const location = useLocation();

    useEffect(() => {

        const route = location.pathname.split('/').slice(-1)[0];

        const routesArray = [
            'portal',
            'forget-password',
            'sent',
            'reset-password',
        ];
        if (routesArray.includes(route)) {
            setOption(() => 'login');
        } else {
            setOption(() => 'signup');
        }
   
    }, [location.pathname]);
    const { authenticated } = useAuth();

    const navigate = useNavigate();
    useEffect(() => {
        ({ authenticated });
        if (authenticated) {
            navigate('/my-account');
        }
    }, []);

    const outletVariant = {
        initial: {
            opacity: 0.1,
        },
        animate: {
            opacity: 1,
            transition: { duration: 0.5 },
        },
        exit: {
            opacity: 0,
            transition: { duration: 2 },
        },
    };
    return (
        <>
            <section className="login-signup-page min-h-screen">
                <section
                    id="login-signup-container"
                    className="w-full"
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
                    <AnimatePresence
                    
                    >
                        <motion.section
                        key={location?.pathname}
                            variants={outletVariant}
                            initial={'initial'}
                            animate={'animate'}
                           
                            className="mt-10 flex w-full flex-col items-center justify-center"
                        >
                            <Outlet />
                        </motion.section>
                    </AnimatePresence>
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
