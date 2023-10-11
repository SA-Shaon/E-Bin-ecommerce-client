import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import ErrorPage from "../pages/ErrorPage";
import Home from "../pages/Home";
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
