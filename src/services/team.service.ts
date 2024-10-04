import { configuredApi } from "@constants/createApi-common";
import { ASSIGN_PROJECT_TO_TEAM, GET_ALL_TEAM } from "config/apiUrl";
import { IGetTeamResponse } from "./interfaces/response/team";

export const teamApi = configuredApi
  .enhanceEndpoints({
    addTagTypes: ["allTeams"],
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

export const { useGetTeamQuery, useAssignProjectMutation } = teamApi;
