/*Imports */
import { memo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Box, ListItemButton, ListItemText } from "@mui/material";
// ----------------------------------------------------------------------

/* Interface */

export interface SidebarItemProps {
  icon: string;
  selectedIcon: string;
  title: string;
  href: string;
}

const SidebarItem = ({
  icon,
  selectedIcon,
  title,
  href,
  ...other
}: SidebarItemProps): JSX.Element => {
  /* Hooks */
  const { pathname } = useLocation();
  const navigate = useNavigate();

  /* Constants */
  const isActive = pathname.includes(href);

  /* Output */
  return (
    <ListItemButton
      selected={isActive}
      onClick={() => navigate(href)}
      {...other}
    >
      <Box
        component="img"
        alt={title}
        src={isActive ? selectedIcon : icon}
        width="25px"
        marginRight={2}
      />
      <ListItemText
        primary={title}
        primaryTypographyProps={{
          variant: "body1",
        }}
      />
    </ListItemButton>
  );
};

export default memo(SidebarItem);
