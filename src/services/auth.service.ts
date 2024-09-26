import { configuredApi } from "@constants/createApi-common";
import { LOGIN, REGISTER } from "config/apiUrl";
import { ILoginDTO, IRegisterDTO } from "./interfaces/DTO/auth";
import { ILoginResponse, IRegisterResponse } from "./interfaces/response/auth";

export const authApi = configuredApi
  .enhanceEndpoints({
    addTagTypes: [],
  })
  .injectEndpoints({
    overrideExisting: true,
    endpoints: (build) => ({
      register: build.mutation<IRegisterResponse, IRegisterDTO>({
        query: (data) => ({
          method: "POST",
          url: REGISTER,
          version: "v1",
          data,
        }),
      }),
      login: build.mutation<ILoginResponse, ILoginDTO>({
        query: (data) => ({
          method: "POST",
          url: LOGIN,
          version: "v1",
          data,
        }),
      }),
    }),
  });

export const { useRegisterMutation, useLoginMutation } = authApi;
