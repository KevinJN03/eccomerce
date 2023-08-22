import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./src/App";
import Product from "./src/components/Product";
import ItemPage from "./src/components/ItemPage";
import About from "./src/components/About";
import Dashboard from "./src/components/dashboard/index"
import LoginSignUp from "./src/components/Login-SignUp/Index";
function Router() {
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
        element: <Dashboard/>
    },
    {
        path: "/login",
        element: <LoginSignUp/>
    }
  ]);

  return <RouterProvider router={router} />;
}
export default Router;
