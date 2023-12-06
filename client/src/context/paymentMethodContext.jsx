import {
    createContext,
    useContext,
    useState,
    useReducer,
    useEffect,
} from 'react';
const PaymentMethodContext = createContext();

export const usePaymentMethods = () => {
    return useContext(PaymentMethodContext);
};

export const reducer = (state, action) => {
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
        ({ newState, state });
        return newState;
    }

    if (action.type == 'add') {
        return [...state, action.payload];
    }

    if (action.type == 'set') {
        return action.payload;
    }

    throw new Error(
        `${action?.type || action} is not accepted please try again.`
    );
};

export function PaymentMethodProvider({ children, userPaymentMethods, }) {
    const [paymentMethods, PaymentMethodsDispatch] = useReducer(
        reducer,
        userPaymentMethods || []
    );

    useEffect(() => {
        if (userPaymentMethods) {
            PaymentMethodsDispatch({
                type: 'set',
                payload: userPaymentMethods,
            });
        }
    }, [userPaymentMethods]);

    return (
        <PaymentMethodContext.Provider
            value={{ paymentMethods, PaymentMethodsDispatch }}
        >
            {children}
        </PaymentMethodContext.Provider>
    );
}

export default PaymentMethodProvider;
