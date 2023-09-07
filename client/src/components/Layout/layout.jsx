import Footer from './footer/footer';
import Header from './header';
import { useLayoutContext } from '../../context/layoutContext';
import { useContext } from 'react';
function Layout({ children }) {
    const { layout } = useLayoutContext();
    console.log('layout:', layout);
    return (
        <>
            {layout ? (
                <>
                    <Header />
                    {children}
                    <Footer />
                </>
            ) : (
                <>{children}</>
            )}
        </>
    );
}

export default Layout;
