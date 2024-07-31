/*Imports */
import { useCallback, useEffect, useState } from "react";
import { Box, Divider, Typography } from "@mui/material";

/* Relative Imports */
import TaskCardTemplate from "components/TaskCardTemplate/TaskCardTemplate";
import { TodoItem } from "models/todo";
import { getAllTodos } from "services/todo";

/* Local Imports */
import styles from "./index.style";

// ----------------------------------------------------------------------

/* Interface */
interface TaskListProps {
  title: string;
}

// ----------------------------------------------------------------------

const TaskList = ({ title }: TaskListProps): JSX.Element => {
  /* States */
  const [todoItem, setTodoItem] = useState<TodoItem[]>([]);

  /* Functions */
  const getAllToDoRequest = async () => {
    try {
      const response = await getAllTodos();
      console.log(response, "res");
      if (response.status === 200) {
        setTodoItem(response.data.todos);
      }
    } catch (error) {
      console.log(error);
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

  /*Side-Effects*/
  useEffect(() => {
    getAllToDoRequest();
  }, []);

  /* Output */
  return (
    <Box mt={3} mb={8}>
      <Typography variant="h3" sx={styles.title}>
        {title}
      </Typography>
      <Divider />
      <Box mb={8} mt={4}>
        {todoItem.map((item) => (
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
        ))}
      </Box>
    </Box>
  );
};

export default TaskList;
