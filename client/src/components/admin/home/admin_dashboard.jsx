import SideBar from '../components/sidebar/sidebar';
import Navbar from '../components/navbar/navbar';
import Widget from '../components/widget/widget';
import Featured from '../components/featured/featured';
import Chart from '../components/chart/chart';
import Transaction_Table from '../components/table/transaction_table';
import { Outlet } from 'react-router-dom';
import { adminAxios } from '../../../api/axios';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { get6MonthsData } from '../../common/months';

function Admin_Dashboard() {
    const [data, setData] = useState({});
    const [chartData, setChartData] = useState([]);
    useEffect(() => {
        adminAxios.get('/count')
            .then((res) => {
                if (res.status == 200) {
                    setData(() => res.data);
                    setChartData(() =>
                        get6MonthsData(res.data?.getOrdersByMonth)
                    );
                }
            })
            .catch((error) => {
                'error at admin while fetching counts: ', error;
            });
    }, []);

    return (
        <>
            <div className="widgets">
                <Widget type="user" amount={data?.userCount} />
                <Widget type="order" amount={data?.orderCount} />
                <Widget type="earning" />
                <Widget type="balance" amount={data?.balance} />
            </div>
            <div className="charts">
                <Featured todayAmount={data?.todayAmount} />
                <Chart data={chartData} />
            </div>

            <div className="listContainer">
                <div className="listTitle">Latest Transactions</div>
                {data?.orders && <Transaction_Table data={data?.orders} />}
            </div>
        </>
    );
}
export default Admin_Dashboard;
