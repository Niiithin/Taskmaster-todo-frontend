/* Imports */
import { alpha } from "@mui/material";

export default {
  rootStyle: (theme: any) => ({
    flexGrow: 1,
    height: "100%",
    overflow: "hidden",
    "& .simplebar-scrollbar": {
      "&:before": {
        backgroundColor: alpha(theme.palette.grey[600], 0.48),
      },
      "&.simplebar-visible:before": {
        opacity: 1,
      },
    },
    "& .simplebar-track.simplebar-vertical": {
      width: 10,
    },
    "& .simplebar-track.simplebar-horizontal .simplebar-scrollbar": {
      height: 6,
    },
    "& .simplebar-mask": {
      zIndex: "inherit",
    },
  }),
};
