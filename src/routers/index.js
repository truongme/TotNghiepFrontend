import Cart from "../pages/Cart";
import Collections from "../pages/Collections";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Order from "../pages/Order";
import Product from "../pages/Product";
import User from "../pages/User";
import ProductManagement from "../pages/ProductManagement";
import OrderManagement from "../pages/OrderManagement";
import DashBoard from "../pages/Dashboard";
import ProductAdmin from "../pages/ProductEdit";
import Signup from "../pages/Signup";
import ForgetPassword from "../pages/ForgetPassword";

export const adminRoutes = [
  { path: "/", element: <DashBoard /> },
  { path: "/product/:id", element: <ProductAdmin /> },
  { path: "/login", element: <Login /> },
  { path: "/productManagement", element: <ProductManagement /> },
  { path: "/orderManagement", element: <OrderManagement /> },
];

export const userRoutes = [
  { path: "/", element: <Home /> },
  { path: "/reset-password", element: <ForgetPassword /> },
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <Signup /> },
  { path: "/collections/:categoryId", element: <Collections /> },
  { path: "/product/:id", element: <Product /> },
  { path: "/cart", element: <Cart /> },
  { path: "/pay", element: <Order /> },
  { path: "/user", element: <User /> },
];
