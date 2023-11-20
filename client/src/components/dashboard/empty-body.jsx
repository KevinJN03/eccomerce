import CheckroomSharpIcon from '@mui/icons-material/CheckroomSharp';
import { Link } from 'react-router-dom';
function Empty_Body({ text, link, icon }) {
    return (
        <section className="bottom mt-2  flex !w-full flex-col items-center justify-center bg-white pt-5 pb-8">
            {icon ? (
                <img src={icon.image} alt={icon.alt} className="mb-7" />
            ) : (
                <CheckroomSharpIcon className="mb-7 !text-6xl" />
            )}
            <div className="flex w-[60%] flex-col items-center gap-y-5">
                <h3 className="whitespace-nowrap text-xl font-bold !text-primary">
                    {text.big}
                </h3>
                <p className="mx-[-100px] text-center text-sm">{text.small}</p>
                <Link
                    to={link}
                    target={link == '/' ? '_blank' : '_self'}
                    className="w-fit w-full whitespace-nowrap !bg-primary py-[12px] text-center font-bold tracking-wide text-white opacity-90 transition-all hover:opacity-100"
                >
                    {text.btn}
                </Link>
                {text.btn2 && (
                    <Link
                        to={text.btn2.link}
                        target={'_blank'}
                        className="w-fit w-full whitespace-nowrap !bg-[var(--green)] py-[12px] mt-[-10px] text-center font-bold tracking-wide text-white opacity-90 transition-all hover:opacity-100"
                    >
                        {text.btn2.text}
                    </Link>
                )}
            </div>
        </section>
    );
}

export default Empty_Body;
