import google_icon from '../../../assets/icons/google-icon.png';
import facebook_icon from '../../../assets/icons/facebook-icon.png';
import apple_icon from '../../../assets/icons/apple-icon.png';
const URL = import.meta.env.VITE_BACKEND_URL;
function SocialLogin({ text, description }) {
    const googleLogin = () => {
        window.open(`${URL}/user/login/google`, '_self');
    };

    const appleLogin = () => {
       
    };
    const facebookLogin = () => {
        window.open(`${URL}/user/login/facebook`, '_self');
    };
    return (
        <section className="flex w-full flex-col justify-center self-center">
            <h3 className="mb-8 text-center font-gotham text-base">{text}</h3>

            <div className="mb-4 flex w-full justify-center gap-x-3 px-10">
                {[
                    {
                        text: 'GOOGLE',
                        icon: google_icon,
                        onClick: googleLogin,
                    },
                    {
                        text: 'APPLE',
                        icon: apple_icon,
                        onClick: appleLogin,
                    },
                    {
                        text: 'FACEBOOK',
                        icon: facebook_icon,
                        onClick: facebookLogin,
                        className: 'brightness-0 invert',
                    },
                ].map(({ icon, text, onClick, className }, idx) => {
                    return (
                        <button
                            className={`flex flex-1 flex-row flex-nowrap items-center gap-x-3 border-2 px-4 py-3 `}
                            onClick={onClick}
                        >
                            <div
                                className={`h-5 w-5 self-start ${
                                    idx == 2 ? 'bg-[#4267B2] p-1' : ''
                                } flex items-center justify-center rounded-full`}
                            >
                                <img
                                    className={` h-full w-full ${
                                        className || ''
                                    }`}
                                    src={icon}
                                    alt={`${text?.toLowerCase()} icon`}
                                />
                            </div>

                            <p className="mx-auto font-gotham tracking-wide">
                                {text}
                            </p>
                        </button>
                    );
                })}
            </div>
            {description && (
                <p className="mb-12 px-10 text-center text-s">
                    Signing up with social is super quick. No extra passwords to
                    remember - no brain fail. Don't worry, we'd never share any
                    of your data or post anything on your behalf.
                </p>
            )}
        </section>
    );
}

export default SocialLogin;
