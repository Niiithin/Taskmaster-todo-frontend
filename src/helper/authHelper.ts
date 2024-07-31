/* Imports */
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

// ----------------------------------------------------------------------

/* Constants */
const cookieKey = "todo_list_researchify_token";

// ----------------------------------------------------------------------

/**
 * function to set access token in cookies
 *
 * @param {string} accessToken - logged in user token
 * @param {boolean} isRememberMe - flag to remember/forgot user after session ends.
 * @returns {void}
 */
export const setAccessToken = (accessToken: string): void => {
  const cookieConfig: any = {
    path: "/",
    sameSite: true,
  };
  const expiresDate = new Date(); // Now

  expiresDate.setDate(expiresDate.getDate() + 1); // Set now + 1 days as the new date
  cookieConfig.expires = expiresDate;
  Cookies.set(cookieKey, accessToken, cookieConfig);
};

/**
 * function to remove access token from cookies
 *
 * @returns {void}
 */
export const removeAccessToken = (): void => {
  const cookieConfig: any = {
    path: "/",
    sameSite: true,
    expires: 0,
  };
  Cookies.remove(cookieKey, cookieConfig);
};

/**
 * function to get access token from cookies
 *
 * @returns {string} - returns a access token from cookies
 */
export const getAccessToken = (): string | undefined => {
  return Cookies.get(cookieKey);
};

/**
 * function to validate the access toke by decoding the jwt token
 * @param {string} accessToken - logged in user token
 *
 * @returns {string} - returns a access token from cookies
 */
export const isValidToken = (accessToken: string): string | undefined => {
  if (!accessToken) {
    return;
  }
  const decoded: any = jwtDecode(accessToken);
  const currentTime = Date.now() / 1000;

  return decoded.exp > currentTime ? decoded : null;
};
