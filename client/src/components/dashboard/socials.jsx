import Header from './header';
import social_icon from '../../assets/icons/guardian.png';
import apple_icon from '../../assets/icons/apple-icon.png';
import facebook_icon from '../../assets/icons/facebook-icon.png';
import google_icon from '../../assets/icons/google-icon.png';

function Social_Item({ icon, title, enable }) {
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
                <h2 className={`${enable ? 'font-bold tracking-wider' : 'font-light text-sm'}`}>
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
                    <button className="border-2 px-3  py-2 text-sm font-bold tracking-wider transition-all hover:bg-gray-200">
                        DISCONNECT
                    </button>
                ) : (
                    <button className="bg-gray-200 px-3 py-2 text-sm font-bold tracking-wider hover:bg-gray-300  ">
                        CONNECT
                    </button>
                )}
            </div>
        </section>
    );
}
function Socials({}) {
    const options = [
        {
            title: 'Google',
            icon: google_icon,
            enable: false,
        },
        {
            title: 'Apple',
            icon: apple_icon,
            enable: false,
        },
        {
            title: 'Facebook',
            icon: facebook_icon,
            enable: false,
        },
    ];
    return (
        <section className="socials">
            <Header
                text={'SOCIAL ACCOUNTS'}
                icon={social_icon}
                description={
                    'Use your social media accounts to make it even easier to log in.'
                }
            />

            <div className="mt-2 ">
                {options.map((item) => {
                    return <Social_Item {...item} key={item.title} />;
                })}
            </div>
        </section>
    );
}

export default Socials;
