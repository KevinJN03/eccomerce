import Header from '../header.jsx';
import chat_icon from '../../../assets/icons/profile-icons/chat.png';
import discount_icon from '../../../assets/icons/discount.png';
import alert_icon from '../../../assets/icons/alert.png';
import { useEffect, useState } from 'react';
import axios from '../../../api/axios';
import _ from 'lodash';
import Alert_Item from './alert.item.jsx';
import { useUserDashboardContext } from '../../../context/userContext.jsx';
import { useAuth } from '../../../hooks/useAuth.jsx';
import { useNavigate } from 'react-router-dom';
function Contact_Preferences({}) {
    const { contact_preference, setContactPreference } =
        useUserDashboardContext();

    const [loading, setLoading] = useState(false);
    const [confirmLoadState, setConfirmLoadState] = useState(false);
    const [isAllSelected, setIsAllSelected] = useState(false);
    const [discountCheck, setDiscountCheck] = useState(
        contact_preference?.discount_newDrops || {
            email: false,
            text: false,
        }
    );
    const [stockCheck, setStockCheck] = useState(
        contact_preference?.stockAlert || { email: false }
    );
    const [onMountValue, setOnMountValue] = useState({
        discountCheck,
        stockCheck,
    });
    const [disable, setDisable] = useState(true);

    const { authDispatch } = useAuth();
    const navigate = useNavigate();
    useEffect(() => {
        const newValue = {
            stockCheck,
            discountCheck,
        };

        const isObjectSame = _.isEqual(newValue, onMountValue);

        if (isObjectSame) {
            setDisable(true);
        } else {
            setDisable(false);
        }

        if (
            stockCheck.email === discountCheck.email &&
            stockCheck.email === discountCheck.text
        ) {
            setIsAllSelected(() => stockCheck.email);
        } else {
            setIsAllSelected(() => false);
        }
    }, [stockCheck, discountCheck]);

    const setAllCheck = (value) => {
        setDiscountCheck((prevState) => ({
            ...prevState,
            email: value,
            text: value,
        }));

        setStockCheck((prevState) => ({ ...prevState, email: value }));
    };

    const onConfirm = () => {
        setConfirmLoadState(() => true);
        const data = {
            discount_newDrops: discountCheck,
            stockAlert: stockCheck,
        };
        axios
            .put('user/changepreferences', data)
            .then(() => {
                setContactPreference(() => data);
                setTimeout(() => {
                    setOnMountValue(() => {
                        return { stockCheck, discountCheck };
                    });
                    setDisable(() => true);
                    setConfirmLoadState(() => false);
                }, 700);
            })
            .catch((error) => {
              
                console.log('error at preferences: ', error);
                logOutUser({ error, authDispatch, navigate });
            });
    };
    return (
        <section className="contact_preferences">
            <Header text={'CONTACT PREFERENCES'} icon={chat_icon} />
            <section className="relative mt-2 bg-white p-4">
                {confirmLoadState && (
                    <div class="spinner-circle spinner-lg absolute left-2/4 top-2/4 z-10 translate-x-[-50%] translate-y-[-50%]  [--spinner-color:var(--slate-12)]"></div>
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
                    <Alert_Item
                        check={discountCheck}
                        setCheck={setDiscountCheck}
                        textMessage={true}
                        icon={discount_icon}
                        title={'DISCOUNTS AND NEW DROPS'}
                        description={
                            'Be first in line to grab the stuff you love for less, get exclusive deals, and all the best just-landed looks.'
                        }
                    />

                    <Alert_Item
                        check={stockCheck}
                        setCheck={setStockCheck}
                        textMessage={false}
                        icon={alert_icon}
                        title={'STOCK ALERTS'}
                        description={
                            'If that product you’re into comes back in stock, get a heads-up so you can add to bag pronto.'
                        }
                    />
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
