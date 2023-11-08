import { createContext, useContext, useState, useReducer } from 'react';
const PaymentMethodContext = createContext();

export const usePaymentMethods = () => {
    return useContext(PaymentMethodContext);
};

const reducer = (state, action) => {
    if (action.type == 'changeDefault') {
        const newStateArray = [...state];

        const defaultMethod = state[0];
        const newArray = [...state];
        return newArray;
    }

    if (action.type == 'delete') {
        const newState = [...state].filter(({ id }) => {
            return id != action.id;
        });
        console.log({ newState, state });
        return newState;
    }

    if (action.type == 'add') {
        return;
    }

    throw new Error(
        `${action?.type || action} is not accepted please try again.`
    );
};
const testData = [
    {
        id: 1,
        isDefault: true,
        method: 'Paypal',
    },
    {
        id: 2,
        isDefault: false,
        method: 'Paypal22',
    },
];
export function PaymentMethodProvider({ children }) {
    const [paymentMethods, PaymentMethodsDispatch] = useReducer(
        reducer,
        testData
    );

    return (
        <PaymentMethodContext.Provider
            value={{ paymentMethods, PaymentMethodsDispatch }}
        >
            {children}
        </PaymentMethodContext.Provider>
    );
}

export default PaymentMethodProvider;
