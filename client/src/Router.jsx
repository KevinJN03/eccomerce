import {
    createBrowserRouter,
    RouterProvider,
    useRoutes,
} from 'react-router-dom';

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
import Error from './components/error/error';
import Layout from './components/Layout/layout';
import Delivery from './components/admin/delivery/delivery';
import { NewProductProvider } from './context/newProductContext';
import AdminLogin from './components/admin/home/AdminLogin';
import My_Orders from './components/dashboard/my-orders';
import Overview from './components/dashboard/Overview';
import Returns from './components/dashboard/returns';
import Details from './components/dashboard/details';
import Addresses from './components/dashboard/addresses';
import Payment_Methods from './components/dashboard/payment-methods.jsx';
import Contact_Preferences from './components/dashboard/contact-preferences.jsx';
import Socials from './components/dashboard/socials.jsx';

import GiftCard_Voucher from './components/dashboard/gift-card-and-voucher.jsx';
function Router({ Header, Footer }) {
    const productRoutes = () => {
        const paths = ['/men/:category', '/women/:category'];
        let allPaths = paths.map((path) => [
            {
                path: path,
                element: <Product />,
            },
            {
                path: `${path}/:id`,
                element: <ItemPage />,
            },
        ]);

        return allPaths;
    };
    const router = createBrowserRouter([
        {
            element: <Layout />,
            errorElement: <Error />,

            children: [
                {
                    path: '/',
                    element: <Home />,
                },
                {
                    path: '/home',
                    element: <Home />,
                },

                ...productRoutes()[0],
                ...productRoutes()[1],

                {
                    path: `/product/:id`,
                    element: <ItemPage />,
                },
                {
                    path: '/about',
                    element: <About />,
                },
                {
                    path: '/my-account',
                    element: <Dashboard />,

                    children: [
                        { index: true, element: <Overview /> },
                        {
                            path: 'orders',

                            element: <My_Orders />,
                        },
                        {
                            path: 'returns',

                            element: <Returns />,
                        },
                        {
                            path: 'my-details',

                            element: <Details />,
                        },
                        {
                            path: 'addresses',

                            element: <Addresses />,
                        },
                        {
                            path: 'payment-methods',

                            element: <Payment_Methods />,
                        },
                        {
                            path: 'contact-preferences',

                            element: <Contact_Preferences />,
                        },
                        {
                            path: 'social-accounts',

                            element: <Socials />,
                        },
                        {
                            path: 'gift-cards-and-vouchers',

                            element: <GiftCard_Voucher />,
                        },
                    ],
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
                            // element: <AdminLogin/>
                            element: <Admin_Dashboard />,
                        },

                        { path: 'login', element: <AdminLogin /> },
                        {
                            path: 'dashboard/',
                            element: <Admin_Dashboard />,
                        },
                        {
                            path: 'delivery/',
                            element: <Delivery />,
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
                                    path: ':id/',
                                    element: <Single_User />,
                                },
                                {
                                    path: 'new',
                                    element: (
                                        <New type="new" title="Add New User" />
                                    ),
                                },
                                {
                                    path: ':id/edit',
                                    element: (
                                        <New type="edit" title="Edit User" />
                                    ),
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
                                    element: (
                                        <NewProductProvider>
                                            <New_Product />
                                        </NewProductProvider>
                                    ),
                                },

                                {
                                    path: 'edit/:id',
                                    element: <Product_Single />,
                                },
                            ],
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
