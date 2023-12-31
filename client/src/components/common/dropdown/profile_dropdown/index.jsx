import axios from '../../../../api/axios';
import chat_icon from '../../../../assets/icons/profile-icons/chat.png';
import dashboard_icon from '../../../../assets/icons/profile-icons/dashboard.png';
import return_icon from '../../../../assets/icons/profile-icons/delivery-status.png';
import info_icon from '../../../../assets/icons/profile-icons/info.png';
import order_icon from '../../../../assets/icons/profile-icons/package.svg';
import { useAuth } from '../../../../hooks/useAuth';
import Dropdown_Option from './dropdown_option';
import { v4 as uuidv4 } from 'uuid';
function Profile_Dropdown({}) {
    const { user, authenticated, authDispatch } = useAuth();

    const logout = () => {
        axios.get('user/logout').then(() => {
            authDispatch({ type: 'LOGOUT' });
        });
    };
    return (
        <section id="profile_dropdown" className="m-0">
            <div className="signin-signup-btn-container bg-slate-300">
                {!user?.firstName ? (
                    <>
                        <a
                            href="/portal/login"
                            type="button"
                            className="profile_dropdown-btn bg-white text-black"
                        >
                            Sign In
                        </a>
                        <a
                            href="/portal/signup"
                            type="button"
                            className="profile_dropdown-btn bg-black text-white"
                        >
                            Sign Up
                        </a>
                    </>
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

            {[
                {
                    option: { src: dashboard_icon, text: 'Dashboard' },
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
            ].map(({ option, linkTo }) => {
                return (
                    <Dropdown_Option
                        key={uuidv4()}
                        option={option}
                        linkTo={linkTo}
                    />
                );
            })}
        </section>
    );
}

export default Profile_Dropdown;
