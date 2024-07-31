/* Imports */
import { memo, useEffect } from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";
import {
  Box,
  Divider,
  Drawer,
  Link,
  List,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";

/* Relative Imports */
import Scrollbar from "components/Scrollbar";
import breakpoints from "theme/breakpoints";

/* Local Imports */
import { SidebarItem } from ".";
import sidebarConfig from "../helper/sidebarConfig";
import styles from "../index.style";

// ----------------------------------------------------------------------

/* Types/Interfaces */
/**
 * Interface used to create side bar/drawer for all admin pages.
 *
 * @interface SidebarProps
 * @property {boolean} openMobile - flag to check if drawer is open/close
 * @property {function} onMobileClose - callback function to change the state of openMobile
 */
export interface SidebarProps {
  openMobile: boolean;
  onMobileClose: any;
}

// ----------------------------------------------------------------------

/**
 * Side bar/drawer for all admin pages.
 *
 * @component
 * @param {boolean} openMobile - flag to check if drawer is open/close
 * @param {function} onMobileClose - callback function to change the state of openMobile
 * @returns {JSX.Element}
 */
// function Sidebar({ openMobile, onMobileClose }) {
const Sidebar = ({ openMobile, onMobileClose }: SidebarProps): JSX.Element => {
  /* Hooks */
  const theme = useTheme();
  const location = useLocation();
  const laptopDownMatches = useMediaQuery(
    theme.breakpoints.down(breakpoints.values.laptop)
  );
  let sidebarPages = [...sidebarConfig];

  /* Side-Effects */
  useEffect(() => {
    if (openMobile) {
      onMobileClose();
    }
  }, [location.pathname]);

  /* Hooks */
  const content = (
    <Stack height="100%">
      <Box sx={styles.logoContainer} mt={1}>
        <Box
          component="img"
          alt="logo"
          src={"/images/researchify_labs_logo.jpg"}
          sx={{ width: 50, height: 50 }}
        />
      </Box>
      <Box sx={styles.userProfile}>
        <Box flex={1}>
          <Link
            component={RouterLink}
            underline="none"
            color="text.primary"
            to={"/"}
          >
            <Typography variant="h3" noWrap>
              Taskmaster
            </Typography>
          </Link>
        </Box>
      </Box>
      <Divider />
      <Box sx={styles.listContainer}>
        <Scrollbar>
          <List sx={styles.sidebarList}>
            {sidebarPages.map((item, index) => (
              <SidebarItem
                href={item.href}
                key={index}
                title={item.title}
                icon={item.icon}
                selectedIcon={item.selectedIcon}
              />
            ))}
          </List>
        </Scrollbar>
      </Box>
    </Stack>
  );

  /* Output */
  return (
    <>
      {laptopDownMatches ? (
        <Drawer
          anchor="left"
          variant="temporary"
          open={openMobile}
          onClose={onMobileClose}
          PaperProps={{
            sx: styles.sidebarDrawer,
          }}
        >
          {content}
        </Drawer>
      ) : (
        <Box sx={styles.leftPanel}>{content}</Box>
      )}
    </>
  );
};

export default memo(Sidebar);
