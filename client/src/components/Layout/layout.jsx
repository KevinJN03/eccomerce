import Footer from './footer/footer';
import Header from './header';
import { useLayoutContext } from '../../context/layoutContext';
import { Fragment, useContext, useRef } from 'react';
import { ProductsProvider } from '../../hooks/genderCategory.jsx';
import { Outlet, useLocation } from 'react-router-dom';
import { DarkModeContextProvider } from '../../context/darkModeContext';
import { CartProvider } from '../../context/cartContext';
import { useState, useEffect } from 'react';

import { motion, AnimatePresence } from 'framer-motion';
import variants from '../common/framerMotionVariants.jsx';
function Layout() {
    const { layout, setLayout } = useLayoutContext();

    const [loading, setLoading] = useState(false);

    const [loadState, setLoadState] = useState(true);
    const location = useLocation();
    const outletRef = useRef(false);
    useEffect(() => {
        window.scroll(0, 0);
        const splitLocation = location.pathname.split('/');
        console.log(splitLocation);
        const set = new Set([
            'portal',
            'my-account',
            'checkout',
            'admin',
            'order-success',
            'order-cancel',
            'order-cancelled',
        ]);
        if (set.has(splitLocation[1])) {
            console.log('true');

            if (layout) {
                outletRef.current = false;
                setLoadState(() => true);
            }

            setLayout(() => false);
            setTimeout(() => {
                setLoadState(() => false);
                outletRef.current = true;
            }, 1000);
        } else {
            if (!layout) {
                setLoadState(() => true);
            }
            setLayout(() => true);
            // setLoadState(() => false);
            setTimeout(() => {
                setLoadState(() => false);
                outletRef.current = true;
            }, 1000);
        }
    }, [location?.pathname]);

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
        <CartProvider>
            <ProductsProvider>
                <AnimatePresence mode="wait">
                    {!loadState && (
                        <motion.section
                            className="w-screen"
                            // key={layout}
                            // variants={variants}
                            // initial={'initial'}
                            // animate={'animate'}
                            // exit={'exit'}
                        >
                            {
                                <>
                                    {layout && <Header />}
                                    <AnimatePresence>
                                        <motion.main
                                            // variants={betaOutletVariant}
                                            // initial={'initial'}
                                            // animate={'animate'}
                                            // exit={'exit'}
                                            id="main"
                                        >
                                            {!loadState && <Outlet />}
                                        </motion.main>
                                    </AnimatePresence>

                                    {layout && <Footer />}
                                </>
                            }
                        </motion.section>
                    )}
                </AnimatePresence>
            </ProductsProvider>
        </CartProvider>
    );
}

export default Layout;
