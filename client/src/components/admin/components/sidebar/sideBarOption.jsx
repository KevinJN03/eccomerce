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
import {
    AccountBalanceSharp,
    HomeOutlined,
    InterestsOutlined,
    SearchOutlined,
} from '@mui/icons-material';
import clipboard_icon from '../../../../assets/icons/clipboard.png';
const optionsArray = [
    {
        icon: <HomeOutlined className="icons" />,
        title: 'DashBoard',
        link: '/admin',
    },

    {
        icon: <PersonOutlineOutlinedIcon className="icons" />,
        title: 'Users',
        link: '/admin/users',
    },
    {
        icon: <InterestsOutlined className="icons" />,
        title: 'Listings',
        link: '/admin/products',
    },
    {
        icon: <img src={clipboard_icon} className="icons h-[30px] w-[30px]" />,
        // icon: <CreditCardRoundedIcon className="icons" />,
        title: 'Orders',
        link: '/admin/orders/new',
    },
    {
        icon: <LocalShippingIcon className="icons" />,
        title: 'Delivery',
        link: '/admin/delivery',
    },
    {
        icon: <AccountBalanceSharp className="icons"/>,
        title: 'Finance',
        link: '/admin/payments',
    },

    {
        icon: <AssessmentRoundedIcon className="icons" />,
        title: 'Stats',
        // link: '/admin/delivery',
        coming_soon: true,
    },
    {
        icon: <NotificationsActiveRoundedIcon className="icons" />,
        title: '  Notifications',
        // link: '/admin/delivery',
        coming_soon: true,
    },

    {
        icon: <SettingsSystemDaydreamRoundedIcon className="icons" />,
        title: 'System Health',
        link: '/admin/system_health',
        // coming_soon: true,
    },
    {
        icon: <PsychologyRoundedIcon className="icons" />,
        title: 'Logs',
        link: '/admin/logs',

    },
    {
        icon: <SettingsSuggestRoundedIcon className="icons" />,
        title: 'Settings',
        coming_soon: true,
    },

    {
        icon: <AccountCircleOutlinedIcon className="icons" />,
        title: 'Profile',
        coming_soon: true,

        // link: '/admin/delivery',
    },
];
export default optionsArray;
