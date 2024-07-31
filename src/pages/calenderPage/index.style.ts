export default {
  selectRootStyles: (theme: any) => ({
    marginX: theme.spacing(6),
    marginY: theme.spacing(6),
    [theme.breakpoints.down("sm")]: {
      marginX: theme.spacing(3),
      marginY: theme.spacing(6),
    },
  }),
  taskTextStyles: (theme: any) => ({
    color: theme.palette.primary.main,
  }),
  selectStyles: (theme: any) => ({
    maxWidth: "200px",
    marginTop: theme.spacing(1),
    width: "100%",
    backgroundColor: theme.palette.common.white,
    minWidth: "120px",
    "& .MuiSelect-select": {
      paddingY: 1,
    },
    "& .MuiOutlinedInput-notchedOutline": {
      border: "none",
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
      border: "none",
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      border: "none",
    },
    "& .MuiSvgIcon-root": {
      color: theme.palette.secondary.dark,
    },
    border: "none",
    borderRadius: 1,
  }),
  menuProps: {
    PaperProps: {
      sx: {
        bgcolor: "white",
        "& .MuiMenuItem-root": {
          bgcolor: "white",
          "&:hover": {
            bgcolor: "rgba(0, 0, 0, 0.04)",
          },
          "&.Mui-selected": {
            bgcolor: "rgba(0, 0, 0, 0.08)",
            "&:hover": {
              bgcolor: "rgba(0, 0, 0, 0.12)",
            },
          },
        },
      },
    },
  },
};
