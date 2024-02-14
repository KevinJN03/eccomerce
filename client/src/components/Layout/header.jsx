import logo from '../../assets/glamo.png';
import '../../CSS/App.css';
import profile from '../../assets/profile.png';
import Dropdown_Hover from '../common/dropdown/dropdown_hover';
import '../../CSS/dropdown.css';

import Header_Category from './header-category/header-category';
import { useRef, useState } from 'react';
import Mobile_Nav from './mobile/mobile-nav';
import { useGenderCategory } from '../../hooks/genderCategory.jsx';
import { Link, useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Search from './search';
import { useCart } from '../../context/cartContext';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import {
    FavoriteBorderSharp,
    LocalMallOutlined,
    LocalMall,
    PersonOutlined,
} from '@mui/icons-material';
import calculateTotal from '../common/calculateTotal.jsx';
import HeaderMenu from './headerMenu/header-menus.jsx';
import Pointer from './headerMenu/pointer.jsx';
function Header() {
    //const [activeCategory, setActiveCategory] = useState(false)
    const navigate = useNavigate();
    const [state, dispatch] = useGenderCategory();

    const { withOutShipping: subTotal } = calculateTotal();
    const { pathname } = useLocation();
    const [isHover, setIsHover] = useState('');
    const {
        cart,
        setCartLoading,
        dispatch: cartDispatch,
        setCartRefresh,
    } = useCart();
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
    const headerRef = useRef();
    const isInView = useInView(headerRef);

    return (
        <motion.section className="header-section flex w-full max-w-full flex-col justify-center">
            <section id="header-wrapper">
                <header className="header relative  flex h-[3.75rem] w-full max-w-[85.375rem] flex-row items-center justify-center self-center  !bg-primary px-4">
                    <section
                        ref={headerRef}
                        className=" relative !z-[2] flex  h-full w-full  flex-row flex-nowrap items-center justify-center self-center !bg-primary "
                    >
                        <section className="header-left">
                            <Mobile_Nav />
                            <div id="image-wrapper" className="image-wrapper">
                                <a href="/">
                                    <img
                                        loading="lazy"
                                        src={logo}
                                        alt="glamo logo"
                                        className=""
                                    />
                                </a>
                            </div>
                            <section
                                id="women"
                                onClick={() => {
                                    dispatch({ type: 'women' });
                                    navigate('/home');
                                }}
                                className={`header-category-btn ${
                                    state.gender == 'women'
                                        ? 'active-header-category'
                                        : ''
                                }`}
                            >
                                Women
                            </section>
                            <section
                                id="men"
                                onClick={() => {
                                    dispatch({ type: 'men' });
                                    navigate('/home');
                                }}
                                className={`header-category-btn ${
                                    state.gender == 'men'
                                        ? 'active-header-category'
                                        : ''
                                }`}
                            >
                                Men
                            </section>
                        </section>
                        <section className="header-middle z-[2] flex h-full flex-1 flex-row items-center  !bg-primary sm:mx-0  md:px-10 lg:px-20">
                            <Search />
                        </section>
                        <section className="header-right  relative flex h-full w-fit max-w-fit ">
                            <section className="top z-[2] flex h-full  max-w-fit items-center justify-around !bg-primary sm:gap-5 sm:pl-3 lg:gap-1">
                                <button
                                    className="header-icons relative flex h-full w-fit  items-center justify-center rounded border  border-transparent px-2 focus:border-white active:!border-white"
                                    onMouseEnter={() => {
                                        setIsHover(() => 'profile');
                                    }}
                                    onClick={(e) => {
                                        console.log(e.target.value);
                                        setIsHover((prevState) =>
                                            prevState == 'profile'
                                                ? false
                                                : 'profile'
                                        );
                                    }}
                                    // onMouseLeave={() => {
                                    //     setIsHover(() => null);
                                    // }}
                                >
                                    <PersonOutlined className="!h-9 !w-9 !fill-white" />
                                    <Pointer isHover={isHover == 'profile'} />
                                </button>
                                <Link
                                    to="/wishlist"
                                    className="header-icons flex h-full !cursor-pointer   items-center justify-center px-2"
                                >
                                    <FavoriteBorderSharp className="img-icon" />
                                </Link>
                                <button
                                    className="header-icons relative flex h-full w-fit items-center justify-center rounded border border-transparent px-2 focus:border-white active:!border-white"

                                    onMouseLeave={() => {
                                        console.log(e.target.id, 'here')
                                        // setIsHover(() => false)
                                    
                                    }}
                                    onMouseEnter={(e) => {

                                       
                                       
                                        if (pathname == '/cart') return;
                                        if (cart.length > 0) {
                                            cartDispatch({ type: 'refresh' });
                                            setCartRefresh(() => true);
                                            setIsHover(() => 'cart');
                                        }
                                    }}
                                    onClick={() => {
                                        if (pathname == '/cart') {
                                            cartDispatch({ type: 'refresh' });
                                            setCartRefresh(() => true);
                                            return;
                                        }
                                        if (cart.length > 0) {
                                            setIsHover((prevState) =>
                                                prevState == 'cart'
                                                    ? false
                                                    : 'cart'
                                            );
                                        } else {
                                            navigate('/cart');
                                        }
                                    }}

                                    // onMouseLeave={() => {
                                    //     setIsHover(() => null);
                                    // }}
                                >
                                    {cart.length == 0 ? (
                                        <LocalMallOutlined className="img-icon" />
                                    ) : (
                                        <LocalMall
                                            sx={{
                                                fillOpacity: '100%',
                                            }}
                                            className="img-icon "
                                        />
                                    )}

                                    <div
                                        className={`absolute left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%] ${
                                            cart.length > 0
                                                ? 'bg-white'
                                                : 'bg-transparent'
                                        } h-3 w-4`}
                                    ></div>

                                    <Pointer isHover={isHover == 'cart'} />
                                    <AnimatePresence>
                                        {cart.length > 0 && (
                                            <motion.span
                                                key={cart.length}
                                                variants={cartVariants}
                                                animate={'animate'}
                                                initial={'initial'}
                                                exit={'exit'}
                                                className="absolute left-0 top-1 flex h-full w-full items-center justify-center text-xxs font-medium text-black"
                                            >
                                                {cart.length}
                                            </motion.span>
                                        )}
                                    </AnimatePresence>
                                </button>
                            </section>

                            <HeaderMenu
                                isHover={isHover}
                                setIsHover={setIsHover}
                            />
                        </section>
                    </section>
                </header>

                <section id="category-wrapper" className=" relative md:hidden">
                    <Header_Category category={state.gender} />

                    {/* <HeaderMenu isHover={isHover} setIsHover={setIsHover} /> */}
                </section>
            </section>
        </motion.section>
    );
}

export default Header;
