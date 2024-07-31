export default {
  rootStyles: (theme: any) => ({
    margin: theme.spacing(5),
    [theme.breakpoints.down("sm")]: {
      margin: theme.spacing(2),
    },
  }),
  notificationsRootBox: (theme: any) => ({
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(8),
    [theme.breakpoints.down("sm")]: {
      marginTop: theme.spacing(2),
    },
  }),
  notificationsBox: (theme: any) => ({
    marginX: theme.spacing(6),
    marginY: theme.spacing(1),
    [theme.breakpoints.down("sm")]: {
      marginX: theme.spacing(0),
    },
  }),
  loaderContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "200px",
  },
  noNotificationsContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "200px",
  },
};
