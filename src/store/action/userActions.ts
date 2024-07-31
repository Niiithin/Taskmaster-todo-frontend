import { User } from "models/userModel";

export const LOGIN_USER = "LOGIN_USER";
export const LOGOUT_USER = "LOGOUT_USER";

interface LoginUserAction {
  type: typeof LOGIN_USER;
  payload: User;
}

interface LogoutUserAction {
  type: typeof LOGOUT_USER;
}

export type UserActionTypes = LoginUserAction | LogoutUserAction;

export const loginUser = (user: User): UserActionTypes => ({
  type: LOGIN_USER,
  payload: user,
});

export const logoutUser = (): UserActionTypes => ({
  type: LOGOUT_USER,
});
