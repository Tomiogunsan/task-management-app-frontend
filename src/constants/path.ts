export const AuthPaths = {
  SIGNIN: "signin",
  REGISTER: "register",
};

export const BasePaths = {
  USER: (fullPath: boolean = true) => (fullPath ? "/user" : ""),
};

export const UsersPath = {
  TEAM: (fullPath: boolean = true) => `${BasePaths.USER(fullPath)}/team`,
  PROJECT: (fullPath: boolean = true) => `${BasePaths.USER(fullPath)}/project`,
  MESSAGES: (fullPath: boolean = true) =>
    `${BasePaths.USER(fullPath)}/messages`,
};

export const AuthPagePath = {
  signin: (appendRedirectUrl: boolean = false) =>
    `/${AuthPaths.SIGNIN}${
      appendRedirectUrl
        ? `?redirect_url=${encodeURIComponent(window.location.pathname)}`
        : ""
    }`,
};

export const TeamPagePath = {
  teamDetails: (teamId: string, fullPath: boolean = true) =>
    `${UsersPath.TEAM(fullPath)}/${teamId}`,
  teamMemberDetails: (
    teamId: string,
    memberId: string,
    fullPath: boolean = true
  ) => `${TeamPagePath.teamDetails(teamId, fullPath)}/members/${memberId}`,
};

export const ProjectPagePath = {
  projectDetails: (projectId: string, fullPath: boolean = true) =>
    `${UsersPath.PROJECT(fullPath)}/${projectId}`,
};

export const MessagePagePath = {
  teamMessages: (teamId: string, fullPath: boolean = true) =>
    `${UsersPath.MESSAGES(fullPath)}/${teamId}`,
};