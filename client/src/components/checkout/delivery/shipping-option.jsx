import { useEffect, useState } from 'react';
import { useCart } from '../../../context/cartContext';
import axios from '../../../api/axios.js';

import dayjs from 'dayjs';
import { useCheckoutContext } from '../../../context/checkOutContext';
import _, { property } from 'lodash';
import generateEstimatedTime from '../../admin/components/product/new product/utils/generateEstimateTime';

function Shipping_Option({ disable, cartByDelivery }) {
    const {
        deliverySelect,
        setDeliverySelect,
        error: checkoutErrors,
        setError: setCheckOutErrors,
    } = useCheckoutContext();
    const { updateItemProperty, stateProps } = useCart();

    const handleClick = ({ _id, shippingId }) => {
        try {
            setDeliverySelect((prevState) => ({
                ...prevState,
                [_id]: shippingId,
            }));
            updateItemProperty({
                isItem: false,
                property: `delivery_option.${_id}`,
                value: shippingId,
            });
            debugger;

            setCheckOutErrors((prevState) => ({
                ...prevState,
                cart_id: { ...prevState?.cart_id, [_id]: true },
            }));
        } catch (error) {
            console.error('error at Shipping_Option', error);
        }
    };
    return (
        <section className=" flex flex-col gap-3">
            {cartByDelivery.map(({ _id, cartItems, info, shipping_costs }) => {
                return (
                    <section
                        className={`flex flex-row flex-nowrap  border-2 p-2 ${!_.get(checkoutErrors, ['cart_id', _id]) ? '!border-red-700' : 'border'}`}
                        key={_id}
                    >

                        <div className="flex-1 pt-8">
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

                            <div className="mt-3 flex w-full flex-col gap-3">
                                {[
                                    _.get(info, ['standard_delivery', 0]),
                                    ..._.filter(
                                        _.get(info, 'delivery_upgrades'),
                                        {
                                            destination: 'domestic',
                                        }
                                    ),
                                ].map(
                                    ({
                                        shipping,
                                        charges,
                                        _id: shippingId,
                                    }) => {
                                        return (
                                            <div className="w-full">
                                                <div
                                                    onClick={() =>
                                                        handleClick({
                                                            _id,
                                                            shippingId,
                                                        })
                                                    }
                                                    className="flex cursor-pointer flex-row flex-nowrap items-center justify-start gap-2"
                                                >
                                                    <input
                                                        readOnly
                                                        checked={
                                                            _.get(
                                                                deliverySelect,
                                                                [_id]
                                                            ) == shippingId
                                                        }
                                                        className="daisy-radio-bordered daisy-radio daisy-radio-sm"
                                                        type="radio"
                                                        name={`shipping-service-${_id}`}
                                                        id={`shipping-service-${_id}`}
                                                    />

                                                    <div>
                                                        <p className="whitespace-nowrap">
                                                            {_.upperFirst(
                                                                shipping?.service
                                                            )}
                                                            <span className="pl-2 font-medium">
                                                                £
                                                                {parseFloat(
                                                                    _.get(
                                                                        shipping_costs,
                                                                        [
                                                                            shippingId,
                                                                            'cost',
                                                                        ]
                                                                    )
                                                                ).toFixed(2)}
                                                            </span>
                                                        </p>

                                                        <p>
                                                            Estimated delivery:{' '}
                                                            <span className="decoration font-medium underline decoration-dashed underline-offset-2	 ">
                                                                {_.get(
                                                                    shipping_costs,
                                                                    [
                                                                        shippingId,
                                                                        'estimated_delivery',
                                                                    ]
                                                                ) ||
                                                                    'Delivery times varies'}
                                                            </span>
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    }
                                )}
                            </div>
                        </div>
                    </section>
                );
            })}
        </section>
    );
}

export default Shipping_Option;
