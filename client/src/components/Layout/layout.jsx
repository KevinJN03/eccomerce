import Footer from './footer/footer';
import Header from './header';
import { useLayoutContext } from '../../context/layoutContext';
import { Fragment, useContext, useRef, useState, useEffect } from 'react';
import { ProductsProvider } from '../../hooks/genderCategory.jsx';
import { Outlet, useLocation } from 'react-router-dom';
import { DarkModeContextProvider } from '../../context/darkModeContext';
import { CartProvider, useCart } from '../../context/cartContext';

import { motion, AnimatePresence } from 'framer-motion';
import variants from '../common/framerMotionVariants.jsx';
function Layout() {
    const { layout, setLayout } = useLayoutContext();

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
        <motion.section
            className="max-w-[100vw]"
            // key={layout}
            // variants={variants}
            // initial={'initial'}
            // animate={'animate'}
            // exit={'exit'}
        >
            <ProductsProvider>
                {layout && <Header />}
                <main
                    // variants={betaOutletVariant}
                    // initial={'initial'}
                    // animate={'animate'}
                    // exit={'exit'}
                    id="main"
                    className="lg:min-h-[calc(100vh_-_(6.75rem+3.75rem+19rem))] max-h-lg:min-h-[calc(100vh_-_(6.75rem+3.75rem))]"
                >
                    {/* {!loadState && <Outlet />} */}
                    <Outlet />
                </main>
                {layout && <Footer />}{' '}
            </ProductsProvider>
        </motion.section>
    );
}

export default Layout;
