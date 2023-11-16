import { Outlet, useNavigate } from 'react-router-dom';
import Header from '../header.jsx';
import card_icon from '../../../assets/icons/credit-card.png';
import paypal_icon from '../../../assets/icons/payment-icons/paypal.svg';
import klarna_icon from '../../../assets/icons/payment-icons/klarna.svg';
import delete_icon from '../../../assets/icons/delete-icon.png';
import { createContext, useEffect, useReducer, useState } from 'react';
import PaymentMethodProvider, {
    usePaymentMethods,
} from '../../../context/paymentMethodContext.jsx';

import PaymentMethodItem from './payment-method-item.jsx';
import Modal from '../../admin/components/modal/modal.jsx';
import { useUserDashboardContext } from '../../../context/userContext.jsx';
import axios from '../../../api/axios.js';
import logos from './logos.jsx';

function Home({}) {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const { paymentMethods, PaymentMethodsDispatch } = usePaymentMethods();
    const { setModalCheck, modalContentDispatch } = useUserDashboardContext();
    const [defaultCheck, setDefaultCheck] = useState(null);
    useEffect(() => {
        if (paymentMethods.length < 1) navigate('add');

        setLoading(true);
        const timeout = setTimeout(() => {
            setLoading(false);
        }, 800);

        return () => {
            clearTimeout(timeout);
        };
    }, [paymentMethods]);

    const handleDelete = (id) => {
        modalContentDispatch({
            type: 'deletePaymentMethod',
            id,
        });
        setModalCheck(() => true);
    };

    const handleDefaultMethod = (id) => {
        setDefaultCheck(() => id);
        axios.post(`user/payment-method/changedefault/${id}`).then((res) =>
            setTimeout(() => {
                PaymentMethodsDispatch({
                    type: 'set',
                    payload: res.data.payment_methods,
                });
                setDefaultCheck(() => null);
            }, 400)
        );
    };
    return (
        <section className="payment-method">
            <Header
                icon={card_icon}
                text={'PAYMENT METHODS'}
                buttonText={'ADD NEW PAYMENT METHOD'}
                buttonClick={() => navigate('add')}
            />
            {!loading ? (
                <div className="mt-2 flex flex-col gap-y-2">
                    {paymentMethods.map(
                        (
                            {
                                logo,
                                text,
                                description,
                                _id,
                                type,
                                brand,
                                exp_month,
                                exp_year,
                                last4,
                                funding,
                                name,
                            },
                            idx
                        ) => {
                            const cardData = {};
                            if (name) {
                                cardData.name = name;
                                cardData.exp_month = exp_month;
                                cardData.exp_year = exp_year;
                                cardData.icon =
                                    logos[
                                        brand.toLowerCase().replaceAll(' ', '_')
                                    ];
                            }
                            debugger;
                            return (
                                <PaymentMethodItem
                                    cardData={cardData}
                                    inputDisable={
                                        defaultCheck && defaultCheck != _id
                                    }
                                    check={defaultCheck == _id}
                                    key={_id}
                                    isDefault={idx == 0}
                                    arrayLength={paymentMethods.length}
                                    icon={
                                        logo === 'paypal'
                                            ? paypal_icon
                                            : logo === 'credit-card'
                                            ? card_icon
                                            : logo === 'klarna' && klarna_icon
                                    }
                                    logo={logo}
                                    method={
                                        text
                                            ? `${text} ${description}`
                                            : `${funding} ${brand} (${last4})`
                                    }
                                    handleDefault={() =>
                                        handleDefaultMethod(_id)
                                    }
                                    handleDelete={() => handleDelete(_id)}
                                />
                            );
                        }
                    )}
                </div>
            ) : (
                <div className="flex h-[400px] w-full items-center justify-center">
                    <div className="spinner-circle [--spinner-color:var(--gray-9)]"></div>
                </div>
            )}
        </section>
    );
}

export default Home;
