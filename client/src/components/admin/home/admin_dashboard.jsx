import SideBar from '../components/sidebar/sidebar';
import Navbar from '../components/navbar/navbar';
import Widget from '../components/widget/widget';
import Featured from '../components/featured/featured';
import Chart from '../components/chart/chart';
import Transaction_Table from '../components/table/transaction_table';
import { Outlet } from 'react-router-dom';
import { adminAxios } from '../../../api/axios.js';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { get6MonthsData } from '../../common/months';
import { useAdminContext } from '../../../context/adminContext';
import { AnimatePresence, motion } from 'framer-motion';
import animationVariant from './animationVariant';

function Admin_Dashboard() {
    const { dashBoardData, chartData } = useAdminContext();
    const variants = {
        initial: {
            opacity: 0,
            translateY: 50,
        },
        animate: {
            opacity: 1,
            translateY: 0,
            transition: { duration: 2 },
        },
    };

    return (
        <AnimatePresence>
            <div className="widgets">
                {[
                    { type: 'user', amount: 'userCount' },
                    { type: 'order', amount: 'orderCount' },
                    { type: 'earning' },
                    { type: 'balance', amount: 'balance' },
                ].map((item, idx) => {
                    return (
                        <Widget
                        key={item.type}
                            type={item.type}
                            amount={dashBoardData?.[item?.amount]}
                            idx={idx}
                        />
                    );
                })}
            </div>
            <div className="charts">
                <Featured todayAmount={dashBoardData?.todayAmount} />
                <Chart data={chartData} />
            </div>

            <motion.div
                className="listContainer rounded-lg"
                variants={animationVariant(2)}
                animate={'animate'}
                initial={'initial'}
            >
                <div className="listTitle">Latest Transactions</div>
                {dashBoardData?.orders && (
                    <Transaction_Table data={dashBoardData?.orders} />
                )}
            </motion.div>
        </AnimatePresence>
    );
}
export default Admin_Dashboard;
