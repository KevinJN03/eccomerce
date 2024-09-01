import Header from '../header.jsx';
import chat_icon from '../../../assets/icons/profile-icons/chat.png';
import discount_icon from '../../../assets/icons/discount.png';
import alert_icon from '../../../assets/icons/alert.png';
import { useEffect, useRef, useState } from 'react';
import axios from '../../../api/axios';
import _, { property } from 'lodash';
import Alert_Item from './alert.item.jsx';
import { useUserDashboardContext } from '../../../context/userContext.jsx';
import { useAuth } from '../../../hooks/useAuth.jsx';
import { useNavigate } from 'react-router-dom';
import GLoader from '../../Login-SignUp/socialRegister/gloader.jsx';
function Contact_Preferences({}) {
    const {
      
        setFooterMessage,
        userData,
        setUserData,
        logoutUser,
    } = useUserDashboardContext();

    const [confirmLoadState, setConfirmLoadState] = useState(false);
    const [isAllSelected, setIsAllSelected] = useState(false);
   
    const [checks, setChecks] = useState({ ...userData.contact_preferences });
  
    const [disable, setDisable] = useState(true);

    const { authDispatch } = useAuth();
    const navigate = useNavigate();

    const abortControllerRef = useRef(new AbortController());
    useEffect(() => {
        const isObjectSame = _.isEqual(userData?.contact_preferences, checks);

        if (isObjectSame) {
            setDisable(true);
        } else {
            setDisable(false);
        }

        const stockAlertEmail = _.get(checks, ['stock_alert', 'email']);
        if (
            stockAlertEmail ===
                _.get(checks, ['discount_new_drops', 'email']) &&
            stockAlertEmail === _.get(checks, ['discount_new_drops', 'text'])
        ) {
            setIsAllSelected(() => stockAlertEmail);
        } else {
            setIsAllSelected(() => false);
        }
    }, [checks]);

    const setAllCheck = (value) => {
        const updateValues = _.mapValues(checks, (element) => {
            return _.mapValues(element, (item) => {
                return value;
            });
        });

        setChecks(() => updateValues);
    };

    const onConfirm = async () => {
        let success = false;
        try {
            abortControllerRef.current?.abort();
            abortControllerRef.current = new AbortController();
            setConfirmLoadState(() => true);

            console.log({ checks });

            const { data } = await axios.put('user/changepreferences', checks, {
                signal: abortControllerRef.current.signal,
            });
            setUserData((prevState) => ({
                ...prevState,
                contact_preferences: data?.contact_preferences,
            }));
            success = true;
        } catch (error) {
            console.error(error.message, error);
            logoutUser({ error });
        } finally {
            if (success) {
                setTimeout(() => {
                    setFooterMessage(() => ({
                        text: 'Preferences saved',
                        success: true,
                    }));
                    setDisable(() => true);
                    setConfirmLoadState(() => false);
                }, 700);
            }
        }
    };
    return (
        <section className="contact_preferences">
            <Header text={'CONTACT PREFERENCES'} icon={chat_icon} />
            <section className="relative mt-2 bg-white p-4">
                {confirmLoadState && (
                    <div className="absolute left-2/4 top-2/4 translate-x-[-50%] translate-y-[-50%] ">
                        <GLoader />
                    </div>
                )}
                <div className="top mb-8 ">
                    <h2 className="mb-3 text-lg font-bold tracking-wide">
                        CONTENT TYPES
                    </h2>
                    <div className="flex flex-row gap-x-2 ">
                        <p className="flex-1 text-sm">
                            What would you like to hear about? Select your
                            options below and we'll keep you in the loop.
                        </p>
                        <button
                            onClick={() => setAllCheck(!isAllSelected)}
                            className="flex-[0.35] bg-[var(--light-grey)] font-bold tracking-wide transition-all hover:!bg-gray-200"
                        >
                            {isAllSelected ? 'CLEAR' : 'SELECT ALL'}
                        </button>
                    </div>
                </div>
                <div className="bottom">
                    {[
                        {
                            type: 'discount_new_drops',
                            textMessage: true,
                            icon: discount_icon,
                            title: 'DISCOUNTS AND NEW DROPS',
                            description:
                                'Be first in line to grab the stuff you love for less, get exclusive deals, and all the best just-landed looks.',
                        },
                        {
                            type: 'stock_alert',
                            textMessage: false,
                            icon: alert_icon,
                            title: 'STOCK ALERTS',
                            description:
                                'If that product you’re into comes back in stock, get a heads-up so you can add to bag pronto.',
                        },
                    ].map((props) => {
                        return (
                            <Alert_Item
                                key={props.title}
                                {...{
                                    ...props,
                                    setCheck: (callback) => {
                                        setChecks((prevState) => ({
                                            ...prevState,
                                            [props.type]: callback(
                                                prevState[props.type]
                                            ),
                                        }));
                                    },
                                    check: checks[props.type],
                                }}
                            />
                        );
                    })}
                </div>
            </section>

            <div className="mt-3 flex w-full flex-col items-center gap-y-8">
                <p className="text-center text-s">
                    Changes to your preferences may take up to seven days to
                    take effect.
                </p>
                <button
                    onClick={onConfirm}
                    disabled={disable}
                    className="!bg-primary px-14 py-[12px] font-bold tracking-wider text-white opacity-90 transition-all hover:opacity-100 disabled:opacity-40"
                >
                    CONFIRM PREFERENCES
                </button>
            </div>
        </section>
    );
}

export default Contact_Preferences;
