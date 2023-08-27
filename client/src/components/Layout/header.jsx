import logo from '../../assets/glamo.png';
import search_icon from '../../assets/search.svg';
import basket from '../../assets/basket.png';
import profile from '../../assets/profile.png';
import heart from '../../assets/heart.png';
import Dropdown_Hover from '../common/dropdown/dropdown_hover';
import '../../CSS/dropdown.css';
import Profile_Dropdown from '../common/dropdown/profile_dropdown';
import Header_Category from './header-category/header-category';
import { useState } from 'react';
function Header() {
    const [category, setCategory] = useState('men');
    //const [activeCategory, setActiveCategory] = useState(false)

    const search = (e) => {
        console.log(e);
    };

    const profile_options = [
        <div className="signin-signup-btn-container flex w-full flex-row gap-3 border-b-2 border-black pb-3">
            <a
                href="/login"
                type="button"
                className="profile_dropdown bg-white text-black"
            >
                Sign In
            </a>
            <a
                href="/signup"
                type="button"
                className="profile_dropdown bg-black text-white"
            >
                Sign Up
            </a>
        </div>,
    ];
    return (
        <>
            <header className="header">
                <div id="image-wrapper" className="image-wrapper">
                    <a href="/">
                        <img src={logo} alt="glamo logo" className="" />
                    </a>
                </div>
                <section
                    id="women"
                    onClick={() => setCategory('women')}
                    className={
                        category == 'women' ? 'active-header-category' : null
                    }
                >
                    Women
                </section>
                <section
                    id="men"
                    onClick={() => setCategory('men')}
                    className={
                        category == 'men' ? 'active-header-category' : null
                    }
                >
                    Men
                </section>
                <section id="search-input-section">
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

                <section id="icons-wrapper" className="h-full">
                    <Dropdown_Hover
                        button={profile}
                        dropdown_options={<Profile_Dropdown />}
                    />

                    <div className="header-icon">
                        <a href="/wishlist" className="h-full w-full">
                            <img
                                src={heart}
                                alt="heart icon"
                                className="img-icon"
                            ></img>
                        </a>
                    </div>
                    <div className="header-icon">
                        <a href="/cart" className="h-full w-full">
                            <img
                                src={basket}
                                alt="basket icon"
                                className="img-icon "
                            ></img>
                        </a>
                    </div>
                </section>
            </header>
            {category=="men" ? (<Header_Category category={"men"}/>) : (<Header_Category category={"women"}/>)}
            
        </>
    );
}

export default Header;
