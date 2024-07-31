/* Relative Imports */
import axiosInstance from "config/axiosConfig";

// ----------------------------------------------------------------------

export const loginUserRequest = (
  email: string,
  password: string
): Promise<any> => {
  return axiosInstance
    .post("/api/users/login", {
      email,
      password,
    })
    .then((response) => response);
};

export const registerUserRequest = (
  username: string,
  email: string,
  password: string
): Promise<any> => {
  return axiosInstance
    .post("/api/users/register", {
      username,
      email,
      password,
    })
    .then((response) => response);
};

export const getUserProfileRequest = (token: string): Promise<any> => {
  return axiosInstance
    .get("/api/users/fetch-user", {
      headers: {
        authorization: `Bearer ${token}`,
      },
    })
    .then((response) => response);
};
