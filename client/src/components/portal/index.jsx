import '../../CSS/login-signup.css';
import glamo from '../../assets/icons/glamo-black-logo.svg';
import adminLogo from '../../assets/icons/admin.png';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import PortalProvider from '../../context/portalContext.jsx';
import LoadingPage from '../order/loadingPage.jsx';
import axios from '../../api/axios.js';
const env = import.meta.env
function Portal({ loginorSignup, admin, handleSubmit }) {
    const [option, setOption] = useState(loginorSignup);
    const [loading, setLoading] = useState(true);
    const location = useLocation();
console.log({env, env_vite: import.meta.env.VITE_BACKEND_URL})
    const navigate = useNavigate();
    useEffect(() => {
        const route = location.pathname.split('/').slice(-1)[0];

        const routesSet = new Set([
            'portal',
            'forget-password',
            'sent',
            'reset-password',
            'login',
        ]);
        if (routesSet.has(route)) {
            setOption(() => 'login');
        } else {
            setOption(() => 'sign-up');
        }
    }, [location.pathname]);

    useEffect(() => {
        const fetchAuthenticate = async () => {
            let success = false;
            try {
                const { data } = await axios.get('user/check');

                if (data?.authenticated) {
                    success = true;
                }
            } catch (error) {
                console.error('error: ', error);
            } finally {
                setTimeout(() => {
                    if (success) {
                        navigate('/my-account');
                    }
                    setLoading(false);
                }, 1300);
            }
        };

        fetchAuthenticate();
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

    const value = {
        loading,
        setLoading,
    };
    return (
        <PortalProvider value={value}>
            {/* 
            <AnimatePresence> */}
            {loading && <LoadingPage />}
            {/* </AnimatePresence> */}

            {!loading && (
                <section className="flex h-full !min-h-screen w-screen items-center justify-center">
                    <section className="m-0 flex h-fit flex-col items-center bg-light-grey p-0">
                        <section
                            id="login-signup-container"
                            className="mt-5 flex w-full flex-col items-center justify-center bg-white p-3"
                        >
                            <a
                                href={!admin && '/'}
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
                            </a>
                            <div id="login-signup-option" className="relative">
                                {!admin && (
                                    <>
                                        <Link
                                            to={!admin && 'sign-up'}
                                            onClick={() => setOption('sign-up')}
                                            className={
                                                option == 'sign-up'
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
                            <AnimatePresence>
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
                        <div className=" flex flex-row gap-2 py-4 text-xs underline underline-offset-2">
                            <span>
                                <a href="/pages/privacy-policy">
                                    Privacy Policy
                                </a>
                            </span>
                            <span className="middle-seperator"></span>
                            <span>
                                <a href="/pages/terms-of-service">
                                    Term Of Service
                                </a>
                            </span>
                        </div>
                    </section>
                </section>
            )}
        </PortalProvider>
    );
}

export default Portal;
