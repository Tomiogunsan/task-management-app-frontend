import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

import { Suspense } from "react";
import { Toaster } from "react-hot-toast";

import BaseRoutes from "constants/baseRoutes";
import PrivateRoute from "routes/privateRoute";
import Loader from "shared/Loader";
import PageNotFound from "@modules/authentication/PageNotFound";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        {BaseRoutes.map(({ path, Layout, useAuth, component: Component }) =>
          Layout && useAuth ? (
            <Route
              key={path}
              path={path}
              element={
                <PrivateRoute>
                  <Layout key={path}>
                    <Component />
                  </Layout>
                </PrivateRoute>
              }
            />
          ) : (
            <Route key={path} path={path} element={<Component />} />
          )
        )}

        <Route path="pageNotFound" element={<PageNotFound />} />
      </>
    )
  );
  return (
    <Suspense fallback={<Loader />}>
      <RouterProvider router={router} />
      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: "8px" }}
        containerClassName="!z-[999999999999]"
        toastOptions={{
          success: {
            duration: 3000,
          },
          error: {
            duration: 5000,
          },
          style: {
            fontSize: "16px",
            maxWidth: "500px",
            padding: "16px 24px",
          },
        }}
      />
    </Suspense>
  );
}

export default App;
