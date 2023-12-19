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
import Pagination from '../pagination/pagination.jsx';

function Home({}) {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const { paymentMethods, PaymentMethodsDispatch } = usePaymentMethods();
    const { setModalCheck, modalContentDispatch } = useUserDashboardContext();
    const [defaultCheck, setDefaultCheck] = useState(null);
    useEffect(() => {
        if (paymentMethods.length < 1) navigate('add');

        setLoading(true);
        setPage(1);
        const timeout = setTimeout(() => {
            setLoading(false);
        }, 500);
       
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
        axios
            .post(`user/payment-method/changedefault/${id}`)
            .then(({ data }) => {
                PaymentMethodsDispatch({
                    type: 'set',
                    payload: data.paymentMethods,
                });
                setDefaultCheck(() => null);
            });
    };

    const divideBy3 = Math.ceil(paymentMethods.length / 3);
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
                    {paymentMethods
                        .slice(3 * page - 3, page * 3)
                        .map(
                            (
                                {
                                    logo,
                                    text,
                                    description,
                                    id,
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
                                const cardData = { isCard: false };
                                if (type == 'card') {
                                    cardData.isCard = true;
                                    cardData.name = name;
                                    cardData.exp_month = exp_month;
                                    cardData.exp_year = exp_year;
                                    cardData.icon =
                                        logos[
                                            brand
                                                .toLowerCase()
                                                .replaceAll(' ', '_')
                                        ];
                                }

                                return (
                                    <PaymentMethodItem
                                        cardData={cardData}
                                        inputDisable={
                                            defaultCheck && defaultCheck != id
                                        }
                                        check={defaultCheck == id}
                                        key={id}
                                        isDefault={id == paymentMethods[0]?.id}
                                        arrayLength={paymentMethods.length}
                                        icon={
                                            type === 'paypal'
                                                ? paypal_icon
                                                : type === 'klarna'
                                                ? klarna_icon
                                                : cardData.icon || card_icon
                                        }
                                        type={type}
                                        method={
                                            text
                                                ? `${text} ${
                                                      description
                                                          ? description
                                                          : ''
                                                  }`
                                                : `${funding} ${brand} (${last4})`
                                        }
                                        handleDefault={() =>
                                            handleDefaultMethod(id)
                                        }
                                        handleDelete={() => handleDelete(id)}
                                    />
                                );
                            }
                        )}

                    {divideBy3 > 1 && (
                        <div className="pagination justify-end">
                            <Pagination
                                divideBy={divideBy3}
                                setPage={setPage}
                                page={page}
                            />
                        </div>
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
