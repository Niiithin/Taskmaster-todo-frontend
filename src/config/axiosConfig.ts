/* Imports */
import axios from "axios";

/* Relative Imports */
import { getAccessToken } from "helper/authHelper";

/* Local Imports */
import { apiBaseUrl } from "./config";

// ----------------------------------------------------------------------

const axiosConfig = axios.create({
  baseURL: apiBaseUrl,
});

axiosConfig.interceptors.request.use(
  (config) => {
    const accessToken = getAccessToken();
    console.log(accessToken, "token");
    if (accessToken) config.headers.authorization = `Bearer ${accessToken}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosConfig;
