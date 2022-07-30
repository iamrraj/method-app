import { lazy } from "react";
import SLUGS from "../resources/Slug/Slug";

/* 
==========================================
 Public Router Path
==========================================
*/

const Login = lazy(() => {
  return import("../screen/Auth/login");
});

const Otp = lazy(() => {
  return import("../screen/Auth/Otp");
});
const NotFound = lazy(() => {
  return import("../screen/NotFound");
});

/* 
==========================================
 Privater Router Path
==========================================
*/

const Home = lazy(() => {
  return import("../screen/home");
});

const routesPath = {
  // Public Router Path without Authentication
  Public: [
    {
      path: SLUGS._loginPath,
      component: <Login />,
    },
    {
      path: SLUGS._otp,
      component: <Otp />,
    },
    {
      path: "*",
      component: <NotFound />,
    },
  ],
  Private: [
    {
      path: SLUGS._dashboardPath,
      component: <Home />,
    },
    {
      path: "*",
      component: <NotFound />,
    },
  ],
};

export default routesPath;
