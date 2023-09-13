import { useEffect, useState } from 'react';
import './CSS/App.css';
// import Layout from './components/Layout/layout'
import Body from './components/Body';
import Router from './Router';
import Header from './components/Layout/header';
import Layout from './components/Layout/layout';
import LayoutProvider from './context/layoutContext';
import { DarkModeContextProvider } from './context/darkModeContext';
function App() {
    // const [loading, setLoading] = useState(true);

    // useEffect(() => {
    //     setTimeout(() => {
    //         setLoading(false);
    //     }, 1500);

    //     return () => {
    //         setLoading(true);
    //     };
    // },[]);
    // function Loader() {
    //     return <span className="loading loading-infinity loading-lg"></span>;
    // }
    return (
        <div id="App">
            <LayoutProvider>
                <DarkModeContextProvider>
                    <Router />
                </DarkModeContextProvider>
            </LayoutProvider>
        </div>
    );
}

export default App;
