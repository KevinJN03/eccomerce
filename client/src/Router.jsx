import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import Product from "./components/Product/Product_Page";
import ItemPage from "./components/ItemPage";
import About from "./components/About";
import Dashboard from "./components/dashboard/index";
import LoginSignUp from "./components/Login-SignUp/Index";
// import Footer from "./src/components/Layout/footer/footer";
function Router({Header, Footer}) {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
    },
    {
      path: "/home",
      element: <App />,
    },
    {
      path: "/product",
      element: <Product />,
    },
    {
      path: "/product/:id",
      element: <ItemPage />,
    },
    {
      path: "/about",
      element: <About />,
    },
    {
      path: "/dashboard",
      element: <Dashboard />,
    },
    {
      path: "/login",
      element: <LoginSignUp />,
    },
  ]);

  return (
    <>
    {Header}
      <RouterProvider router={router} />
      {Footer}
    </>
  );
}
export default Router;
