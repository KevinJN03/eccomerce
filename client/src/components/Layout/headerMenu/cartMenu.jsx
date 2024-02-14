import { Link } from 'react-router-dom';
import DeleteIcon from '../../../assets/icons/deleteIcon';
import calculateTotal from '../../common/calculateTotal';
import { useCart } from '../../../context/cartContext';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import CartMenuItem from './cartIMenutem';
function CartMenu({ setIsHover, isHover }) {
    const { withOutShipping: subTotal } = calculateTotal();
    const { dispatch: cartDispatch, cart, setCartRefresh } = useCart();

    const handleRemove = (cartId) => {
        cartDispatch({ type: 'remove', cartId: cartId });
    };

    useEffect(() => {
        cartDispatch({ type: 'refresh' });
    }, []);

    return (
        <motion.section className="cartMenu">
            <div className="flex flex-col py-3">
                <header>
                    <h3 className="px-3 pb-3 font-gotham text-base">
                        My Bag,{' '}
                        <span className="text-sm font-light">
                            {cart.length}{' '}
                        </span>
                        <span className="text-xs">
                            {cart.length > 0 ? 'items' : 'item'}
                        </span>
                    </h3>
                </header>
                <motion.section className="cartItem flex h-full max-h-[15rem] w-full flex-col gap-3 overflow-y-auto bg-white p-3 px-3">
                    <AnimatePresence>
                        {cart.map((cartItem, idx) => {
                            return (
                                <CartMenuItem
                                    key={`item-${cartItem.cartId}`}
                                    cartItem={cartItem}
                                    idx={idx}
                                />
                            );
                        })}
                    </AnimatePresence>
                </motion.section>

                <div className="subtotal subtotal-shadow flex flex-row flex-nowrap justify-between border-t bg-[#F5F5F5] px-3 py-4 ">
                    <p
                        className="text-sm text-black
                                 "
                    >
                        Sub-total
                    </p>
                    <p
                        className="text-sm text-black
                                 "
                    >
                        £{subTotal}
                    </p>
                </div>
            </div>
            <div className="flex flex-row flex-nowrap gap-3 border-b border-dark-gray/50 bg-light-grey p-3 px-3">
                <Link
                    onClick={() => setIsHover(() => false)}
                    to={'/cart'}
                    className="flex flex-1 items-center justify-center border-2 bg-white font-semibold hover:bg-light-grey"
                >
                    VIEW BAG
                </Link>

                <a
                    href="/checkout"
                    className=" checkout-btn flex-1"
                    onClick={() => setIsHover(() => false)}
                >
                    CHECKOUT
                </a>
            </div>

            <div className="flex flex-col items-center justify-center px-3 py-3">
                <p className="text-sm">Free Delivery Worldwide*</p>

                <p className="text-xxs">
                    More info{' '}
                    <a className="underline underline-offset-1">here</a>
                </p>
            </div>
        </motion.section>
    );
}

export default CartMenu;
