export default {
  cardStyles: (theme: any) => ({
    display: "flex",
    flexDirection: "column",
    background: "linear-gradient(20deg, #4442E5 0%, #8330E5 100%)",
    color: "white",
    position: "relative",
    overflow: "hidden",
  }),
  cardContentStyles: (theme: any) => ({
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    position: "relative",
    zIndex: 1,
  }),
  cardBox: (theme: any) => ({
    width: 50,
    height: 50,
    filter: "brightness(0) invert(1)",
  }),
  cardHeading: (theme: any) => ({
    color: theme.palette.common.white,
  }),
  todoName: (theme: any) => ({
    paddingTop: theme.spacing(4),
    color: theme.palette.common.white,
  }),

  title: (theme: any) => ({
    marginLeft: theme.spacing(4),
    marginBottom: theme.spacing(3),
  }),
  emptyContainer: (theme: any) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  }),
  loaderContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "200px",
  },
};
