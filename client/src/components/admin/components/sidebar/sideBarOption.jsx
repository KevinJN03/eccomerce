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
const optionsArray = [
    {
        icon: <DashboardIcon className="icons" />,
        title: 'DashBoard',
        link: '/admin',
    },

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
        icon: <SettingsSystemDaydreamRoundedIcon className="icons" />,
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

    {
        icon: <AccountCircleOutlinedIcon className="icons" />,
        title: 'Profile',

        // link: '/admin/delivery',
    },
];
export default optionsArray;
