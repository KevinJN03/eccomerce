import Footer from './footer/footer.jsx';
import Header from './header.jsx';
import { useLayoutContext } from '../../context/layoutContext.jsx';
import { Fragment } from 'react';
import { Outlet } from 'react-router-dom';

function Container() {
    const { layout, setLayout } = useLayoutContext();

    return (
        <Fragment>
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
            {layout && <Footer />}
        </Fragment>
    );
}

export default Container;
