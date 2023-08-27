import { useState } from 'react';
import './CSS/App.css';
// import Layout from './components/Layout/layout'
import Body from './components/Body';
import Router from './Router';
import Header from './components/Layout/header';
import Layout from './components/Layout/layout';
function App() {
    return (
        <div id="App">
            <Layout>
                <main id="main">
                    <Router />
                </main>
            </Layout>
        </div>
    );
}

export default App;
