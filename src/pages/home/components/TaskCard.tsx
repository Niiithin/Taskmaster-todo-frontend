/*Imports */
import { Box, Button, Stack, Typography, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";

/* Relative Imports */
import { PAGE_USER_DASHBOARD } from "routes/paths";

/* Local Imports */
import styles from "../index.style";

// ----------------------------------------------------------------------

/* Interface */
interface TaskCardProps {
  navigateTo: "myTasks" | "teamTasks";
  title: string;
  subtitle: string;
}

// ----------------------------------------------------------------------

function TaskCard({ navigateTo, title, subtitle }: TaskCardProps) {
  /* Hooks */
  const navigate = useNavigate();
  const theme = useTheme();

  /* Functions */
  const handleClick = () => {
    if (navigateTo === "myTasks") {
      navigate(PAGE_USER_DASHBOARD.home.myTasks.relativePath);
    } else if (navigateTo === "teamTasks") {
      navigate(PAGE_USER_DASHBOARD.home.teamTasks.relativePath);
    }
  };

  /* Output */
  return (
    <Stack
      flexDirection="row"
      alignItems="center"
      justifyContent="center"
      sx={{ ...styles.cardRootStyles(theme), cursor: "pointer" }}
      onClick={handleClick}
      gap={2}
    >
      <Box
        component="img"
        alt="i"
        src="/icons/calendar_selected.svg"
        width="40px"
      />
      <Stack justifyContent="center" alignItems="flex-start" flex={1}>
        <Typography variant="body1">{title}</Typography>
      </Stack>
      <Button id="basic-button" sx={{ padding: 0, minWidth: "auto" }}>
        <Box component="img" alt="options" src="/icons/options_icon.svg" />
      </Button>
    </Stack>
  );
}

export default TaskCard;
