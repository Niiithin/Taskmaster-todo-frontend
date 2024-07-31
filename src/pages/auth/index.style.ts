export default {
  rootStyle: (theme: any) => ({
    width: "100%",
    margin: "0 auto",
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3, 0),
    borderRadius: `${theme.shape.borderRadius}px`,
    // boxShadow: theme.customShadows.z8,
  }),
};
