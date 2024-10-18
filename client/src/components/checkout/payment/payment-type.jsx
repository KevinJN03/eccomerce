import credit_icon from '../../../assets/icons/credit-card.png';

import Payment_Methods from '../../cart/payment_methods';
import { SubHeader } from './SubHeader';
import Payment_Options from './payment-options';
import { Fragment, useEffect, useRef, useState } from 'react';

import { usePaymentMethods } from '../../../context/paymentMethodContext';

import logos from '../../dashboard/payment-methods/logos';
import { Input } from 'postcss';
import ErrorMessage from '../../portal/errorMessage';
import Add_Card from './add_card';
import Selected_Method from './selectedMethod';
import Wallet from './wallet/wallet';
import axios from '../../../api/axios.js';
import PaymentTypeProvider from '../../../context/paymentTypeContext';
import { useCheckoutContext } from '../../../context/checkOutContext';
import { AnimatePresence, easeIn, easeOut, motion } from 'framer-motion';
import { generateVariants } from '../address/address-item';
import variants from '../address/variants';

import { ClickAwayListener } from '@mui/base/ClickAwayListener';
const views = {
    options: <Payment_Options />,
    card: <Add_Card />,
    selectedMethod: <Selected_Method />,

    wallet: <Wallet />,
};
function Payment_Type({ initialView, setDisableAddress }) {
    const [viewContent, setView] = useState(initialView);
    const [disableChangeBtn, setDisableChangeBtn] = useState(false);
    const [loading, setLoading] = useState(false);

    const {
        selectedMethod,
        setSelectedMethod,
        SetDisableOtherComponents,
        disableOtherComponents,
        isFirstPaymentSet,
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
        if (viewContent == 'wallet') {
            SetDisableOtherComponents(() => ({
                disable: true,
                addressType: null,
                excludePayment: true,
                disableAddress: true,
            }));
            // setDisableAddress(() => true);
            setDisableChangeBtn(true);
            setEnableCancelBtn(() => false);

            return;
        }

        if (viewContent == 'options') {
            if (paymentMethods.length == 0) {
                if (isFirstPaymentSet) {
                    console.log('execute if');
                    SetDisableOtherComponents(() => ({
                        disable: true,
                        excludePayment: true,
                        addressType: null,
                        disableAddress: true,
                    }));
                } else {
                    console.log('execute else');
                    SetDisableOtherComponents(() => ({
                        disable: false,
                        addressType: null,
                        excludePayment: true,
                        disableAddress: false,
                    }));
                }

                // setDisableAddress(() => true);
                setDisableChangeBtn(true);

                if (selectedMethod?.type) {
                    setEnableCancelBtn(() => true);
                } else {
                    setEnableCancelBtn(() => false);
                }
            } else {
                setEnableCancelBtn(() => true);
            }

            return;
        }

        if (viewContent == 'card') {
            SetDisableOtherComponents(() => ({
                disable: true,
                excludePayment: true,
                addressType: null,
                disableAddress: true,
            }));
            setDisableChangeBtn(true);
            setEnableCancelBtn(() => false);

            return;
        }

        if (viewContent == 'selectedMethod') {
            console.log('change to selectedMethod');

            if (paymentMethods.length >= 1) {
                setNextView('wallet');
            } else {
                setNextView('options');
            }
            setDisableChangeBtn(() => false);
            SetDisableOtherComponents(() => ({
                disable: false,
                addressType: null,
            }));
            setDisableChangeBtn(false);
            setEnableCancelBtn(() => false);
            return;
        } else {
            console.log('execute bottom else');
            // SetDisableOtherComponents(() => ({
            //     disable: false,
            //     addressType: null,
            // }));
            // setDisableChangeBtn(false);
            // setEnableCancelBtn(() => false);
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
            height: containerRef?.current?.clientHeight
                ? `${containerRef?.current?.clientHeight}px`
                : 'auto',
            opacity: 0.5,
        },
        animate: {
            height: 'auto',

            opacity: 1,

            transition: { duration: 0.5 },
        },
        exit: {
            height: 'auto',
            transition: { duration: 0.5 },
        },
    };

    const viewVariants = {
        initial: {
            opacity: 0,

            // translateY: -100,
            translateX: -100,
            height: containerRef?.current?.clientHeight
                ? `${containerRef?.current?.clientHeight}px`
                : 'auto',
        },
        animate: {
            opacity: 1,
            translateY: 0,
            translateX: 0,
            height: 'auto',

            transition: {
                duration: 0.4,
                ease: easeIn,
            },
        },

        exit: {
            opacity: 0,
            translateY: -100,
            transition: {
                duration: 0.5,
                ease: easeOut,
            },
        },
    };

    const onClickAway = () => {
        // if (!disableOtherComponents['disable']) {
        //     return;
        // }

        if (selectedMethod['type']) {
            setView('selectedMethod');
        } else {
            setView('options');
        }
    };

    const cancelBtnClick = () => {
        if (selectedMethod?.type) {
            setView(() => 'selectedMethod');
        } else {
            setView(() => 'options');
        }
    };
    return (
        <PaymentTypeProvider value={value}>
            <ClickAwayListener onClickAway={onClickAway}>
                <div className="h-full w-full">
                    {initialView && (
                        <section
                            id="payment-type"
                            className={`relative mt-4 h-full  px-6 ${
                                disable
                                    ? 'disable-component'
                                    : 'display-component'
                            }`}
                        >
                            <section className={`relative mb-0 max-h-fit pb-0`}>
                                {loading && (
                                    <div className="absolute left-2/4 top-2/4 z-10 translate-x-[-50%] translate-y-[-50%] opacity-100">
                                        <svg
                                            className="spinner-ring spinner-sm ![--spinner-color:var(--slate-11)]"
                                            viewBox="25 25 50 50"
                                            strokeWidth="5"
                                        >
                                            <circle cx="50" cy="50" r="20" />
                                        </svg>
                                    </div>
                                )}

                                <section
                                    className={` ${
                                        loading ? 'opacity-40' : ''
                                    }`}
                                >
                                    <div className="relative mb-6 mt-3 ">
                                        <SubHeader
                                            disable={disable}
                                            disablePadding={true}
                                            text={'PAYMENT TYPE'}
                                            disableChangeBtn={disableChangeBtn}
                                            onClick={handleClick}
                                            enableCancelBtn={enableCancelBtn}
                                            cancelBtnClick={cancelBtnClick}
                                        />
                                    </div>

                                    <section
                                        className=""
                                        ref={containerRef}

                                        // key={viewContent}
                                        // variants={containerVariants}
                                        // animate={'animate'}
                                        // initial={'initial'}
                                        // exit={'exit'}
                                    >
                                        <AnimatePresence mode="wait">
                                            <motion.div
                                                key={viewContent}
                                                variants={viewVariants}
                                                animate={'animate'}
                                                initial={'initial'}
                                                exit={'exit'}
                                            >
                                                {views[viewContent]}
                                            </motion.div>{' '}
                                        </AnimatePresence>
                                    </section>
                                </section>
                            </section>

                            <div className="checkout-payment-methods z-20 mt-6">
                                <h2 className="font-semibold tracking-widest">
                                    WE ACCEPT:
                                </h2>
                                <Payment_Methods className="w-10" />
                            </div>
                        </section>
                    )}
                </div>
            </ClickAwayListener>
        </PaymentTypeProvider>
    );
}

export default Payment_Type;
