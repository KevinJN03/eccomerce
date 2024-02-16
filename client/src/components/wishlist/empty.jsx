import { motion } from 'framer-motion';
import heartIcon from '../../assets/icons/broken-heart.png';
import { Diversity2Outlined, HeartBrokenOutlined } from '@mui/icons-material';
function EmptyWishList({}) {
    return (
        <motion.section className="flex h-full w-full flex-col items-center justify-center !self-center ">
            <div className="flex h-full w-72 flex-col items-center justify-center gap-4">
                {/* <img  className='w-10 h-10' src={'https://img.icons8.com/ios/50/heart-puzzle.png'} alt="broken heart" /> */}
                <Diversity2Outlined   className='!text-4xl'/>
                <h3 className=" text-center text-lg font-bold">
                    You have no Saved Items
                </h3>

                <p className="w-9/12 text-center">
                    Sign in to sync your Saved Items across all your devices.
                </p>

                <a
                    href="/portal/login"
                    className="w-full bg-black/80 py-3 text-center font-bold tracking-wider text-white transition-all hover:bg-black/100"
                >
                    SIGN IN
                </a>
            </div>
        </motion.section>
    );
}

export default EmptyWishList;
