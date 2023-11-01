import logo from '../../assets/glamo.png';
import '../../CSS/App.css'
import basket from '../../assets/basket.png';
import profile from '../../assets/profile.png';
import FavoriteBorderSharpIcon from '@mui/icons-material/FavoriteBorderSharp';
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
import Dropdown_Hover from '../common/dropdown/dropdown_hover';
import '../../CSS/dropdown.css';
import Profile_Dropdown from '../common/dropdown/profile_dropdown';
import Header_Category from './header-category/header-category';
import { useState } from 'react';
import Mobile_Nav from './mobile/mobile-nav';
import {
    ProductsProvider,
    useGenderCategory,
} from '../../hooks/genderCategory.jsx';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Search from './search';
import { useCart } from '../../context/cartContext';
function Header() {
    //const [activeCategory, setActiveCategory] = useState(false)
    const navigate = useNavigate();
    const [state, dispatch] = useGenderCategory();
    console.log('state', state);
    const search = (e) => {
        console.log(e);
    };

    const [cart] = useCart()

    return (
        <section className="header-section flex w-full max-w-full flex-col justify-center">
            <section id="header-wrapper">
                <header className="header">
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

                    <section className="header-middle">
                       <Search/>
                    </section>

                    <section className="header-right h-full">
                        <a href="/login">
                            <Dropdown_Hover
                                button={profile}
                                dropdown_options={<Profile_Dropdown />}
                            />
                        </a>

                        <a href="/wishlist" className="header-icons !cursor-pointer">
                            <FavoriteBorderSharpIcon className="img-icon !cursor-not-allowed" />
                        </a>

                        <Link to="/cart" className="header-icons relative ">
                            <LocalMallOutlinedIcon
                                className="img-icon"
                                fontSize="large"
                            />

                           { cart.length > 0 && <span className='bg-white absolute h-0 w-0 p-[10px] flex items-center justify-center rounded-full bottom-[-8px] right-[-3px] text-s font-medium'>{cart.length}</span>}
                        </Link>
                    </section>
                </header>

                <section id="category-wrapper" className="md:hidden">
                    {/* {category == 'men' ? (
                    <Header_Category category={'men'} />
                ) : (
                    <Header_Category category={'women'} />
                )} */}
                    <Header_Category category={state.gender} />
                </section>
            </section>
        </section>
    );
}

export default Header;
