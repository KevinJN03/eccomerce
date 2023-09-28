import Sidebar from '../../sidebar/sidebar.jsx';
import Navbar from '../../navbar/navbar.jsx';
import Chart from '../../chart/chart.jsx';
import List from '../users.jsx';
import './single.scss';
import Transaction_Table from '../../table/transaction_table.jsx';
import { Link, Outlet, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Error from '../../../../error/error.jsx';
import { adminAxios } from '../../../../../api/axios';
import userIcon from '../../../../../assets/icons/user.png';
function Single_User({}) {
    const [user, setUser] = useState({});
    const [error, setError] = useState();
    const { id } = useParams();
    console.log(id);
    useEffect(() => {
        adminAxios
            .get(`user/${id}`)
            .then((res) => {
                if (res.status == 200) {
                    let data = res.data;
                    console.log(data);
                    setUser(data);
                }
            })
            .catch((error) => {
                console.log('error at single user: ', error);
                setError(error);
            });
    }, []);


    return (
        <div className="single">
            <Sidebar />

            <div className="singleContainer">
                <Navbar />
                {error && <Error link={'/admin/users'} buttonText={'GO TO USERS'}/>}
                {!error && (
                    <>
                        <div className="top">
                            <div className="left">
                                <Link to={'./edit'} className="editButton">Edit</Link >
                                <h1 className="title">Information</h1>
                                <div className="item">
                                    <img
                                        src={user.profileImg || userIcon}
                                        alt=""
                                        className="itemImg"
                                
                                    />
                                    <div className="details">
                                        <h1 className="itemTitle">{`${user.firstName} ${user.lastName}`}</h1>
                                        <div className="detailItem">
                                            <span className="itemKey">
                                                Email:
                                            </span>
                                            <span className="itemValue">
                                                {user.email}
                                            </span>
                                        </div>
                                        <div className="detailItem">
                                            <span className="itemKey">
                                                Phone:
                                            </span>
                                            <span className="itemValue">
                                                {user.mobile}
                                            </span>
                                        </div>
                                        <div className="detailItem">
                                            <span className="itemKey">
                                                Address:
                                            </span>
                                            <span className="itemValue">
                                                {user.address && `${user.address[0].line1}, ${user.address[0].line2} ` || 'N/A'}
                                            </span>
                                        </div>
                                        <div className="detailItem">
                                            <span className="itemKey">
                                                Country:
                                            </span>
                                            <span className="itemValue">
                                                { user.address && user.address[0].country || 'N/A'}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="right">
                                <Chart
                                    aspect={3 / 1}
                                    title="User Spending ( Last 6 Months)"
                                />
                            </div>
                        </div>
                        <div className="bottom">
                            <h1 className="title">Last Transactions</h1>
                            <Transaction_Table />
                        </div>
                    </>
                )}
            </div>
           
        </div>
    );
}

export default Single_User;
