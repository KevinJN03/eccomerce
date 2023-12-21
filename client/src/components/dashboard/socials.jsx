import Header from './header';
import social_icon from '../../assets/icons/guardian.png';
import twitter_icon from '../../assets/icons/twitter.png';
import facebook_icon from '../../assets/icons/facebook-icon.png';
import google_icon from '../../assets/icons/google-icon.png';
import { useUserDashboardContext } from '../../context/userContext';
import defaultAxios from '../../api/axios';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import logOutUser from '../common/logoutUser';
const URL = import.meta.env.VITE_BACKEND_URL;
function Social_Item({ icon, title, enable, connectSocial, disconnectSocial }) {
    return (
        <section className="mb-2 flex flex-row  flex-wrap bg-white p-4 ">
            <div
                className={`left flex h-10 flex-[0.5] items-center justify-center p-1 ${
                    enable ? 'border-2' : '!bg-primary opacity-40'
                }`}
            >
                <img
                    src={icon}
                    alt=""
                    className={`h-6 w-6 ${
                        !enable ? 'brightness-0 invert' : ''
                    }`}
                />
            </div>
            <div className="middle my-2 flex flex-[5] flex-col pl-5">
                <h2
                    className={`${
                        enable
                            ? 'font-bold tracking-wider'
                            : 'text-sm font-light'
                    }`}
                >
                    {title}
                </h2>
                {enable && (
                    <p className="mt-3 text-sm">
                        You are using this account to sign in.
                    </p>
                )}
            </div>
            <div className="right flex-1">
                {enable ? (
                    <button
                        onClick={disconnectSocial}
                        className="border-2 px-3  py-2 text-s font-bold tracking-wider transition-all hover:bg-gray-200"
                    >
                        DISCONNECT
                    </button>
                ) : (
                    <button
                        onClick={connectSocial}
                        className="bg-gray-200 px-3 py-2 text-s font-bold tracking-wider hover:bg-gray-300  "
                    >
                        CONNECT
                    </button>
                )}
            </div>
        </section>
    );
}
function Socials({}) {
    const { socialAccounts, setSocialAccounts, setFooterMessage } =
        useUserDashboardContext();
    const options = [
      
        {
            title: 'Facebook',
            icon: facebook_icon,
            enable: socialAccounts?.['facebook'],
        },
        {
            title: 'Google',
            icon: google_icon,
            enable: socialAccounts?.['google'],
        },
        {
            title: 'Twitter',
            icon: twitter_icon,
            enable: socialAccounts?.['twitter'],
        },
    ];

    const { authDispatch } = useAuth();
    const navigate = useNavigate();

    const connectSocial = (title) => {
        window.open(`${URL}/user/login/${title}`, '_self');
    };

    const disconnectSocial = async (title) => {
        try {
            const { data } = await defaultAxios.post('user/oauth/disconnect', {
                account: title.toLowerCase(),
            });

            setSocialAccounts(() => data?.socialAccounts);
            setFooterMessage({ success: true, text: 'Changes saved' });
        } catch (error) {
            console.error(error);
            logOutUser({ error, authDispatch, navigate });
        }
    };
    return (
        <section className="socials w-full">
            <Header
                text={'SOCIAL ACCOUNTS'}
                icon={social_icon}
                description={
                    'Use your social media accounts to make it even easier to log in.'
                }
            />

            <div className="mt-2 ">
                {options
                    .sort((a, b) => {
                        if (a.enable) {
                            return -1;
                        }
                        if (b.enable) {
                            return 1;
                        }
                        return 0;
                    })
                    .map((item) => {
                        return (
                            <Social_Item
                                {...item}
                                key={item.title}
                                connectSocial={() => connectSocial(item.title)}
                                disconnectSocial={() =>
                                    disconnectSocial(item.title)
                                }
                            />
                        );
                    })}
            </div>
        </section>
    );
}

export default Socials;
