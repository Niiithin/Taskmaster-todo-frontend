import { Box, Button, Stack, Typography } from "@mui/material";
import React from "react";
import styles from "../index.style";
function TaskCard() {
  return (
    <Stack
      flexDirection="row"
      alignItems="center"
      justifyContent="center"
      sx={styles.cardRootStyles}
      gap={2}
    >
      <Box
        component="img"
        alt="i"
        src="/icons/calendar_selected.svg"
        width="40px"
      />
      <Stack justifyContent="center" alignItems="flex-start" flex={1}>
        <Typography variant="body1">My Tasks</Typography>
        <Typography variant="body2">2 days ago</Typography>
      </Stack>
      <Button id="basic-button" sx={{ padding: 0, minWidth: "auto" }}>
        <Box component="img" alt="options" src="/icons/options_icon.svg" />
      </Button>
    </Stack>
  );
}

export default TaskCard;
