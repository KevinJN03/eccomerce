import { useState } from 'react';
import Nav_Banner from './nav-banner';
import Nav_Category from './nav-category';
import close from '../../../assets/icons/close.png';
import { motion } from 'framer-motion';
function Nav_Options({ sideBar, closeMenu }) {
    const [category, setCategory] = useState(true);

    return (
        <>
            {sideBar && (
                <button className="close-btn" onClick={closeMenu}>
                    <img src={close} className="self-center" />
                </button>
            )}

            <nav className={`menu-body ${sideBar && 'menu-body-open'}`}>
                <div className="menu-header">
                    <button
                        className={`category-btn w-full tracking-wider ${
                            !category && 'category-btn-active'
                        }`}
                        onClick={() => setCategory(false)}
                    >
                        WOMEN
                    </button>
                    <div className="divider"></div>
                    <button
                        className={`category-btn w-full tracking-wider ${
                            category && 'category-btn-active'
                        }`}
                        onClick={() => setCategory(true)}
                    >
                        MEN
                    </button>
                </div>
                <section className="menu-body-wrapper">
                    <Nav_Category category={category} />
                </section>
            </nav>
        </>
    );
}

export default Nav_Options;
