import { configuredApi } from "@constants/createApi-common";
import {
  ADD_MEMBER_TO_TEAM,
  ADD_TEAM,
  ASSIGN_PROJECT_TO_TEAM,
  GET_ALL_TEAM,
  GET_MEMBER_DETAILS,
  GET_TEAM_MEMBERS,
  UPDATE_STATUS,
} from "config/apiUrl";
import {
  IAddMemberResponse,
  IAssignProjectResponse,
  IGetMemberDetailsResponse,
  IGetMembersResponse,
  IGetTeamResponse,
  
  IUpdateMemberTaskResponse,
} from "./interfaces/response/team";
import { IAddTeamQuery, IGetMemberDetailsQuery, IUpdateMemberTaskQuery } from "./interfaces/DTO/team";

export const teamApi = configuredApi
  .enhanceEndpoints({
    addTagTypes: ["allTeams", "allMembers", "individualMembers"],
  })
  .injectEndpoints({
    overrideExisting: true,
    endpoints: (build) => ({
      getTeam: build.query<IGetTeamResponse, null>({
        query: () => ({
          method: "GET",
          url: GET_ALL_TEAM,
          version: "v1",
        }),
        providesTags: ["allTeams"],
      }),
      addTeam: build.mutation<IGetTeamResponse, IAddTeamQuery>({
        query: (data) => ({
          method: "POST",
          url: ADD_TEAM,
          version: "v1",
          data,
        }),
        invalidatesTags: ["allTeams"],
      }),
      getTeamMembers: build.query<IGetMembersResponse, string>({
        query: (id) => ({
          method: "GET",
          url: GET_TEAM_MEMBERS(id),
          version: "v1",
        }),
        providesTags: ["allMembers"],
      }),
      assignProject: build.mutation<
        IAssignProjectResponse,
        { teamId: string; projectId: string }
      >({
        query: (data) => ({
          method: "PATCH",
          url: ASSIGN_PROJECT_TO_TEAM(data.teamId),
          version: "v1",
          data: {
            projectId: data.projectId,
          },
        }),
        invalidatesTags: ["allTeams"],
      }),
      addMemberToTeam: build.mutation<
        IAddMemberResponse,
        { id: string; memberId: string }
      >({
        query: (data) => ({
          method: "PATCH",
          url: ADD_MEMBER_TO_TEAM(data.id as string),
          version: "v1",
          data: {
            memberId: data.memberId,
          },
        }),
        invalidatesTags: ["allMembers"],
      }),
      getMemberDetail: build.query<
        IGetMemberDetailsResponse,
        IGetMemberDetailsQuery
      >({
        query: (data) => ({
          method: "GET",
          url: GET_MEMBER_DETAILS(data.teamId, data.memberId),
          version: "v1",
        }),
        providesTags: ["individualMembers"],
      }),
      updateMemberTask: build.mutation<
        IUpdateMemberTaskResponse,
        IUpdateMemberTaskQuery
      >({
        query: (data) => ({
          method: "PATCH",
          url: UPDATE_STATUS(data.projectId, data.taskId),
          version: "v1",
        }),
        invalidatesTags: ["individualMembers"],
      }),
    }),
  });

export const {
  useGetTeamQuery,
  useAssignProjectMutation,
  useAddTeamMutation,
  useGetTeamMembersQuery,
  useAddMemberToTeamMutation,
  useGetMemberDetailQuery,
  useUpdateMemberTaskMutation
} = teamApi;
