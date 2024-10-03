// import { joinPath } from "helpers/navigation";

export const AuthPaths = {
  SIGNIN: "signin",
  REGISTER: "register",
};

export const BasePaths = {
  USER: "/user",
};

export const UsersPath = {
  TEAM: "team",
  PROJECT: "project",
};

export const AuthPagePath = {
  signin: (appendRedirectUrl: boolean = false) =>
    `/${AuthPaths.SIGNIN}${
      appendRedirectUrl
        ? `?redirect_url=${encodeURIComponent(window.location.pathname)}`
        : ""
    }`,
};

// export const TeamPagePath = {
//   id: (teamId: string, fullPath: boolean = true) =>
//     joinPath(
//       `${fullPath ? `/${BasePaths.USER}/` : ""}${UsersPath.TEAM}`,
//       teamId
//     ),
// };
export const TeamPagePath = {
  id: (teamId: string) => `${BasePaths.USER}/${UsersPath.TEAM}/${teamId}`,
};
