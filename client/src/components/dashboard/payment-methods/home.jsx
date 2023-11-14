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

function Home({}) {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const { paymentMethods, PaymentMethodsDispatch } = usePaymentMethods();
    const { setModalCheck, modalContentDispatch } = useUserDashboardContext();

    useEffect(()=> {
if(paymentMethods.length < 1) navigate('add')
    },[])
    useEffect(() => {
        // setLoading(true);
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
                    {paymentMethods.map(({ logo, _id }) => {
                        const icon =
                            logo === 'paypal'
                                ? paypal_icon
                                : logo === 'credit-card'
                                ? card_icon
                                : (logo === 'klarna') && klarna_icon;
                        console.log({icon, logo});
                        return (
                            <PaymentMethodItem
                                key={_id}
                                icon={icon}
                                // isDefault={isDefault}
                                method={logo}
                                handleDefault={() =>
                                    PaymentMethodsDispatch({
                                        type: 'changeDefault',
                                        id: _id,
                                    })
                                }
                                handleDelete={() => handleDelete(_id)}
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
