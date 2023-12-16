import disableLayout from '../../../hooks/disableLayout';

import './admin.scss';
import './dark.scss';

import {
    DarkModeContext,
    useDarkMode,
    DarkModeContextProvider,
} from '../../../context/darkModeContext';

import { AdminContextProvider } from '../../../context/adminContext';

import Admin from './admin';
import { useEffect, useState } from 'react';
import axios, { adminAxios } from '../../../api/axios';
import { get6MonthsData } from '../../common/months';
import { useNavigate } from 'react-router-dom';
// import List from '../components/list/list';

function Index({}) {
    const { darkMode } = useDarkMode();
    'darkMode', darkMode;
    disableLayout();

    const [loading, setLoading] = useState(true);

    const [dashBoardData, setDashBoardData] = useState({});
    const [chartData, setChartData] = useState([]);
    const [allUsers, setAllUsers] = useState([]);
    const [allProducts, setAllPoducts] = useState([]);
    const [orders, setOrders] = useState({});

    const [deliveryData, setDeliveryData] = useState([]);
    const navigate = useNavigate();
    const fetchAll = async () => {
        try {
            const [counts, usersData, productsData, ordersData, deliveryData] =
                await Promise.all([
                    adminAxios.get('/count'),
                    adminAxios.get('/user/all'),
                    adminAxios.get('/product'),
                    adminAxios.get('/orders'),
                    adminAxios.get('/delivery/all'),
                ]);

            setDashBoardData(() => counts.data);
            setChartData(() => get6MonthsData(counts.data?.getOrdersByMonth));

            setAllUsers(() => usersData?.data);
            setAllPoducts(() => productsData?.data);

            setOrders(() => ordersData?.data?.orders);
            setDeliveryData(() => deliveryData?.data);
        } catch (error) {
            console.error('error while fetching all items', error);

            if (error.response.status == 401) {
                console.log('unauthenticated');
                navigate('/admin/login');
            }
        }
    };
    useEffect(() => {
        fetchAll();
        const timeout = setTimeout(() => {
            setLoading(false);
        }, 1000);

        return () => {
            clearTimeout(timeout);
        };
    }, []);

    const newValue = {
        dashBoardData,
        setDashBoardData,
        setChartData,
        chartData,
        allUsers,
        setAllUsers,
        allProducts,
        setAllPoducts,
        orders,
        setOrders,
        deliveryData,
        setDeliveryData,
    };
    return (
        <AdminContextProvider newValue={newValue}>
            {loading ? (
                <div className="absolute left-2/4 top-2/4 z-10 translate-x-[-50%] translate-y-[-50%] opacity-100">
                    <svg
                        className="spinner-ring spinner-sm [--spinner-color:var(--slate-11)]"
                        viewBox="25 25 50 50"
                        strokeWidth="5"
                    >
                        <circle cx="50" cy="50" r="20" />
                    </svg>
                </div>
            ) : (
                <Admin />
            )}
        </AdminContextProvider>
    );
}

export default Index;
