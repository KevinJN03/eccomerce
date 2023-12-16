import { adminAxios } from '../../../api/axios';
import { get6MonthsData } from '../../common/months';

export async function getAllData({
    setAllPoducts,
    setAllUsers,
    setChartData,
    setOrders,
    setDeliveryData,
    setDashBoardData,
}) {
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
}
