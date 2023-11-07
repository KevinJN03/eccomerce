import CheckroomSharpIcon from '@mui/icons-material/CheckroomSharp';
import { Link } from 'react-router-dom';
function Empty_Body({ text, link }) {
    return (
        <section className="bottom mt-2 flex !w-full flex-col items-center justify-center bg-white py-5">
            <CheckroomSharpIcon className="mb-8 !text-6xl" />
            <div className="flex w-[60%] flex-col items-center gap-y-5">
                <h3 className="whitespace-nowrap text-xl font-bold !text-primary">
                    {text.big}
                </h3>
                <p className="text-sm">{text.small}</p>
                <Link
                    to={link}
                    target={link == '/' ? '_blank' : '_self'}
                    className="w-fit w-full whitespace-nowrap !bg-primary py-[10px] text-center font-bold tracking-wide text-white opacity-90 transition-all hover:opacity-100"
                >
                    {text.btn}
                </Link>
            </div>
        </section>
    );
}

export default Empty_Body;
