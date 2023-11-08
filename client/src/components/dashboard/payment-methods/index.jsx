import { Outlet, useNavigate } from 'react-router-dom';
import Header from '../header.jsx';
import card_icon from '../../../assets/icons/credit-card.png';
import delete_icon from '../../../assets/icons/delete-icon.png';
import { createContext, useEffect, useReducer, useState } from 'react';
import PaymentMethodProvider from '../../../context/paymentMethodContext.jsx';
const PaymentMethodCOntext = createContext();
const testData = [
    {
        id: 1,
        icon: card_icon,
        isDefault: true,
        method: 'Paypal',
    },
    {
        id: 2,
        icon: card_icon,
        isDefault: false,
        method: 'Paypal22',
    },
];
function PaymentMethodItem({
    icon,
    isDefault,
    method,
    handleDefault,
    id,
    handleDelete,
}) {
    return (
        <section className="flex flex-col  bg-white p-4">
            <section className="mb-3 flex flex-row">
                <div className="top flex-[0.7] self-start">
                    <img src={icon} className="h-8 w-8" />
                </div>
                <div className="middle flex-[5]">
                    <p className="mb-2 text-base font-medium">{method}</p>
                    <p className="w-11/12">
                        You'll need to enter your login details when you place
                        your order.
                    </p>
                </div>
                <button
                    className={`bottom flex w-fit flex-[1.2] cursor-pointer items-center gap-x-2 self-start disabled:opacity-40`}
                    disabled={isDefault}
                    onClick={() => handleDelete(id)}
                >
                    <p className="font-bold tracking-widest !text-[var(--grey)]">
                        DELETE
                    </p>
                    <img
                        src={delete_icon}
                        alt="bin outline icon with transparent background"
                        className="h-7 w-7"
                    />
                </button>
            </section>

            {isDefault ? (
                <p className="text-sm opacity-60">
                    This is your default payment method
                </p>
            ) : (
                <button
                    className="flex flex-row items-center gap-x-4"
                    onClick={() => handleDefault(id)}
                >
                    <div className="flex h-7 w-7 self-start border-[1px] border-black"></div>
                    <p className="w-fit text-sm">
                        Set as default payment method
                    </p>
                </button>
            )}
        </section>
    );
}

const reducer = (state, action) => {
    if (action.type == 'changeDefault') {
        const newStateArray = [...state];

        const defaultMethod = state[0]
        const newArray = [...state]
        return;
    }

    if (action.type == 'delete') {
        const newState = [...state].filter(({ id }) => {
           return id != action.id;
        });
console.log({newState, state})
        return newState;
    }

    if (action.type == 'add') {
        return;
    }

    throw new Error(
        `${action?.type || action} is not accepted please try again.`
    );
};
function Index({}) {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [paymentMethods, PaymentMethodsDispatch] = useReducer(
        reducer,
        testData
    );
    const value = { paymentMethods, PaymentMethodsDispatch };


    useEffect(() => {
        setLoading(true)
setTimeout(()=> {
    setLoading(false)
}, 1000)
    }, [paymentMethods])
    const handleDelete = (id) => {
        console.log('deleting id: ', id);

        PaymentMethodsDispatch({ type: 'delete', id });
    };
    const handleDefault = (id) => {
        PaymentMethodsDispatch({ type: 'changeDefault', id });
    };
    return (
        <PaymentMethodProvider value={value}>
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
                            ({ icon, isDefault, method, id }) => {
                                return (
                                    <PaymentMethodItem
                                        id={id}
                                        key={id}
                                        icon={icon}
                                        isDefault={isDefault}
                                        method={method}
                                        handleDefault={handleDefault}
                                        handleDelete={handleDelete}
                                    />
                                );
                            }
                        )}
                    </div>
                ) : (
                    <div className="flex h-[400px] w-full items-center justify-center">
                        <div className="spinner-circle"></div>
                    </div>
                )}
                {/* <Outlet /> */}
            </section>
        </PaymentMethodProvider>
    );
}

export default Index;
