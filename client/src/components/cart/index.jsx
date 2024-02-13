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
    const cartTotal = withoutShipping;
    // const [cart, setCart] = useState(null)
    const { cart, dispatch, cartLoading, setCartLoading, setCartRefresh } = useCart();
    const handleRemove = (id) => {
        dispatch({ type: 'remove', cartId: id });
    };

    const borderVariant = {
        initial: {
            opacity: 0,
        },
        animate: {
            opacity: 1,
            transition: { delay: 2, duration: 0.2 },
        },
        exit: {
            delay: 10,
        },
    };

    const generateItemVariant = (delay) => {
        return {
            initial: {
                opacity: 0,
                translateY: 50,
            },
            animate: {
                opacity: 1,
                translateY: 0,
                transition: { duration: 1.5, delay: delay * 0.4 },
            },
            exit: {
                opacity: 0,
                duration: 4,
                transition: { duration: 4 },
            },
        };
    };

    useEffect(() => {
        setCartRefresh(() => true)
        dispatch({ type: 'refresh' });
 
    }, []);
    return (
        <AnimatePresence mode="wait">
            {cartLoading ? (
                <div className="mt-32">
                    <GLoader />
                </div>
            ) : (
                <>
                    {cart.length > 0 ? (
                        <motion.section
                            id="cart-page"
                            variants={variants}
                            initial={'initial'}
                            animate={'animate'}
                            exit={'exit'}
                            className="pt-3"
                        >
                            <motion.span
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
                                </div>
                                <div className="product-cart-wrapper flex flex-col flex-nowrap">
                                    <AnimatePresence>
                                        {cart.map((item, idx) => {
                                            return (
                                                <motion.div
                                                    variants={generateItemVariant(
                                                        idx
                                                    )}
                                                    animate={'animate'}
                                                    initial={'initial'}
                                                    exit={'exit'}
                                                    key={item.cartId}
                                                >
                                                    {idx != 0 && (
                                                        <motion.div
                                                            key={uuidv4()}
                                                            variants={
                                                                borderVariant
                                                            }
                                                            animate={'animate'}
                                                            initial={'initial'}
                                                            exit={'exit'}
                                                            className="mx-6 h-1 border-t-[1px] border-gray-300"
                                                        ></motion.div>
                                                    )}

                                                    <Cart_Item product={item} />
                                                </motion.div>
                                            );
                                        })}
                                    </AnimatePresence>
                                </div>
                            </div>

                            <Total ref={checkoutBottomRef} />
                        </motion.section>
                    ) : (
                        <Empty_Cart />
                    )}
                </>
            )}
        </AnimatePresence>
    );
}

export default Cart;
