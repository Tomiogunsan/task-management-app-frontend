import { Navigate, Route, Routes } from "react-router-dom";
import Users from "modules/index";
import { lazy } from "react";
import { ProjectPagePath, TeamPagePath, UsersPath } from "@constants/path";
import Members from "@modules/users/Team/Members";

import Task from "@modules/users/Project/Task";
import MemberTask from "@modules/users/Team/Members/MemberTask";
import Messages from "@modules/users/Messages";

const Team = lazy(() => import("modules/users/Team"));
const Project = lazy(() => import("modules/users/Project"));

const UsersRouter: React.FC = () => {
 
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
        <Route path={TeamPagePath.teamMemberDetails(":teamId", ":memberId", false)} element={<MemberTask />} />

        <Route path={UsersPath.PROJECT(false)} element={<Project />} />
        <Route
          path={ProjectPagePath.projectDetails(":projectId", false)}
          element={<Task />}
        />
        <Route path={UsersPath.MESSAGES(false)} element={<Messages/>} />
        <Route path="*" element={<div>hi</div>} />
      </Route>
    </Routes>
  );
};

export default UsersRouter;
