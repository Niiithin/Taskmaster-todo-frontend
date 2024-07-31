import { useCallback, useEffect, useState } from "react";
import { Box, Divider, Typography, CircularProgress } from "@mui/material";
import TaskCardTemplate from "components/TaskCardTemplate/TaskCardTemplate";
import { getAllTodos } from "services/todo";
import styles from "./index.style";

interface TaskListProps {
  title: string;
}

interface TodoItem {
  collaboration: string[];
  completedDate: string | null;
  creator: string;
  description: string;
  dueDate: string;
  scheduleDate: string;
  status: "NotCompleted" | "Completed" | "Postponed" | "Cancelled";
  title: string;
  _id: string;
}

const TaskList = ({ title }: TaskListProps): JSX.Element => {
  const [todoItem, setTodoItem] = useState<TodoItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const getAllToDoRequest = async () => {
    setIsLoading(true);
    try {
      const response = await getAllTodos();
      if (response.status === 200) {
        setTodoItem(response.data.todos);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleStatusChange = useCallback(
    (todoId: string, newStatus: TodoItem["status"]) => {
      setTodoItem((prevList) =>
        prevList.map((todo) =>
          todo._id === todoId ? { ...todo, status: newStatus } : todo
        )
      );
      getAllToDoRequest();
    },
    [getAllToDoRequest]
  );

  const handleTaskUpdated = useCallback(() => {
    getAllToDoRequest();
  }, []);

  useEffect(() => {
    getAllToDoRequest();
  }, []);

  const filteredTasks = todoItem.filter((item) => {
    if (title === "My Tasks") {
      return item.collaboration.length <= 1;
    } else if (title === "Team Tasks") {
      return item.collaboration.length > 1;
    }
    return true; // For any other title, show all tasks
  });

  const getEmptyMessage = () => {
    if (title === "My Tasks") {
      return "No personal tasks to display";
    } else if (title === "Team Tasks") {
      return "No team tasks to display";
    }
    return "No tasks to display";
  };

  return (
    <Box mt={3} mb={8}>
      <Typography variant="h3" sx={styles.title}>
        {title}
      </Typography>
      <Divider />
      <Box mb={8} mt={4}>
        {isLoading ? (
          <Box sx={styles.loaderContainer}>
            <CircularProgress />
          </Box>
        ) : filteredTasks.length > 0 ? (
          filteredTasks.map((item) => (
            <Box key={item._id} mb={2} marginX={3}>
              <TaskCardTemplate
                todoId={item._id}
                title={item.title}
                todoStatus={item.status}
                dueDate={item.dueDate}
                description={item.description}
                onStatusChange={handleStatusChange}
                onTaskUpdated={handleTaskUpdated}
              />
            </Box>
          ))
        ) : (
          <Box sx={styles.emptyContainer}>
            <Typography variant="h3">{getEmptyMessage()}</Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default TaskList;
