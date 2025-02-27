import { useEffect } from 'react';
import '../../CSS/cart.scss';
import Cart_Item from './cart-item';
import Total from './total';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/cartContext';
import Empty_Cart from './emptyCart';
import calculateTotal from '../common/calculateTotal';
import GLoader from '../portal/socialRegister/gloader.jsx';
import { AnimatePresence, motion } from 'framer-motion';

function Cart({}) {
    const { withOutShipping: subTotal, delivery_cost } = calculateTotal();

    const { cart, loading, fetchItems } = useCart();

    useEffect(() => {
        fetchItems({});
    }, []);

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
        <section className="flex  !min-h-main justify-center  ">
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
                        className="mb-24 flex justify-center gap-4 pt-3 md:mx-6 sm+md:flex sm+md:flex-col sm+md:self-center"
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
                                                key={item._id}
                                            />
                                        );
                                    })}
                                </AnimatePresence>
                            </motion.div>
                            <div className="mt-2 flex justify-end gap-5 bg-white p-3 py-6">
                                <p className="font-gotham text-sm text-black/80">
                                    SUB-TOTAL
                                </p>
                                <p className="font-gotham text-sm text-black/80">
                                    £{subTotal}
                                </p>
                            </div>
                        </div>
                        <Total
                            subTotal={subTotal}
                            delivery_cost={delivery_cost}
                        />
                    </motion.section>
                ) : (
                    <Empty_Cart key={'empty-cart'} />
                )}
            </AnimatePresence>
        </section>
    );
}

export default Cart;
