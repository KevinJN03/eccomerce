import { Outlet, useNavigate } from 'react-router-dom';
import Header from '../header.jsx';
import card_icon from '../../../assets/icons/credit-card.png';
import delete_icon from '../../../assets/icons/delete-icon.png';
import { createContext, useEffect, useReducer, useState } from 'react';
import PaymentMethodProvider, {
    usePaymentMethods,
} from '../../../context/paymentMethodContext.jsx';

import PaymentMethodItem from './payment-method-item.jsx';

function Home({}) {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const { paymentMethods, PaymentMethodsDispatch } = usePaymentMethods();

    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 1000);
    }, [paymentMethods]);
    const handleDelete = (id) => {
        console.log('deleting id: ', id);

        PaymentMethodsDispatch({ type: 'delete', id });
    };
    const handleDefault = (id) => {
        PaymentMethodsDispatch({ type: 'changeDefault', id });
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
                                id={id}
                                key={id}
                                icon={card_icon}
                                isDefault={isDefault}
                                method={method}
                                handleDefault={handleDefault}
                                handleDelete={handleDelete}
                            />
                        );
                    })}
                </div>
            ) : (
                <div className="flex h-[400px] w-full items-center justify-center">
                    <div className="spinner-circle"></div>
                </div>
            )}
            {/* <Outlet /> */}
        </section>
    );
}

export default Home;
