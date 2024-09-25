import { createApi } from "@reduxjs/toolkit/query/react";
import { httpRequest } from "config/http-request";

export const configuredApi = createApi({
  baseQuery: httpRequest(),
  endpoints: () => ({}),
  tagTypes: ["allUsers"],
});
