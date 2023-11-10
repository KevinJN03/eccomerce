import { Outlet, useNavigate } from 'react-router-dom';
import Header from '../header.jsx';
import card_icon from '../../../assets/icons/credit-card.png';
import delete_icon from '../../../assets/icons/delete-icon.png';
import { createContext, useEffect, useReducer, useState } from 'react';
import PaymentMethodProvider, {
    usePaymentMethods,
} from '../../../context/paymentMethodContext.jsx';

import PaymentMethodItem from './payment-method-item.jsx';
import Modal from '../../admin/components/modal/modal.jsx';
import { useUserDashboardContext } from '../../../context/userContext.jsx';

function Home({}) {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const { paymentMethods, PaymentMethodsDispatch } = usePaymentMethods();
    const { setModalCheck, modalContentDispatch } = useUserDashboardContext();
    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 1000);
    }, [paymentMethods]);

    const handleDelete = (id) => {
        modalContentDispatch({
            type: 'deletePaymentMethod',
            id,
        });
        setModalCheck(() => true);
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
                    {paymentMethods.map(({ isDefault, method, id }) => {
                        return (
                            <PaymentMethodItem
                                key={id}
                                icon={card_icon}
                                isDefault={isDefault}
                                method={method}
                                handleDefault={() =>
                                    PaymentMethodsDispatch({
                                        type: 'changeDefault',
                                        id,
                                    })
                                }
                                handleDelete={() => handleDelete(id)}
                            />
                        );
                    })}
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
