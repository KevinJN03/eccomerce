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
import { getAllData } from './getAllData';
import LoadingPage from '../../order/loadingPage';
// import List from '../components/list/list';

function Index({}) {
    const { darkMode } = useDarkMode();
    'darkMode', darkMode;

    const [loading, setLoading] = useState(true);

    const [dashBoardData, setDashBoardData] = useState({});
    const [chartData, setChartData] = useState([]);
    const [allUsers, setAllUsers] = useState([]);
    const [allProducts, setAllProducts] = useState([]);
    const [orders, setOrders] = useState({});
    const [deliveryData, setDeliveryData] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [
                    counts,
                    usersData,
                    // productsData,
                    // ordersData,
                    deliveryData,
                ] = await Promise.all([
                    adminAxios.get('/count'),
                    adminAxios.get('/user/all'),
                    // adminAxios.post('/products/all', { checks: { sort: {title: 1} } }),
                    // adminAxios.get('/orders'),
                    adminAxios.get('/delivery/all'),
                ]);

                setDashBoardData(() => counts.data);
                setChartData(() =>
                    get6MonthsData(counts.data?.getOrdersByMonth)
                );

                setAllUsers(() => usersData?.data);
                // setAllProducts(() => productsData.data?.products);

                // setOrders(() => ordersData?.data?.orders);
                setDeliveryData(() => deliveryData?.data);
            } catch (error) {
                console.log('error while trying to get data');

                if (error?.response?.status == 401) {
                    navigate('/admin/login');
                }
            } finally {
                setTimeout(() => {
                    setLoading(false);
                }, 1000);
            }
        };

        fetchData();
    }, []);

    const newValue = {
        dashBoardData,
        setDashBoardData,
        setChartData,
        chartData,
        allUsers,
        setAllUsers,
        allProducts,
        setAllProducts,
        orders,
        setOrders,
        deliveryData,
        setDeliveryData,
    };
    return (
        <AdminContextProvider newValue={newValue}>
            <section className="w-full bg-white">
                {loading ? <LoadingPage /> : <Admin />}
            </section>
        </AdminContextProvider>
    );
}

export default Index;
