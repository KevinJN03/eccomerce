import React from 'react';
import ReactDOM from 'react-dom/client';
import Header from './components/Layout/header';
import Layout from './components/Layout/layout';
import Footer from './components/Layout/footer/footer';
import './index.css';
import Router from './Router.jsx';
import App from './App';
ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
    <App />
     </React.StrictMode> 
);
