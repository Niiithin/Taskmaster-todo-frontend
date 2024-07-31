/*Imports */
import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  CircularProgress,
  Stack,
  Box,
  Divider,
} from "@mui/material";

/* Relative Imports */
import { TodoItem } from "models/todo";
import { getTodoById } from "services/todo";
import { formatDate } from "helper/todoHealper";

/* Local Imports */
import styles from "./index.style";

// ----------------------------------------------------------------------

/* Interface */
interface TaskDetailDialogProps {
  open: boolean;
  onClose: () => void;
  todoId: string;
}

// ----------------------------------------------------------------------

const TaskDialogBox: React.FC<TaskDetailDialogProps> = ({
  open,
  onClose,
  todoId,
}) => {
  /* States */
  const [todo, setTodo] = useState<TodoItem | null>(null);
  const [loading, setLoading] = useState(true);

  /* Functions */
  const getTodoByIdRequest = async () => {
    setLoading(true);
    try {
      const response = await getTodoById(todoId);
      if (response.status === 200) {
        setTodo(response.data.todo);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Cancelled":
        return "#FF7777";
      case "Completed":
        return "#B4E380";
      case "NotCompleted":
        return "#FFFFFF";
      default:
        return "#FFFFFF";
    }
  };

  const formatStatus = (status: string): string => {
    if (status === "NotCompleted") {
      return "Not Completed";
    }
    return status;
  };

  /*Side-Effects*/
  useEffect(() => {
    if (open && todoId) {
      getTodoByIdRequest();
    }
  }, [open, todoId]);

  /* Output */
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      {todo && (
        <Box
          sx={{
            height: "10px",
            width: "100%",
            backgroundColor: getStatusColor(todo.status),
          }}
        />
      )}
      <DialogContent>
        {loading ? (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="200px"
          >
            <CircularProgress />
          </Box>
        ) : todo ? (
          <>
            <Box>
              <Typography variant="h2" sx={styles.title}>
                {todo.title}
              </Typography>
              <Stack
                flexDirection={"row"}
                alignItems={"center"}
                gap={1}
                mt={2}
                mb={2}
              >
                {todo.collaboration && todo.collaboration.length > 1 ? (
                  <Typography variant="caption" sx={styles.caption}>
                    Team <b>|</b>
                  </Typography>
                ) : (
                  <Typography variant="caption">
                    Personal <b>|</b>
                  </Typography>
                )}
                <Typography variant="caption">
                  {formatStatus(todo.status)}
                </Typography>
              </Stack>
            </Box>
            <Divider />
            <Stack flexDirection={"row"} alignItems={"center"} gap={3}>
              <Typography>
                <b>Start Date: </b> {formatDate(todo.scheduleDate)}
              </Typography>
              <Typography>
                <b>Due Date:</b> {formatDate(todo.dueDate)}
              </Typography>
            </Stack>
            <Divider />
            <Typography variant="body1" mt={2}>
              <b>Description :</b>
            </Typography>
            <Typography variant="body1" mt={1} ml={3}>
              {todo.description}
            </Typography>
            <Box mt={2}>
              {todo.collaboration && todo.collaboration.length > 1 ? (
                <>
                  <Typography variant="body1">
                    <b>Collaborated With :</b>
                  </Typography>
                  {todo.collaboration.slice(1).map((item, index) => (
                    <Typography variant="body1" key={index}>
                      - {item.email}
                    </Typography>
                  ))}
                </>
              ) : (
                <Typography variant="subtitle1">
                  No collaborates for this task
                </Typography>
              )}
            </Box>
          </>
        ) : (
          <Typography>No data available</Typography>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="contained">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TaskDialogBox;
