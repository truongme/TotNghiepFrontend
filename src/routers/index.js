import Collections from "../pages/Collections";
import Home from "../pages/Home";
import Login from "../pages/Login";
import News from "../pages/News";

export const router = [
  { path: "/", element: <Home /> },
  { path: "/news", element: <News /> },
  { path: "/login", element: <Login /> },
  { path: "/collections/:item", element: <Collections /> },
];
