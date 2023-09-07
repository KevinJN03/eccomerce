import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import Product from './components/Product/Product_Page';
import ItemPage from './components/Item_page/ItemPage';
import About from './components/miscellaneos/About';
import Dashboard from './components/dashboard/index';
import LoginSignUp from './components/Login-SignUp/Index';
import Home from './components/home/Home';
import Cart from './components/cart';
import Checkout from './components/checkout';
import Admin from './components/admin/home';
import List from './components/admin/components/users/list';
import Admin_Dashboard from './components/admin/home/admin_dashboard';
import Single_User from './components/admin/components/users/single/single';
import Users from './components/admin/components/users/users';
import New from './components/admin/components/new/new';
import Admin_Product from './components/admin/components/product/admin_product';
import All_Products from './components/admin/components/product/all_product';
import Product_Single from './components/admin/components/product/product single page/product_single';
import New_Product from './components/admin/components/product/new product/new_product';
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

        {
            path: '/admin',
            element: <Admin />,

            children: [
                {
                    index: true,
                    element: <Admin_Dashboard />,
                },
                {
                    path: 'users/',

                    element: <Users />,

                    children: [
                        {
                            index: true,
                            element: <List />,
                        },
                        {
                            path: ':id',
                            element: <Single_User />,
                        },
                        {
                            path: 'new',
                            element: <New type="User" title="Add New User" />,
                        },
                    ],
                },
                {
                    path: 'products/',
                    element: <Admin_Product />,

                    children: [
                        {
                            index: true,
                            element: <All_Products />,
                        },
                        {
                            path: 'new',
                            // element: <New type="Product" title="Add New Product"/>
                            element: <New_Product />,
                        },

                        {
                            path: ':id',
                            element: <Product_Single />,
                        },
                    ],
                },
            ],
        },
    ]);

    return (
        <>
            <RouterProvider router={router} />
        </>
    );
}
export default Router;
