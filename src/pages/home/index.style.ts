export default {
  rootStyles: (theme: any) => ({
    margin: theme.spacing(3),
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(15),
  }),
  mainText: (theme: any) => ({
    color: theme.palette.primary.main,
  }),
  subText: (theme: any) => ({
    color: theme.palette.primary.light,
  }),

  buttonRootContainer: (theme: any) => ({
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 2,
    width: "100%",
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(3),
    [theme.breakpoints.down("sm")]: {
      justifyContent: "space-between",
      flexWrap: "nowrap",
      gap: 1,
    },
  }),
  buttonContainer: (theme: any) => ({
    backgroundColor: theme.palette.secondary.light,
    color: theme.palette.common.black,
    borderRadius: theme.spacing(4),
    paddingX: theme.spacing(4),
    paddingY: theme.spacing(3),
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(2, 2),
      minWidth: "auto",
      flex: 1,
    },
    "&:hover": {
      backgroundColor: theme.palette.common.white,
    },
  }),
  buttonText: (theme: any) => ({
    [theme.breakpoints.down("sm")]: {
      margin: 0,
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
    },
  }),
  cardRootStyles: (theme: any) => ({
    backgroundColor: theme.palette.common.white,
    borderRadius: theme.spacing(2),
    padding: theme.spacing(3),
    margin: "0 auto",
    marginTop: theme.spacing(3),
    height: "100px",
    [theme.breakpoints.up("xs")]: {
      maxWidth: "100%",
    },
    [theme.breakpoints.up("sm")]: {
      maxWidth: "600px",
    },
    [theme.breakpoints.up("md")]: {
      maxWidth: "800px",
    },
    [theme.breakpoints.up("lg")]: {
      maxWidth: "1000px",
    },
  }),
};
