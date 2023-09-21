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
import { Link } from 'react-router-dom';
import './sidebar.scss';
import { useDarkMode } from '../../../../context/darkModeContext';
function SideBar({}) {
    const { darkMode, dispatch } = useDarkMode();
    return (
        <section className="side-bar">
            <div className="top">
                <Link to="/admin">
                    <span className="logo">glamo</span>
                </Link>
            </div>
            
            <div className="center">
                <ul>
                    <p className="title">MAIN</p>
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
                    <Link>
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
                    </Link>
                    <Link>
                        <LogoutOutlinedIcon className="icons" />
                        <span>Logout</span>
                    </Link>
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
