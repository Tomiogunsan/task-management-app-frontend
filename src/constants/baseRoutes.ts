import { lazy } from "react";
import { BasePaths } from "./path";
import RootLayout from "@components/Layout/RootLayout";

const BaseRoutes = [
  {
    path: "/*",
    exact: true,
    component: lazy(() => import("modules/authentication/routes")),
    Layout: null,
    useAuth: false,
  },
  {
    path: `${BasePaths.USER}/*`,
    exact: true,
    component: lazy(() => import("../routes/index")),
    Layout: RootLayout,
    useAuth: true,
  },
];


export default BaseRoutes;