import { Navigate, Route, Routes } from "react-router-dom";
import Users from "modules/index";
import { lazy } from "react";
import { UsersPath } from "@constants/path";

const Team = lazy(() => import("modules/users/Team"));

const UsersRouter: React.FC = () => {
  return (
    <Routes>
      <Route element={<Users />}>
        <Route path="/" element={<Navigate to={UsersPath.TEAM} replace />} />
        <Route path={UsersPath.TEAM} element={<Team />} />
      </Route>
    </Routes>
  );
};

export default UsersRouter;
