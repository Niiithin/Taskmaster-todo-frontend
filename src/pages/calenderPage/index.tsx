/*Imports */
import React, { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Box,
  FormControl,
  Select,
  MenuItem,
  Typography,
  Pagination,
  SelectChangeEvent,
} from "@mui/material";
import dayjs, { Dayjs } from "dayjs";
import { useLocation } from "react-router-dom";

/* Relative Imports */
import TaskCardTemplate from "components/TaskCardTemplate/TaskCardTemplate";
import LinearDatePicker from "./components/DatePicker";
import { getAllTodosByDate } from "services/todo";
import { TodoItem } from "models/todo";

/* Local Imports */
import styles from "./index.style";

// ----------------------------------------------------------------------

export const Calendar = (): JSX.Element => {
  /* Hooks */
  const location = useLocation();
  const initialFilter = location.state?.initialFilter || "All Tasks";
  /* States */
  const [selectedDate, setSelectedDate] = useState<Dayjs>(dayjs());
  const [todoList, setTodoList] = useState<TodoItem[]>([]);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [page, setPage] = useState<number>(1);
  const [status, setStatus] = useState<string>(initialFilter);

  /* Functions */
  const getAllTodoList = useCallback(async () => {
    try {
      const dateString = selectedDate.format("YYYY-MM-DDTHH:mm:ss[Z]");
      const statusParam = status === "All Tasks" ? "" : status;
      const response = await getAllTodosByDate(
        page.toString(),
        dateString,
        statusParam
      );
      setTodoList(response.data.todos);
      setTotalPages(response.data.totalPages);
    } catch (error: any) {
      console.log(error);
      setTodoList([]);
      setTotalPages(1);
    }
  }, [selectedDate, status, page]);
  console.log(todoList, "list");
  useEffect(() => {
    getAllTodoList();
  }, [selectedDate, getAllTodoList, status, page]);

  const handleTaskAdded = useCallback(() => {
    getAllTodoList();
  }, [getAllTodoList]);

  const handleStatusChange = useCallback(
    (todoId: string, newStatus: TodoItem["status"]) => {
      setTodoList((prevList) =>
        prevList.map((todo) =>
          todo._id === todoId ? { ...todo, status: newStatus } : todo
        )
      );
      getAllTodoList();
    },
    [getAllTodoList]
  );

  const handleFilterChange = (event: SelectChangeEvent<string>) => {
    setStatus(event.target.value);
    setPage(1);
  };

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  const pageVariants = {
    initial: { opacity: 0, y: 50 },
    in: { opacity: 1, y: 0 },
    out: { opacity: 0, y: -50 },
  };

  const pageTransition = {
    type: "tween",
    ease: "anticipate",
    duration: 0.5,
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  /* Output */
  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
    >
      <Box>
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <LinearDatePicker
            selectedDate={selectedDate}
            onDateChange={setSelectedDate}
            onTaskAdded={handleTaskAdded}
          />
        </motion.div>
      </Box>
      <Box sx={styles.selectRootStyles}>
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <Typography variant="h3" sx={styles.taskTextStyles} mb={2}>
            Tasks
          </Typography>
        </motion.div>
        <motion.div
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <Typography variant="caption" sx={styles.taskTextStyles}>
            Status
          </Typography>
          <FormControl fullWidth>
            <Select
              id="task-filter"
              value={status}
              onChange={handleFilterChange}
              displayEmpty
              MenuProps={styles.menuProps}
              sx={styles.selectStyles}
            >
              <MenuItem value="All Tasks">
                <Typography variant="caption" sx={styles.taskTextStyles}>
                  All Tasks
                </Typography>
              </MenuItem>
              <MenuItem value="Completed">
                <Typography variant="caption" sx={styles.taskTextStyles}>
                  Completed
                </Typography>
              </MenuItem>
              <MenuItem value="NotCompleted">
                <Typography variant="caption" sx={styles.taskTextStyles}>
                  Not Completed
                </Typography>
              </MenuItem>
              <MenuItem value="Postponed">
                <Typography variant="caption" sx={styles.taskTextStyles}>
                  Postponed
                </Typography>
              </MenuItem>
              <MenuItem value="Cancelled">
                <Typography variant="caption" sx={styles.taskTextStyles}>
                  Cancelled
                </Typography>
              </MenuItem>
            </Select>
          </FormControl>
        </motion.div>
      </Box>
      <Box mb={10}>
        <AnimatePresence>
          {todoList.length > 0 ? (
            todoList.map((list, index) => (
              <motion.div
                key={list._id}
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                transition={{ delay: index * 0.1, duration: 0.3 }}
              >
                <Box mb={2} marginX={3}>
                  <TaskCardTemplate
                    todoId={list._id}
                    title={list.title}
                    todoStatus={list.status}
                    description={list.description}
                    dueDate={list.dueDate}
                    onStatusChange={handleStatusChange}
                    onTaskUpdated={handleTaskAdded}
                  />
                </Box>
              </motion.div>
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Typography variant="body1" textAlign="center" my={4}>
                No Tasks to display
              </Typography>
            </motion.div>
          )}
        </AnimatePresence>
      </Box>
      {totalPages > 1 && (
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <Box display="flex" justifyContent="center" mt={3} mb={2}>
            <Pagination
              count={totalPages}
              page={page}
              onChange={handlePageChange}
              color="primary"
            />
          </Box>
        </motion.div>
      )}
    </motion.div>
  );
};

export default Calendar;
