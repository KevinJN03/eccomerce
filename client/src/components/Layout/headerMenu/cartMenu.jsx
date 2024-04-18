import { Link } from 'react-router-dom';
import DeleteIcon from '../../../assets/icons/deleteIcon';
import calculateTotal from '../../common/calculateTotal';
import { useCart } from '../../../context/cartContext';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import CartMenuItem from './cartIMenutem';
import Cart_Item from '../../cart/cart-item';
import { useLayoutContext } from '../../../context/layoutContext';
import { CheckCircleOutlineSharp } from '@mui/icons-material';
import { v4 } from 'uuid';
function CartMenu({}) {
    const { withOutShipping: subTotal } = calculateTotal();
    const {
        cart,

        isUpdated,
    } = useCart();
    const { isHover, setIsHover } = useLayoutContext();
    const [loading, setLoading] = useState(!isUpdated);

    return (
        <section className="cartMenu">
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
                <AnimatePresence>
                    {isHover?.addToCart && (
                        <motion.div
                            exit={{
                                opacity: 0,
                                transition: {
                                    delay: 0.7,
                                },
                            }}
                            className="flex flex-row items-center gap-2 bg-green-200/80 px-2 py-2"
                        >
                            <CheckCircleOutlineSharp className="!fill-green-700" />
                            <p>It's in the bag - We'll hold it for an hour</p>
                        </motion.div>
                    )}
                </AnimatePresence>

                <section
                    key={'cart-item-menu-wrapper'}
                    className="cartItem flex h-full max-h-[15rem] w-full flex-col overflow-y-auto  bg-white"
                >
                    <AnimatePresence>
                        {cart.map((item, idx) => {
                            return (
                                <CartMenuItem
                                    key={`${item._id}`}
                                    cartItem={item}
                                    idx={idx}
                                    lastIndex={idx == cart.length - 1}
                                />
                            );
                        })}
                    </AnimatePresence>
                </section>

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

            <div className="flex flex-row flex-nowrap items-center gap-3 border-b border-dark-gray/50 bg-light-grey p-3 px-3">
                <Link
                    onClick={() => setIsHover(() => false)}
                    to={'/cart'}
                    className="flex flex-1 items-center justify-center border-2 bg-white py-2 font-semibold hover:bg-light-grey"
                >
                    VIEW BAG
                </Link>

                <a
                    href="/checkout"
                    className="h-fit flex-1 border-primary-green bg-primary-green py-2 text-center font-semibold tracking-widest text-white hover:bg-[#016536]"
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
        </section>
    );
}

export default CartMenu;
