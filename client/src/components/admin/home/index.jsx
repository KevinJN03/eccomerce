import { useEffect, useState } from 'react';
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
// import List from '../components/list/list';

function Admin({}) {
    const { darkMode } = useDarkMode();
    console.log('darkMode', darkMode);
    disableLayout();
    return (
        <section className={`admin ${darkMode ? 'dark' : ''}`}>
            <ContentProvider>
                   <Outlet />
            </ContentProvider>
         
        </section>
    );
}

export default Admin;
