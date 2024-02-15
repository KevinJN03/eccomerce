import {
    FavoriteBorderSharp,
    LocalMall,
    LocalMallOutlined,
    PersonOutlined,
} from '@mui/icons-material';
import Pointer from './pointer';
import { AnimatePresence, motion } from 'framer-motion';
import HeaderMenu from './header-menus';
import { useState } from 'react';
import { useCart } from '../../../context/cartContext';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useLayoutContext } from '../../../context/layoutContext';

function HeaderRight({}) {
    const { isHover, setIsHover } = useLayoutContext();
    const navigate = useNavigate();
    const [hoveredElement, setHoveredElement] = useState(null);
    const {
        cart,
        setCartLoading,
        dispatch: cartDispatch,
        setCartRefresh,
    } = useCart();
    const { pathname } = useLocation();
    const handleMouseLeave = (e) => {
        // console.log(
        //     'leaving: ',
        //     e.target.classList.contains('ignore'),
        //     e.target
        // );
        const isLeavingOnPointer = e.target.classList.contains('pointer');

        if (!isLeavingOnPointer) {
            setIsHover(() => ({ menu: null, on: false }));
        }
    };

    const cartVariants = {
        initial: {
            y: 10,
            opacity: 0,
        },

        animate: {
            opacity: 1,
            y: 0,
            duration: 2,
        },
        exit: {
            opacity: 0,
        },
    };
    const handleCartClick = (e) => {
        if (pathname == '/cart') {
            cartDispatch({ type: 'refresh' });
            setCartRefresh(() => true);
            return;
        }

        if (cart.length > 0) {
            setIsHover((prevState) =>
                prevState?.menu == 'cart'
                    ? { on: false, menu: null }
                    : { on: true, menu: 'cart' }
            );
        } else {
            navigate('/cart');
        }
    };

    const handleCartHover = (e) => {
        // setHoveredElement(() => e.target.id);
        // console.log('entering: ', e.target.classList.contains('ignore'));
        if (pathname == '/cart') {
            return;
        }

        // else if (isHover.menu != 'cart') {
        //     setIsHover(() => ({
        //         on: true,
        //         menu: 'cart',
        //     }));
        // }

        if (cart.length > 0 && isHover.menu != 'cart') {
            console.log('refresh here', isHover.menu);

            setIsHover(() => ({
                on: true,
                menu: 'cart',
            }));
        }
    };

    return (
        <section className="header-right relative flex h-full w-fit max-w-fit ">
            <section className="top z-[2] flex h-full  max-w-fit items-center justify-around !bg-primary sm:gap-5 sm:pl-3 lg:gap-1">
                <button
                    id="profile"
                    className="header-icons relative flex h-full w-fit  items-center justify-center rounded border  border-transparent px-2 focus:border-white active:!border-white"
                    onMouseEnter={() => {
                        setIsHover(() => ({
                            on: true,
                            menu: 'profile',
                        }));
                    }}
                    onMouseLeave={handleMouseLeave}
                    onClick={(e) => {
                        setIsHover((prevState) =>
                            prevState?.menu == 'profile'
                                ? { on: false, menu: null }
                                : { on: true, menu: 'profile' }
                        );
                    }}
                >
                    <PersonOutlined className="!h-9 !w-9 !fill-white" />
                    <Pointer isHover={isHover.menu == 'profile'} />
                </button>
                <Link
                    to="/wishlist"
                    className="header-icons flex h-full !cursor-pointer   items-center justify-center px-2"
                >
                    <FavoriteBorderSharp className="img-icon" />
                </Link>

                {/* cart button */}
                <button
                    id="cart"
                    className="header-icons ignore !relative flex h-full w-fit items-center justify-center rounded border border-transparent px-2 focus:border-white active:!border-white"
                    onMouseEnter={handleCartHover}
                    onClick={handleCartClick}
                    onMouseLeave={handleMouseLeave}
                >
                    {cart.length == 0 ? (
                        <LocalMallOutlined className="img-icon ignore" />
                    ) : (
                        <LocalMall
                            sx={{
                                fillOpacity: '100%',
                            }}
                            className="img-icon ignore"
                        />
                    )}
                    <div className="ignore absolute left-0 top-0 flex h-full w-full justify-center">
                        <div
                            className={`ignore self-center ${
                                cart.length > 0 ? 'bg-white' : 'bg-transparent'
                            } h-3 w-4`}
                        />

                        <Pointer isHover={isHover.menu == 'cart'} />
                        <AnimatePresence>
                            {cart.length > 0 && (
                                <motion.div
                                    key={cart.length}
                                    variants={cartVariants}
                                    animate={'animate'}
                                    initial={'initial'}
                                    exit={'exit'}
                                    className="text-red ignore absolute !top-6 text-xxs font-medium"
                                >
                                    {cart.length}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </button>
            </section>
            <HeaderMenu />
        </section>
    );
}

export default HeaderRight;
