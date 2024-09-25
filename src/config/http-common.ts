/* eslint-disable @typescript-eslint/no-explicit-any */
import { apiBaseUrl } from "@constants/apiBaseUrl";
import axios from "axios";
import { getToken, isAuthenticated } from "helpers/auth";




const Api = axios.create({
  baseURL: apiBaseUrl,
});

Api.interceptors.request.use(
  (config: any) => {
    // This adds an authorization key to config object if a token exists.
    if (isAuthenticated()) {
      config.headers["Authorization"] = `Bearer ${getToken()}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
Api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => Promise.reject(error)
);

export default Api;
