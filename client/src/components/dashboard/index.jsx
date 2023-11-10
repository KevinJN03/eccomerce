import disableLayout from '../../hooks/disableLayout';
import Checkout_Header from '../checkout/checkout_header.jsx';
import '../../CSS/user-dashboard.scss';
import { useEffect, useReducer, useState } from 'react';
import {
    Link,
    Outlet,
    useLocation,
    useNavigate,
    redirect,
} from 'react-router-dom';
import Modal from '../admin/components/modal/modal.jsx';
import signOut_icon from '../../assets/icons/signout-icon.png';
import { UserDashboardProvider, reducer } from '../../context/userContext.jsx';
import DeletePaymentMethod from './payment-methods/delete-payment-method.jsx';
import NavOption from './navOptions.jsx';
import { useAuth } from '../../hooks/useAuth.jsx';
import axios from '../../api/axios.js';
import dayjs from 'dayjs';
function Dashboard() {
    disableLayout();
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const { user, authDispatch } = useAuth();
    const [firstName, setFirstName] = useState(user?.firstName || '');
    const [lastName, setLastName] = useState(user?.lastName || '');
    const [email, setEmail] = useState(user?.email || '');
    const [interest, setInterest] = useState(user?.interest);
    const [dob, setDob] = useState('');
    const [address, setAddress] = useState([]);
    useEffect(() => {
        axios
            .get('user/userData')
            .then((res) => {
                setDob(() => dayjs(res.data.user.dob).toISOString());
            })
            .catch((error) => {
                console.log(
                    'error while checking if user is authenticated: ',
                    error
                );
                authDispatch({type: 'LOGOUT'});
                navigate('/login');
            });
    }, []);
    const getRoute = () => {
        const routes = pathname.split('/');
        const findIndexForMyAccount = routes.indexOf('my-account');
        const routeIndex = findIndexForMyAccount + 1;
        console.log({ routeIndex, findIndexForMyAccount });
        const currentRoute = routes[routeIndex]
            ? routes[routeIndex]
            : routes[findIndexForMyAccount];

        return currentRoute;
    };

    const [selectOption, setSelectionOption] = useState(getRoute());

    useEffect(() => {
        console.log('split: ', pathname.split('/'));

        setSelectionOption(() => getRoute());
    }, [pathname]);

    const [modalContent, modalContentDispatch] = useReducer(reducer, {});
    const [modalCheck, setModalCheck] = useState(false);
    const value = {
        modalContent,
        modalContentDispatch,
        modalCheck,
        setModalCheck,
        firstName,
        setFirstName,
        email,
        setEmail,
        interest,
        setInterest,
        dob,
        setDob,
        lastName,
        setLastName,
    };

    const view = {
        deletePaymentMethod: <DeletePaymentMethod />,
    };

    const logout = () => {
        authDispatch({ type: 'LOGOUT' });

        navigate('/home');
    };
    return (
        <UserDashboardProvider value={value}>
            <section className="user-dashboard flex h-full min-h-screen w-screen flex-col !items-center bg-[var(--light-grey)] pb-10">
                <section className="dashboard-wrapper w-full max-w-4xl px-3">
                    <Checkout_Header text={'MY ACCOUNT'} />
                    <section className="dashboard-body mt-3 flex h-full flex-row gap-x-5">
                        <div className="left flex min-h-full flex-1  flex-col gap-y-2">
                            <section className="dashboard-profile relative flex h-40 w-full items-center justify-center  bg-white">
                                <div className="profile-wrapper absolute left-[-12px] flex items-center justify-center gap-x-3">
                                    <div className="profile-photo flex h-24 w-24 items-center justify-center rounded-full !bg-primary">
                                        <span className="user-initial font-gotham text-4xl !font-extrabold text-white">
                                            KJ
                                        </span>
                                    </div>
                                    <span className="user-name">
                                        Hi,
                                        <span className="block font-gotham text-lg tracking-wider">
                                            {`${user?.firstName} ${user?.lastName}`}
                                        </span>
                                    </span>
                                </div>
                            </section>

                            <NavOption selectOption={selectOption} />
                            <button
                                onClick={logout}
                                className={`no-wrap relative flex  h-14 flex-row items-center bg-white px-3 `}
                            >
                                <img
                                    className="mr-6 h-9 w-9"
                                    src={signOut_icon}
                                    alt="sign out outline icon with transparent background"
                                />
                                <p
                                    className={`justify-left flex h-full w-full items-center text-s font-light underline-offset-2 hover:underline`}
                                >
                                    Sign Out
                                </p>
                            </button>
                        </div>
                        <div className="right min-h-full flex-[2]">
                            <Outlet />
                        </div>
                    </section>
                </section>
                <Modal
                    check={modalCheck}
                    setCheck={setModalCheck}
                    ModalContent={view[modalContent.type]}
                />
            </section>
        </UserDashboardProvider>
    );
}

export default Dashboard;
