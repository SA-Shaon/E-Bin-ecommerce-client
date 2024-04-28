import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import ErrorPage from "../pages/ErrorPage";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import UserDashboard from "../pages/user/UserDashboard";
import AdminDashboard from "../pages/admin/AdminDashboard";
import PrivateRoute from "./PrivateRoute";
import AdminRoute from "./AdminRoute";
import AdminProduct from "../pages/admin/AdminProduct";
import AdminCategory from "../pages/admin/AdminCategory";
import UserProfile from "../pages/user/UserProfile";
import UserOrders from "../pages/user/UserOrders";
import AdminProducts from "../pages/admin/AdminProducts";
import AdminProductUpdate from "../pages/admin/AdminProductUpdate";
import Shop from "../pages/shop/Shop";
import Search from "../pages/Search";
import ProductView from "../pages/ProductView";
import CategoriesList from "../pages/CategoriesList";
import CategoryView from "../pages/CategoryView";
import Cart from "../pages/Cart";
import Home from "../pages/home/Home";
import AdminOrders from "../pages/admin/AdminOrders";
import Contact from "../pages/contact/Contact";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/category/:slug",
        element: <CategoryView />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/categories",
        element: <CategoriesList />,
      },
      {
        path: "/product/:slug",
        element: <ProductView />,
      },
      {
        path: "/search",
        element: <Search />,
      },
      {
        path: "/shop",
        element: <Shop />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "dashboard",
        children: [
          {
            path: "admin",
            element: (
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            ),
            children: [
              {
                path: "product",
                element: <AdminProduct />,
              },
              {
                path: "orders",
                element: <AdminOrders />,
              },
              {
                path: "product/update/:slug",
                element: <AdminProductUpdate />,
              },
              {
                path: "products",
                element: <AdminProducts />,
              },
              {
                path: "category",
                element: <AdminCategory />,
              },
            ],
          },
          {
            path: "user",
            element: (
              <PrivateRoute>
                <UserDashboard />
              </PrivateRoute>
            ),
            children: [
              {
                path: "profile",
                element: <UserProfile />,
              },
              {
                path: "orders",
                element: <UserOrders />,
              },
            ],
          },
        ],
      },
    ],
  },
]);
