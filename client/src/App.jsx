import LayoutProvider from './context/layoutContext';
import './CSS/App.css';

import Router from './Router';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import objectSupport from 'dayjs/plugin/objectSupport';
import { CartProvider } from './context/cartContext';
import Layout from './components/Layout/layout';
dayjs.extend(objectSupport);
dayjs.extend(utc);
function App() {
    return (
        <div id="App">
            <LayoutProvider>
                <CartProvider>
                    {/* <Layout> */}
                        <Router />
                    {/* </Layout> */}
                </CartProvider>
            </LayoutProvider>
        </div>
    );
}

export default App;
