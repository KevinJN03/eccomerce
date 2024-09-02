import logo from '../../assets/glamo.png';
import '../../CSS/App.css';

import '../../CSS/dropdown.css';

import Header_Category from './header-category/header-category';
import { useRef, useState } from 'react';
import Mobile_Nav from './mobile/mobile-nav';
import { useGenderCategory } from '../../hooks/genderCategory.jsx';
import { Link, useLocation, useNavigate } from 'react-router-dom';
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
import { useHover } from '@uidotdev/usehooks';
import HeaderRight from './headerMenu/headerRight.jsx';
function Header() {
    //const [activeCategory, setActiveCategory] = useState(false)
    const navigate = useNavigate();
    const [state, dispatch] = useGenderCategory();

    return (
        <section className="header-section flex w-full max-w-full flex-col justify-center">
            <section id="header-wrapper">
                <header className="header relative  flex h-[3.75rem] w-full max-w-[85.375rem] flex-row items-center justify-center self-center  !bg-primary px-4">
                    <section className=" relative !z-[2] flex  h-full w-full  flex-row flex-nowrap items-center justify-center self-center !bg-primary ">
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
                        <HeaderRight />
                    </section>
                </header>

                <section
                    id="category-wrapper"
                    className=" relative flex    min-w-full justify-center !bg-primary-2 outline-4 md:hidden "
                >
                    <section className="relative flex w-full max-w-[85.375rem] justify-between">
                        <Header_Category category={state.gender} />
                    </section>
                </section>
            </section>
        </section>
    );
}

export default Header;
