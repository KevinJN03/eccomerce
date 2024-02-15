import { Fragment, useEffect, useRef, useState } from 'react';
import '../../CSS/cart.scss';
import heart from '../../assets/heart.png';
import QTY_SIZE_OPTION from './qty-size-options';
import Cart_Item from './cart-item';
import Total from './total';
import { forwardRef } from 'react';
import { useScroll, motion, useInView, AnimatePresence } from 'framer-motion';
import { useWindowSize } from '@uidotdev/usehooks';

import { Link } from 'react-router-dom';
import zIndex from '@mui/material/styles/zIndex';
import { useCart } from '../../context/cartContext';
import Empty_Cart from './emptyCart';
import calculateTotal from '../common/calculateTotal';
import variants from '../common/framerMotionVariants.jsx';
import GLoader from '../Login-SignUp/socialRegister/gloader.jsx';
import { v4 as uuidv4 } from 'uuid';
function Cart({}) {
    const checkoutRef = useRef(null);
    const checkoutBottomRef = useRef(null);
    const isInView = useInView(checkoutBottomRef);
    const { withoutShipping } = calculateTotal();
    const [loading, setLoading] = useState(true);
    const cartTotal = withoutShipping;
    const {
        cart,
        dispatch,
        cartLoading,
        setCartLoading,
        setCartRefresh,
        cartRefresh,
    } = useCart();

    useEffect(() => {
        if (loading || cartRefresh) {
            setLoading(() => true);
            setCartRefresh(() => true);
            dispatch({ type: 'refresh' });

            const timeout = setTimeout(() => {
                setCartLoading(() => false);
                setCartRefresh(() => false);
                setLoading(() => false);
            }, 1500);

            return () => {
                clearTimeout(timeout);
            };
        }
    }, [cartRefresh]);

    const cartVariants = {
        initial: {
            opacity: 0,
        },
        animate: {
            opacity: 1,

            transition: { duration: 0.5 },
        },

        exit: {
            opacity: 0,

            transition: { delay: 0.1 },
        },
    };
    return (
        <section className="flex">
            <AnimatePresence mode="wait">
                {loading ? (
                    <motion.div key={'cart-loading'} className="mt-32">
                        <GLoader />
                    </motion.div>
                ) : cart.length > 0 ? (
                    <motion.section
                        key={'cart'}
                        id="cart-page"
                        variants={cartVariants}
                        initial={'initial'}
                        animate={'animate'}
                        exit={'exit'}
                        className="pt-3"
                    >
                        {' '}
                        <motion.span
                            key={'cart-checkout'}
                            className="sticky-header sticky  flex items-center justify-between bg-white p-3 lg:!hidden"
                            animate={{
                                position: 'sticky',
                                zIndex: 1,
                                top: '-1px',
                                opacity: isInView ? 0 : 1,
                            }}
                            transition={{
                                ease: 'easeInOut',
                                duration: 0.4,
                            }}
                        >
                            <div className="left">
                                <p className="text-base font-semibold">
                                    BAG SUB-TOTAL
                                </p>
                                <p className="text-sm">£{cartTotal}</p>
                            </div>
                            <div className="right">
                                <Link
                                    to="/checkout"
                                    className="checkout-btn bg-[var(--green)] px-3 py-2 font-medium tracking-wider text-white"
                                >
                                    CHECKOUT
                                </Link>
                            </div>
                        </motion.span>
                        <div className="cart">
                            <div className="cart-header">
                                <h1 className="font-gotham text-xl font-black tracking-wide">
                                    MY BAG
                                </h1>
                                <p className="text-sm sm+md:text-[10px]">
                                    Items are reserved for 60 minutes
                                </p>
                            </div>{' '}
                            <motion.div className="product-cart-wrapper flex flex-col flex-nowrap">
                                <AnimatePresence>
                                    {cart.map((item, idx) => {
                                        return (
                                            <Cart_Item
                                                idx={idx}
                                                lastIndex={
                                                    idx == cart.length - 1
                                                }
                                                cartItem={item}
                                                key={item.cartId}
                                            />
                                        );
                                    })}
                                </AnimatePresence>
                            </motion.div>
                        </div>
                        <Total ref={checkoutBottomRef} />
                    </motion.section>
                ) : (
                    <Empty_Cart key={'empty-cart'} />
                )}
            </AnimatePresence>
        </section>
    );
}

export default Cart;
