const styles = {
  rootStyles: (theme: any) => ({
    width: "100%",
    backgroundColor: theme.palette.common.white,
    paddingBottom: theme.spacing(2),
    borderBottomLeftRadius: theme.spacing(4),
    borderBottomRightRadius: theme.spacing(4),
  }),
  monthPickerStyles: (theme: any) => ({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginX: theme.spacing(5),
    paddingTop: theme.spacing(2),
    [theme.breakpoints.down("sm")]: {
      marginX: theme.spacing(3),
    },
  }),
  monthText: (theme: any) => ({
    color: theme.palette.primary.main,
  }),
  selectRoot: (theme: any) => ({
    display: "flex",
    alignItems: "center",
    mb: 2,
    mt: 4,
    gap: 1,
  }),
  selectStyles: (theme: any) => ({
    "& .MuiSelect-select": {
      border: "none",
      bgcolor: "transparent",
      padding: 0,
      paddingRight: "0px !important",
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
      padding: 0,
    },
  }),
  datesRootStyles: (theme: any) => ({
    display: "flex",
    overflowX: "auto",
    "&::-webkit-scrollbar": { display: "none" },
    scrollbarWidth: "none",
    msOverflowStyle: "none",
    marginTop: theme.spacing(5),
    borderRadius: theme.spacing(4),
    marginX: theme.spacing(5),
    [theme.breakpoints.down("sm")]: {
      marginX: theme.spacing(3),
    },
  }),
  datesStyles: (theme: any) => ({
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: theme.spacing(2),
    cursor: "pointer",
    "&:hover": {
      bgcolor: "action.hover",
    },
  }),
  addTaskButton: (theme: any) => ({
    paddingX: theme.spacing(3),
    paddingY: theme.spacing(3),
    borderRadius: theme.spacing(6),
    border: "none",
    background: "linear-gradient(to bottom, #8330E5, #4442E5)",
    "&:hover": {
      background: "linear-gradient(to bottom, #7220D5, #3332D5)",
    },
  }),

  addTaskButtonText: (theme: any) => ({
    color: theme.palette.common.white,
  }),
  taskCardRootStyles: (theme: any) => ({
    borderRadius: theme.spacing(4),
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
  }),
  taskCardCompleted: {
    backgroundColor: "#e8f5e9", // light green
  },
  taskCardNotCompleted: {
    backgroundColor: "#ffffff", // white
  },
  taskCardCancelled: {
    backgroundColor: "#ffebee", // light red
    opacity: 0.7,
    pointerEvents: "none",
  },
  taskName: (theme: any) => ({
    color: theme.palette.primary.main,
  }),
  taskDesc: (theme: any) => ({
    color: theme.palette.primary.light,
  }),
  taskNameCompleted: (theme: any) => ({
    color: theme.palette.success.dark,
  }),
  taskNameCancelled: (theme: any) => ({
    color: theme.palette.error.dark,
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
};

export default styles;
