import Cart from "../pages/Cart";
import Collections from "../pages/Collections";
import Home from "../pages/Home";
import Login from "../pages/Login";
import News from "../pages/News";
import Order from "../pages/Order";
import Product from "../pages/Product";
import User from "../pages/User";

const role = localStorage.getItem("role");

export const adminRoutes = [
  { path: "/", element: <Cart /> },
  { path: "/news", element: <News /> },
  { path: "/login", element: <Login /> },
  { path: "/collections/:item", element: <Collections /> },
  { path: "/product/:item", element: <Product /> },
  { path: "/cart", element: <Cart /> },
  { path: "/pay", element: <Order /> },
];

export const userRoutes = [
  { path: "/", element: <Home /> },
  { path: "/news", element: <News /> },
  { path: "/login", element: <Login /> },
  { path: "/collections/:categoryId", element: <Collections /> },
  { path: "/product/:id", element: <Product /> },
  { path: "/cart", element: <Cart /> },
  { path: "/pay", element: <Order /> },
  { path: "/user", element: <User /> },
];

export const router = role === "ADMIN" ? adminRoutes : userRoutes;
