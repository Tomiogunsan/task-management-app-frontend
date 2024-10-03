import { configuredApi } from "@constants/createApi-common";
import { CREATE_PROJECT, GET_ALL_PROJECT } from "config/apiUrl";
import { ICreateProjectResponse, IGetProjectResponse } from "./interfaces/response/project";
import { ICreateProjectQuery } from "./interfaces/DTO/project";

export const projectApi = configuredApi
  .enhanceEndpoints({
    addTagTypes: ["allProjects"],
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
        providesTags: ["allProjects"],
      }),
      createProject: build.mutation<
        ICreateProjectResponse,
        ICreateProjectQuery
      >({
        query: (data) => ({
          method: "POST",
          url: CREATE_PROJECT,
          version: "v1",
          data,
        }),
        invalidatesTags: ["allProjects"],
      }),
    }),
  });

export const { useGetProjectQuery, useCreateProjectMutation } = projectApi;
