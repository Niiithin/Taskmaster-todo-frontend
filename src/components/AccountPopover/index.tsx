/*Imports */
import { memo, useContext, useState } from "react";
import {
  Box,
  Button,
  IconButton,
  Typography,
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

/* Relative Imports */
import MenuPopover from "components/MenuPopover";
import { ConfirmDialog } from "components/Dialog";
import SessionContext from "context/SessionContext";

/* Local Imports */
import styles from "./index.style";

// ----------------------------------------------------------------------

const AccountPopover = (): JSX.Element => {
  /* States */
  const { user, LogoutUser } = useContext(SessionContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  /* Constants */
  const open = Boolean(anchorEl);

  /* Functions */
  const handleOpenMenu = (event: any): void => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = (): void => {
    setAnchorEl(null);
  };

  const handleDialogOpen = (): void => {
    setOpenDialog(true);
  };

  const handleDialogClose = (): void => {
    setOpenDialog(false);
  };

  const handleLogoutCancel = (): void => {
    handleDialogClose();
    handleCloseMenu();
  };

  const handleLogout = (): void => {
    LogoutUser();
  };

  /* Output */
  return (
    <>
      {user && (
        <>
          <IconButton onClick={handleOpenMenu}>
            <Avatar
              alt={user.username}
              src="/icons/account_icon.svg"
              sx={{ width: 40, height: 40 }}
            />
          </IconButton>
          <MenuPopover
            id="logout"
            open={open}
            anchorEl={anchorEl}
            onClose={handleCloseMenu}
            contentStyle={styles.accountPopover}
          >
            <Box sx={styles.popoverHeader}>
              <Avatar
                alt={user.username}
                src="/icons/account_icon.svg"
                sx={{ width: 60, height: 60, mb: 1 }}
              />
              <Typography variant="h6" sx={styles.username}>
                {user.username}
              </Typography>
            </Box>
            <Divider sx={styles.divider} />
            <List>
              <ListItem>
                <ListItemIcon>
                  <EmailIcon color="primary" />
                </ListItemIcon>
                <ListItemText
                  primary={user.email}
                  primaryTypographyProps={{ variant: "body2" }}
                />
              </ListItem>
            </List>
            <Divider sx={styles.divider} />
            <Box sx={styles.logoutButtonContainer}>
              <Button
                variant="text"
                color="primary"
                startIcon={<ExitToAppIcon />}
                onClick={handleDialogOpen}
                fullWidth
                sx={styles.logoutButton}
              >
                Logout
              </Button>
            </Box>
          </MenuPopover>
          <ConfirmDialog
            open={openDialog}
            description="Are you sure you want to Logout?"
            agreeText="Logout"
            disagreeText="Cancel"
            disagreeButton={true}
            onAgreeAction={handleLogout}
            onDisAgreeAction={handleLogoutCancel}
          />
        </>
      )}
    </>
  );
};

export default memo(AccountPopover);
