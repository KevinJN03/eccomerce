import Header from './header';
import chat_icon from '../../assets/icons/profile-icons/chat.png';
import discount_icon from '../../assets/icons/discount.png';
import alert_icon from '../../assets/icons/alert.png';
import { useEffect, useState } from 'react';
import { property } from 'lodash';

const Input = ({ check, setCheck, text, property }) => {
    return (
        <div className="flex flex-row gap-x-2">
            <input
                type="checkbox"
                checked={check[property]}
                onChange={() =>
                    setCheck((prevState) => ({
                        ...prevState,
                        [property]: !prevState[property],
                    }))
                }
                className="daisy-checkbox  rounded-none border-[1px] border-black"
            />
            <p className="text-sm">{text}</p>
        </div>
    );
};

function Alert_Item({
    icon,
    title,
    description,
    textMessage,
    check,
    setCheck,
}) {
    return (
        <section className="alert-item mb-3 ml-[-24px] flex h-36 flex-row border-t-2">
            <div className="left flex flex-[1.5] items-center justify-center bg-[var(--light-grey)]">
                <img
                    src={icon}
                    alt=""
                    className="h-16 w-16 rounded-full bg-white p-2"
                />
            </div>
            <div className="middle !m-0 flex h-full flex-[4] flex-col gap-y-3 px-3 py-4">
                <h3 className="font-bold tracking-wide">{title}</h3>
                <p className="text-sm">{description}</p>
            </div>
            <div className="right flex h-full flex-1 flex-col gap-y-6 py-4 ">
                <Input
                    text={'Email'}
                    check={check}
                    setCheck={setCheck}
                    property={'email'}
                />
                {textMessage && (
                    <Input
                        text={'Text'}
                        check={check}
                        setCheck={setCheck}
                        property={'text'}
                    />
                )}
            </div>
        </section>
    );
}
function Contact_Preferences({}) {
    const [isAllSelected, setIsAllSelected] = useState(false);
    const [discountCheck, setDiscountCheck] = useState({
        email: false,
        text: false,
    });
    const [stockCheck, setStockCheck] = useState({ text: false });
    useEffect(() => {
        if (
            stockCheck.email === discountCheck.email &&
            stockCheck.email === discountCheck.text
        ) {
            setIsAllSelected((prevState) => stockCheck.email);

            console.log('all selected');
        } else {
          setIsAllSelected((prevState) => false);
        }
    }, [stockCheck, discountCheck]);

    const setAllCheck = (value) => {
        setDiscountCheck((prevState) => ({
            ...prevState,
            email: value,
            text: value,
        }));

        setStockCheck((prevState) => ({ ...prevState, email: value }));

        // setIsAllSelected((prevState) => !prevState);
    };

    return (
        <section className="contact_preferences">
            <Header text={'CONTACT PREFERENCES'} icon={chat_icon} />
            <section className="mt-2 bg-white p-4">
                <div className="top mb-8">
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
                            className="flex-[0.35] bg-[var(--light-grey)] font-bold tracking-wide"
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
        </section>
    );
}

export default Contact_Preferences;
