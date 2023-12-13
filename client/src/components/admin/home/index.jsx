import disableLayout from '../../../hooks/disableLayout';

import './admin.scss';
import './dark.scss';

import {
    DarkModeContext,
    useDarkMode,
    DarkModeContextProvider,
} from '../../../context/darkModeContext';

import { AdminContextProvider } from '../../../context/adminContext';

import Admin from './admin';
import { useEffect } from 'react';
import axios, { adminAxios } from '../../../api/axios';
// import List from '../components/list/list';

function Index({}) {
    const { darkMode } = useDarkMode();
    'darkMode', darkMode;
    disableLayout();

    return (
        <AdminContextProvider>
            <Admin />
        </AdminContextProvider>
    );
}

export default Index;
