export const AuthPaths = {
  SIGNIN: "signin",
  REGISTER: "register",
};

export const BasePaths = {
  USER: "/user",
};

export const UsersPath = {
  TEAM: "team",
}

export const AuthPagePath = {
  signin: (appendRedirectUrl: boolean = false) =>
    `/${AuthPaths.SIGNIN}${
      appendRedirectUrl
        ? `?redirect_url=${encodeURIComponent(window.location.pathname)}`
        : ""
    }`,
  // newPasswordSuccess: () => `/${AuthPaths.CREATE_PASSWORD_SUCCESS}`,
};
