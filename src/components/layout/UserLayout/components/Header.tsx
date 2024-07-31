/* Imports */
import { memo } from "react";
import {
  Box,
  Container,
  IconButton,
  Stack,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useLocation } from "react-router-dom";

/* Relative Imports */
import AccountPopover from "components/AccountPopover";
import breakpoints from "theme/breakpoints";
import { PAGE_USER_DASHBOARD } from "routes/paths";

/* Local Imports */
import styles from "../index.style";

// ----------------------------------------------------------------------

/* Types/Interfaces */
export interface HeaderProps {
  onMobileNavOpen: any;
}

// ----------------------------------------------------------------------

const Header = ({ onMobileNavOpen }: HeaderProps): JSX.Element => {
  /* Hooks */
  const theme = useTheme();
  const location = useLocation();
  const laptopDownMatches = useMediaQuery(
    theme.breakpoints.down(breakpoints.values.laptop)
  );

  /* Constants */
  const isCalendarPage =
    location.pathname === PAGE_USER_DASHBOARD.calender.absolutePath;

  /* Output */
  return (
    <Container
      maxWidth={false}
      sx={{
        ...styles.header,
        backgroundColor: isCalendarPage ? "white" : "#F2F5FF",
      }}
    >
      <Stack
        flexDirection={"row"}
        justifyContent={"center"}
        alignItems={"space-between"}
      >
        {laptopDownMatches && (
          <IconButton
            color="inherit"
            onClick={onMobileNavOpen}
            sx={styles.menuIcon}
          >
            <Box
              component="img"
              alt="i"
              src="/icons/hamburger.svg"
              width={30}
            />
          </IconButton>
        )}
        <Box sx={styles.rightOptions}>
          <AccountPopover />
        </Box>
      </Stack>
    </Container>
  );
};

export default memo(Header);
