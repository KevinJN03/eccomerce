import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import Product from './components/Product/Product_Page';
import ItemPage from './components/Item_page/ItemPage';
import About from './components/miscellaneos/About';
import Dashboard from './components/dashboard/index';
import LoginSignUp from './components/Login-SignUp/Index';
import Layout from './components/Layout/layout';
import Home from './components/home/Home';
import Cart from './components/cart';
import Checkout from './components/checkout';
// import Footer from "./src/components/Layout/footer/footer";
function Router({ Header, Footer }) {
    const router = createBrowserRouter([
        {
            path: '/',
            element: <Home />,
        },
        {
            path: '/home',
            element: <Home />,
        },
        {
            path: '/product',
            element: <Product />,
        },
        {
            path: '/product/:id',
            element: <ItemPage />,
        },
        {
            path: '/about',
            element: <About />,
        },
        {
            path: '/dashboard',
            element: <Dashboard />,
        },
        {
            path: '/login',
            element: <LoginSignUp loginorSignup={'login'} />,
        },
        {
            path: '/signup',
            element: <LoginSignUp loginorSignup={'signup'} />,
        },
        {
            path: '/cart',
            element: <Cart />,
        },
        {
            path: '/checkout',
            element: <Checkout />,
        },
    ]);

    return (
        <>
            <RouterProvider router={router} />
        </>
    );
}
export default Router;
