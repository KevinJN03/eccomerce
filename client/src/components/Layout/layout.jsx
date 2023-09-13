import Footer from './footer/footer';
import Header from './header';
import { useLayoutContext } from '../../context/layoutContext';
import { useContext } from 'react';
import { ProductsProvider } from '../../hooks/ScrapeData/scrape';
import { Outlet } from 'react-router-dom';
import { DarkModeContextProvider } from '../../context/darkModeContext';
import { CartProvider } from '../../context/cartContext';
import { useState, useEffect } from 'react';
function Layout() {
    const { layout } = useLayoutContext();
    console.log('layout:', layout);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let timout = setTimeout(() => {
            setLoading(false);
        }, 1500);

        return () => {
            setLoading(true);
            clearTimeout(timout)
        };
    },[]);
    function Loader() {
        return <span className="loading loading-infinity loading-lg"></span>;
    }
    return (
        <>
            <CartProvider>
                <ProductsProvider>
                    {layout ? (
                        <>
                            <Header />

                            <main id="main">
                                {/* {children} */}
                               {loading ? <Loader/> : <Outlet />} 
                            </main>

                            <Footer />
                        </>
                    ) : (
                        <>
                             {loading ? <Loader/> : <Outlet />} 
                        </>
                    )}
                </ProductsProvider>
            </CartProvider>
        </>
    );
}

export default Layout;
