import { useEffect, useState, useReducer } from 'react';
import SideBar from '../components/sidebar/sidebar';
import Navbar from '../components/navbar/navbar';
import disableLayout from '../../../hooks/disableLayout';

import './admin.scss';
import './dark.scss';
import { Outlet, useRoutes, useParams, useLocation } from 'react-router-dom';
import {
    DarkModeContext,
    useDarkMode,
    DarkModeContextProvider,
} from '../../../context/darkModeContext';
import { useContext } from 'react';
import { ContentProvider } from '../../../context/ContentContext';
import { useAdminContext } from '../../../context/adminContext';
import Modal from '../components/modal/modal';
import Manage from '../components/product/new product/variation/manage/manage';
import SelectVariation from '../components/product/new product/variation/selectVariation';
import Main from '../components/product/new product/variation/main';
import Update from '../components/product/new product/variation/update';
import Order_Edit from '../order/edit_order';
import UpdateOrder from '../order/updateOrder';

function Admin({}) {
    const { darkMode } = useDarkMode();

    // const {
    //     modalCheck,
    //     setModalCheck,
    //     loading,
    //     setLoading,
    //     modalContent,
    //     adminDispatch,
    // } = useAdminContext();

    // const location = useLocation();
    // const views = {
    //     manage: <Manage />,
    //     select: <SelectVariation />,
    //     main: <Main />,
    //     update: <Update />,
    //     order: <UpdateOrder />,
    // };

    return (
        <section className={`admin ${darkMode ? 'dark' : ''}`}>
            <ContentProvider>
                {location.pathname.split('/')[2] == 'login' || location.pathname.split('/')[3] == 'download'  ? (
                    <Outlet />
                ) : (
                    <section className="home">
                        <SideBar />
                        <div className="homeContainer">
                            {/* <Navbar /> */}
                            <Outlet />
                            {/* {modalCheck && (
                                <Modal
                                    check={modalCheck}
                                    setCheck={setModalCheck}
                                    ModalContent={views[modalContent?.type]}
                                    loading={loading}
                                    setLoading={setLoading}
                                />
                            )} */}
                        </div>
                    </section>
                )}
            </ContentProvider>
        </section>
    );
}

export default Admin;
