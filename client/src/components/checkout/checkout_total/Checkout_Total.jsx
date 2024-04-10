import { Link } from 'react-router-dom';
import { useCart } from '../../../context/cartContext';
import Checkout_Item from './checkout-item';
import calculateTotal from '../../common/calculateTotal';
import { useEffect, useState } from 'react';
import calculatePromo from '../../common/calculatePromo';
import { motion, useScroll } from 'framer-motion';
import closeIcon from '../../../assets/icons/close.png';
import { useCheckoutContext } from '../../../context/checkOutContext';

import { useWindowSize } from '@uidotdev/usehooks';
function Checkout_Total() {
    const { cart } = useCart();

    const {
        withShipping,
        withOutShipping,
        savePercent,
        amountOff,
        delivery_cost,
    } = calculateTotal();
    let total = withShipping;

    const { deliveryOption } = useCart();
    const { promo } = useCart();

    return (
        <motion.section className="top-3 h-fit  sm+md:w-[90vw] lg:sticky lg:w-[400px]">
            <section id="checkout-total">
                <div className="flex flex-row items-center justify-between border-b-2 pb-4">
                    <h1 className="font-gotham text-xl font-bold tracking-wider">
                        {cart.length} {cart.length > 1 ? 'ITEMS' : 'ITEM'}
                    </h1>
                    <a href="/cart">Edit</a>
                </div>

                <div className="mb-4 flex max-h-[300px] border-b-2 py-6">
                    <div className="product-container scrollbar max-h-[70%] overflow-y-auto">
                        {cart &&
                            cart.map((product) => {
                                return (
                                    <Checkout_Item
                                        data={product}
                                        key={product._id}
                                    />
                                );
                            })}
                    </div>
                </div>

                <div className="flex flex-col gap-3">
                    <p className="flex justify-between">
                        Subtotal <span>£ {withOutShipping}</span>
                    </p>
                    {promo[0]?.bool && (
                        <p className="flex justify-between">
                            Promo <span>-£ {amountOff}</span>
                        </p>
                    )}

                    <p className="flex justify-between">
                        Delivery{' '}
                        <span>
                            {delivery_cost ? `£ ${delivery_cost}` : 'FREE'}
                        </span>
                    </p>
                    <p className="flex justify-between font-gotham font-bold">
                        TOTAL TO PAY <span>£ {total}</span>
                    </p>
                </div>
            </section>
        </motion.section>
    );
}

export default Checkout_Total;
