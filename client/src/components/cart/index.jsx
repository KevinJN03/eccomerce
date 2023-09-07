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

function Cart({}) {
    const checkoutRef = useRef(null);
    const checkoutBottomRef = useRef(null);
    const isInView = useInView(checkoutBottomRef);

    const product = {
        img: 'https://images.asos-media.com/products/dr-martens-garin-sandals-in-back-brando-leather/203997482-1-black',
        title: 'Dr Martens Garin sandals in back brando leather',
        color: 'BLACK',
        size: ['S', 'M', 'L', 'XL', 'XXL', 'XXXL'],
        price: 90.99,
    };
    return (
        <>
            <section id="cart-page">
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
                        <Cart_Item product={product} />
                        <Cart_Item product={product} />
                        <Cart_Item product={product} />
                    </div>
                </div>

                <Total ref={checkoutBottomRef} />
            </section>
        </>
    );
}

export default Cart;
