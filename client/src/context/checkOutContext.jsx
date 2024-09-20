import { createContext, useContext, useEffect, useState } from 'react';
import { useCart } from './cartContext';
import _ from 'lodash';

const CheckoutContext = createContext(null);

export const useCheckoutContext = () => {
    return useContext(CheckoutContext);
};
function CheckOutProvider({ children, value }) {
    const { stateProps, } = useCart();
    const [deliverySelect, setDeliverySelect] = useState(
        _.get(stateProps, 'delivery_option') || {}
    );

    // const [checkoutErrors, setCheckOutErrors] = useState({
    //     cart_id: stateProps,
    // });

    const [error, setError] = useState(() => {
        debugger;
        return {
            cart_id: _.get(stateProps, 'delivery_option') || {},
        };
    });

    useEffect(() => {
        setDeliverySelect(() => _.get(stateProps, 'delivery_option'));
    }, [stateProps?.delivery_option]);
    return (
        <CheckoutContext.Provider
            value={{
                ...value,
                deliverySelect,
                setDeliverySelect,
                error,
                setError,
            }}
        >
            {children}
        </CheckoutContext.Provider>
    );
}

export default CheckOutProvider;
