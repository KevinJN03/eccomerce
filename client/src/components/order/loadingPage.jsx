import { motion } from 'framer-motion';
import GLoader from '../Login-SignUp/socialRegister/gloader';

function LoadingPage({}) {
    const variants = {
        // initial: {
        //     opacity: 1,
        // },
        // animate: {
        //     opacity: 1,
        // },
        exit: {
            opacity: 0,
            duration: 2,
        },
    };
    return (
        <motion.div
            variants={variants}
            initial={'initial'}
            animate={'animate'}
            exit={'exit'}
            className="relative h-screen w-full bg-white"
        >
            <div className="absolute left-2/4 top-2/4 z-10 translate-x-[-50%] translate-y-[-50%]">
                <GLoader />
            </div>
        </motion.div>
    );
}

export default LoadingPage;
