import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import Register from "../pages/Register";

const routes = [
  {
    path: "/login",
    component: Login,
    isPrivate: false,
  },
  {
    path: "/register",
    component: Register,
    isPrivate: false,
  },
  {
    path: "/dashboard",
    component: Dashboard,
    isPrivate: true,
  },
  {
    path: "/*",
    component: Login,
    isPrivate: false,
  },
];

export default routes;
