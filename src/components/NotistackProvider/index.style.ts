export default {
  rootStyle: (theme: any) => ({
    height: "100%",
    width: "100%",
    "& .SnackbarContent-root": {
      backgroundColor: `${theme.palette.background.default} !important`,
      color: `${theme.palette.text.primary} !important`,
      borderRadius: 0.75,
      padding: theme.spacing(1, 2, 1, 1.25),
      maxWidth: 320,
      "&.SnackbarItem-variantSuccess": {
        backgroundColor: "none",
        borderLeft: `8px solid ${theme.palette.success.main}`,
      },
      "&.SnackbarItem-variantError": {
        backgroundColor: "none",
        borderLeft: `8px solid ${theme.palette.error.main}`,
      },
      "&.SnackbarItem-variantWarning": {
        backgroundColor: "none",
        borderLeft: `8px solid ${theme.palette.warning.main}`,
      },
      "&.SnackbarItem-variantInfo": {
        backgroundColor: "none",
        borderLeft: `8px solid ${theme.palette.info.main}`,
      },
    },
    "& .SnackbarItem-message": {
      flex: 1,
    },
    "& .SnackbarItem-action": {
      paddingLeft: 1,
      marginTop: -0.25,
      marginRight: -0.5,
      alignSelf: "flex-start",
      "& > .MuiIconButton-root": {
        padding: 0,
      },
    },
  }),
  iconBox: {
    mr: 1.25,
    display: "flex",
    fontSize: 16,
  },
};
