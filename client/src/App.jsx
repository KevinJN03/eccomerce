import { useState } from 'react';
import './CSS/App.css';
// import Layout from './components/Layout/layout'
import Body from './components/Body';
import Router from './Router';
import Header from './components/Layout/header';
import Layout from './components/Layout/layout';
import LayoutProvider from './context/layoutContext';
import { DarkModeContextProvider } from './context/darkModeContext';
function App() {
    return (
        <div id="App">
            <LayoutProvider>
                <Layout>
                    <main id="main">
                    <DarkModeContextProvider>
                        <Router />
                    </DarkModeContextProvider>
                            
                            
                        
                    </main>
                </Layout>
            </LayoutProvider>
        </div>
    );
}

export default App;
