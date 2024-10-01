import { configuredApi } from "@constants/createApi-common";
import { GET_ALL_TEAM } from "config/apiUrl";

export const teamApi = configuredApi
  .enhanceEndpoints({
    addTagTypes: [],
  })
  .injectEndpoints({
    overrideExisting: true,
    endpoints: (build) => ({
      getTeam: build.query({
        query: () => ({
          method: "GET",
          url: GET_ALL_TEAM,
          version: "v1",
        }),
      }),
    }),
  });

export const { useGetTeamQuery } = teamApi;
