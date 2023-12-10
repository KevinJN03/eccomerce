import SideBar from '../components/sidebar/sidebar';
import Navbar from '../components/navbar/navbar';
import Widget from '../components/widget/widget';
import Featured from '../components/featured/featured';
import Chart from '../components/chart/chart';
import Transaction_Table from '../components/table/transaction_table';
import { Outlet } from 'react-router-dom';
import axios from '../../../api/axios';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
function Admin_Dashboard() {
    const [data, setData] = useState({});

    useEffect(() => {
        axios
            .get('/admin/count')
            .then((res) => {
                if (res.status == 200) {
                    setData(() => res.data);
                }
            })
            .catch((error) => {
                'error at admin while fetching counts: ', error;
            });
    }, []);

    const todayDate = dayjs()
        .set('hour', 0)
        .set('minute', 0)
        .set('second', 0)
        .unix();

    console.log({ todayDate, dayjs: dayjs.unix(todayDate) });
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
                <Chart />
            </div>

            <div className="listContainer">
                <div className="listTitle">Latest Transactions</div>
              {data?.orders &&  <Transaction_Table data={data?.orders}/>}
            </div>
        </>
    );
}
export default Admin_Dashboard;
