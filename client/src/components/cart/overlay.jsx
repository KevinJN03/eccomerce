import { CloseRounded } from '@mui/icons-material';
import { motion } from 'framer-motion';
import getCartItemVariants from './cartItemVariants';

function Overlay({ product }) {
    const cartItemVariant = getCartItemVariants(0);

    return (
        <>
            <motion.div
                key={'body' + product.cartId}
                variants={cartItemVariant.overlay.body}
                animate={'animate'}
                initial={'initial'}
                className=" absolute left-0 top-0 z-[1] flex h-full  w-full origin-top-right border-b-2 bg-light-grey !py-4"
            ></motion.div>
            <motion.div
                key={'text' + product.cartId}
                variants={cartItemVariant.overlay.text}
                animate={'animate'}
                initial={'initial'}
                exit={'exit'}
                className=" absolute left-0 top-0 z-[1] flex h-full w-full flex-col items-center justify-center  "
            >
                <CloseRounded className="!text-3xl " />
                <p className="text-sm !text-black">Item Deleted</p>
            </motion.div>
        </>
    );
}

export default Overlay;
