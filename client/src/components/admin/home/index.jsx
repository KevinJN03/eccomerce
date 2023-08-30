import { useEffect } from 'react';
import disableLayout from '../../../hooks/disableLayout';
import './admin.scss';

import { Outlet, useRoutes, useParams, useLocation } from 'react-router-dom';
import SideBar from '../components/sidebar/sidebar';
import Navbar from '../components/navbar/navbar';
import Widget from '../components/widget/widget';
import Featured from '../components/featured/featured';
import Chart from '../components/chart/chart';
import Transaction_Table from '../components/table/transaction_table';
import Admin_Dashboard from './admin_dashboard';
import List from '../components/list/list';

function Admin({}) {
    disableLayout();
    const { id } = useParams();
    const route = id;

    return (
        <>
            {!route ? (
                <Admin_Dashboard />
            ) : route == 'users' ? (
                <List />
            ) : (
                'empty route'
            )}
        </>
    );
}

export default Admin;
