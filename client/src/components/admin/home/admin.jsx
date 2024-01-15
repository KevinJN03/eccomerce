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
import Order_Edit from '../order/home/edit_order';
import UpdateOrder from '../order/home/updateOrder';
import { AnimatePresence, motion } from 'framer-motion';
import { CloseSharp, MoodBad, MoodBadTwoTone } from '@mui/icons-material';

import sadEmoji from '../../../assets/icons/sad-emoji.svg'
function Admin({}) {
    const { darkMode } = useDarkMode();

    const [showAlert, setShowAlert] = useState({
        msg: '111111111111111',
        on: true,
    });

    const alertVariant = {
        initial: {
            // y: 0,
            translateY: '-100px',
        },
        animate: {
            // y: 0
            translateY: '20px',
            transition: {
                duration: 0.9,
            },
        },
        exit: {
            translateY: '-100px',
            transition: {
                duration: 0.9,
            },
        },
    };
    return (
        <section className={`admin ${darkMode ? 'dark' : ''}`}>
            <ContentProvider>
                {location.pathname.split('/')[2] == 'login' ||
                location.pathname.split('/')[3] == 'download' ? (
                    <Outlet />
                ) : (
                    <section className="home relative">
                        <AnimatePresence>
                            {showAlert?.on && (
                                <motion.section
                                    className="fixed left-0 flex w-full justify-center z-50"
                                    variants={alertVariant}
                                    initial={'initial'}
                                    animate={'animate'}
                                    exit={'exit'}
                                >
                                    <div className="flex w-full max-w-md flex-row rounded !bg-red-800 p-3 gap-3 ">
                                       <span>
                                        <img src={sadEmoji} alt="sad mode emoji" />
                                       </span>
                                       
                                        <p className="text-white">
                                            {showAlert?.msg}
                                        </p>

                                        <button
                                            className="ml-auto self-start"
                                            onClick={() => setShowAlert({})}
                                        >
                                            <CloseSharp className="!fill-white " />
                                        </button>
                                    </div>
                                </motion.section>
                            )}
                        </AnimatePresence>

                        <SideBar />
                        <div className="homeContainer ml-56">
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
