/* Imports */
import { Box } from "@mui/material";
import LoadingScreen from "components/LoadingScreen";
import {
  getAccessToken,
  removeAccessToken,
  setAccessToken,
} from "helper/authHelper";
import React from "react";
import { ROOT_PATH } from "routes/paths";
import { getUserProfileRequest } from "services/auth";

/* Types/Interfaces */

export interface User {
  id: string;
  username: string;
  email: string;
}

export interface ISessionState {
  isAuthenticated: boolean;
  isPageLoaded: boolean | null;
  authToken: string | null;
  user: User | null;
  LoginUser: (token: string, loggedInUser: User) => void;
  LogoutUser: () => void;
  setUser: (loggedInUser: User) => void;
}

export interface ISessionProps {
  children: React.ReactNode;
}

/* Initial State */
const initialState: ISessionState = {
  isAuthenticated: false,
  isPageLoaded: null,
  authToken: null,
  user: null,
  LoginUser: () => {},
  LogoutUser: () => {},
  setUser: () => {},
};

/* Create Context */
const SessionContext = React.createContext<ISessionState>(initialState);

class Session extends React.Component<ISessionProps, ISessionState> {
  constructor(props: ISessionProps) {
    super(props);

    const accessToken = getAccessToken() || null;
    const storedUser = localStorage.getItem("user");
    let user: User | null = storedUser ? JSON.parse(storedUser) : null;

    this.state = {
      isAuthenticated: Boolean(accessToken && user),
      isPageLoaded: false,
      authToken: accessToken,
      user,
      LoginUser: this.LoginUser,
      LogoutUser: this.LogoutUser,
      setUser: this.setUser,
    };
  }

  componentDidMount(): void {
    if (this.state.authToken) {
      this.getUserProfile();
    } else {
      this.setState({ isPageLoaded: true });
    }
  }

  LoginUser = (token: string, loggedInUser: User) => {
    localStorage.setItem("updateDialogBox", "open");
    setAccessToken(token);
    localStorage.setItem("user", JSON.stringify(loggedInUser));
    this.setState({
      isAuthenticated: true,
      isPageLoaded: true,
      authToken: token,
      user: loggedInUser,
    });
  };

  LogoutUser = () => {
    localStorage.removeItem("updateDialogBox");
    localStorage.removeItem("user");
    removeAccessToken();
    this.setState({
      isAuthenticated: false,
      authToken: null,
      user: null,
    });
    window.location.href = ROOT_PATH;
  };

  setUser = (loggedInUser: User) => {
    localStorage.setItem("user", JSON.stringify(loggedInUser));
    this.setState({ user: loggedInUser });
  };

  async getUserProfile(): Promise<void> {
    try {
      const response = await getUserProfileRequest(this.state.authToken || "");
      if (response?.status.response_code === 200 && response?.user) {
        const user: User = {
          id: response.user.id || "",
          username: response.user.username || "",
          email: response.user.email || "",
        };
        this.setUser(user);
      }
    } catch (error: any) {
      console.error("Error fetching user profile:", error);
      if (error.response && error.response.status === 401) {
        this.LogoutUser();
      }
    } finally {
      this.setState({ isPageLoaded: true });
    }
  }

  render(): JSX.Element {
    if (!this.state.isPageLoaded) {
      return (
        <Box display={"flex"} justifyContent={"center"} alignItems={"center"}>
          <LoadingScreen />
        </Box>
      );
    }
    return (
      <SessionContext.Provider value={this.state}>
        {this.props.children}
      </SessionContext.Provider>
    );
  }
}

export default SessionContext;
export const SessionProvider = Session;
export const SessionConsumer = SessionContext.Consumer;
