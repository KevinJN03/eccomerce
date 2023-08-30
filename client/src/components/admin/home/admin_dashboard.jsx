import SideBar from '../components/sidebar/sidebar';
import Navbar from '../components/navbar/navbar';
import Widget from '../components/widget/widget';
import Featured from '../components/featured/featured';
import Chart from '../components/chart/chart';
import Transaction_Table from '../components/table/transaction_table';
function Admin_Dashboard() {
    return (
        <section className="home">
            <SideBar />
            <div className="homeContainer">
                <Navbar />
                <div className="widgets">
                    <Widget type="user" />
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
            </div>
        </section>
    );
}
export default Admin_Dashboard;
