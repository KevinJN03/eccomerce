import disableLayout from '../../hooks/disableLayout.jsx';
import { Link, useNavigate, useRouteError } from 'react-router-dom';
import emoji from '../../assets/animated-images/wired-flat-262-emoji-wow.apng';
import Layout from '../Layout/container.jsx';
import Header from '../Layout/header.jsx';
import Footer from '../Layout/footer/footer.jsx';
export default function Error({ message, link, buttonText }) {
    const error = useRouteError();
    const mode = import.meta.env.MODE;
    return (
        <section className="error-page flex h-screen w-full items-center justify-center">
            <section className="error-container flex max-w-[1366px] flex-col items-center justify-center">
                <img loading="lazy" src={emoji} className="h-44 w-44" />
                <h1 className="mb-4 text-6xl font-black tracking-wider">
                    OH NO!
                </h1>
                <p className="text-center sm:text-sm md:text-[16px] sm+md:w-[80%]  lg:text-lg ">
                    This page couldn’t be loaded for some reason, give it a
                    retry or come back later
                </p>

                <div className="flex flex-row gap-2">
                    <Link
                        to={link ? link : '/home'}
                        className="mt-4 bg-[var(--primary)] px-3 py-3 font-bold tracking-wide text-white"
                    >
                        {buttonText ? buttonText : 'GO TO HOMEPAGE'}
                    </Link>
                    <Link
                        to={-1} // return to previous page
                        className="mt-4 bg-[var(--primary)] px-3 py-3 text-center font-bold tracking-wide text-white"
                    >
                        GO BACK
                    </Link>
                </div>
                <div className="m-5 rounded border-2 border-gray-300 p-5">
                    {mode == 'development' && (
                        <> {error.stack || 'no error stack'}</>
                    )}
                </div>
            </section>
        </section>
    );
}
