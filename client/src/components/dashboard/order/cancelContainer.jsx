import { motion, AnimatePresence } from 'framer-motion';
import cancelOptions from '../../order/cancelOptions';
import courierLinksObject from './courierLinks';
import { useState } from 'react';
import { ErrorMessagePointerUp } from '../../Login-SignUp/errorMessage';
const containerVariants = {
    initial: {
        opacity: 0,
    },
    animate: {
        opacity: 1,

        transition: {
            duration: 0.5,
        },
    },

    exit: {
        opacity: 0,
        height: '0px',

        transition: {
            duration: 0.6,
            delay: 1.2,
        },
    },
};
const contentVariant = (count) => {
    return {
        exit: {
            opacity: 0,
            // translateX: 50,
            translateY: -140,
            transition: {
                duration: 0.2 * count,
                delay: 0.1 * count,
            },
        },
    };
};

function CancelContainer({
    setError,
    error,
    setShow,
    handleCancelOrder,
    loading,
    className,
}) {
    const [courierLinks, setCourierLinks] = useState(courierLinksObject);

    const [reason, setReason] = useState('');
    const [extraInfo, setExtraInfo] = useState('');
    return (
        <motion.section
            variants={containerVariants}
            animate={'animate'}
            initial={'initial'}
            exit={'exit'}
            className={`${className || ''} cancel-container flex w-full flex-col items-center justify-center`}
            tabIndex="0"
        >
            <section className="mt-4 w-7/12">
                <motion.h4
                    variants={contentVariant(1)}
                    exit={'exit'}
                    className="font-gotham text-s text-dark-gray"
                >
                    REASON FOR CANCELLATION:
                </motion.h4>
                <motion.div
                    variants={contentVariant(2)}
                    exit={'exit'}
                    className="relative"
                >
                    <select
                        onChange={(e) => {
                            setReason(() => e.target?.value);
                            setError((prevState) => ({
                                ...prevState,
                                reason: null,
                            }));
                        }}
                        type="text"
                        className="mt-2 w-full border-2 p-2 text-s"
                    >
                        <option value="Please Select" selected disabled>
                            Please Select
                        </option>
                        {cancelOptions.map((value, index) => {
                            return (
                                <option
                                    value={value}
                                    defaultValue={value == reason}
                                    key={index}
                                >
                                    {value}
                                </option>
                            );
                        })}
                    </select>
                    {error?.reason && (
                        <ErrorMessagePointerUp
                            className={'relative !top-3'}
                            msg={error.reason}
                        />
                    )}
                </motion.div>

                <motion.h4
                    variants={contentVariant(3)}
                    exit={'exit'}
                    className="mt-4 font-gotham text-s !text-dark-gray text-opacity-5"
                >
                    ADDITIONAL INFORMATION
                </motion.h4>

                <motion.div
                    variants={contentVariant(4)}
                    exit={'exit'}
                    className="relative"
                >
                    <textarea
                        onChange={(e) => {
                            console.log(e.target.value.length);
                            setExtraInfo(e.target.value);
                            setError((prevState) => ({
                                ...prevState,
                                additional_information: null,
                            }));
                        }}
                        value={extraInfo}
                        maxLength={'500'}
                        rows={'5'}
                        className="mt-2 w-full resize-none  !rounded-none border-2 p-2 text-s"
                        placeholder="Optional - max 500 characters"
                    />
                    {error?.additional_information && (
                        <ErrorMessagePointerUp
                            className={'relative !top-2 mb-3'}
                            msg={error.additional_information}
                        />
                    )}
                </motion.div>

                <motion.button
                    onClick={() => handleCancelOrder({ reason, extraInfo })}
                    variants={contentVariant(5)}
                    disabled={loading}
                    exit={'exit'}
                    type="button"
                    className="mt-2 w-full !bg-primary px-6 py-2 font-gotham text-s text-white opacity-95 hover:opacity-100"
                >
                    CANCEL ORDER
                </motion.button>
                <motion.button
                    disabled={loading}
                    variants={contentVariant(6)}
                    exit={'exit'}
                    onClick={() => setShow(false)}
                    type="button"
                    className="mt-2 w-full border-2 bg-white px-6 py-2 font-gotham  text-s opacity-95 hover:bg-light-grey"
                >
                    CLOSE
                </motion.button>
            </section>
        </motion.section>
    );
}

export default CancelContainer;
