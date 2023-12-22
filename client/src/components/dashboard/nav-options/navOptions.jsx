import { Link, useNavigate } from 'react-router-dom';
import { AnimatePresence, easeInOut, motion } from 'framer-motion';
import disableLayout from '../../../hooks/disableLayout.jsx';
import Checkout_Header from '../../checkout/checkout_header.jsx';
import { v4 as uuidv4 } from 'uuid';
import { useUserDashboardContext } from '../../../context/userContext.jsx';
import { navOptionsArray } from './options-array.js';
import { useMemo, useState } from 'react';

export const variants = {
    initial: {
        // opacity: 0.5,
        opacity: 0.5,
    },
    animate: {
        opacity: 1,

        transition: { ease: 'easeInOut', duration: 0.6 },
    },
    exit: {
        opacity: 0,
    },
};
export default function NavOption({ selectOption, loadingState }) {
    const [options, setOptions] = useState(() => navOptionsArray);

    const {
        isDetailsUnSaved,
        setIsDetailsUnSaved,
        modalContentDispatch,
        setModalCheck,
    } = useUserDashboardContext();
    const navigate = useNavigate();

    const handleNavigate = ({ link }) => {
        if (isDetailsUnSaved) {
            modalContentDispatch({ type: 'unsavedDetails', link });
            setModalCheck(true);
            return;
        }

        if (!isDetailsUnSaved) {
            navigate(link);
            return;
        }
    };
    return (
        <AnimatePresence>
            <section>
                {options.map((options, index) => {
                    return (
                        <motion.div className="!m-0 !p-0" key={index}>
                            {options.map(({ text, icon, link }, idx) => {
                                return (
                                    <motion.button
                                        // key={index}
                                        // initial={{ opacity: 1 }}
                                        // animate={{ opacity: 1 }}
                                        // key={loadingState}
                                        variants={variants}
                                        animate={'animate'}
                                        initial={'initial'}
                                        // exit={'exit'}
                                        disabled={loadingState}
                                        onClick={() =>
                                            handleNavigate({
                                                link:
                                                    link == 'my-account'
                                                        ? `/${link}`
                                                        : link &&
                                                          `/my-account/${link}`,
                                            })
                                        }
                                        className={`no-wrap relative flex  h-14 w-full flex-row items-center bg-white px-3 
                                    
                                    ${
                                        selectOption == link && !loadingState
                                            ? 'active-btn'
                                            : ''
                                    }
                                    
                                    `}
                                    >
                                        <motion.div className="mr-6 h-full max-h-9 w-full max-w-[36px]">
                                            {loadingState ? (
                                                <motion.div className=" skeleton-pulse min-h-full min-w-full rounded-[50%] p-0 "></motion.div>
                                            ) : (
                                                <motion.img
                                                // key={loadingState}
                                                variants={variants}
                                                animate={'animate'}
                                                initial={'initial'}
                                                transition={{duration: 0, delay: 0}}
                                                    className="mr-6 h-9 w-9"
                                                    src={icon}
                                                    alt={
                                                        text.replaceAll(
                                                            ' ',
                                                            '-'
                                                        ) + '-icon'
                                                    }
                                                />
                                            )}
                                        </motion.div>

                                        <div
                                            className={`justify-left mr-[-12px] flex h-full w-full items-center text-s font-light underline-offset-2 hover:underline ${
                                                options.length - 1 != idx &&
                                                'border-b-[1px]'
                                            }`}
                                        >
                                            {loadingState ? (
                                                <div className=" skeleton-pulse min-h-full min-w-full p-0 "></div>
                                            ) : (
                                                <motion.p
                                                    // key={loadingState}
                                                    variants={variants}
                                                    animate={'animate'}
                                                    initial={'initial'}
                                                    exit={'exit'}
                                                >
                                                    {text}{' '}
                                                </motion.p>
                                            )}
                                        </div>
                                    </motion.button>
                                );
                            })}
                        </motion.div>
                    );
                })}
            </section>
        </AnimatePresence>
    );
}
