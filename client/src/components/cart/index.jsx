import { Fragment, useEffect, useRef } from 'react';
import '../../CSS/cart.scss';
import heart from '../../assets/heart.png';
import QTY_SIZE_OPTION from './qty-size-options';
import Cart_Item from './cart-item';
import Total from './total';
import { forwardRef } from 'react';
import { useScroll, motion, useInView } from 'framer-motion';
import { useWindowSize } from '@uidotdev/usehooks';

import { Link } from 'react-router-dom';
import zIndex from '@mui/material/styles/zIndex';
import { useCart } from '../../context/cartContext';
import Empty_Cart from './emptyCart';
function Cart({}) {
    const checkoutRef = useRef(null);
    const checkoutBottomRef = useRef(null);
    const isInView = useInView(checkoutBottomRef);
    const [cart, dispatch] = useCart();
    console.log("cart at cart:", cart)
    
const handleRemove = (item) => {
    console.log(item)
    dispatch({type: 'remove', product: item})
}
    return (
        <>{
            cart.length > 0 ? <section id="cart-page">
                <motion.span
                    className="sticky-header sticky  flex items-center justify-between bg-white p-3 lg:!hidden"
                    animate={{
                        position: 'sticky',
                        zIndex: 1,
                        top: '-1px',
                        opacity: isInView ? 0 : 1,
                    }}
                    transition={{ ease: 'easeInOut', duration: 0.4 }}
                >
                    <div className="left">
                        <p className="text-base font-semibold">BAG SUB-TOTAL</p>
                        <p className="text-sm">£28.00</p>
                    </div>
                    <div className="right">
                        <Link
                            to="/checkout"
                            className="bg-[var(--green)] px-3 py-2 font-medium tracking-wider text-white "
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
                    <div className="product-cart-wrapper">
                        {cart && cart.map((item => {
                           return ( <Cart_Item key={item.id} product={item} handleClick={() => handleRemove(item)}/>)
                        }))}
                    </div>
                </div>

                <Total ref={checkoutBottomRef} />
            </section> :

            <Empty_Cart/>
        }
            
        </>
    );
}

export default Cart;
