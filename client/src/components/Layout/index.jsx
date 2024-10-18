import Footer from './footer/footer.jsx';
import Header from './header.jsx';
import LayoutProvider, {
    useLayoutContext,
} from '../../context/layoutContext.jsx';
import { Fragment, useContext, useRef, useState, useEffect } from 'react';
import { ProductsProvider } from '../../hooks/genderCategory.jsx';
import { Outlet, useLocation } from 'react-router-dom';
import { DarkModeContextProvider } from '../../context/darkModeContext.jsx';
import { CartProvider, useCart } from '../../context/cartContext.jsx';

import { motion, AnimatePresence } from 'framer-motion';
import variants from '../common/framerMotionVariants.jsx';
import Container from './container.jsx';
function Layout() {
    const [loading, setLoading] = useState(false);
    const { pathname } = useLocation();
    const outletRef = useRef(false);

    const { dispatch: cartDispatch } = useCart();

    const variants = {
        initial: {
            opacity: 0,
        },
        animate: {
            opacity: 1,

            transition: {
                opacity: {
                    delay: 1,
                },
            },
        },

        exit: {
            opacity: 1,

            transition: {
                opacity: {
                    duration: 0,
                },
            },
        },
    };
    const betaOutletVariant = {
        initial: {
            opacity: 0,
        },
        animate: {
            opacity: 1,
            transition: { delay: 1 },
        },
    };
    return (
        <LayoutProvider>
            <motion.section
                className="max-w-[100vw]"
                // key={layout}
                // variants={variants}
                // initial={'initial'}
                // animate={'animate'}
                // exit={'exit'}
            >
                <ProductsProvider>
                    <Container />
                </ProductsProvider>
            </motion.section>
        </LayoutProvider>
    );
}

export default Layout;
