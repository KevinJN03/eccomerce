import SideBar from '../components/sidebar/sidebar';
import Navbar from '../components/navbar/navbar';
import Widget from '../components/widget/widget';
import Featured from '../components/featured/featured';
import Chart from '../components/chart/chart';
import Transaction_Table from '../components/table/transaction_table';
import { Outlet } from 'react-router-dom';
import axios from '../../../api/axios';
import { useEffect, useState } from 'react';
function Admin_Dashboard() {
    const [totalUsers, setTotalUsers] = useState(0);
    useEffect(() => {
        axios
            .get('/admin/count')
            .then((res) => {
                if (res.status == 200) {
                    const { userCount } = res.data;
                    setTotalUsers(userCount);
                }
            })
            .catch((error) => {
                console.log('error at admin while fetching counts: ', error);
            });
    }, []);
    return (
        <>
            <div className="widgets">
                <Widget type="user" amount={totalUsers} />
                <Widget type="order" />
                <Widget type="earning" />
                <Widget type="balance" />
            </div>
            <div className="charts">
                <Featured />
                <Chart />
            </div>

            <div className="listContainer">
                <div className="listTitle">Latest Transactions</div>
                <Transaction_Table />
            </div>
        </>
    );
}
export default Admin_Dashboard;
