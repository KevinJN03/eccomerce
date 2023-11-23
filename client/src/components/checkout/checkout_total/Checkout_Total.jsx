import { Link } from 'react-router-dom';
import { useCart } from '../../../context/cartContext';
import Checkout_Item from './checkout-item';
import calculateTotal from '../../common/calculateTotal';
import { useEffect, useState } from 'react';
import calculatePromo from '../../common/calculatePromo';
import { motion, useScroll } from 'framer-motion';
import closeIcon from '../../../assets/icons/close.png';
import { useCheckoutContext } from '../../../context/checkOutContext';
function Checkout_Total() {
    const { cart } = useCart();
const {error, setError} = useCheckoutContext()
    const { scrollY } = useScroll();

    const { withShipping, withOutShipping, savePercent, amountOff } =
        calculateTotal();
    let total = withShipping;

    const { deliveryOption } = useCart();
    const { promo } = useCart();

    const product = {
        img: 'https://images.asos-media.com/cart/dr-martens-garin-sandals-in-back-brando-leather/203997482-1-black',
        title: 'Dr Martens Garin sandals in back brando leather',
        color: 'BLACK',
        size: ['S', 'M', 'L', 'XL', 'XXL', 'XXXL'],
        price: 90.99,
        qty: 1,
        delivery: 'Free',
    };

    return (
        <motion.section className="mt-5 h-fit" style={{ y: scrollY }}>
            <section id="checkout-total">
                <div className="flex flex-row items-center justify-between border-b-2 pb-4">
                    <h1 className="font-gotham text-xl font-bold tracking-wider">
                        {cart.length} {cart.length > 1 ? 'ITEMS' : 'ITEM'}
                    </h1>
                    <Link to="/cart">Edit</Link>
                </div>
                <div className="product-container">
                    {cart &&
                        cart.map((product) => {
                            return (
                                <Checkout_Item
                                    product={product}
                                    key={product.cartId}
                                />
                            );
                        })}
                </div>

                <div className="flex flex-col gap-3">
                    <p className="flex justify-between">
                        Subtotal <span>£ {withOutShipping}</span>
                    </p>
                    {promo[0].bool && (
                        <p className="flex justify-between">
                            Promo <span>-£ {amountOff}</span>
                        </p>
                    )}

                    <p className="flex justify-between">
                        Delivery{' '}
                        <span>
                            {deliveryOption.cost
                                ? `£ ${deliveryOption.cost}`
                                : 'FREE'}
                        </span>
                    </p>
                    <p className="flex justify-between font-gotham font-bold">
                        TOTAL TO PAY <span>£ {total}</span>
                    </p>
                </div>
            </section>

            {error.msg && (
                <div role="alert" className="alert alert-error rounded-none">
                    <svg
                        onClick={() =>
                            setError((prevState) => ({
                                ...prevState,
                                msg: null,
                            }))
                        }
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 shrink-0 stroke-current hover:scale-110 transition-all"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                    </svg>
                    <span>{error.msg}</span>
                </div>
            )}
        </motion.section>
    );
}

export default Checkout_Total;
