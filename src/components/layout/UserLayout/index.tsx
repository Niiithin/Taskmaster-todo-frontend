/*Imports */
import React, { useState } from "react";
import { Box, useMediaQuery, useTheme } from "@mui/material";

/* Relative Imports */
import { Header, Sidebar } from "./components";
import breakpoints from "theme/breakpoints";
import BottomNav from "./components/BottomBar";

/* Local Imports */
import styles from "./index.style";

//---------------------------------------------------------------------------------------

export interface UserDashboardLayoutProps {
  children: React.ReactNode;
}

const UserDashboardLayout: React.FC<UserDashboardLayoutProps> = ({
  children,
}): JSX.Element => {
  /* States */
  const [isMobileNavOpen, setMobileNavOpen] = useState(false);

  /* Constants */
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down(breakpoints.values.sm));

  /* Output */
  return (
    <Box sx={styles.rootStyle}>
      <Sidebar
        openMobile={isMobileNavOpen}
        onMobileClose={() => setMobileNavOpen(false)}
      />
      <Box sx={styles.wrapperStyle}>
        <Header onMobileNavOpen={() => setMobileNavOpen(true)} />
        <Box
          sx={{
            ...styles.containerStyle,
          }}
        >
          {children}
        </Box>
        {isMobile && <BottomNav />}
      </Box>
    </Box>
  );
};

export default UserDashboardLayout;
