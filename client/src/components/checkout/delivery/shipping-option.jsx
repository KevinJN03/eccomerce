import { useEffect, useState } from 'react';
import { useCart } from '../../../context/cartContext';
import axios from '../../../api/axios';

import dayjs from 'dayjs';
import { useCheckoutContext } from '../../../context/checkOutContext';
import _ from 'lodash';

function Shipping_Option({ disable }) {
    const { cart, setDeliveryOption, deliveryOption } = useCart();
    const { setDeliveryDate } = useCheckoutContext();
    const [cartByDelivery, setCartByDelivery] = useState([]);

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
    return (
        <section className=" flex flex-col gap-3">
            {cartByDelivery.map(({ _id, cartItems, info }) => {
                return (
                    <section
                        className="flex flex-row flex-nowrap rounded-md border border-2 p-2"
                        key={_id}
                    >
                        <div className="flex-1">
                            {cartItems.map(
                                ({
                                    images,
                                    title,
                                    quantity,
                                    _id,
                                    variation_data,
                                    price,
                                }) => {
                                    return (
                                        <div
                                            key={`delivery-${_id}`}
                                            className="flex flex-col gap-3"
                                        >
                                            <div className="left flex flex-row gap-2">
                                                <img
                                                    src={images[0]}
                                                    alt=""
                                                    className="h-20 w-16 object-cover"
                                                />
                                                <div>
                                                    <p className="font-medium">
                                                        {title}
                                                    </p>

                                                    {[1, 2].map((num) => {
                                                        return (
                                                            <>
                                                                {_.get(
                                                                    variation_data,
                                                                    `select.variation${num}.variation`
                                                                ) && (
                                                                    <p className="font-medium">
                                                                        {_.get(
                                                                            variation_data,
                                                                            `variation${num}_data.title`
                                                                        )}
                                                                        :{' '}
                                                                        <span className="font-normal">
                                                                            {_.get(
                                                                                variation_data,
                                                                                `select.variation${num}.variation`
                                                                            )}
                                                                        </span>
                                                                    </p>
                                                                )}
                                                            </>
                                                        );
                                                    })}

                                                    <p className="font-medium">
                                                        Qty:{' '}
                                                        <span className="font-normal">
                                                            {quantity}
                                                        </span>
                                                    </p>
                                                    <p className="font-medium">
                                                        £{price?.current}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="right"></div>
                                        </div>
                                    );
                                }
                            )}
                        </div>

                        <div className="flex-1">
                            <h3 className="text-base font-medium">
                                Choose a delivery method
                            </h3>

                            <div className='w-full flex flex-col gap-3 mt-3'>
                                {[
                                    _.get(info, ['standard_delivery', 0]),
                                    ..._.filter(
                                        _.get(info, 'delivery_upgrades'),
                                        {
                                            destination: 'domestic',
                                        }
                                    ),
                                ].map(({ shipping, charges }) => {
                                    return (
                                        <div className='w-full'>
                                            <div className="flex flex-row flex-nowrap gap-2 justify-start items-center">
                                                <input
                                                className='daisy-radio daisy-radio-bordered daisy-radio-sm'
                                                    type="radio"
                                                    name={`shipping-service-${_id}`}
                                                    id={`shipping-service-${_id}`}
                                                />
                                                <p className='whitespace-nowrap'>{shipping?.service}</p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </section>
                );
            })}
        </section>
    );
}

export default Shipping_Option;
