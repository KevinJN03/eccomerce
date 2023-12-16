import { Link, Outlet, useLocation } from 'react-router-dom';
import { adminAxios } from '../../../api/axios';
import '../../../CSS/login-signup.css';
import Login from '../../Login-SignUp/Login';
import glamo from '../../../assets/icons/glamo-black-logo.svg';
import { AnimatePresence, motion } from 'framer-motion';
import adminLogo from '../../../assets/icons/admin.png'
function AdminPortal({}) {
    const handleSubmit = async (data, setError) => {
        debugger;

        if (!data.email) {
            setError((prevState) => ({
                ...prevState,
                email: 'Oops! You need to type your email here',
            }));
        }

        if (!data.password) {
            setError((prevState) => ({
                ...prevState,
                password: 'Hey, we need a password here',
            }));

            return;
        }

        try {
            const result = await adminAxios.post('login', data);

            ({ result });
        } catch (error) {
            'error at admin login', error.response.data;

            setError(() => error.response.data);
        }
    };
    const location = useLocation()

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
        <section className="login-signup-page min-h-screen">
            <section
                id="login-signup-container"
                className="sm:w-[90vw] md:w-[500px] lg:w-[600px]"
            >
                <Link
                   
                    className="login-logo mt-10 flex w-40 flex-nowrap items-center"
                >
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
                    <a href="/pages/terms-of-service">Term Of Service</a>
                </span>
            </div>
        </section>
    );
}

export default AdminPortal;
