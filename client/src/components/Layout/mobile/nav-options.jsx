import { useEffect, useState } from 'react';
import Nav_Banner from './nav-banner';
import Nav_Category from './nav-category';
import close from '../../../assets/icons/close.png';
import { motion } from 'framer-motion';
import { useGenderCategory } from '../../../hooks/genderCategory';
import { Box, Modal } from '@mui/material';
function Nav_Options({ sideBar, closeMenu }) {
    const [category, setCategory] = useState(true);
    const [state, dispatch] = useGenderCategory();

    useEffect(() => {
        if (state.gender == 'men') {
            setCategory(true);
        } else {
            setCategory(false);
        }
    }, [state]);

    return (
        <section>
            <Modal open={sideBar} onClose={closeMenu}>
                <Box
                    sx={{
                        display: 'flex',
                        // backgroundColor: 'white',
                        // padding: '2rem',
                        // position: 'absolute',
                        // top: '0px',
                        // outline: 'none',
                        // maxWidth: '24rem',
                        // width: '100%',
                    }}
                >
                    <nav
                        className={`menu-body z-10 h-screen w-full max-w-96 flex-[5] bg-white sm:max-w-72 sm:pb-4 md:pb-20 ${
                            sideBar && 'menu-body-open'
                        }`}
                    >
                        <div className="menu-header flex flex-row flex-nowrap items-center">
                            <button
                                className={`category-btn w-full border-b-2 py-4 text-base font-bold tracking-widest ${
                                    state.gender == 'women'
                                        ? 'border-b-black text-black'
                                        : 'border-b-transparent text-black/70'
                                }`}
                                onClick={() => dispatch({ type: 'women' })}
                            >
                                WOMEN
                            </button>
                            <div className="h-2/6 w-1 bg-light-grey"></div>
                            <button
                                className={`category-btn w-full border-b-2 py-4 text-base font-bold tracking-widest ${
                                    state.gender == 'men'
                                        ? 'border-b-black text-black'
                                        : 'border-b-transparent text-black/70'
                                }`}
                                onClick={() => dispatch({ type: 'men' })}
                            >
                                MEN
                            </button>
                        </div>
                        <section className="menu-body-wrapper">
                            <Nav_Category
                                category={category}
                                handleClick={closeMenu}
                            />
                        </section>
                    </nav>
                    <div>
                        <button className="close-btn " onClick={closeMenu}>
                            <img
                                loading="lazy"
                                src={close}
                                className="self-center"
                            />
                        </button>
                    </div>
                </Box>
            </Modal>
        </section>
    );
}

export default Nav_Options;
