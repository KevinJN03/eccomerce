import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import StoreRoundedIcon from '@mui/icons-material/StoreRounded';
import AssessmentRoundedIcon from '@mui/icons-material/AssessmentRounded';
import NotificationsActiveRoundedIcon from '@mui/icons-material/NotificationsActiveRounded';
import SettingsSystemDaydreamRoundedIcon from '@mui/icons-material/SettingsSystemDaydreamRounded';
import PsychologyRoundedIcon from '@mui/icons-material/PsychologyRounded';
import SettingsSuggestRoundedIcon from '@mui/icons-material/SettingsSuggestRounded';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import CreditCardRoundedIcon from '@mui/icons-material/CreditCardRounded';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './sidebar.scss';
import { useDarkMode } from '../../../../context/darkModeContext';
import glamo_icon from '../../../../../dist/assets/glamo-black-logo-61d90fbe.svg';
import axios from '../../../../api/axios';
import { Fragment } from 'react';
import { v4 as uuidv4 } from 'uuid';
function SideBar({}) {
    const { darkMode, dispatch } = useDarkMode();
    const navigate = useNavigate();
    const logout = async () => {
        try {
            await axios.get('user/logout');
            navigate('/admin/login');
        } catch (error) {
            console.error('error while loginning out', error);
        }
    };

    const optionsArray = [
        {
            title: 'MAIN',
            options: [
                {
                    icon: <DashboardIcon className="icons" />,
                    title: 'DashBoard',
                    link: '/admin',
                },
            ],
        },
        {
            title: 'LISTS',
            options: [
                {
                    icon: <PersonOutlineOutlinedIcon className="icons" />,
                    title: 'Users',
                    link: '/admin/users',
                },
                {
                    icon: <StoreRoundedIcon className="icons" />,
                    title: 'Products',
                    link: '/admin/products',
                },
                {
                    icon: <CreditCardRoundedIcon className="icons" />,
                    title: 'Orders',
                    link: '/admin/orders',
                },
                {
                    icon: <LocalShippingIcon className="icons" />,
                    title: 'Delivery',
                    link: '/admin/delivery',
                },
            ],
        },
        {
            title: 'USEFUL LINKS',
            options: [
                {
                    icon: <AssessmentRoundedIcon className="icons" />,
                    title: 'Stats',
                    // link: '/admin/delivery',
                },
                {
                    icon: <NotificationsActiveRoundedIcon className="icons" />,
                    title: '  Notifications',
                    // link: '/admin/delivery',
                },
                {
                    icon: <NotificationsActiveRoundedIcon className="icons" />,
                    title: '  Notifications',
                    // link: '/admin/delivery',
                },
            ],
        },
        {
            title: 'SERVICE',
            options: [
                {
                    icon: (
                        <SettingsSystemDaydreamRoundedIcon className="icons" />
                    ),
                    title: 'System Health',
                    // link: '/admin/delivery',
                },
                {
                    icon: <PsychologyRoundedIcon className="icons" />,
                    title: 'Logs',
                },
                {
                    icon: <SettingsSuggestRoundedIcon className="icons" />,
                    title: 'Settings',
                },
            ],
        },
        {
            title: 'USER',
            options: [
                {
                    icon: <AccountCircleOutlinedIcon className="icons" />,
                    title: 'Profile',

                    // link: '/admin/delivery',
                },
            ],
        },
    ];
    const location = useLocation();
    console.log(location);
    const route = location?.pathname
        ?.split('/')
        .slice(0, 3)
        .join('/')
        // .substring(1);

    console.log({ route });
    return (
        <section className="side-bar">
            <div className="top">
                <Link to="/admin">
                    {/* <span className="logo">glamo</span> */}
                    <img src={glamo_icon} alt="glamo icon" className="w-28" />
                </Link>
            </div>

            <div className="center">
                <ul>
                    {optionsArray.map(({ title, options }) => {
                        return (
                            <Fragment key={uuidv4()}>
                                <p className="title">{title}</p>
                                {options?.map((item) => {
                                    return (
                                        <Link
                                            to={item?.link || '/admin'}
                                            className={`${
                                                route == item?.link
                                                    ? 'bg-green-200'
                                                    : ''
                                            }`}
                                        >
                                            {/* <DashboardIcon className="icons" /> */}
                                            {item?.icon}
                                            <span>{item?.title}</span>
                                        </Link>
                                    );
                                })}
                            </Fragment>
                        );
                    })}
                    {/* <p className="title">MAIN</p>
                    <Link to="/admin">
                        <DashboardIcon className="icons" />
                        <span>DashBoard</span>
                    </Link>
                    <p className="title">LISTS</p>
                    <Link to="/admin/users">
                        <PersonOutlineOutlinedIcon className="icons" />
                        <span>Users</span>
                    </Link>
                    <Link to="/admin/products">
                        <StoreRoundedIcon className="icons" />
                        <span>Products</span>
                    </Link>
                    <Link to="/admin/orders">
                        <CreditCardRoundedIcon className="icons" />
                        <span>Orders</span>
                    </Link>
                    <Link to="/admin/delivery">
                        <LocalShippingIcon className="icons" />
                        <span>Delivery</span>
                    </Link>

                    <p className="title">USEFUL LINKS</p>

                    <Link>
                        <AssessmentRoundedIcon className="icons" />
                        <span>Stats</span>
                    </Link>
                    <Link>
                        <NotificationsActiveRoundedIcon className="icons" />
                        <span>Notifications</span>
                    </Link>

                    <p className="title">SERVICE</p>
                    <Link>
                        <SettingsSystemDaydreamRoundedIcon className="icons" />
                        <span>System Health</span>
                    </Link>
                    <Link>
                        <PsychologyRoundedIcon className="icons" />
                        <span>Logs</span>
                    </Link>
                    <Link>
                        <SettingsSuggestRoundedIcon className="icons" />
                        <span>Settings</span>
                    </Link>
                    <p className="title">USER</p>
                    <Link>
                        <AccountCircleOutlinedIcon className="icons" />
                        <span>Profile</span>
                    </Link> */}
                    <button type="button" className="" onClick={logout}>
                        <LogoutOutlinedIcon className="icons" />
                        <span>Logout</span>
                    </button>
                    {/* <Link>
                        <LogoutOutlinedIcon className="icons" />
                        <span>Logout</span>
                    </Link> */}
                </ul>
            </div>
            <div className="bottom">
                <div
                    className="colorOption"
                    onClick={() => dispatch({ type: 'LIGHT' })}
                ></div>
                <div
                    className="colorOption"
                    onClick={() => dispatch({ type: 'DARK' })}
                ></div>
            </div>
        </section>
    );
}

export default SideBar;
