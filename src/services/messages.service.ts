import { configuredApi } from "@constants/createApi-common";
import { GET_ALL_MESSAGES, SEND_MESSAGES } from "config/apiUrl";
import { IMessageResponse, ISendMessageResponse } from "./interfaces/response/message";
import { ISendMessageQuery } from "./interfaces/DTO/message";

export const messageApi = configuredApi
  .enhanceEndpoints({
    addTagTypes: ["allMessages"],
  })
  .injectEndpoints({
    overrideExisting: true,
    endpoints: (build) => ({
      getAllMessages: build.query<IMessageResponse, string>({
        query: (teamId: string) => ({
          method: "GET",
          url: GET_ALL_MESSAGES(teamId),
          version: "v1",
        }),
        providesTags: ["allMessages"],
      }),
      sendMessage: build.mutation<ISendMessageResponse, ISendMessageQuery>({
        query: (data) => ({
          method: "POST",
          url: SEND_MESSAGES(data.teamId),
          version: "v1",
          data: {
            content: data.content,
            userId: data.userId,
          },
        }),
        invalidatesTags: ["allMessages"],
      }),
    }),
  });

export const { useGetAllMessagesQuery, useSendMessageMutation } = messageApi;
