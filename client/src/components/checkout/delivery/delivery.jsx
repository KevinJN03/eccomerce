import { useEffect, useState } from 'react';
import Shipping_Option from './shipping-option';
import { useCart } from '../../../context/cartContext';
import { useCheckoutContext } from '../../../context/checkOutContext';
import _ from 'lodash';

function Delivery({ disable }) {
    const { cart, stateProps } = useCart();
    const [betaDeliveryInfo, setBetaDeliveryInfo] = useState([]);

    useEffect(() => {
        const objectToArray = Object.entries(stateProps?.deliveryInfoObj).map(
            ([key, { itemsByProfile, shipping_costs, ...value }]) => {
                return {
                    _id: key,
                    info: value,
                    cartItems: itemsByProfile,
                    shipping_costs,
                };
            }
        );

        setBetaDeliveryInfo(() => _.sortBy(objectToArray, ['_id']));
    }, [stateProps?.deliveryInfoObj]);

    // useEffect(() => {
    //     const newMap = new Map();

    //     cart.forEach((element) => {
    //         const deliveryId = element?.deliveryInfo[0]?._id;
    //         if (newMap.has(deliveryId)) {
    //             const value = newMap.get(deliveryId);
    //             const arr = value.array;
    //             arr.push(element);
    //             newMap.set(deliveryId, { ...value, array: arr });
    //         } else {
    //             // newMap.set(deliveryId, [element]);
    //             newMap.set(deliveryId, {
    //                 array: [element],
    //                 info: element?.deliveryInfo?.[0],
    //             });
    //         }
    //     });

    //     setCartByDelivery(() =>
    //         Array.from(newMap, ([_id, { array, info }]) => ({
    //             _id,
    //             cartItems: array,
    //             info,
    //         }))
    //     );
    // }, [cart]);

    return (
        <section
            id="delivery"
            className={`${disable ? 'disable-component' : 'display-component'}`}
        >
            <h1 className="checkout-title delivery-mb">DELIVERY OPTIONS</h1>
            <Shipping_Option
                disable={disable}
                cartByDelivery={betaDeliveryInfo}
            />
        </section>
    );
}

export default Delivery;
