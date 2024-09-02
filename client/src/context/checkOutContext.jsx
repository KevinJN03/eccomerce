import { createContext, useContext, useEffect, useState } from 'react';
import { useCart } from './cartContext';
import _ from 'lodash';

const CheckoutContext = createContext(null);

export const useCheckoutContext = () => {
    return useContext(CheckoutContext);
};
function CheckOutProvider({ children, value }) {
    const { stateProps } = useCart();
    const [deliverySelect, setDeliverySelect] = useState(
        _.get(stateProps, 'delivery_option') || {}
    );
    useEffect(() => {
        setDeliverySelect(() => _.get(stateProps, 'delivery_option'));
    }, [stateProps?.delivery_option]);
    return (
        <CheckoutContext.Provider
            value={{ ...value, deliverySelect, setDeliverySelect }}
        >
            {children}
        </CheckoutContext.Provider>
    );
}

export default CheckOutProvider;
