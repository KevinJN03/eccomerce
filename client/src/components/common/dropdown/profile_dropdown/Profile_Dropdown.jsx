import axios from '../../../../api/axios.js';
import chat_icon from '../../../../assets/icons/profile-icons/chat.png';
import dashboard_icon from '../../../../assets/icons/person.png';
import return_icon from '../../../../assets/icons/profile-icons/delivery-status.png';
import info_icon from '../../../../assets/icons/profile-icons/info.png';
import order_icon from '../../../../assets/icons/profile-icons/package.svg';
import { useAuth } from '../../../../hooks/useAuth';
import Dropdown_Option from './dropdown_option';
import { v4 as uuidv4 } from 'uuid';
import { Link } from 'react-router-dom';
function Profile_Dropdown({}) {
    const { user, authenticated, authDispatch } = useAuth();

    const logout = () => {
        axios.get('user/logout').then(() => {
            authDispatch({ type: 'LOGOUT' });
        });
    };
    return (
        <section className="!mb-0 !pb-0">
            <div className=" bg-light-grey px-3 py-3">
                {!user?.firstName ? (
                    <div className='flex flex-col gap-2'>
                        <a
                            href="/portal/login"
                            type="button"
                            className="profile_dropdown-btn bg-white text-black"
                        >
                            Sign In
                        </a>
                        <a
                            href="/portal/sign-up"
                            type="button"
                            className="profile_dropdown-btn bg-black text-white"
                        >
                            Sign Up
                        </a>
                    </div>
                ) : (
                    <span className="flex gap-x-3">
                        <p className="text-base font-semibold">
                            Hi, {user?.firstName}
                        </p>
                        <button
                            onClick={logout}
                            className="text-sm underline hover:text-blue-600"
                        >
                            Sign out
                        </button>
                    </span>
                )}
            </div>
            <section className="mb-0 bg-white px-4 pb-0">
                {[
                    {
                        option: { src: dashboard_icon, text: 'My Account' },
                        linkTo: './my-account',
                    },
                    {
                        option: { src: order_icon, text: 'My Order' },
                        linkTo: './my-account',
                    },
                    {
                        option: { src: return_icon, text: 'My Returns' },
                        linkTo: './my-account/returns',
                    },
                    {
                        option: { src: info_icon, text: 'Return Information' },
                        linkTo: './my-account/returns',
                    },
                    {
                        option: { src: chat_icon, text: 'Contact Preference' },
                        linkTo: './my-account/contact-preferences',
                    },
                ].map(({ option, linkTo }, index) => {
                    return (
                        <a
                            key={option.text}
                            href={`/${linkTo}`}
                            className="group flex w-full flex-row  items-center justify-start gap-3 px-3 py-3"
                        >
                            <img
                                src={option.src}
                                className="h-7 w-7 object-cover"
                            />
                            <p className="text-sm group-hover:text-blue-500">
                                {option.text}
                            </p>
                        </a>
                    );
                })}
            </section>
        </section>
    );
}

export default Profile_Dropdown;
