import Footer from './footer/footer';
import Header from './header';
import { useLayoutContext } from '../../context/layoutContext';
import { useContext } from 'react';
import { ProductsProvider } from '../../hooks/ScrapeData/scrape';
import { Outlet } from 'react-router-dom';
import { DarkModeContextProvider } from '../../context/darkModeContext';
import { CartProvider } from '../../context/cartContext';
function Layout() {
    const { layout } = useLayoutContext();
    console.log('layout:', layout);
    return (
        <>
            <CartProvider>
                <ProductsProvider>
                    {layout ? (
                        <>
                            <Header />

                            <main id="main">
                                {/* {children} */}
                                <Outlet />
                            </main>

                            <Footer />
                        </>
                    ) : (
                        <>
                            <Outlet />
                        </>
                    )}
                </ProductsProvider>
            </CartProvider>
        </>
    );
}

export default Layout;
