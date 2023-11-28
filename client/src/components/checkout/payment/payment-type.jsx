import credit_icon from '../../../assets/icons/credit-card.png';

import Payment_Methods from '../../cart/payment_methods';
import { SubHeader } from './SubHeader';
import Payment_Options from './payment-options';
import { useEffect, useRef, useState } from 'react';

import { usePaymentMethods } from '../../../context/paymentMethodContext';

import logos from '../../dashboard/payment-methods/logos';
import { Input } from 'postcss';
import ErrorMessage from '../../Login-SignUp/errorMessage';
import Add_Card from './add_card';
import Selected_Method from './selectedMethod';
import Wallet from './wallet';
import axios from '../../../api/axios';
import PaymentTypeProvider from '../../../context/paymentTypeContext';
import { useCheckoutContext } from '../../../context/checkOutContext';
import { AnimatePresence, motion } from 'framer-motion';
import { generateVariants } from '../address form/address-item';
import variants from '../address form/variants';

import { ClickAwayListener } from '@mui/base/ClickAwayListener';
const views = {
    options: <Payment_Options />,
    card: <Add_Card />,
    selectedMethod: <Selected_Method />,

    wallet: <Wallet />,
};
function Payment_Type({ initialView }) {
    const [viewContent, setView] = useState(initialView);
    const [disableChangeBtn, setDisableChangeBtn] = useState(false);
    const [loading, setLoading] = useState(false);
    // const [selectedMethod, setSelectedMethod] = useState({});
    const {
        selectedMethod,
        setSelectedMethod,
        SetDisableOtherComponents,
        disableOtherComponents,
    } = useCheckoutContext();
    const [nextView, setNextView] = useState('');
    const { paymentMethods } = usePaymentMethods();
    const [enableCancelBtn, setEnableCancelBtn] = useState(false);
    const containerRef = useRef(null);

    const disable =
        disableOtherComponents['disable'] &&
        !disableOtherComponents['excludePayment'];

    useEffect(() => {
        setView(initialView);
    }, [initialView]);

    useEffect(() => {
        if (
            viewContent == 'wallet' ||
            (viewContent == 'options' && paymentMethods.length == 0)
        ) {
            SetDisableOtherComponents(() => ({
                disable: true,
                addressType: null,
                excludePayment: true,
            }));
            setDisableChangeBtn(true);
            setEnableCancelBtn(() => false);
        } else if (viewContent == 'options' && paymentMethods.length > 0) {
            setEnableCancelBtn(() => true);
        } else if (viewContent == 'card') {
            setDisableChangeBtn(true);
            setEnableCancelBtn(() => false);
        } else {
            SetDisableOtherComponents(() => ({
                disable: false,
                addressType: null,
            }));
            setDisableChangeBtn(false);
            setEnableCancelBtn(() => false);
        }

        if (viewContent == 'selectedMethod') {
            setNextView('wallet');
        }
    }, [viewContent]);

    const handleClick = () => {
        setView(nextView);
    };
    const value = {
        viewContent,
        setView,
        disableChangeBtn,
        setDisableChangeBtn,
        loading,
        setLoading,
        selectedMethod,
        setSelectedMethod,
        nextView,
        setNextView,
    };

    const containerVariants = {
        initial: {
            height: containerRef?.current
                ? containerRef.current.clientHeight + 'px'
                : 'auto',
            opacity: 0.5,
        },
        animate: {
            height: 'auto',

            opacity: 1,

            transition: { duration: 0.5 },
        },
    };

    const viewVariants = {
        initial: {
            opacity: 0,
            translateX: -50,
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
            opacity: 0,
            translateX: 50,
            transition: {
                duration: 0.2,
                ease: 'easeOut',
            },
        },
    };

    const onClickAway = () => {
        console.log({ disableOtherComponents });
        if (!disableOtherComponents['disable']) {
            return;
        }

        // SetDisableOtherComponents(() => ({
        //     disable: false,
        //     addressType: null,
        // }));
        // if (selectedMethod['type']) {
        //     setView('selectedMethod');
        // } else {
        //     setView('options');
        // }
    };
    return (
        <PaymentTypeProvider value={value}>
            <ClickAwayListener onClickAway={onClickAway}>
                <motion.div>
                    {initialView && (
                        <motion.section
                            id="payment-type"
                            className={`mt-4 px-6 ${
                                disable
                                    ? 'disable-component'
                                    : 'display-component'
                            }`}
                        >
                            <div className="mb-6 mt-3">
                                <SubHeader
                                    disable={disable}
                                    disablePadding={true}
                                    text={'PAYMENT TYPE'}
                                    disableChangeBtn={disableChangeBtn}
                                    onClick={handleClick}
                                    enableCancelBtn={enableCancelBtn}
                                    cancelBtnClick={() =>
                                        setView(() => 'selectedMethod')
                                    }
                                />
                            </div>{' '}
                            <AnimatePresence mode="wait">
                                <motion.section
                                    ref={containerRef}
                                    key={viewContent}
                                    variants={containerVariants}
                                    animate={'animate'}
                                    initial={'initial'}
                                    exit={'exit'}
                                >
                                    <motion.div>
                                        {viewContent && (
                                            <motion.div
                                                variants={viewVariants}
                                                animate={'animate'}
                                                initial={'initial'}
                                                exit={'exit'}
                                            >
                                                {views[viewContent]}
                                            </motion.div>
                                        )}
                                    </motion.div>
                                </motion.section>
                            </AnimatePresence>
                            <div className="checkout-payment-methods">
                                <h2 className="font-semibold tracking-widest">
                                    WE ACCEPT:
                                </h2>
                                <Payment_Methods className="w-10" />
                            </div>
                        </motion.section>
                    )}
                </motion.div>
            </ClickAwayListener>
        </PaymentTypeProvider>
    );
}

export default Payment_Type;
