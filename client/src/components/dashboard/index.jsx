import disableLayout from '../../hooks/disableLayout';
import Checkout_Header from '../checkout/checkout_header.jsx';
import '../../CSS/user-dashboard.scss';
import { useEffect, useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import Modal from '../admin/components/modal/modal.jsx';

import UserDashboardProvider from '../../context/userContext.jsx';
import DeletePaymentMethod from './payment-methods/delete-payment-method.jsx';
import NavOption from './navOptions.jsx';
function Dashboard() {
    disableLayout();
    const location = useLocation();

    const currentRoute = location.pathname.split('/').pop();
    const [selectOption, setSelectionOption] = useState(currentRoute);

    useEffect(() => {
        setSelectionOption(currentRoute);
    }, [currentRoute]);

    const [modalContent, setModalContent] = useState('');
    const [modalCheck, setModalCheck] = useState(false);
    const value = {
        modalContent,
        setModalContent,
        modalCheck,
        setModalCheck,
    };

    const view = {
        deletePaymentMethod: <DeletePaymentMethod />,
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
                                            Kevin Jean
                                        </span>
                                    </span>
                                </div>
                            </section>

                            <NavOption
                                selectOption={selectOption}
                                setSelectionOption={setSelectionOption}
                            />
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
