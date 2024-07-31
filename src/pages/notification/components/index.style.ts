export default {
  rootStyles: (theme: any) => ({
    backgroundColor: theme.palette.common.white,
    marginX: theme.spacing(4),
    borderRadius: theme.spacing(2),
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2),
    [theme.breakpoints.down("sm")]: {
      marginX: theme.spacing(2),
    },
  }),
  time: (theme: any) => ({
    color: theme.palette.secondary.main,
    paddingTop: theme.spacing(2),
  }),
};
