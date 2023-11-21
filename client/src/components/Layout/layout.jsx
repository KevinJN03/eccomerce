import Footer from './footer/footer';
import Header from './header';
import { useLayoutContext } from '../../context/layoutContext';
import { Fragment, useContext } from 'react';
import { ProductsProvider } from '../../hooks/genderCategory.jsx';
import { Outlet, useLocation } from 'react-router-dom';
import { DarkModeContextProvider } from '../../context/darkModeContext';
import { CartProvider } from '../../context/cartContext';
import { useState, useEffect } from 'react';

import { motion, AnimatePresence } from 'framer-motion';
import variants from '../common/framerMotionVariants.jsx';
function Layout() {
    const { layout } = useLayoutContext();
    console.log('layout:', layout);
    const [loading, setLoading] = useState(false);
    const location = useLocation();
    // useEffect(() => {
    //     let timout = setTimeout(() => {
    //         setLoading(false);
    //     }, 1500);

    //     return () => {
    //         setLoading(true);
    //         clearTimeout(timout);
    //     };
    // }, []);
    function Loader() {
        return <span className="loading loading-infinity loading-lg"></span>;
    }

    const outletVariants = {
        initial: {
            opacity: 1,
            y: 50,
        },
        animate: {
            opacity: 1,
            y: 0,

            transition: { duration: 0.5 },
        },

        exit: {
            opacity: 0,
            // y: -0,
            transition: { duration: 0.5 },
        },
    };
    return (
        <CartProvider>
            <ProductsProvider>
                <AnimatePresence>
                    {layout && (
                        <motion.section
                            className={'w-full'}
                            // variants={variants}
                            // initial={'initial'}
                            // animate={'animate'}
                            exit={'exit'}
                        >
                            <Header />

                            <main id="main">
                                {/* {children} */}
                                {loading ? <Loader /> : <Outlet />}
                            </main>

                            <Footer />
                        </motion.section>
                    )}{' '}
                    {!layout && (
                        <motion.section
                            // key={layout}
                            className={'w-full'}
                            variants={outletVariants}
                            initial={'initial'}
                            animate={'animate'}
                            exit={'exit'}
                        >
                            {loading ? <Loader /> : <Outlet />}
                        </motion.section>
                    )}
                </AnimatePresence>
            </ProductsProvider>
        </CartProvider>
    );
}

export default Layout;
