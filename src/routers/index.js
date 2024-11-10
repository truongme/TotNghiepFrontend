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

export const adminRoutes = [
  { path: "/", element: <DashBoard /> },
  { path: "/product/:id", element: <ProductAdmin/>},
  { path: "/login", element: <Login /> },
  { path: "/productManagement", element: <ProductManagement /> },
  { path: "/orderManagement", element: <OrderManagement /> },
];

export const userRoutes = [
  { path: "/", element: <Home /> },
  { path: "/login", element: <Login /> },
  { path: "/collections/:categoryId", element: <Collections /> },
  { path: "/product/:id", element: <Product /> },
  { path: "/cart", element: <Cart /> },
  { path: "/pay", element: <Order /> },
  { path: "/user", element: <User /> },
];
