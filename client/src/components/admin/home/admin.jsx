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
import {
    CheckRounded,
    CloseRounded,
    CloseSharp,
    MoodBad,
    MoodBadTwoTone,
} from '@mui/icons-material';

import sadEmoji from '../../../assets/icons/sad-emoji.svg';
import { Box, Modal } from '@mui/material';
import Delete from '../listing/modalContent/delete.jsx';
import ChangeSection from '../listing/modalContent/changeSection.jsx';
import Edit_Title from '../listing/modalContent/edit_title';
import EditDescription from '../listing/modalContent/edit_description.jsx';
import EditPrice from '../listing/modalContent/edit_price.jsx';
import Deactivate from '../listing/modalContent/deactivate.jsx';
import Activate from '../listing/modalContent/activate.jsx';
import Publish from '../listing/modalContent/publish.jsx';
import Edit_Delivery from '../listing/modalContent/edit_delivery.jsx';
import ProcessOrder from '../delivery/modalViews.jsx/processOrder.jsx';
import CreateProfile from '../delivery/modalViews.jsx/createProfile.jsx';
function Admin({}) {
    const { darkMode } = useDarkMode();

    const [showAlert, setShowAlert] = useState({
        msg: 'Listing Updated.',
        on: false,
        small: false,
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
        edit_delivery: <Edit_Delivery />,
        edit_title: <Edit_Title />,
        edit_description: <EditDescription />,
        edit_price: <EditPrice />,
        deactivate: <Deactivate />,
        activate: <Activate />,
        publish: <Publish />,
        processOrder: <ProcessOrder />,
        createProfile: <CreateProfile />,
    };
    const generateAlertVariant = (stationaryPosition) => ({
        initial: {
            // y: 0,
            translateY: '-100px',
        },
        animate: {
            // y: 0
            translateY: stationaryPosition,
            transition: {
                duration: 0.5,
            },
        },
        exit: {
            translateY: '-100px',
            transition: {
                duration: 0.4,
            },
        },
    });

    useEffect(() => {
        let timeout = null;
        if (showAlert?.on) {
            timeout = setTimeout(() => {
                setShowAlert(() => ({ on: false, msg: null, small: null }));
            }, 5000);
        }

        return () => {
            clearTimeout(timeout);
        };
    }, [showAlert.on]);

    console.log('admin rerender');
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
                    showAlert,
                    setShowAlert,
                }}
            >
                {location.pathname.split('/')[2] == 'login' ||
                location.pathname.split('/')[3] == 'download' ? (
                    <Outlet />
                ) : (
                    <section className="home relative">
                        <AnimatePresence>
                            {showAlert?.on && showAlert?.small === true && (
                                <motion.section
                                    className="fixed left-0 z-50 flex w-full justify-center"
                                    variants={generateAlertVariant('20px')}
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
                            {showAlert?.on && showAlert?.small === false && (
                                <motion.section
                                    className="fixed left-0 top-0 z-50 flex w-full items-center justify-center  !bg-green-100 p-5 "
                                    variants={generateAlertVariant('0px')}
                                    initial={'initial'}
                                    animate={'animate'}
                                    exit={'exit'}
                                >
                                    <div className="flex w-fit flex-row items-center gap-3">
                                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white">
                                            <CheckRounded className="!text-[1.8rem]" />
                                        </div>

                                        <p className="text-sm">
                                            {showAlert?.msg}
                                        </p>
                                    </div>
                                    <button
                                        className="absolute right-8 top-1/2 translate-y-[-50%]"
                                        onClick={() => setShowAlert({})}
                                    >
                                        <CloseRounded className="!fill-black !text-[1.8rem]" />
                                    </button>
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
                             
                                open={modalCheck}
                                onClose={() => setModalCheck(false)}
                                style={{
                            
                                     overflowY: 'auto',
                                }}
                            >
                                <Box
                                    sx={{
                                    
                                        position: 'absolute',
                                        top: '15%',
                                        left: '50%',
                                      

                                        transform: 'translate(-50%, -0%)',
                                        boxSizing: 'border-box',
                                        // maxWidth: '600px',
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
