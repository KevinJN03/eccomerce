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
import { AdminContextProvider } from '../../../context/adminContext';
import Modal from '../components/modal/modal';
import Manage from '../components/product/new product/variation/manage/manage';
import SelectVariation from '../components/product/new product/variation/selectVariation';
import Main from '../components/product/new product/variation/main';
import Update from '../components/product/new product/variation/update';
// import List from '../components/list/list';
const views = {
    manage: <Manage />,
    select: <SelectVariation />,
    main: <Main />,
    update: <Update />,
};

export function AdminReducer(state, action) {
    if (action.type == 'select') {
        return {
            ...state,
            type: action.type,
            currentVariation: action.currentVariation,
            title: action.title,
            default: action.default,
        };
    }

    if (action.type == 'update') {
        return {
            ...state,
            type: action.type,
            category: action.category,
            selected: action.selected,
            setUpdate: action.setUpdate,
            update: action.update,
            setCheckAll: action.setCheckAll,
        };
    }

    if (action.type == 'main' || action.type == 'manage' || action.type) {
        return { ...state, type: action.type, currentVariation: null };
    }

    throw new Error('Invalid type for Variation Reducer');
}

function Admin({}) {
    const { darkMode } = useDarkMode();
    console.log('darkMode', darkMode);
    disableLayout();

    const [modalCheck, setModalCheck] = useState(false);
    const [loading, setLoading] = useState(false);
    const [modalContent, adminDispatch] = useReducer(AdminReducer, {
        type: 'main',
    });
    const value = {
        modalCheck,
        setModalCheck,
        loading,
        setLoading,
        modalContent,
        adminDispatch,
    };
    return (
        <AdminContextProvider value={value}>
            <section className={`admin ${darkMode ? 'dark' : ''}`}>
                <ContentProvider>
                    <section className="home">
                        <SideBar />
                        <div className="homeContainer">
                            <Navbar />
                            <Outlet />
                            {modalCheck && (
                                <Modal
                                    check={modalCheck}
                                    setCheck={setModalCheck}
                                    ModalContent={views[modalContent.type]}
                                    loading={loading}
                                    setLoading={setLoading}
                                />
                            )}
                        </div>
                    </section>
                </ContentProvider>
            </section>{' '}
        </AdminContextProvider>
    );
}

export default Admin;
