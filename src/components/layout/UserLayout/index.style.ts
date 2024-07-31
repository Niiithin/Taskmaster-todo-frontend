import ThemeConfig from "theme";

export default {
  rootStyle: (theme: any) => ({
    backgroundColor: theme.palette.info.light,
    width: "100%",
    height: "100vh",
    display: "flex",
    position: "relative",
    overflow: "hidden",
  }),
  leftPanel: (theme: any) => ({
    width: 264,
    height: "100%",
    borderRight: `1px solid ${theme.palette.divider}`,
  }),
  sidebarDrawer: (theme: any) => ({
    backgroundColor:
      theme.palette.mode === "light"
        ? theme.palette.common.white
        : theme.palette.background.default,
  }),
  logoContainer: (theme: any) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    paddingX: 1,
    [theme.breakpoints.down("md")]: {
      paddingX: 0,
    },
  }),
  userProfile: (theme: any) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.palette.secondary.light,
    margin: theme.spacing(1, 1, 3),
    padding: 2,
    borderRadius: `${theme.shape.borderRadiusXs}px`,
    [theme.breakpoints.down("md")]: {
      marginX: 2,
    },
  }),
  profilePicture: {
    cursor: "pointer",
    width: 48,
    height: 48,
    mr: 2,
  },
  listContainer: {
    flex: 1,
    overflowY: "auto",
    minHeight: 60,
    marginTop: 2,
  },
  sidebarList: (theme: any) => ({
    padding: 0,
    "& .MuiListItemButton-root": {
      [theme.breakpoints.up("md")]: {
        paddingX: 3,
      },
    },
  }),
  wrapperStyle: {
    flex: 1,
    height: "100%",
    position: "relative",
    overflow: "hidden",
  },
  containerStyle: {
    height: "calc(100% - 64px)",
    // mt: 8,
    overflow: "auto",
  },
  contentStyle: {
    flex: "1 1 auto",
    height: "100%",
    overflow: "auto",
  },
  header: (theme: any) => ({
    width: "calc(100% - 264px)",
    height: 64,
    position: "fixed",
    zIndex: 999,
    left: 264,
    top: 0,
    right: 0,

    backgroundColor: theme.palette.common.white,
    color: theme.palette.common.white,
    paddingY: 2,
    paddingX: 3,
    // boxShadow:

    //      theme.customShadows.z4,
    [theme.breakpoints.down("laptop")]: {
      width: "100%",
      left: 0,
    },
  }),
  menuIcon: (theme: any) => ({
    mr: 3,
    mt: 2,
    color:
      theme.palette.mode === "light"
        ? theme.palette.grey[900]
        : theme.palette.common.white,
  }),
  rightOptions: {
    flex: 1,
    paddingTop: 2,
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  footer: (theme: any) => ({
    textAlign: "center",
    borderTop: `1px solid ${theme.palette.divider}`,
  }),
  bottomNavigation: (theme: any) => ({
    backgroundColor: theme.palette.info.light,
  }),
};
