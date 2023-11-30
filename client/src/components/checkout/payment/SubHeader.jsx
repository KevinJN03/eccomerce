import { useRef } from 'react';
import { motion } from 'framer-motion';
import { useCheckoutContext } from '../../../context/checkOutContext';

export const changeCancelBtnVariants = {
    initial: {
        opacity: 0,
        translateX: 50,
    },
    animate: {
        opacity: 1,
        translateX: 0,
        transition: {
            duration: 0.7,
            ease: 'easeInOut',
            delay: 0.3,
        },
    },

    exit: {
        opacity: 1,
        translateX: -50,
        transition: {
            duration: 0.2,
            ease: 'easeOut',
        },
    },
};

export function SubHeader({
    text,
    disablePadding,
    onClick,
    disable,
    className,
    disableChangeBtn,
    enableCancelBtn,
    cancelBtnClick,
}) {
 const {disableOtherComponents} = useCheckoutContext()

    return (
        <div
            className={`flex justify-between ${
                disablePadding ? '' : 'mb-0 p-6 pb-0'
            } `}
        >
            <h3 className="font-gotham text-lg text-black">{text}</h3>
            {!disableChangeBtn && (
                <motion.button
                    key={disableChangeBtn}
                    variants={changeCancelBtnVariants}
                    initial={'initial'}
                    exit={'exit'}
                    animate={'animate'}
                    type="button"
                    id="checkout-change-btn"
                    onClick={onClick}
                    disabled={disable}
                >
                    CHANGE
                </motion.button>
            )}
            {enableCancelBtn && (
                <motion.button
                    key={enableCancelBtn}
                    variants={changeCancelBtnVariants}
                    initial={'initial'}
                    exit={'exit'}
                    animate={'animate'}
                    type="button"
                    id="checkout-change-btn"
                    onClick={cancelBtnClick}
                    disabled={disable}
                >
                    CANCEL
                </motion.button>
            )}
        </div>
    );
}
