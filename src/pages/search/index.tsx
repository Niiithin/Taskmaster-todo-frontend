import React, { useCallback, useState } from "react";
import SearchBar from "./components/SearchBar";
import { Box, Typography, CircularProgress, Divider } from "@mui/material";
import { searchToDo } from "services/todo";
import { TodoItem } from "models/todo";
import TaskCardTemplate from "components/TaskCardTemplate/TaskCardTemplate";
import styles from "./index.style";

function SearchPage() {
  const [todoList, setTodoList] = useState<TodoItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = async (query: string) => {
    setIsLoading(true);
    setSearchQuery(query);

    if (query.trim() === "") {
      setTodoList([]);
      setIsLoading(false);
      return;
    }

    try {
      const searchResponse = await searchToDo(query, "1");
      if (searchResponse.status === 200) {
        setTodoList(searchResponse.data.todos);
      }
    } catch (error) {
      console.error(error);
      setTodoList([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleStatusChange = useCallback(
    (todoId: string, newStatus: TodoItem["status"]) => {
      setTodoList((prevList) =>
        prevList.map((todo) =>
          todo._id === todoId ? { ...todo, status: newStatus } : todo
        )
      );
      handleSearch(searchQuery); // Refetch search results after status change
    },
    [searchQuery]
  );

  const handleTaskUpdated = useCallback(() => {
    handleSearch(searchQuery);
  }, [searchQuery]);

  const renderContent = () => {
    if (isLoading) {
      return (
        <Box sx={styles.loaderContainer}>
          <CircularProgress size={40} />
        </Box>
      );
    }

    if (searchQuery.trim() === "") {
      return (
        <Box sx={styles.noTaskContainer}>
          <Typography variant="h4">
            <b>Search for your tasks</b>
          </Typography>
        </Box>
      );
    }

    if (todoList.length > 0) {
      return (
        <>
          <Typography variant="h3" sx={styles.searchHeading}>
            Search Results
          </Typography>
          <Divider />
          <Box mt={4}>
            {todoList.map((item) => (
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
        </>
      );
    }

    return (
      <Box sx={styles.noTaskContainer}>
        <Typography variant="h4">
          <b>No results found</b>
        </Typography>
      </Box>
    );
  };

  return (
    <Box sx={styles.searchRootStyles}>
      <SearchBar onSearch={handleSearch} />
      <Box mt={3}>{renderContent()}</Box>
    </Box>
  );
}

export default SearchPage;
