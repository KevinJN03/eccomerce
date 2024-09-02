import { adminAxios } from '../../../api/axios.js';
import { get6MonthsData } from '../../common/months';

export async function getAllData({
    setAllProducts,
    setAllUsers,
    setChartData,
    setOrders,
    setDeliveryData,
    setDashBoardData,
}) {
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
}
