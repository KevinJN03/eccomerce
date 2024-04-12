import { useEffect, useState } from 'react';
import Shipping_Option from './shipping-option';
import { useCart } from '../../../context/cartContext';
import { useCheckoutContext } from '../../../context/checkOutContext';

function Delivery({ disable }) {
    const { cart, stateProps } = useCart();
    const [cartByDelivery, setCartByDelivery] = useState([]);
  const [betaDeliveryInfo, setbetaDeliveryInfo] = useState([])
    useEffect(() => {
        const newMap = new Map();

        cart.forEach((element) => {
            const deliveryId = element?.deliveryInfo[0]?._id;
            if (newMap.has(deliveryId)) {
                const value = newMap.get(deliveryId);
                const arr = value.array;
                arr.push(element);
                newMap.set(deliveryId, { ...value, array: arr });
            } else {
                // newMap.set(deliveryId, [element]);
                newMap.set(deliveryId, {
                    array: [element],
                    info: element?.deliveryInfo?.[0],
                });
            }
        });

        setCartByDelivery(() =>
            Array.from(newMap, ([_id, { array, info }]) => ({
                _id,
                cartItems: array,
                info,
            }))
        );
    }, [cart]);

    useEffect(() => {}, [stateProps?.delivery_option]);

    return (
        <section
            id="delivery"
            className={`${disable ? 'disable-component' : 'display-component'}`}
        >
            <h1 className="checkout-title delivery-mb">DELIVERY OPTIONS</h1>
            <Shipping_Option
                disable={disable}
                cartByDelivery={cartByDelivery}
            />
        </section>
    );
}

export default Delivery;
