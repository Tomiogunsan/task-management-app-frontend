export const AuthPaths = {
  SIGNIN: "signin",
REGISTER: "register",
};

export const AuthPagePath = {
  signin: (appendRedirectUrl: boolean = false) =>
    `/${AuthPaths.SIGNIN}${
      appendRedirectUrl
        ? `?redirect_url=${encodeURIComponent(window.location.pathname)}`
        : ""
    }`,
  // newPasswordSuccess: () => `/${AuthPaths.CREATE_PASSWORD_SUCCESS}`,
};
