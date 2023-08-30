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

import "./sidebar.scss"
function SideBar({}){
  return (
    <section className='side-bar'>
      

      <div className="top"><span className="logo">glamo</span></div>
      <hr/>
      <div className="center">
        <ul>
            <p className="title">MAIN</p>
            <li>
                <DashboardIcon className="icons"/>
                <span>DashBoard</span>
            </li>
            <p className="title">LISTS</p>
            <li>
                <PersonOutlineOutlinedIcon className="icons"/>
                <span>Users</span>
            </li>
            <li>
                <StoreRoundedIcon className="icons"/>
                <span>Products</span>
            </li>
            <li>
                <CreditCardRoundedIcon className="icons"/>
                <span>Orders</span>
            </li>
            <li>
                <LocalShippingIcon className="icons"/>
                <span>Delivery</span>
            </li>
            <p className="title">USEFUL LINKS</p>
            <li>
                <AssessmentRoundedIcon className="icons"/>
                <span>Stats</span>
            </li>
            <li>
                <NotificationsActiveRoundedIcon className="icons"/>
                <span>Notifications</span>
            </li>
            <p className="title">SERVICE</p>
            <li>
                <SettingsSystemDaydreamRoundedIcon className="icons"/>
                <span>System Health</span>
            </li>
            <li>
                <PsychologyRoundedIcon className="icons"/>
                <span>Logs</span>
            </li>
            <li>
                <SettingsSuggestRoundedIcon className="icons"/>
                <span>Settings</span>
            </li>
            <p className="title">USER</p>
            <li>
                <AccountCircleOutlinedIcon className="icons"/>
                <span>Profile</span>
            </li>
            <li>
                <LogoutOutlinedIcon className="icons"/>
                <span>Logout</span>
            </li>
        </ul>
      </div>
      <div className="bottom">
        <div className="colorOption"></div>
        <div className="colorOption"></div>
        
      </div>
    </section>
  )
};

export default SideBar
