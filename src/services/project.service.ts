import { configuredApi } from "@constants/createApi-common";
import {
  CREATE_PROJECT,
  CREATE_PROJECT_TASK,
  DELETE_PROJECT,
  DELETE_TASK,
  EDIT_PROJECT,
  EDIT_TASK,
  GET_ALL_PROJECT,
  GET_ALL_PROJECT_TASK,
} from "config/apiUrl";
import {
  ICreateProjectResponse,
  ICreateProjectTaskResponse,
  IDeleteProjectResponse,
  IDeleteTaskResponse,
  IGetAllProjectTask,
  IGetProjectResponse,
} from "./interfaces/response/project";
import {
  ICreateProjectQuery,
  ICreateProjectTaskQuery,
  IDeleteTaskQuery,
  IEditTaskQuery,
} from "./interfaces/DTO/project";

export const projectApi = configuredApi
  .enhanceEndpoints({
    addTagTypes: ["allProjects", "allTasks"],
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
      deleteProject: build.mutation<IDeleteProjectResponse, string>({
        query: (id) => ({
          method: "DELETE",
          url: DELETE_PROJECT(id),
          version: "v1",
        }),
        invalidatesTags: ["allProjects"],
      }),
      getAllProjectTask: build.query<IGetAllProjectTask, string>({
        query: (id) => ({
          method: "GET",
          url: GET_ALL_PROJECT_TASK(id),
          version: "v1",
        }),
        providesTags: ["allTasks"],
      }),
      createProjectTask: build.mutation<
        ICreateProjectTaskResponse,
        ICreateProjectTaskQuery
      >({
        query: (data) => ({
          method: "POST",
          url: CREATE_PROJECT_TASK(data.id),
          version: "v1",
          data,
        }),
        invalidatesTags: ["allTasks"],
      }),
      deleteTask: build.mutation<IDeleteTaskResponse, IDeleteTaskQuery>({
        query: (data) => ({
          method: "DELETE",
          url: DELETE_TASK(data.projectId, data.taskId),
          version: "v1",
        }),
        invalidatesTags: ["allTasks"],
      }),
      editTask: build.mutation<ICreateProjectTaskResponse, IEditTaskQuery>({
        query: (data) => ({
          method: "PATCH",
          url: EDIT_TASK(data.projectId, data.taskId),
          version: "v1",
          data,
        }),
        invalidatesTags: ["allTasks"],
      }),
    }),
  });

export const {
  useGetProjectQuery,
  useCreateProjectMutation,
  useEditProjectMutation,
  useDeleteProjectMutation,
  useGetAllProjectTaskQuery,
  useCreateProjectTaskMutation,
  useDeleteTaskMutation,
  useEditTaskMutation,
} = projectApi;
