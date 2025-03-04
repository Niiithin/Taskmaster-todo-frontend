/* Imports */
import React, { memo } from "react";
import { Box, Popover, PopoverProps } from "@mui/material";

/* Local Imports */
import styles from "./index.style";

// ----------------------------------------------------------------------

/* Types/Interfaces */
/**
 * Displays some content on top of another
 *
 * @interface MenuPopoverProps
 * @property {node} children - contains data or component
 * @property {boolean} showIndicator - is used to show arrow
 * @property {object|function} contentStyle - is used for styling
 * @property {object|function} indicatorStyle - is used for styling the arrow
 */
export interface MenuPopoverProps extends PopoverProps {
  children: React.ReactNode;
  showIndicator?: boolean;
  contentStyle?: object | (() => void);
  indicatorStyle?: object | (() => void);
}

// ----------------------------------------------------------------------
/**
 * Displays some content on top of another
 *
 * @component
 * @param {node} children - contains data or component
 * @param {boolean} showIndicator - is used to show arrow
 * @param {object|function} contentStyle - is used for styling
 * @param {object|function} indicatorStyle - is used for styling the arrow
 *
 * @returns {JSX.Element}
 */
const MenuPopover = ({
  showIndicator = false,
  contentStyle = {},
  indicatorStyle = {},
  children,
  ...other
}: MenuPopoverProps): JSX.Element => {
  /* Output */
  return (
    <Popover
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      PaperProps={{
        sx: [styles.popover, contentStyle],
      }}
      {...other}
    >
      {showIndicator && <Box sx={[styles.arrowStyle, indicatorStyle]} />}
      {children}
    </Popover>
  );
};

export default memo(MenuPopover);
