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
import { forwardRef, useState } from 'react';
function HeaderMenu({ isHover, setIsHover }) {
    const [isScrollOver98, setMenuPosition] = useState(false);

    const variants = {
        initial: {
            y: '-100%',
        },
        animate: {
            y: '0%',

            transition: {
                duration: 0.4,
            },
        },
        exit: {
            translateY: '-100%',
            transition: { duration: 0.5 },
        },
    };
    return (
        <section className="  !absolute !right-0 !top-full">
            <AnimatePresence mode='wait'>
                {isHover.on && (
                    <motion.section
                        id="header-menu"
                        // onMouseLeave={() =>
                        //     setIsHover(() => ({ menu: null, on: false }))
                        // }
                        variants={variants}
                        animate={'animate'}
                        exit={'exit'}
                        initial={'initial'}
                        className={`menus   mb-0 max-w-xs border border-dark-gray/50 bg-light-grey pb-0 md+lg:w-[20rem]`}
                    >
                        <motion.div key={uuidv4()}>
                            {isHover.menu == 'cart' && (
                                <CartMenu setIsHover={setIsHover} isHover={isHover} />
                            )}

                            {isHover.menu == 'profile' && (
                                <Profile_Dropdown setIsHover={setIsHover} />
                            )}
                        </motion.div>
                    </motion.section>
                )}
            </AnimatePresence>
        </section>
    );
}

export default HeaderMenu;
