import React from 'react';
import ReactDOM from 'react-dom/client';
// import ReactDom from 'react-dom@experimental'
import './CSS/index.css';
import App from './App';
import { AuthContextProvider } from './context/AuthContext.jsx';
import LayoutProvider from './context/layoutContext';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DarkModeContextProvider } from './context/darkModeContext';
import 'dayjs/locale/en-gb';
import { WishlistContextProvider } from './context/wishlistContext.jsx';
ReactDOM.createRoot(document.getElementById('root')).render(
    /* <React.StrictMode>  */
    <AuthContextProvider>
        {/* <WishlistContextProvider> */}
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-gb">
            <DarkModeContextProvider>
                <App />
            </DarkModeContextProvider>
        </LocalizationProvider>
        {/* </WishlistContextProvider> */}
    </AuthContextProvider>

    /* </React.StrictMode>   */
);
