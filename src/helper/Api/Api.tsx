import axios from "axios";
import { getCookie } from "cookies-next";

const Api = axios.create({
  baseURL: "https://6969.lat/v1/",
  headers: {
    juliolb: "ad121d1f-3c29-4821-b941-5b6ca383e32e",
  },
});

Api.interceptors.request.use((config) => {
  const token = getCookie("token");
  if (token) {
    config.headers.token = token;
  }
  return config;
});

export default Api;
