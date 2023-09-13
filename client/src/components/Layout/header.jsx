import logo from '../../assets/glamo.png';
import search_icon from '../../assets/search.svg';
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
import { ProductsProvider, useProducts } from '../../hooks/ScrapeData/scrape';
import { useNavigate } from 'react-router-dom';
function Header() {

    //const [activeCategory, setActiveCategory] = useState(false)
    const navigate = useNavigate();
    const [state, dispatch] = useProducts();
    console.log("state", state)
    const search = (e) => {
        console.log(e);
    };

    return (
        <section className="header-section flex w-full max-w-full flex-col justify-center bg-[var(--primary)]">
            <section id="header-wrapper">
                <header className="header">
                    <section className="header-left">
                        <Mobile_Nav />
                        <div id="image-wrapper" className="image-wrapper">
                            <a href="/">
                                <img src={logo} alt="glamo logo" className="" />
                            </a>
                        </div>
                        <section
                            id="women"
                            onClick={() =>{ 
                                dispatch({type: 'women'});
                                navigate('/home')
                        }}
                            className={`header-category-btn ${
                                state.category=='women' ? 'active-header-category' : ''
                            }`}
                        >
                            Women
                        </section>
                        <section
                            id="men"
                            onClick={() => {dispatch({type: 'men'})
                            navigate('/home')}}
                            className={`header-category-btn ${
                                state.category=='men' ? 'active-header-category' : ''
                            }`}
                        >
                            Men
                        </section>
                    </section>

                    <section className="header-middle">
                        <input
                            type="text"
                            id="search-input"
                            onChange={search}
                            placeholder="Search for items"
                        />
                        <div id="search-icon-section">
                            <img
                                src={search_icon}
                                alt="search icon"
                                id="search-icon"
                            />
                        </div>
                    </section>

                    <section className="header-right h-full">
                        <a href="/login">
                            <Dropdown_Hover
                                button={profile}
                                dropdown_options={<Profile_Dropdown />}
                            />
                        </a>

                        <a href="/wishlist" className="header-icons">
                            {/* <img
                                    src={heart}
                                    alt="heart icon"
                                    className="img-icon p-1"
                                ></img> */}
                            <FavoriteBorderSharpIcon className="img-icon" />
                        </a>

                        <a href="/cart" className="header-icons">
                            {/* <img
                                    src={basket}
                                    alt="basket icon"
                                    className="img-icon "
                                ></img> */}
                            <LocalMallOutlinedIcon
                                className="img-icon"
                                fontSize="large"
                            />
                        </a>
                    </section>
                </header>

                <section id="category-wrapper" className="md:hidden">
                    {/* {category == 'men' ? (
                    <Header_Category category={'men'} />
                ) : (
                    <Header_Category category={'women'} />
                )} */}
                    <Header_Category category={state.category} />
                </section>
            </section>
        </section>
    );
}

export default Header;
