import Footer from './footer/footer';
import Header from './header';

function Layout({ children }) {
    return (
        <>
            <Header />
            {children}
            <Footer />
        </>
    );
}

export default Layout;
