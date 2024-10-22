import { Navigate, Route, Routes } from "react-router-dom";
import Users from "modules/index";
import { lazy } from "react";
import { TeamPagePath, UsersPath } from "@constants/path";
import Members from "@modules/users/Team/Members";

const Team = lazy(() => import("modules/users/Team"));
const Project = lazy(() => import("modules/users/Project"));

const UsersRouter: React.FC = () => {
  console.log(TeamPagePath.teamDetails(":teamId"));
  return (
    <Routes>
      <Route element={<Users />}>
        <Route
          path="/"
          element={<Navigate to={UsersPath.TEAM(false)} replace />}
        />
        <Route path={UsersPath.TEAM(false)} element={<Team />} />
        <Route
          path={TeamPagePath.teamDetails(":teamId", false)}
          element={<Members />}
        />
        <Route path={UsersPath.PROJECT(false)} element={<Project />} />
        <Route path="*" element={<div>hi</div>} />
      </Route>
    </Routes>
  );
};

export default UsersRouter;
