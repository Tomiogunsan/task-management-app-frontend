// import { IUserDecoded } from 'interfaces/auth.interface';
// import jwtDecode from 'jwt-decode';

// type IUserDecoded = {
//  [x: string]: string | number| Date | undefined
// }
export const setToken = (token: string): void => {
  localStorage.setItem("accessToken", token);
};

export const getToken = (): string => {
  return localStorage.getItem("accessToken") || "";
};

// export const getDecodedJwt = (token: string = getToken()): IUserDecoded => {
//   try {
//     return jwtDecode(token);
//   } catch (error) {
//     return {} as IUserDecoded;
//   }
// };

export const setRefreshToken = (refreshToken: string) => {
  localStorage.setItem("refreshToken", refreshToken);
};

export const getRefreshToken = (): string | null => {
  return localStorage.getItem("refreshToken");
};

export const removeToken = (): void => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
};

export const logOut = (cb?: VoidFunction): void => {
  removeToken();
  cb?.();
};

export const isAuthenticated = () => {
  const userToken = getToken();
  if (userToken) {
    return true;
  } else {
    return false;
  }
};

// export const isAuthenticated = () => {
//   const userToken = getToken();
//   if (userToken) {
//     try {
//       const decodedToken: IUserDecoded = jwtDecode(userToken);
//       if (decodedToken.exp) {
//         const { exp } = decodedToken;
//         const currentTime = Date.now() / 1000;
//         return exp > currentTime;
//       }
//     } catch (e) {
//       return false;
//     }
//   }
// };
