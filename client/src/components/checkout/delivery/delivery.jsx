import { useEffect, useState } from 'react';
import Shipping_Option from './shipping-option';
import { useCart } from '../../../context/cartContext';
import { useCheckoutContext } from '../../../context/checkOutContext';
import _ from 'lodash';

function Delivery({ disable }) {
    const { cart, stateProps } = useCart();
    const [deliveryInfo, setDeliveryInfo] = useState([]);


    useEffect(() => {
        const objectToArray = _.toPairs(
            _.get(stateProps, 'deliveryInfoObj')
        ).map(([key, { itemsByProfile, shipping_costs, ...value }]) => {
            return {
                _id: key,
                info: value,
                cartItems: itemsByProfile,
                shipping_costs,
            };
        });

        setDeliveryInfo(() => _.sortBy(objectToArray, ['_id']));
    }, [stateProps?.deliveryInfoObj]);

    return (
        <section
            id="delivery"
            className={`${disable ? 'disable-component' : 'display-component'}`}
        >
            <h1 className="checkout-title delivery-mb">DELIVERY OPTIONS</h1>
            <Shipping_Option disable={disable} cartByDelivery={deliveryInfo} />
        </section>
    );
}

export default Delivery;
