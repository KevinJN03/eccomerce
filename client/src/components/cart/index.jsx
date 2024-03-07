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
    const { withOutShipping: subTotal } = calculateTotal();
    const [loading, setLoading] = useState(true);

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
        <section className="!min-h-main  flex  items-center justify-center  ">
            <AnimatePresence mode="wait">
                {loading ? (
                    <motion.div key={'cart-loading'} className="">
                      
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
                        className="pt-3 flex justify-center gap-4 md:mx-6 sm+md:flex sm+md:flex-col sm+md:self-center mb-24"
                    >
                        {' '}
                        <motion.span
                            key={'cart-checkout'}
                            className="sticky-header sticky  flex items-center justify-between bg-white p-3 lg:!hidden"
                            // animate={{
                            //     position: 'sticky',
                            //     zIndex: 1,
                            //     top: '-1px',
                            //     opacity: isInView ? 0 : 1,
                            // }}
                            transition={{
                                ease: 'easeInOut',
                                duration: 0.4,
                            }}
                        >
                            <div className="left">
                                <p className="text-base font-semibold">
                                    BAG SUB-TOTAL
                                </p>
                                <p className="text-sm">£{subTotal}</p>
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
                            <motion.div className="product-cart-wrapper flex flex-col flex-nowrap bg-white">
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
                            <div className="mt-2 bg-white p-3 py-6 flex justify-end gap-5">

                                <p className='font-gotham text-sm text-black/80'>SUB-TOTAL</p>
                                <p className='font-gotham text-sm text-black/80'>£{subTotal}</p>
                            </div>
                        </div>
                        <Total subTotal={subTotal} />
                    </motion.section>
                ) : (
                    <Empty_Cart key={'empty-cart'} />
                )}
            </AnimatePresence>
        </section>
    );
}

export default Cart;
