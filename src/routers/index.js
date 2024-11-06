import Admin from "../pages/Admin";
import Cart from "../pages/Cart";
import Collections from "../pages/Collections";
import Create from "../pages/Create";
import Home from "../pages/Home";
import Login from "../pages/Login";
import News from "../pages/News";
import Order from "../pages/Order";
import Product from "../pages/Product";
import User from "../pages/User";

const role = sessionStorage.getItem("role");

export const adminRoutes = [
  { path: "/", element: <Cart /> },
  { path: "/create", element: <Create /> },
  { path: "/login", element: <Login /> },
  { path: "/collections/:item", element: <Collections /> },
  { path: "/product/:item", element: <Product /> },
  { path: "/cart", element: <Cart /> },
  { path: "/pay", element: <Order /> },
];

export const userRoutes = [
  { path: "/", element: <Home /> },
  { path: "/create", element: <Create /> },
  { path: "/login", element: <Login /> },
  { path: "/collections/:categoryId", element: <Collections /> },
  { path: "/product/:id", element: <Product /> },
  { path: "/cart", element: <Cart /> },
  { path: "/pay", element: <Order /> },
  { path: "/user", element: <User /> },
  { path: "/admin", element: <Admin /> },
];

export const router = role === "ADMIN" ? adminRoutes : userRoutes;
