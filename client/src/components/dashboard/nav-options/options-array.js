// import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import chat_icon from '../../../assets/icons/profile-icons/chat.png';
import dashboard_icon from '../../../assets/icons/profile-icons/dashboard.png';
import return_icon from '../../../assets/icons/profile-icons/delivery-status.png';
import info_icon from '../../../assets/icons/profile-icons/info.png';
import order_icon from '../../../assets/icons/profile-icons/package.png';
import person_icon from '../../../assets/icons/person.png';
import home_icon from '../../../assets/icons/home.png';
import contact_icon from '../../../assets/icons/contact.png';
import social_icon from '../../../assets/icons/guardian.png';
import card_icon from '../../../assets/icons/credit-card.png';
import duplicate_icon from '../../../assets/icons/duplicate.png';
import coming_soon_icon from '../../../assets/icons/coming-soon.png';
import giftCard_icon from '../../../assets/icons/gift-card.png';

export const navOptionsArray = [
    [{ text: 'Account overview', icon: person_icon, link: 'my-account' }],
    [
        { text: 'My orders', icon: order_icon, link: 'orders' },
        { text: 'My returns', icon: return_icon, link: 'returns' },
    ],

    [
        { text: 'My details', icon: contact_icon, link: 'my-details' },
        {
            text: 'Change Password',
            icon: 'https://dknhps0hwilzj.cloudfront.net/files/logos/lock.png',
            link: 'change-password',
        },
        { text: 'Address book', icon: home_icon, link: 'addresses' },
        { text: 'Payment methods', icon: card_icon, link: 'payment-methods' },
        {
            text: 'Contact preferences',
            icon: chat_icon,
            link: 'contact-preferences',
        },
        {
            text: 'Social accounts',
            icon: social_icon,
            link: 'social-accounts',
        },
    ],
    [
        {
            text: 'Gift cards & vouchers',
            icon: giftCard_icon,
            link: 'gift-cards-and-vouchers',
        },
    ],
    [
        { text: 'Need help?', icon: info_icon },
        { text: "Where's my order?", icon: duplicate_icon },
        { text: 'How do I make a return?', icon: duplicate_icon },
        { text: 'I need a new return note', icon: duplicate_icon },
    ],
];
