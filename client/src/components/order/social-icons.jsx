import snapchat_icon from '../../assets/icons/Snapchat-Ghost-Outlined-Logo.wine (1).svg';
import facebook_icon from '../../assets/icons/facebook.svg';
import instagram_icon from '../../assets/icons/instagram.svg';
function SocialIcons({}) {
    return (
        <div className="middle mt-5 flex flex-col items-center">
            <h3 className="font-gotham text-lg">GET MORE GLAMO ON:</h3>

            <div className="mt-3 flex flex-row flex-nowrap gap-x-3">
                <div className="flex h-10 w-10  cursor-pointer items-center justify-center rounded-full bg-violet-500 p-1 transition-all hover:bg-opacity-70">
                    <img
                        src={instagram_icon}
                        alt="snapchat icon"
                        className="h-[80%] w-[80%]"
                    />
                </div>

                <div className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-[#3b5998] p-2 transition-all hover:bg-opacity-70">
                    <img
                        src={facebook_icon}
                        alt="snapchat icon"
                        className="h-[80%] w-[80%]"
                    />
                </div>
                <div className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-[#FFFC00] transition-all hover:bg-opacity-70">
                    <img
                        src={snapchat_icon}
                        alt="snapchat icon"
                        className="h-[80%] w-[80%]"
                    />
                </div>
            </div>
        </div>
    );
}

export default SocialIcons;
