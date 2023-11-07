import chat_icon from '../../../../assets/icons/profile-icons/chat.png';
import dashboard_icon from '../../../../assets/icons/profile-icons/dashboard.png';
import return_icon from '../../../../assets/icons/profile-icons/delivery-status.png';
import info_icon from '../../../../assets/icons/profile-icons/info.png';
import order_icon from '../../../../assets/icons/profile-icons/package.png';
import Dropdown_Option from './dropdown_option';
function Profile_Dropdown({}) {
    return (
        <section id="profile_dropdown" className="m-0">
            <div className="signin-signup-btn-container bg-slate-300">
                <a
                    href="/login"
                    type="button"
                    className="profile_dropdown-btn bg-white text-black"
                >
                    Sign In
                </a>
                <a
                    href="/signup"
                    type="button"
                    className="profile_dropdown-btn bg-black text-white"
                >
                    Sign Up
                </a>
            </div>
            <Dropdown_Option
                option={{ src: dashboard_icon, text: 'Dashboard' }}
                linkTo={'./my-account'}
            />
            <Dropdown_Option option={{ src: order_icon, text: 'My Order' }} />
            <Dropdown_Option
                option={{ src: return_icon, text: 'My Returns' }}
                linkTo={'./my-account/orders'}
            />
            <Dropdown_Option
                option={{ src: info_icon, text: 'Return Information' }}
                linkTo={'./my-account/returns'}
            />
            <Dropdown_Option
                option={{ src: chat_icon, text: 'Contact Preference' }}
                linkTo={'./my-account/contact-preferences'}
            />
        </section>
    );
}

export default Profile_Dropdown;
