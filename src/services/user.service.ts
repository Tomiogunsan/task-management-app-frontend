import { configuredApi } from "@constants/createApi-common";
import { GET_ALL_USERS } from "config/apiUrl";
import { IGetUsersResponse } from "./interfaces/response/user";

export const userApi = configuredApi
  .enhanceEndpoints({
    addTagTypes: ["allUsers"],
  })
  .injectEndpoints({
    overrideExisting: true,
    endpoints: (build) => ({
      getUsers: build.query<IGetUsersResponse, null>({
        query: () => ({
          method: "GET",
          url: GET_ALL_USERS,
          version: "v1",
        }),
        providesTags: ["allUsers"],
      }),
    }),
  });

export const { useGetUsersQuery } = userApi;
