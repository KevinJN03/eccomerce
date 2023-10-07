import ErrorOutlinedIcon from '@mui/icons-material/ErrorOutlined';

import {motion,  } from 'framer-motion'

const variants = {
initial: {
    opacity: 0
},
animate: {
    opacity: 1,
    duration: 2,
    transition: {
        ease: 'easeInOut',
    
    }
},
exit: {
    opacity: 0
}
}
function OptionError({ msg, className }) {
    return (
        <motion.div variants={variants} initial='initial' animate='animate' exit='exit' className={`flex flex-row items-center justify-start gap-3 p-3 ${className}`}>
            <ErrorOutlinedIcon className="!fill-red-800" />
            <p className="text-sm text-red-800">
                {msg || 'Option Name must be between 1 and 20 characters.'}
            </p>
        </motion.div>
    );
}

export default OptionError;
