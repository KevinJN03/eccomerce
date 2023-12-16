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
import { add } from 'lodash';
import dayjs from 'dayjs';
import updateLocale from 'dayjs/plugin/updateLocale.js';
dayjs.extend(updateLocale);
import {
    get6MonthFromToday,
    get6MonthsData,
} from '../../../../common/months.js';
import { AnimatePresence, motion } from 'framer-motion';
import animationVariant from '../../../home/animationVariant.js';
function Single_User({}) {
    const [user, setUser] = useState({});
    const [orders, setOrders] = useState([]);
    const [chartData, setChartData] = useState([]);
    const [error, setError] = useState();
    const { id } = useParams();

    useEffect(() => {
        adminAxios
            .get(`user/${id}`)
            .then(({ data }) => {
                setOrders(() => data?.orders);
                setUser(() => data?.user);

                setChartData(() => get6MonthsData(data?.getOrdersByMonth));
            })
            .catch((error) => {
                'error at single user: ', error;
                setError(error);
            });
    }, []);

    const address = user?.default_address?.shipping_address;
    return (
        <AnimatePresence>
            <div className="single">
                <div className="singleContainer">
                    {error && (
                        <Error
                            link={'/admin/users'}
                            buttonText={'GO TO USERS'}
                        />
                    )}
                    {!error && (
                        <>
                            <div className="top">
                                <motion.div
                                    className="left"
                                    variants={animationVariant(1)}
                                    initial="initial"
                                    animate="animate"
                                >
                                    <Link to={'./edit'} className="editButton">
                                        Edit
                                    </Link>
                                    <h1 className="title">Information</h1>
                                    <div className="item">
                                        <img
                                            src={user?.profileImg || userIcon}
                                            alt=""
                                            className="itemImg"
                                        />
                                        <div className="details">
                                            <h1 className="itemTitle">{`${user?.firstName} ${user?.lastName}`}</h1>
                                            <div className="detailItem">
                                                <span className="itemKey">
                                                    Email:
                                                </span>
                                                <span className="itemValue">
                                                    {user?.email}
                                                </span>
                                            </div>
                                            {address && (
                                                <>
                                                    <div className="detailItem">
                                                        <span className="itemKey">
                                                            Phone:
                                                        </span>
                                                        <span className="itemValue">
                                                            {
                                                                user
                                                                    ?.default_address
                                                                    ?.shipping_address
                                                                    ?.mobile
                                                            }
                                                        </span>
                                                    </div>
                                                    <div className="detailItem">
                                                        <span className="itemKey">
                                                            Address:
                                                        </span>
                                                        <span className="itemValue">
                                                            {address && (
                                                                <>
                                                                    <p>
                                                                        {`${
                                                                            address?.address_1
                                                                        }, ${
                                                                            address?.address_2 ||
                                                                            ''
                                                                        }`}
                                                                    </p>
                                                                    <p>
                                                                        {address?.city ||
                                                                            ''}
                                                                    </p>
                                                                    <p>
                                                                        {`${address?.county}, ${address?.postCode}`}
                                                                    </p>
                                                                </>
                                                            )}
                                                        </span>
                                                    </div>
                                                    <div className="detailItem">
                                                        <span className="itemKey">
                                                            Country:
                                                        </span>

                                                        <span className="itemValue">
                                                            {address?.country ||
                                                                ''}
                                                        </span>
                                                    </div>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </motion.div>
                                <div className="right">
                                    <Chart
                                        data={chartData}
                                        aspect={3 / 1}
                                        title="User Spending ( Last 6 Months)"
                                    />
                                </div>
                            </div>
                            <motion.div
                                className="bottom"
                                variants={animationVariant(2)}
                                initial="initial"
                                animate="animate"
                            >
                                <h1 className="title">Last Transactions</h1>

                                <Transaction_Table data={orders} />
                            </motion.div>
                        </>
                    )}
                </div>
            </div>
        </AnimatePresence>
    );
}

export default Single_User;
