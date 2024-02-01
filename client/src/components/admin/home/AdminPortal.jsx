import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { adminAxios } from '../../../api/axios';
import '../../../CSS/login-signup.css';
import Login from '../../Login-SignUp/Login';
import glamo from '../../../assets/icons/glamo-black-logo.svg';
import { AnimatePresence, motion } from 'framer-motion';
import adminLogo from '../../../assets/icons/admin.png';
import { useEffect, useState } from 'react';
import LoadingPage from '../../order/loadingPage';
function AdminPortal({}) {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        adminAxios
            .get('/check')
            .then(({ data }) => {
                console.log({ data });
                navigate('/admin');
            })
            .catch((error) => {
                console.error(error);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    const location = useLocation();

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
            {loading && <LoadingPage />}
            {!loading && (
                <section className="login-signup-page min-h-screen">
                    <section
                        id="login-signup-container"
                        className="sm:w-[90vw] md:w-[500px] lg:w-[600px]"
                    >
                        <Link className="login-logo mt-10 flex w-40 flex-nowrap items-center">
                            <img loading="lazy" src={glamo} />

                            <img
                                src={adminLogo}
                                width={'50px'}
                                height={'50px'}
                                className="object-contain"
                            />
                        </Link>

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
                    <div className="mt-2 flex flex-row gap-2 pb-5 text-xs underline underline-offset-2">
                        <span>
                            <a href="/pages/privacy-policy">Privacy Policy</a>
                        </span>
                        <span className="middle-seperator"></span>
                        <span>
                            <a href="/pages/terms-of-service">
                                Term Of Service
                            </a>
                        </span>
                    </div>
                </section>
            )}
        </>
    );
}

export default AdminPortal;
