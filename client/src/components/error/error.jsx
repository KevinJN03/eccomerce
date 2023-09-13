import disableLayout from "../../hooks/disableLayout"
import {Link} from 'react-router-dom';
import emoji from '../../assets/animated-images/wired-flat-262-emoji-wow.apng'
export default function Error(){
    disableLayout()
return (
    <section className="error-page w-full h-screen flex justify-center items-center">
        <section className="error-container max-w-[1366px] flex flex-col justify-center items-center">
        <img src={emoji} className="w-44 h-44"/>
    <h1 className="font-black text-6xl mb-4 tracking-wider">OH NO!</h1>
    <p className="text-center lg:text-lg md:text-[16px] sm:text-sm  sm+md:w-[80%] ">This page couldn’t be loaded for some reason, give it a retry or come back later</p>
    <Link to="/home" className="bg-[var(--primary)] text-white py-3 px-3 mt-4 font-bold tracking-wide">GO TO HOMEPAGE</Link>
   </section> 
    </section>
  
)
}