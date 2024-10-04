import { configuredApi } from "@constants/createApi-common";
import {
  CREATE_PROJECT,
  DELETE_PROJECT,
  EDIT_PROJECT,
  GET_ALL_PROJECT,
} from "config/apiUrl";
import {
  ICreateProjectResponse,
  IGetProjectResponse,
} from "./interfaces/response/project";
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
      editProject: build.mutation<
        IGetProjectResponse,
        { projectId: string; data: ICreateProjectQuery }
      >({
        query: ({ projectId, data }) => ({
          method: "PATCH",
          url: EDIT_PROJECT(projectId),
          version: "v1",
          data,
        }),
        invalidatesTags: ["allProjects"],
      }),
      deleteProject: build.mutation<IDeleteProjectResponse , string>({
        query: (id: string) => ({
          method: "DELETE",
          url: DELETE_PROJECT(id),
          version: "v1",
        }),
        invalidatesTags: ["allProjects"],
      }),
    }),
  });

export const {
  useGetProjectQuery,
  useCreateProjectMutation,
  useEditProjectMutation,
  useDeleteProjectMutation,
} = projectApi;
