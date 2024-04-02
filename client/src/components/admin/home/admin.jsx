import { useEffect, useState, useReducer, useRef } from 'react';
import SideBar from '../components/sidebar/sidebar';

import './admin.scss';
import './dark.scss';
import { Outlet, useRoutes, useParams, useLocation } from 'react-router-dom';
import {
    DarkModeContext,
    useDarkMode,
    DarkModeContextProvider,
} from '../../../context/darkModeContext';
import { ContentProvider } from '../../../context/ContentContext';

import Main from '../components/product/new product/variation/main';

import { AnimatePresence, motion } from 'framer-motion';
import {
    CheckRounded,
    CloseRounded,
    CloseSharp,
    MoodBad,
    MoodBadTwoTone,
    SentimentDissatisfiedTwoTone,
} from '@mui/icons-material';

import sadEmoji from '../../../assets/icons/sad-emoji.svg';
import sadFace from '../../../assets/icons/sadFace.png';
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
import CreateProfile from '../delivery/modalViews.jsx/createProfile/createProfile.jsx';
import DeleteProfile from '../delivery/modalViews.jsx/deleteProfile.jsx';
import DeliveryOption from '../delivery/modalViews.jsx/deliveryOption.jsx';
function Admin({}) {
    const { darkMode } = useDarkMode();

    const [showAlert, setShowAlert] = useState({});
    const [open, setOpen] = useState(true);

    const [modalCheck, setModalCheck] = useState(false);
    const [modalContent, setModalContent] = useState({
        type: 'change_section',
    });
    const [openSearch, setOpenSearch] = useState(false);
    const timeoutRef = useRef();
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
        deleteProfile: <DeleteProfile />,
        deliveryOption: <DeliveryOption />,
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
        clearTimeout(timeoutRef.current);

        if (showAlert?.on) {
            timeoutRef.current = setTimeout(() => {
                    setShowAlert(() => ({ on: false }));
            }, showAlert?.timeout || 5000);
        }
    }, [showAlert]);

    const icons = {
        check: <CheckRounded />,
        sadFace: (
            <div className="relative h-10 w-10">
                <div
                    className={`absolute left-0 top-0 h-full w-full rounded-full border-4 border-white `}
                />
                <img
                    width="40"
                    height="40"
                    src={sadFace}
                    alt="disappointed--v1"
                />
            </div>
        ),
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
                            {showAlert?.on &&
                                (showAlert?.size === 'small' ||
                                    showAlert?.size === 'medium') && (
                                    <motion.section
                                        className="fixed left-0 z-50 flex w-full justify-center"
                                        variants={generateAlertVariant('20px')}
                                        initial={'initial'}
                                        animate={'animate'}
                                        exit={'exit'}
                                    >
                                        <div
                                            className={`flex w-full max-w-lg flex-row gap-3 rounded px-5 py-5 shadow-normal ${showAlert?.bg || 'bg-gray-200'}`}
                                        >
                                            {showAlert?.icon && (
                                                <div
                                                    className={`flex h-fit w-fit items-center  justify-center rounded-full ${showAlert?.icon == 'sadFace' ? 'bg-transparent' : 'bg-white'}  p-2 !text-[1.8rem]`}
                                                >
                                                    {icons?.[showAlert?.icon]}
                                                </div>
                                            )}

                                            <div
                                                className={`mt-0.5 font-normal tracking-wide ${showAlert?.text || 'text-base text-white'} `}
                                            >
                                                {showAlert?.msg}
                                            </div>

                                            <button
                                                className="ml-auto self-start"
                                                onClick={() => setShowAlert({})}
                                            >
                                                <CloseSharp className="!fill-white " />
                                            </button>
                                        </div>
                                    </motion.section>
                                )}
                            {showAlert?.on && showAlert?.size == 'large' && (
                                <motion.section
                                    className={`fixed left-0 top-0 z-50 flex w-full items-center justify-center  ${showAlert?.bg || 'bg-gray-200'} px-5 py-5 `}
                                    variants={generateAlertVariant('0px')}
                                    initial={'initial'}
                                    animate={'animate'}
                                    exit={'exit'}
                                >
                                    <div className="flex w-fit flex-row items-center gap-3">
                                        {showAlert?.icon && (
                                            <div
                                                className={`flex h-fit w-fit items-center  justify-center rounded-full ${showAlert?.icon == 'sadFace' ? 'bg-transparent' : 'bg-white'}  p-2 !text-[1.8rem]`}
                                            >
                                                {icons?.[showAlert?.icon]}
                                            </div>
                                        )}

                                        <div
                                            className={`mt-0.5  font-normal tracking-wide ${showAlert?.text || 'text-base text-white'}`}
                                        >
                                            {showAlert?.msg}
                                        </div>
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
                                        maxWidth: '800px',
                                        width: '100%',

                                        borderRadius: '4px',
                                        display: 'flex',
                                        justifyContent: 'center',

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
