import disableLayout from '../../hooks/disableLayout.jsx';
import { Link } from 'react-router-dom';
import emoji from '../../assets/animated-images/wired-flat-262-emoji-wow.apng';
import Layout from '../Layout/container.jsx';
import Header from '../Layout/header.jsx';
import Footer from '../Layout/footer/footer.jsx';
export default function Error({ message, link, buttonText }) {
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
                <Link
                    to={link ? link : '/home'}
                    className="mt-4 bg-[var(--primary)] px-3 py-3 font-bold tracking-wide text-white"
                >
                    {buttonText ? buttonText : 'GO TO HOMEPAGE'}
                </Link>
            </section>
        </section>
    );
}
