import React from 'react';
import ReactDOM from 'react-dom/client';
// import ReactDom from 'react-dom@experimental'
import './index.css';
import App from './App';
import { AuthContextProvider } from './context/authContext';
import LayoutProvider from './context/layoutContext';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DarkModeContextProvider } from './context/darkModeContext';
ReactDOM.createRoot(document.getElementById('root')).render(
    /* <React.StrictMode>  */
    <AuthContextProvider>
        <LayoutProvider>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DarkModeContextProvider>
                    <App />
                </DarkModeContextProvider>
            </LocalizationProvider>
        </LayoutProvider>
    </AuthContextProvider>

    /* </React.StrictMode>   */
);
