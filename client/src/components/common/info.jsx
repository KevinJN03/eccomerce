import { IosShareSharp } from '@mui/icons-material';
function Info({ title, price, text }) {
    const shareButton = async () => {
        if (navigator.share) {
            await navigator.share({
                title: 'Check this out!',
                text: 'Here’s something interesting I found:',
                url: window.location.href,
            });
        }
    };
    return (
        <div className="card-info flex flex-col">
            <div className="flex flex-row items-center justify-between gap-1">
                <p className=" font-poppin text-bg-primary font-normal underline-offset-2 sm:mb-3 sm:text-xs">
                    {title}
                </p>

                <button className="cursor-pointer" onClick={shareButton}>
                    <IosShareSharp />
                </button>
            </div>

            <h2 className="font-bold text-[var(--primary-2)] !text-lg">
                {parseFloat(price).toLocaleString('en-GB', {
                    style: 'currency',
                    currency: 'GBP',
                })}
            </h2>

            {/* {text ? (
                    <p className=" font-raleway my-2 text-xs font-semibold text-red-500 sm:text-xs ">
                        {text}
                    </p>
                ) : null} */}
        </div>
        // </div>
    );
}

export default Info;
