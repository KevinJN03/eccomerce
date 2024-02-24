import {
    AnimatePresence,
    motion,
    useMotionValueEvent,
    useScroll,
} from 'framer-motion';
import CartMenu from './cartMenu.jsx';
import { v4 as uuidv4 } from 'uuid';
import Profile_Dropdown from '../../common/dropdown/profile_dropdown/Profile_Dropdown.jsx';
import { ClickAwayListener } from '@mui/material';
import { forwardRef, useEffect, useState } from 'react';
import { useLayoutContext } from '../../../context/layoutContext.jsx';
function HeaderMenu({}) {
    const [isScrollOver98, setMenuPosition] = useState(false);
    const { isHover, setIsHover } = useLayoutContext();

    const [pageHeight, setPageHeight] = useState('');
    const variants = {
        initial: {
             y: '-100%',
        },
        animate: {
            y: '0%',

            transition: {
                duration: 0.6,
            },
        },
        exit: {
            translateY: '-100%',
            transition: { duration: 0.7 },
        },
    };

    useEffect(() => {
        const currentPageHeight = document.getElementById('root').clientHeight;
        console.log(currentPageHeight);
        setPageHeight(() => currentPageHeight);
    });
    return (
        <section
            style={{
                height: `${pageHeight - 60}px`,
            }}
            className={`  !absolute !right-0 !top-full !z-0 min-h-full`}
        >
            <AnimatePresence >
                {isHover.on && (
                    <motion.section
                        id="header-menu"
                        // key={uuidv4()}
                        onMouseLeave={() =>
                            setIsHover(() => ({ menu: null, on: false }))
                        }
                        onMouseEnter={() => {
                            setIsHover(({ timeout, ...rest }) => {
                                if (timeout) {
                                    clearTimeout(timeout);
                                }
                                return { ...rest };
                            });
                        }}
                        variants={variants}
                        animate={'animate'}
                        exit={'exit'}
                        initial={'initial'}
                        className={`menus sticky top-0   mb-0 max-w-xs border border-dark-gray/50 bg-light-grey pb-0 md+lg:w-[20rem]`}
                    >
                        <AnimatePresence >
                            {isHover.menu == 'cart' && (
                                <CartMenu
                                    key={'cart-menu'}
                                    setIsHover={setIsHover}
                                    isHover={isHover}
                                />
                            )}
                            {isHover.menu == 'profile' && (
                                <Profile_Dropdown
                                    key={'profile-dropdown'}
                                    setIsHover={setIsHover}
                                />
                            )}
                        </AnimatePresence>
                    </motion.section>
                )}
            </AnimatePresence>
        </section>
    );
}

export default HeaderMenu;
