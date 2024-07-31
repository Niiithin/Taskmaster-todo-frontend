export default {
  wrapperStyle: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
  },
  mainStyle: (theme: any) => ({
    flex: 1,
    display: "flex",
    overflow: "hidden",
    [theme.breakpoints.down("md")]: {
      flexDirection: "column",
    },
  }),
  leftPanel: (theme: any) => ({
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: theme.spacing(8),
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    [theme.breakpoints.down("sm")]: {
      flex: "none",
      padding: theme.spacing(4),
    },
  }),
  logoContainer: {
    marginBottom: 4,
  },
  logo: (theme: any) => ({
    width: 120,
    height: "auto",
    [theme.breakpoints.down("sm")]: {
      width: 80,
    },
  }),
  welcomeText: {
    marginBottom: 2,
    fontWeight: 700,
    textAlign: "center",
  },
  subText: (theme: any) => ({
    textAlign: "center",
    maxWidth: 400,
    marginBottom: 4,
    [theme.breakpoints.down("sm")]: {
      marginBottom: 2,
      fontSize: "0.9rem",
    },
  }),
  rightPanel: (theme: any) => ({
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: theme.spacing(8),
    backgroundColor: theme.palette.background.paper,
    [theme.breakpoints.down("sm")]: {
      flex: "none",
      padding: theme.spacing(4),
    },
  }),
  formContainer: (theme: any) => ({
    width: "100%",
    maxWidth: 400,
    [theme.breakpoints.down("sm")]: {
      maxWidth: "100%",
    },
  }),
  footer: (theme: any) => ({
    textAlign: "center",
    padding: theme.spacing(2),
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.secondary,
    width: "100%",
  }),
};
