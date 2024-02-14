import {
    AnimatePresence,
    motion,
    useMotionValueEvent,
    useScroll,
} from 'framer-motion';
import CartMenu from './cartMenu';

import Profile_Dropdown from '../../common/dropdown/profile_dropdown/Profile_Dropdown.jsx';
import { ClickAwayListener } from '@mui/material';
import { useState } from 'react';

import { v4 as uuidv4 } from 'uuid';
function HeaderMenu({ isHover, setIsHover }) {
    const [isScrollOver98, setMenuPosition] = useState('');
    const { scrollY } = useScroll();
    const variants = {
        initial: {
            translateY: '-100%',
        },
        animate: {
            translateY: '0%',

            transition: { duration: 0.4, ease: 'easeInOut' },
        },
        exit: {
            translateY: '-100%',
            transition: { duration: 0.5, ease: 'easeInOut' },
        },
    };
    useMotionValueEvent(scrollY, 'change', (latest) => {
        if (latest > 108) {
            setMenuPosition(() => true);
        } else {
            setMenuPosition(() => false);
        }
    });
    return (
        <AnimatePresence mode="wait">
            {isHover && (
                <ClickAwayListener onClickAway={() => setIsHover(() => false)}>
                    <motion.section
                        // key={isHover + uuidv4()}
                        style={{
                            y: scrollY,
                            top: isScrollOver98 ? '0%' : '100%',
                        }}
                        onMouseLeave={() => setIsHover(() => false)}
                     
                        variants={variants}
                        animate={'animate'}
                        exit={'exit'}
                        initial={'initial'}
                        className={`menus absolute right-0  mb-0 max-w-xs border border-dark-gray/50 bg-light-grey pb-0 md+lg:w-[20rem]`}
                    >
                        {isHover == 'cart' ? (
                            <CartMenu setIsHover={setIsHover}/>
                        ) : (
                            <Profile_Dropdown setIsHover={setIsHover} />
                        )}
                    </motion.section>
                </ClickAwayListener>
            )}
        </AnimatePresence>
    );
}

export default HeaderMenu;
