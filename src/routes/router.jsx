import { Suspense, lazy } from "react";
import Loading from "../screen/Loading/Loading";
import { Route, Navigate } from "react-router-dom";
import routesPath from "./routerPath";
import ErrorBoundary from "../screen/ErrorBoundry/Error";
import SLUGS from "../resources/Slug/Slug";
import Cookies from "universal-cookie";
import { BrowserRouter, Routes } from "react-router-dom";

const SideNav = lazy(() => {
  return import("../component/header/sidenav");
});
const PrivateHeader = lazy(() => {
  return import("../component/header/private");
});

// const Public = lazy(() => {
//   return import("../container/Layout/Header/Public");
// });
// const Footer = lazy(() => {
//   return import("../container/Layout/Footer");
// });

const cookies = new Cookies();

const isAuthenticated = cookies.get("@method_storage_access_token");

function RequireAuth({ children, redirectTo }) {
  return isAuthenticated ? children : <Navigate to={redirectTo} />;
}

function NotRequireAuth({ children, redirectTo }) {
  return isAuthenticated ? <Navigate to={redirectTo} /> : children;
}

export const PrivateRoutes = () => (
  <BrowserRouter>
    <div className="flex flex-row  ">
      <div className={` tab:w-52  w-0`}>
        <SideNav />
      </div>
      <div className="w-full  private_router">
        <PrivateHeader />
        <Suspense fallback={<Loading />}>
          <Routes>
            {routesPath.Private.map((c, i) => (
              <Route
                path={c.path}
                key={i + 1}
                element={
                  <RequireAuth redirectTo={SLUGS.login}>
                    <ErrorBoundary>{c.component}</ErrorBoundary>
                  </RequireAuth>
                }
              ></Route>
            ))}
          </Routes>
        </Suspense>
      </div>
    </div>
    {/* <Footer /> */}
  </BrowserRouter>
);

export const PublicPath = () => (
  <BrowserRouter>
    {/* <Public /> */}
    <Suspense fallback={<Loading />}>
      <Routes>
        {routesPath.Public.map((c, i) => (
          <Route
            path={c.path}
            key={i + 1}
            element={
              <NotRequireAuth redirectTo={SLUGS._dashboardPath}>
                <ErrorBoundary>{c.component}</ErrorBoundary>
              </NotRequireAuth>
            }
          ></Route>
        ))}
      </Routes>
    </Suspense>
  </BrowserRouter>
);
