import { Navigate, Route, Routes } from "react-router-dom";
import Users from "modules/index";
import { lazy } from "react";
import { TeamPagePath, UsersPath } from "@constants/path";
import Members from "@modules/users/Members";

const Team = lazy(() => import("modules/users/Team"));

const UsersRouter: React.FC = () => {
  return (
    <Routes>
      <Route element={<Users />}>
        <Route path="/" element={<Navigate to={UsersPath.TEAM} replace />} />
        <Route path={UsersPath.TEAM} element={<Team />} />
        <Route path={TeamPagePath.id(":teamId")} element={<Members/>} />
      </Route>
    </Routes>
  );
};

export default UsersRouter;
