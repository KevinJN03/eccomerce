import ErrorOutlinedIcon from '@mui/icons-material/ErrorOutlined';

import {motion,AnimatePresence  } from 'framer-motion'

const variants = {
initial: {
    opacity: 0,

},
animate: {
    opacity: 1,

    transition: {
       
        opacity: {delay: 0, duration: 0.4, ease: 'easeInOut'}
    
    }
},
exit: {
    opacity: 0,
    opacity: 1,

    transition: {
       
        opacity: {delay: 0, duration: 0}
    
    }
    
}
}
function OptionError({ msg, className }) {
    return (
              <motion.div variants={variants} initial='initial' animate='animate' exit='exit' className={`flex flex-row items-center justify-start gap-3 p-3 ${className}`}>
            <ErrorOutlinedIcon className="!fill-red-800" />
            <p className="text-sm text-red-800">
                {msg}
            </p>
        </motion.div>
      
    );
}

export default OptionError;
