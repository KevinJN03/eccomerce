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

import Manage from '../components/product/new product/variation/manage/manage';
import SelectVariation from '../components/product/new product/variation/selectVariation';
import Main from '../components/product/new product/variation/main';
import Update from '../components/product/new product/variation/update';
import Order_Edit from '../order/home/edit_order';
import UpdateOrder from '../order/home/updateOrder';
import { AnimatePresence, motion } from 'framer-motion';
import { CloseSharp, MoodBad, MoodBadTwoTone } from '@mui/icons-material';

import sadEmoji from '../../../assets/icons/sad-emoji.svg';
import { Box, Modal } from '@mui/material';
import Delete from '../listing/modalContent/delete.jsx';
import ChangeSection from '../listing/modalContent/changeSection.jsx';
import Edit_Title from '../listing/modalContent/edit_title';
import EditDescription from '../listing/modalContent/edit_description.jsx';
import EditPrice from '../listing/modalContent/edit_price.jsx';
import Deactivate from '../listing/modalContent/deactivate.jsx';
import Activate from '../listing/modalContent/activate.jsx';
function Admin({}) {
    const { darkMode } = useDarkMode();

    const [showAlert, setShowAlert] = useState({
        msg: '111111111111111',
        on: false,
    });
    const [open, setOpen] = useState(true);

    const [modalCheck, setModalCheck] = useState(false);
    const [modalContent, setModalContent] = useState({
        type: 'change_section',
    });
    const [openSearch, setOpenSearch] = useState(false);
    const views = {
        delete: <Delete />,
        change_section: <ChangeSection />,
        delivery_main: <Main />,

        edit_title: <Edit_Title />,
        edit_description: <EditDescription />,
        edit_price: <EditPrice />,
        deactivate: <Deactivate />,
        activate: <Activate />,
    };
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
            <ContentProvider
                value={{
                    modalCheck,
                    modalContent,
                    setModalCheck,
                    setModalContent,
                    open,
                    setOpen,
                    openSearch,
                    setOpenSearch,
                }}
            >
                {location.pathname.split('/')[2] == 'login' ||
                location.pathname.split('/')[3] == 'download' ? (
                    <Outlet />
                ) : (
                    <section className="home relative">
                        <AnimatePresence>
                            {showAlert?.on && (
                                <motion.section
                                    className="fixed left-0 z-50 flex w-full justify-center"
                                    variants={alertVariant}
                                    initial={'initial'}
                                    animate={'animate'}
                                    exit={'exit'}
                                >
                                    <div className="flex w-full max-w-md flex-row gap-3 rounded !bg-red-800 p-3 ">
                                        <span>
                                            <img
                                                src={sadEmoji}
                                                alt="sad mode emoji"
                                            />
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
                        <motion.div
                            className={`homeContainer`}
                            initial={false}
                            animate={{
                                marginLeft: open ? '15rem' : '3.875rem',

                                transition: {
                                    duration: open ? '0.7' : '0.7',
                                    // ease: 'easeInOut'
                                },
                            }}
                        >
                            <Outlet />

                            <Modal
                                className="!overflow-y-auto"
                                open={modalCheck}
                                onClose={() => setModalCheck(false)}
                            >
                                <Box
                                    sx={{
                                        // backgroundColor: 'white',
                                        position: 'absolute',
                                        top: '20%',
                                        left: '50%',

                                        transform: 'translate(-50%, -20%)',
                                        boxSizing: 'border-box',
                                        maxWidth: '600px',
                                        // width: '100%',
                                        borderRadius: '4px',
                                        border: 'none',
                                    }}
                                >
                                    {views?.[modalContent?.type]}
                                </Box>
                            </Modal>
                        </motion.div>
                    </section>
                )}
            </ContentProvider>
        </section>
    );
}

export default Admin;
