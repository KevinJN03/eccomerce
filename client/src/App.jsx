import LayoutProvider from './context/layoutContext';
import './CSS/App.css';

import Router from './Router';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import objectSupport from 'dayjs/plugin/objectSupport';
import minMax from 'dayjs/plugin/minMax';

import { CartProvider } from './context/cartContext';
import Layout from './components/Layout/layout';
import { WishlistContextProvider } from './context/wishlistContext';
import timezone from 'dayjs/plugin/timezone';
import { overwrite } from 'country-list';
import customParseFormat from 'dayjs/plugin/customParseFormat';
dayjs.extend(objectSupport);
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(minMax);
dayjs.extend(customParseFormat);
dayjs.tz.setDefault('Europe/London');

export const defaultDayjs = dayjs;
overwrite([
    { code: 'GB', name: 'United Kingdom' },
    { code: 'US', name: 'United States' },
]);
function App() {
    return (
        <div id="App">
            <LayoutProvider>
                <CartProvider>
                    <WishlistContextProvider>
                        <Router />
                    </WishlistContextProvider>
                </CartProvider>
            </LayoutProvider>
        </div>
    );
}

export default App;
