import React from 'react';
import ReactDOM from 'react-dom/client';
// import ReactDom from 'react-dom@experimental'
import './index.css';
import App from './App';
import { AuthContextProvider } from './context/AuthContext.jsx';
import LayoutProvider from './context/layoutContext';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DarkModeContextProvider } from './context/darkModeContext';
import 'dayjs/locale/en-gb';
ReactDOM.createRoot(document.getElementById('root')).render(
    /* <React.StrictMode>  */
    <AuthContextProvider>
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-gb">
            <DarkModeContextProvider>
                <App />
            </DarkModeContextProvider>
        </LocalizationProvider>
    </AuthContextProvider>

    /* </React.StrictMode>   */
);
