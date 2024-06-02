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
import * as Sentry from '@sentry/react';
const { VITE_SENTRY_DSN } = import.meta.env;

Sentry.init({
    dsn: VITE_SENTRY_DSN,
    integrations: [
        Sentry.browserTracingIntegration(),
        Sentry.replayIntegration(),
    ],
    // Performance Monitoring
    tracesSampleRate: 1.0, //  Capture 100% of the transactions
    // Set 'tracePropagationTargets' to control for which URLs distributed tracing should be enabled
    tracePropagationTargets: ['localhost', /^https:\/\/yourserver\.io\/api/],
    // Session Replay
    replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
    replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
});

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
