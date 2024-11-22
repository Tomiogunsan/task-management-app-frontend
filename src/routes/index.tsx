import { Navigate, Route, Routes } from "react-router-dom";
import Users from "modules/index";
import { lazy } from "react";
import {
  AuthPaths,
  ProjectPagePath,
  TeamPagePath,
  UsersPath,
} from "@constants/path";
import Members from "@modules/users/Team/Members";

import Task from "@modules/users/Project/Task";

import Messages from "@modules/users/Messages";
import { getDecodedJwt } from "helpers/auth";
import { AppAllowedRoles, IAppAllowedRoles } from "interface";
import { ADMIN, TEAM_MEMBER } from "@constants/roles";
import { getAppAdminRole } from "helpers/userRole";
import AdminMemberTask from "@modules/users/Team/Members/MemberTask";
import TeamMemberTask from "@modules/users/TeamMember/Task";

const Team = lazy(() => import("modules/users/Team"));
const Project = lazy(() => import("modules/users/Project"));

const UsersRouter: React.FC = () => {
  const user = getDecodedJwt();

  const userRole = getAppAdminRole(user?.user?.role);

  const renderByRole = (
    roleComponent: Partial<{ [role in IAppAllowedRoles]: JSX.Element }>
  ) => {
    if (AppAllowedRoles.includes(userRole as IAppAllowedRoles)) {
      if (roleComponent[userRole as IAppAllowedRoles]) {
        return roleComponent[userRole as IAppAllowedRoles];
      }
    }
    return <Navigate to={AuthPaths.SIGNIN} replace />;
  };

  const getLandingPage = (role: IAppAllowedRoles) => {
    switch (role) {
      case ADMIN:
        return UsersPath.TEAM(false);
      case TEAM_MEMBER:
        return UsersPath.TEAM_MEMBER_TASK(false);

      default:
        // logOut()
        return "";
    }
  };

  return (
    <Routes>
      <Route element={<Users />}>
        <Route
          path="/"
          element={
            <Navigate
              to={getLandingPage(userRole as IAppAllowedRoles)}
              replace
            />
          }
        />

        <Route
          path={UsersPath.TEAM(false)}
          element={renderByRole({
            [ADMIN]: <Team />,
            [TEAM_MEMBER]: <TeamMemberTask />,
          })}
        />

        <Route
          path={TeamPagePath.teamDetails(":teamId", false)}
          element={renderByRole({ [ADMIN]: <Members /> })}
        />
        <Route
          path={TeamPagePath.teamMemberDetails(":teamId", ":memberId", false)}
          element={renderByRole({
            [ADMIN]: <AdminMemberTask />,
          })}
        />
        <Route
          path={UsersPath.TEAM_MEMBER_TASK(false)}
          element={<TeamMemberTask />}
        />

        <Route
          path={UsersPath.PROJECT(false)}
          element={renderByRole({ [ADMIN]: <Project /> })}
        />
        <Route
          path={ProjectPagePath.projectDetails(":projectId", false)}
          element={renderByRole({ [ADMIN]: <Task /> })}
        />
        <Route path={UsersPath.MESSAGES(false)} element={<Messages />} />

        <Route path="*" element={<div>hi</div>} />
      </Route>
    </Routes>
  );
};

export default UsersRouter;
