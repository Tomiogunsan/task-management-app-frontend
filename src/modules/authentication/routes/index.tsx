import { AuthPaths } from "@constants/path";
import { lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

const Register = lazy(() => import('../Register/index'))
const Login = lazy(() => import('../Login/index'))
const PageNotFound = lazy(() => import('../PageNotFound/index'))

const AuthRouter = () => {
  return (
    <Routes>
      <Route path="/">
        <Route path="" element={<Navigate to={AuthPaths.REGISTER} replace />} />
        <Route path={AuthPaths.REGISTER} element={<Register />} />
        <Route path={AuthPaths.SIGNIN} element={<Login />} />
        <Route path="*" element={<PageNotFound />} />
      </Route>
    </Routes>
  );
};

export default AuthRouter;
