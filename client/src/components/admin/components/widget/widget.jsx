import MovingOutlinedIcon from '@mui/icons-material/MovingOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined';
import { Link } from 'react-router-dom';
import AccountBalanceOutlinedIcon from '@mui/icons-material/AccountBalanceOutlined';

import { motion } from 'framer-motion';
import animationVariant from '../../home/animationVariant';
function Widget({ type, amount, idx }) {
    let data;

    // tempory amount

    const diff = 20;
    if (type == 'user') {
        data = {
            title: 'USERS',
            isMoney: false,
            link: <Link to="users">See all users</Link>,
            icon: (
                <>
                    <PersonOutlineOutlinedIcon className="icon" />
                </>
            ),
        };
    } else if (type == 'order') {
        data = {
            title: 'ORDERS',
            isMoney: false,
            link: <Link to="orders/new">View all orders</Link>,
            icon: <ShoppingCartOutlinedIcon className="icon" />,
        };
    } else if (type == 'earning') {
        data = {
            title: 'EARNINGS',
            isMoney: true,
            link: <Link to="earnings">View net earnings</Link>,
            icon: <MonetizationOnOutlinedIcon className="icon" />,
        };
    } else if (type == 'balance') {
        data = {
            title: 'BALANCE',
            isMoney: true,
            link: <Link to="balance">See Details</Link>,
            icon: <AccountBalanceOutlinedIcon className="icon" />,
        };
    }

    return (
        <motion.div
            className="widget"
            variants={animationVariant(idx)}
            animate={'animate'}
            initial={'initial'}
        >
            <div className="left">
                <span className="title">{data.title}</span>
                <span className="counter">
                    {data.isMoney && '£'}
                    {amount}
                </span>
                <span className="link">{data.link}</span>
            </div>
            <div className="right">
                <div className="percentage positive">
                    <MovingOutlinedIcon />
                    20%
                </div>
                {data.icon}
            </div>
        </motion.div>
    );
}

export default Widget;
