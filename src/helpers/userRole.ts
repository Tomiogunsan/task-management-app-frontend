import { ADMIN, TEAM_MEMBER } from "@constants/roles";
import { AppAllowedRoles, IAppAllowedRoles, IRole } from "interface";

export const getUserMainRole = (roles: string): IRole => {
  if (roles.includes(ADMIN)) return ADMIN;
  if (roles.includes(TEAM_MEMBER)) return TEAM_MEMBER;
  return TEAM_MEMBER;
};

export const getAppAdminRole = (role: string) => {
  const userRole = getUserMainRole(role);
  if (AppAllowedRoles.includes(userRole as IAppAllowedRoles)) {
    return userRole as IAppAllowedRoles;
  }
  return null;
};
