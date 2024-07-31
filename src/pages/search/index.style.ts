import { Theme } from "@mui/material/styles";

export default {
  searchContainer: (theme: Theme) => ({
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    width: "100%",
    padding: theme.spacing(1),
  }),

  search: (theme: Theme, expanded: boolean) => ({
    position: "relative",
    display: "flex",
    alignItems: "center",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.common.white,
    "&:hover": {
      backgroundColor: theme.palette.common.white,
    },
    marginLeft: 0,
    width: expanded ? "100%" : "200px",
    transition: theme.transitions.create("width"),
  }),

  searchIconWrapper: (theme: Theme) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    left: 0,
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }),

  loaderContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "200px",
  },

  inputRoot: (theme: Theme) => ({
    color: "inherit",
    width: "100%",
  }),

  inputInput: (theme: Theme, expanded: boolean) => ({
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    textAlign: "left",
    ...(expanded && {
      width: "100%",
    }),
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
  searchHeading: (theme: any) => ({
    marginLeft: theme.spacing(4),
    marginBottom: theme.spacing(3),
  }),
  noTaskContainer: (theme: any) => ({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: "auto 0",
    marginTop: theme.spacing(20),
  }),
  searchRootStyles: (theme: any) => ({
    marginX: theme.spacing(5),
    [theme.breakpoints.down("sm")]: {
      marginX: theme.spacing(3),
    },
  }),
};
