import { configuredApi } from "@constants/createApi-common";
import {
  ADD_TEAM,
  ASSIGN_PROJECT_TO_TEAM,
  GET_ALL_TEAM,
  GET_TEAM_MEMBERS,
} from "config/apiUrl";
import { IGetMembersResponse, IGetTeamResponse } from "./interfaces/response/team";
import { IAddTeamQuery } from "./interfaces/DTO/team";

export const teamApi = configuredApi
  .enhanceEndpoints({
    addTagTypes: ["allTeams", "allMembers"],
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
        unknown,
        { teamId: string; projectId: string }
      >({
        query: ({ teamId, projectId }) => ({
          method: "POST",
          url: ASSIGN_PROJECT_TO_TEAM(teamId),
          version: "v1",
          projectId,
        }),
        invalidatesTags: ["allTeams"],
      }),
    }),
  });

export const { useGetTeamQuery, useAssignProjectMutation,
   useAddTeamMutation,
  useGetTeamMembersQuery
  } =
  teamApi;
