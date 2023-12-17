import disableLayout from '../../hooks/disableLayout.jsx';
import Checkout_Header from '../checkout/checkout_header.jsx';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import chat_icon from '../../assets/icons/profile-icons/chat.png';
import dashboard_icon from '../../assets/icons/profile-icons/dashboard.png';
import return_icon from '../../assets/icons/profile-icons/delivery-status.png';
import info_icon from '../../assets/icons/profile-icons/info.png';
import order_icon from '../../assets/icons/profile-icons/package.png';
import person_icon from '../../assets/icons/person.png';
import home_icon from '../../assets/icons/home.png';
import contact_icon from '../../assets/icons/contact.png';
import social_icon from '../../assets/icons/guardian.png';
import card_icon from '../../assets/icons/credit-card.png';
import duplicate_icon from '../../assets/icons/duplicate.png';
import coming_soon_icon from '../../assets/icons/coming-soon.png';
import giftCard_icon from '../../assets/icons/gift-card.png';
import { Link, useNavigate } from 'react-router-dom';
import { easeInOut, motion } from 'framer-motion';
export const navOptionsArray = [
    [{ text: 'Account overview', icon: person_icon, link: 'my-account' }],
    [
        { text: 'My orders', icon: order_icon, link: 'orders' },
        { text: 'My returns', icon: return_icon, link: 'returns' },
    ],

    [
        { text: 'My details', icon: contact_icon, link: 'my-details' },
        { text: 'Change Password', icon: 'https://dknhps0hwilzj.cloudfront.net/files/logos/lock.png', link: 'change-password' },
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

export const variants = {
    initial: {
        opacity: 0.5,
    },
    animate: {
        opacity: 1,

        transition: { ease: 'easeInOut', duration: 0.6 },
    },
};
export default function NavOption({ selectOption, loadingState }) {
    const navigate = useNavigate();
    return (
        <>
            {navOptionsArray.map((options, index) => {
                return (
                    <motion.div className="!m-0 !p-0" key={index}>
                        {options.map(({ text, icon, link }, idx) => {
                            return (
                                <button
                                    disabled={loadingState}
                                    onClick={() =>
                                        navigate(
                                            link == 'my-account'
                                                ? `/${link}`
                                                : link && `/my-account/${link}`
                                        )
                                    }
                                    className={`no-wrap relative flex  h-14 w-full flex-row items-center bg-white px-3 ${
                                        selectOption == link && !loadingState
                                            ? 'active-btn'
                                            : ''
                                    }`}
                                >
                                    <motion.div className="mr-6 h-full max-h-9 w-full max-w-[36px]">
                                        {loadingState ? (
                                            <motion.div className=" skeleton-pulse min-h-full min-w-full rounded-[50%] p-0 "></motion.div>
                                        ) : (
                                            <motion.img
                                                key={loadingState}
                                                variants={variants}
                                                animate={'animate'}
                                                initial={'initial'}
                                                className="mr-6 h-9 w-9"
                                                src={icon}
                                                alt={
                                                    text.replaceAll(' ', '-') +
                                                    '-icon'
                                                }
                                            />
                                        )}
                                    </motion.div>

                                    <div
                                        className={`justify-left text-s mr-[-12px] flex h-full w-full items-center font-light underline-offset-2 hover:underline ${
                                            options.length - 1 != idx && 'border-b-[1px]'
                                        }`}
                                    >
                                        {loadingState ? (
                                            <div className=" skeleton-pulse min-h-full min-w-full p-0 "></div>
                                        ) : (
                                            <motion.p
                                                key={loadingState}
                                                variants={variants}
                                                animate={'animate'}
                                                initial={'initial'}
                                            >
                                                {text}{' '}
                                            </motion.p>
                                        )}
                                    </div>
                                </button>
                            );
                        })}
                    </motion.div>
                );
            })}
        </>
    );
}
