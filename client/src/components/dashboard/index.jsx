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
const navOptions = [
    [{ text: 'Account Overview', icon: person_icon }],
    [
        { text: 'My orders', icon: order_icon },
        { text: 'My returns', icon: return_icon },
    ],

    [
        { text: 'My details', icon: contact_icon },
        { text: 'Address book', icon: home_icon },
        { text: 'Payment methods', icon: card_icon },
        { text: 'Contact preferences', icon: chat_icon },
        { text: 'Social accounts', icon: social_icon },
    ],
    [{ text: 'Gift cards & vouchers', icon: giftCard_icon }],
    [
        { text: 'Need help?', icon: info_icon },
        { text: "Where's my order?", icon: duplicate_icon },
        { text: 'How do I make a return?', icon: duplicate_icon },
        { text: 'I need a new return note', icon: duplicate_icon },
    ],
];
function Dashboard() {
    disableLayout();
    return (
        <section className="user-dashboard flex h-full w-screen flex-col !items-center bg-[var(--light-grey)]">
            <section className="dashboard-wrapper w-full max-w-4xl px-3">
                <Checkout_Header text={'MY ACCOUNT'} />
                <section className="dashboard-body mt-3 flex h-full flex-row gap-x-5">
                    <div className="left flex min-h-full flex-1  flex-col gap-y-2">
                        <section className="dashboard-profile relative flex h-44 w-full items-center justify-center  bg-white">
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
                            return <Option options={innerArray} />;
                        })}
                    </div>
                    <div className="right min-h-full flex-[2] bg-white">
                        ssssssssssss
                    </div>
                </section>
            </section>
        </section>
    );
}

function Option({ options }) {
    return (
        <div className="!m-0 !p-0">
            {options.map(({ text, icon }, idx) => {
                return (
                    <div className="no-wrap flex flex-row  items-center gap-x-6 bg-white pl-3 h-14 ">
                        <img
                            className="h-9 w-9"
                            src={icon}
                            alt={text.replaceAll(' ', '-') + '-icon'}
                        />
                        <span className={`hover:underline underline-offset-2 w-full h-full flex justify-left items-center ${ options.length-1 != idx && 'border-b-2'}`}>{text}</span>
                    </div>
                );
            })}
        </div>
    );
}
export default Dashboard;
