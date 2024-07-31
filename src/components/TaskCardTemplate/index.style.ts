const styles = {
  rootStyles: (theme: any) => ({
    width: "100%",
  }),
  selectRoot: (theme: any) => ({
    display: "flex",
    alignItems: "center",
    mb: 2,
  }),
  selectStyles: (theme: any) => ({
    "& .MuiSelect-select": {
      border: "none",
      bgcolor: "transparent",
    },
    "&:before, &:after": { display: "none" },
    "& .MuiSelect-icon": { display: "none" },
    "& .MuiOutlinedInput-notchedOutline": {
      border: "none",
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
      border: "none",
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      border: "none",
    },
  }),
  datesRootStyles: (theme: any) => ({
    display: "flex",
    overflowX: "auto",
    "&::-webkit-scrollbar": { display: "none" },
    scrollbarWidth: "none",
    msOverflowStyle: "none",
  }),
  datesStyles: (theme: any) => ({
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
    "&:hover": {
      bgcolor: "action.hover",
    },
  }),
  addTaskButton: (theme: any) => ({
    paddingX: theme.spacing(3),
    paddingY: theme.spacing(3),
    borderRadius: theme.spacing(6),
  }),
  taskCardRootStyles: (theme: any) => ({
    borderRadius: theme.spacing(2),
    padding: theme.spacing(3),
    margin: "0 auto",
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
    backgroundColor: "#ffffff",
  }),
  taskCardCompleted: {
    backgroundColor: "#B4E380", // light green
  },
  taskCardNotCompleted: {
    backgroundColor: "#ffffff", // white
  },
  taskCardCancelled: {
    backgroundColor: "#FF7777", // light red
    opacity: 0.7,
  },
  taskName: (theme: any) => ({
    color: theme.palette.primary.main,
  }),
  taskDesc: (theme: any) => ({
    color: theme.palette.primary.light,
  }),
  taskNameCompleted: (theme: any) => ({
    color: theme.palette.common.white,
  }),
  taskNameCancelled: (theme: any) => ({
    color: theme.palette.common.black,
  }),
  taskDescCompleted: (theme: any) => ({
    color: theme.palette.success.main,
  }),
  taskDescCancelled: (theme: any) => ({
    color: theme.palette.error.main,
  }),
  readMoreLess: (theme: any) => ({
    color: theme.palette.primary.main,
    padding: 0,
    textTransform: "none",
    "&:hover": {
      background: "none",
    },
  }),
  menuStyles: (theme: any) => ({
    backgroundColor: "black",
  }),
  menuContainerStyles: (theme: any) => ({
    maxWidth: "280px",
  }),
  menuItemStyles: (theme: any) => ({
    // padding: 0,
    // backgroundColor: theme.palette.common.white,
    "&:hover": {
      backgroundColor: theme.palette.action.hover,
    },
  }),
};

export default styles;
