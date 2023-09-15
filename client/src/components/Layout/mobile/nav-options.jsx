import { useEffect, useState } from 'react';
import Nav_Banner from './nav-banner';
import Nav_Category from './nav-category';
import close from '../../../assets/icons/close.png';
import { motion } from 'framer-motion';
import { useGenderCategory } from '../../../hooks/genderCategory';
function Nav_Options({ sideBar, closeMenu }) {
    const [category, setCategory] = useState(true);
    const  [state, dispatch] = useGenderCategory()

    useEffect(()=> {
        if(state.gender == 'men'){
                setCategory(true)
        } else {
            setCategory(false)
        }
    },[state])

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
                            state.gender == 'women' && 'category-btn-active'
                        }`}
                        onClick={() => dispatch({type: 'women'})}
                    >
                        WOMEN
                    </button>
                    <div className="divider"></div>
                    <button
                        className={`category-btn w-full tracking-wider ${
                            state.gender == 'men' && 'category-btn-active'
                        }`}
                        onClick={() => dispatch({type: 'men'})}
                    >
                        MEN
                    </button>
                </div>
                <section className="menu-body-wrapper">
                    <Nav_Category category={category} handleClick={closeMenu}/>
                </section>
            </nav>
        </>
    );
}

export default Nav_Options;
