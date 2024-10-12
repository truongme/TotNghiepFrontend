import Cart from "../pages/Cart";
import Collections from "../pages/Collections";
import Home from "../pages/Home";
import Login from "../pages/Login";
import News from "../pages/News";
import Pay from "../pages/Pay";
import Product from "../pages/Product";

export const router = [
  { path: "/", element: <Home /> },
  { path: "/news", element: <News /> },
  { path: "/login", element: <Login /> },
  { path: "/collections/:item", element: <Collections /> },
  { path: "/product/:item", element: <Product /> },
  { path: "/cart", element: <Cart /> },
  { path: "/pay", element: <Pay /> },
];
