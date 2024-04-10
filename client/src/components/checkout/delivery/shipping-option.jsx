import { useEffect, useState } from 'react';
import { useCart } from '../../../context/cartContext';
import axios from '../../../api/axios';

import dayjs from 'dayjs';
import { useCheckoutContext } from '../../../context/checkOutContext';
import _ from 'lodash';

function Shipping_Option({ disable }) {
    const { cart, setDeliveryOption, deliveryOption } = useCart();
    const { setDeliveryDate } = useCheckoutContext();

    // const handleDelivery = (e) => {
    //     const { id, cost, name, delivery_date } = e.target.dataset;
    //     setDeliveryOption(() => ({ id, cost: parseFloat(cost), name }));
    //     setDeliveryDate(() => delivery_date);
    // };

    // const generateDeliveryDate = ({ processingTime }) => {
    //     const addUnit = processingTime.type == 'weeks' ? 'week' : 'day';
    //     const newDeliveryDate = today.add(processingTime.end, addUnit);

    //     const newFormatDate = newDeliveryDate.format('dddd, D MMMM, YYYY');

    //     return newFormatDate;
    // };

    // useEffect(() => {
    //     if (!deliveryOption?.id && profiles.length >= 1) {
    //         console.log({ deliveryOption });
    //         const { _id, cost, name, processingTime } = profiles[0];

    //         const delivery_date = generateDeliveryDate({
    //             processingTime,
    //         });
    //         setDeliveryDate(() => delivery_date);

    //         setDeliveryOption({ id: _id, cost, name });
    //         return;
    //     }

    //     if (deliveryOption?.id && profiles.length >= 1) {
    //         const findOption = profiles.find(
    //             (item) => item?._id == deliveryOption?.id
    //         );

    //         const delivery_date = generateDeliveryDate({
    //             processingTime: findOption?.processingTime,
    //         });
    //         setDeliveryDate(() => delivery_date);
    //     }
    // }, [profiles]);

    return (
        <div>
            {cart.map(({ images, title, quantity, _id, variation_data, price }) => {
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
                                <p className="font-medium">{title}</p>

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
                                                    <span className='font-normal'>
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

                                <p className="font-medium">Qty: <span className='font-normal'>{quantity}</span></p>
                                <p className="font-medium">£{price?.current}</p>

                            </div>
                        </div>
                        <div className="right"></div>
                    </div>
                );
            })}
        </div>
    );
}

export default Shipping_Option;
