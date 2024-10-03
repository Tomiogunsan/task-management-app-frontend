import { configuredApi } from "@constants/createApi-common";
import { GET_ALL_PROJECT } from "config/apiUrl";
import { IGetProjectResponse } from "./interfaces/response/project";

export const projectApi = configuredApi
  .enhanceEndpoints({
    addTagTypes: [],
  })
  .injectEndpoints({
    overrideExisting: true,
    endpoints: (build) => ({
        getProject: build.query<IGetProjectResponse, null>({
          query: () => ({
            method: "GET",
            url: GET_ALL_PROJECT,
            version: "v1",
          }),
        }),
      }),
  });

export const { useGetProjectQuery } = projectApi;
