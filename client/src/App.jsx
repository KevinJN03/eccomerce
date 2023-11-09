import { useEffect, useState } from 'react';
import './CSS/App.css';
import './index.css';
// import Layout from './components/Layout/layout'
import Body from './components/Body';
import Router from './Router';
import Header from './components/Layout/header';
import Layout from './components/Layout/layout';
import LayoutProvider from './context/layoutContext';
import { DarkModeContextProvider } from './context/darkModeContext';
import { LocalizationProvider } from '@mui/x-date-pickers';
// import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
function App() {
    return (
        <div id="App">
            <Router />
        </div>
    );
}

export default App;
