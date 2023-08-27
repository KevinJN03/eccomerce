import logo from '../../assets/glamo.png';
import search_icon from '../../assets/search.svg';
import basket from '../../assets/basket.png';
import profile from '../../assets/profile.png';
import heart from '../../assets/heart.png';

function Header() {
    const search = (e) => {
        console.log(e);
    };
    return (
        <header className="header">
            <div id="image-wrapper" className="image-wrapper">
                <a href="/">
                    <img src={logo} alt="glamo logo" className="" />
                </a>
            </div>
            <section id="women">Women</section>
            <section id="men">Men</section>
            <section id="search-input-section">
                <input
                    type="text"
                    id="search-input"
                    onChange={search}
                    placeholder="Search for items"
                />
                <div id="search-icon-section">
                    <img src={search_icon} alt="search icon" id="search-icon" />
                </div>
            </section>

            <section id="icons-wrapper">
                <div id="header-icons" className="header-icon">
                    <img
                        src={profile}
                        alt="profile icon"
                        className="img-icon"
                    ></img>
                </div>
                <div id="header-icons" className="header-icon">
                    <img
                        src={heart}
                        alt="heart icon"
                        className="img-icon"
                    ></img>
                </div>
                <div id="header-icons" className="header-icon">
                    <img
                        src={basket}
                        alt="basket icon"
                        className="img-icon scale-200"
                    ></img>
                </div>
            </section>
        </header>
    );
}

export default Header;
