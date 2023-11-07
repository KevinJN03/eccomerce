import disableLayout from '../../hooks/disableLayout';
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
import giftCard_icon from '../../assets/icons/gift-card.png';

import '../../CSS/user-dashboard.scss';
import { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
const navOptions = [
    [{ text: 'Account overview', icon: person_icon, link: 'my-account' }],
    [
        { text: 'My orders', icon: order_icon, link: 'orders' },
        { text: 'My returns', icon: return_icon, link: 'returns' },
    ],

    [
        { text: 'My details', icon: contact_icon, link: 'my-details' },
        { text: 'Address book', icon: home_icon, link: 'addresses' },
        { text: 'Payment methods', icon: card_icon, link: 'payment-methods' },
        {
            text: 'Contact preferences',
            icon: chat_icon,
            link: 'contact-preferences',
        },
        { text: 'Social accounts', icon: social_icon, link: 'social-accounts' },
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
function Dashboard() {
    disableLayout();

    const [selectOption, setSelectionOption] = useState(navOptions[0][0].text);

    return (
        <section className="user-dashboard flex h-full w-screen flex-col !items-center bg-[var(--light-grey)] pb-10">
            <section className="dashboard-wrapper w-full max-w-4xl px-3">
                <Checkout_Header text={'MY ACCOUNT'} />
                <section className="dashboard-body mt-3 flex h-full flex-row gap-x-5">
                    <div className="left flex min-h-full flex-1  flex-col gap-y-2">
                        <section className="dashboard-profile relative flex h-40 w-full items-center justify-center  bg-white">
                            <div className="profile-wrapper absolute left-[-12px] flex items-center justify-center gap-x-3">
                                <div className="profile-photo flex h-24 w-24 items-center justify-center rounded-full !bg-primary">
                                    <span className="user-initial font-gotham text-4xl !font-extrabold text-white">
                                        KJ
                                    </span>
                                </div>
                                <span className="user-name">
                                    Hi,
                                    <span className="block font-gotham text-lg tracking-wider">
                                        Kevin Jean
                                    </span>
                                </span>
                            </div>
                        </section>
                        {navOptions.map((innerArray) => {
                            return (
                                <Option
                                    options={innerArray}
                                    selectOption={selectOption}
                                    setSelectionOption={setSelectionOption}
                                />
                            );
                        })}
                    </div>
                    <div className="right min-h-full flex-[2] bg-white">
                        <Outlet />
                    </div>
                </section>
            </section>
        </section>
    );
}

function Option({ options, selectOption, setSelectionOption }) {
    return (
        <div className="!m-0 !p-0">
            {options.map(({ text, icon, link }, idx) => {
                return (
                    <Link
                        to={
                            link == 'my-account'
                                ? `/${link}`
                                : link && `/my-account/${link}`
                        }
                        onClick={() => setSelectionOption(() => text)}
                        className={`no-wrap relative flex  h-14 flex-row items-center bg-white pl-3 ${
                            selectOption == text ? 'active-btn' : ''
                        }`}
                    >
                        <img
                            className="mr-6 h-9 w-9"
                            src={icon}
                            alt={text.replaceAll(' ', '-') + '-icon'}
                        />
                        <p
                            className={`justify-left flex h-full w-full items-center text-s font-light underline-offset-2 hover:underline ${
                                options.length - 1 != idx && 'border-b-[1px]'
                            }`}
                        >
                            {text}
                        </p>
                    </Link>
                );
            })}
        </div>
    );
}
export default Dashboard;
