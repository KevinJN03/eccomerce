import DeleteForeverSharpIcon from '@mui/icons-material/DeleteForeverSharp';
import Modal from '../../../modal/modal.jsx';
import { useState } from 'react';
import { useContent } from '../../../../../../context/ContentContext.jsx';
import { useNewProduct } from '../../../../../../context/newProductContext.jsx';

import { motion, AnimatePresence } from 'framer-motion';
function Delete({ id }) {
    const [check, setCheck] = useState(false);
    const { loading, setLoading, setModalCheck } = useNewProduct();
    const [isHover, setIsHover] = useState(false);

    const variant = {
        initial: {
            scale: 0.5,
        },

        animate: {
            scale: [0.5, 1.2, 1],
            transition: { duration: 0.3 },
        },
        exit: {
            scale: 0,
            opacity: 0,
            transition:{
                duration: 0.3
            }
        },
    };
    return (
        <section className="delete-delivery-profile flex w-full flex-col items-center gap-7">
            <h1 className="font-EBGaramond text-3xl">
                Delete delivery profiles
            </h1>
            <p className="text-base">
                Are you sure you want to delete this profile?
            </p>

            <div className="relative flex w-full max-w-xs flex-row flex-nowrap items-center justify-between">
                <motion.button
                    onMouseEnter={() => {
                        setIsHover(() => true);
                    }}
                    onMouseLeave={() => {
                        setIsHover(() => false);
                    }}
                    className="left relative rounded-full  px-5 py-3 "
                    onClick={() => {
                        setModalCheck(() => false);
                    }}
                >
                    <span className=" relative !z-[3] w-full text-base font-medium">
                        Cancel
                    </span>
                    <AnimatePresence>
                        {isHover && (
                            <motion.div
                                variants={variant}
                                initial={'initial'}
                                animate={'animate'}
                                exit={'exit'}
                                className=" absolute left-0 top-0 z-0  h-full w-full rounded-inherit bg-light-grey"
                            ></motion.div>
                        )}
                    </AnimatePresence>
                </motion.button>
                <button 
                
                
                className="right theme-btn rounded-full bg-black px-5 py-3 font-medium tracking-wide text-white">
                    Delete Profile
                </button>
            </div>
        </section>
    );
}

export default Delete;
