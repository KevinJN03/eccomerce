import LoginForm from '../../portal/loginForm';
import { useEffect, useState } from 'react';
import { adminAxios } from '../../../api/axios.js';
import { useAdminContext } from '../../../context/adminContext.jsx';

import { useNavigate } from 'react-router-dom';
import { get6MonthsData } from '../../common/months.js';

function AdminLogin({}) {
    const [error, setError] = useState({ email: null, password: null });
    const [loading, setLoading] = useState(false);
    const [pageLoad, setPageLoad] = useState(true);

    const {
        authAdminUser,
        authAdminUserDispatch,
        setAllProducts,
        setAllUsers,
        setChartData,
        setOrders,
        setDeliveryData,
        setDashBoardData,
    } = useAdminContext();

    const navigate = useNavigate();

    const onSubmit = async ({ email, password }) => {
        console.log('test');
        let success = false;
        try {
            setLoading(() => true);
            const { data } = await adminAxios.post('login', {
                email,
                password,
            });
            console.log({ data });

            authAdminUserDispatch({ type: 'LOGIN', payload: data });

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
            setAllProducts(() => productsData?.data);

            setOrders(() => ordersData?.data?.orders);
            setDeliveryData(() => deliveryData?.data);
            success = true;
        } catch (error) {
            console.error('error while login in admin', error);
            setError((prevError) => ({
                ...prevError,
                ...error?.response?.data?.error,
            }));
        } finally {
            if (success) {
                return setTimeout(() => {
                    setLoading(false);

                    navigate('/admin');
                }, 1000);
            }
            setLoading(false);
        }
    };
    return (
        <LoginForm
            onSubmit={onSubmit}
            error={error}
            setError={setError}
            loading={loading}
        />
    );
}

export default AdminLogin;
