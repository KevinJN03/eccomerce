import sadFaceEmoji from '../../assets/animated-images/wired-flat-262-emoji-wow.apng';
import { Link } from 'react-router-dom';

export default function Error() {
    return (
        <section className="flex flex-col items-center justify-center gap-3 ">
            <img
                src={sadFaceEmoji}
                alt="sad face emoji"
                className="h-32 w-32 object-cover"
            />
            <h1 className="font-gotham text-2xl tracking-widest">OPPS!!</h1>
            <p>Sorry! We're having technical difficulties.</p>
            <Link to={'/'} className="w-full px-5">
                <button className="w-full bg-primary py-2 font-bold text-white hover:!bg-black transition-all">
                    HOME
                </button>
            </Link>
        </section>
    );
}
