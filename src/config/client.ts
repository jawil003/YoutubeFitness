import axios from "axios";

export const localApiClient = axios.create(
  {
    baseURL: "/api",
    timeout: 10000,
  },
);
