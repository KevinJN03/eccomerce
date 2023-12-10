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
import My_Orders from './components/dashboard/order/my-orders.jsx';
import Overview from './components/dashboard/Overview';
import Returns from './components/dashboard/returns';
import Details from './components/dashboard/details';
import Addresses from './components/dashboard/address/addresses.jsx';
import Contact_Preferences from './components/dashboard/contact-preferences/contact-preferences.jsx';
import Socials from './components/dashboard/socials.jsx';

import GiftCard_Home from './components/dashboard/gift-card-voucher/gift-card-and-voucher.jsx';
import GiftCard_Index from './components/dashboard/gift-card-voucher/index.jsx';
import Edit_Address from './components/dashboard/address/edit-address.jsx';
import Address_Index from './components/dashboard/address/index.jsx';
import Add_Address from './components/dashboard/address/add-address.jsx';
import Payment_Method_Index from './components/dashboard/payment-methods/index.jsx';
import Add_Payment_Method from './components/dashboard/payment-methods/add-payment-method.jsx';
import Add_Card from './components/dashboard/payment-methods/add-card.jsx';
import Payment_Method_Home from './components/dashboard/payment-methods/home.jsx';
import GiftCard_Add from './components/dashboard/gift-card-voucher/add.jsx';
import Add_GiftCard from './components/dashboard/gift-card-voucher/card.jsx';
import Add_Voucher from './components/dashboard/gift-card-voucher/voucher.jsx';
import PayPalHome from './components/dashboard/payment-methods/Paypal/paypal-home.jsx';
import Cancel_Payment from './components/dashboard/payment-methods/cancelPayment.jsx';
import Order_Success from './components/order/order-success.jsx';
import Order_Info from './components/dashboard/order/order-info.jsx';
import ForgetPassword from './components/forget-password/forget-password.jsx';
import Login from './components/Login-SignUp/Login.jsx';
import SignUp from './components/Login-SignUp/SignUp.jsx';
import ResetSent from './components/forget-password/sent.jsx';
import ResetPassword from './components/forget-password/reset.password.jsx';
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
                            path: 'orders/:id',
                            element: <Order_Info />,
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

                            children: [
                                {
                                    index: true,
                                    element: <Address_Index />,
                                },
                                {
                                    path: 'edit/:id',
                                    element: <Edit_Address />,
                                },
                                {
                                    path: 'add',
                                    element: <Add_Address />,
                                },
                            ],
                        },
                        {
                            path: 'payment-methods',

                            element: <Payment_Method_Index />,

                            children: [
                                {
                                    index: true,
                                    element: <Payment_Method_Home />,
                                },
                                {
                                    path: 'add',
                                    element: <Add_Payment_Method />,
                                    children: [
                                        {
                                            path: 'card',
                                            element: <Add_Card />,
                                        },
                                        {
                                            path: 'paypal',
                                            element: <PayPalHome />,
                                        },
                                    ],
                                },
                                {
                                    path: 'cancel',
                                    element: <Cancel_Payment />,
                                },
                            ],
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

                            element: <GiftCard_Index />,
                            children: [
                                {
                                    index: true,
                                    element: <GiftCard_Home />,
                                },
                                {
                                    path: 'add',

                                    element: <GiftCard_Add />,

                                    children: [
                                        {
                                            path: 'card',
                                            element: <Add_GiftCard />,
                                        },
                                        {
                                            path: 'voucher',
                                            element: <Add_Voucher />,
                                        },
                                    ],
                                },
                            ],
                        },
                    ],
                },
                {
                    path: '/portal',
                    // element: <LoginSignUp loginorSignup={'login'} />,
                    // index: true,
                    element: <LoginSignUp />,
                    children: [
                        {
                            // path: 'login',
                            element: <Login />,
                            index: true,
                        },
                        {
                            path: 'login',
                            element: <Login />,
                            index: true,
                        },
                        {
                            path: 'forget-password',
                            element: <ForgetPassword />,
                        },
                        {
                            path: 'signup',
                            element: <SignUp />,
                        },

                        {
                            path: 'forget-password/sent',
                            element: <ResetSent />,
                        },
                        {
                            path: 'reset-password',
                            element: <ResetPassword />,
                        },
                    ],
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
                    path: 'order-success',
                    element: <Order_Success />,
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

    return <RouterProvider router={router} />;
}
export default Router;
