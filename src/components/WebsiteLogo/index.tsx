/* Imports */
import { memo } from "react";
import { Link as RouterLink } from "react-router-dom";
import { Box, BoxProps, Link } from "@mui/material";

/* Relative Imports */
import { ROOT_PATH } from "routes/paths";
/* Local Imports */
import styles from "./index.style";

// ----------------------------------------------------------------------

/* Types/Interfaces */
/**
 * styling the logo for Website.
 *
 * @interface BoxProps
 * @property {boolean} isIcon - flag to show original logo or icon
 */
export interface Props extends BoxProps {
  isIcon?: boolean;
  isClickable?: boolean;
}

// ----------------------------------------------------------------------

/**
 * styling the logo for Website.
 *
 * @component
 * @param {boolean} isIcon - flag to show original logo or icon
 * @returns {JSX.Element}
 */
const WebsiteLogo = ({
  isIcon = false,
  isClickable = true,
  ...other
}: Props): JSX.Element => {
  /* Hooks */

  /* Output */
  return isClickable ? (
    <Link
      component={RouterLink}
      underline="none"
      to={ROOT_PATH}
      sx={styles.logoLink}
    >
      <Box
        component="img"
        alt="logo"
        src={"/images/researchify_labs_logo.jpg"}
        sx={styles.logo}
        {...other}
      />
    </Link>
  ) : (
    <Box sx={styles.logoLink}>
      <Box
        component="img"
        alt="logo"
        src={"/images/researchify_labs_logo.jpg"}
        sx={styles.logo}
        {...other}
      />
    </Box>
  );
};

export default memo(WebsiteLogo);
