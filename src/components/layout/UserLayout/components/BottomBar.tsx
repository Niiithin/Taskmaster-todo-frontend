/*Imports */
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";

/* Relative Imports */
import sidebarConfig from "../helper/sidebarConfig";

/* Local Imports */
import styles from "../index.style";

const BottomNav: React.FC = () => {
  /* Hooks */
  const location = useLocation();
  const navigate = useNavigate();

  /* Output */
  return (
    <Paper
      sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
      elevation={3}
    >
      <BottomNavigation
        showLabels
        value={location.pathname}
        onChange={(event, newValue) => {
          navigate(newValue);
        }}
        sx={styles.bottomNavigation}
      >
        {sidebarConfig.map((item) => (
          <BottomNavigationAction
            key={item.title}
            value={item.href}
            icon={
              <img
                src={
                  location.pathname === item.href
                    ? item.selectedIcon
                    : item.icon
                }
                alt={item.title}
                width="24"
                height="24"
              />
            }
          />
        ))}
      </BottomNavigation>
    </Paper>
  );
};

export default BottomNav;
