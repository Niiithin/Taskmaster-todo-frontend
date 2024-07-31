/* Constants */
const ROOT_PATH = "/";
const USER_DASHBOARD = "todo";

/* Home Page */
export { ROOT_PATH };

/* Root Pages */
export const PAGE_ROOT = {
  signIn: {
    relativePath: "signin",
    absolutePath: "/signin",
  },
  signUp: {
    relativePath: "signup",
    absolutePath: "/signup",
  },
  notFound: {
    relativePath: "not-found",
    absolutePath: "/not-found",
  },
};

/* User Dashboard Pages */
export const PAGE_USER_DASHBOARD = {
  root: {
    relativePath: USER_DASHBOARD,
    absolutePath: `/${USER_DASHBOARD}`,
  },
  home: {
    relativePath: "home",
    absolutePath: `/${USER_DASHBOARD}/home`,
    myTasks: {
      relativePath: "my-tasks",
      absolutePath: `/${USER_DASHBOARD}/home/my-tasks`,
    },
    teamTasks: {
      relativePath: "team-tasks",
      absolutePath: `/${USER_DASHBOARD}/home/team-tasks`,
    },
  },

  calender: {
    relativePath: "calender",
    absolutePath: `/${USER_DASHBOARD}/calender`,
  },
  notification: {
    relativePath: "notification",
    absolutePath: `/${USER_DASHBOARD}/notification`,
  },
  search: {
    relativePath: "search",
    absolutePath: `/${USER_DASHBOARD}/search`,
  },
};
