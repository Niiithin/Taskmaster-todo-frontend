/*Imports */
import React, { useContext, useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Box,
  Button,
  Typography,
  useMediaQuery,
  useTheme,
  CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

/* Relative Imports */
import SessionContext from "context/SessionContext";
import ProjectCard from "./components/ProjectCard";
import TaskCard from "./components/TaskCard";
import { getAllTodos } from "services/todo";
import AddTask from "pages/calenderPage/components/AddTask";
import breakpoints from "theme/breakpoints";
import { PAGE_USER_DASHBOARD } from "routes/paths";

/* Local Imports */
import styles from "./index.style";

// ----------------------------------------------------------------------

/* Interface */
interface TodoItem {
  description: string;
  dueDate: string;
  status: "NotCompleted" | "Completed" | "Cancelled" | "Postponed";
  title: string;
  _id: string;
}

// ----------------------------------------------------------------------

const Home: React.FC = () => {
  /* Hooks */
  const { user } = useContext(SessionContext);
  const theme = useTheme();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  /* States */
  const [scrollPosition, setScrollPosition] = useState(0);
  const [todoItem, setTodoItem] = useState<TodoItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [addTaskDialogOpen, setAddTaskDialogOpen] = useState(false);
  const isXs = useMediaQuery(
    theme.breakpoints.between(0, breakpoints.values.sm - 1)
  );
  const isSm = useMediaQuery(
    theme.breakpoints.between(breakpoints.values.sm, breakpoints.values.md - 1)
  );
  const isMd = useMediaQuery(
    theme.breakpoints.between(breakpoints.values.md, breakpoints.values.lg - 1)
  );

  /* Functions */
  const getCardSize = () => {
    if (isXs) return { width: 250, height: 150 };
    if (isSm) return { width: 280, height: 170 };
    if (isMd) return { width: 300, height: 180 };
    return { width: 320, height: 200 };
  };

  const { width, height } = getCardSize();

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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  const handleButtonClick = (filter: string) => {
    navigate(PAGE_USER_DASHBOARD.calender.absolutePath, {
      state: { initialFilter: filter },
    });
  };

  const buttons = [
    { text: "My Tasks", filter: "All Tasks" },
    { text: "In-Progress", filter: "NotCompleted" },
    { text: "Completed", filter: "Completed" },
  ];

  /*Side-Effects*/
  useEffect(() => {
    getAllToDoRequest();
    const handleScroll = () => {
      if (scrollRef.current) {
        const scrollPosition = scrollRef.current.scrollLeft;
        const maxScroll =
          scrollRef.current.scrollWidth - scrollRef.current.clientWidth;
        setScrollPosition(scrollPosition / maxScroll);
      }
    };

    const scrollContainer = scrollRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  /* Output */
  return (
    <Box
      component={motion.div}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      sx={styles.rootStyles(theme)}
    >
      {user && (
        <Box component={motion.div} variants={itemVariants}>
          <Typography variant="h1" sx={styles.mainText(theme)}>
            Hello, {user.username}!
          </Typography>
        </Box>
      )}
      <Box component={motion.div} variants={itemVariants}>
        <Typography variant="h4" sx={styles.subText(theme)}>
          Have a nice day.
        </Typography>
      </Box>

      <Box
        component={motion.div}
        variants={itemVariants}
        sx={styles.buttonRootContainer}
      >
        {buttons.map((button) => (
          <Button
            key={button.text}
            variant="contained"
            color="primary"
            sx={styles.buttonContainer}
            onClick={() => handleButtonClick(button.filter)}
          >
            <Typography
              variant={isXs ? "body2" : "body1"}
              sx={styles.buttonText}
            >
              {button.text}
            </Typography>
          </Button>
        ))}
      </Box>
      <Box
        component={motion.div}
        variants={itemVariants}
        ref={scrollRef}
        sx={{
          display: "flex",
          overflowX: "auto",
          scrollSnapType: "x mandatory",
          scrollbarWidth: "none",
          marginTop: theme.spacing(6),
          marginLeft: theme.spacing(-1),
          marginRight: theme.spacing(-1),
        }}
      >
        {isLoading ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              height: height,
            }}
          >
            <CircularProgress />
          </Box>
        ) : todoItem.length === 0 ? (
          <Box
            sx={{
              flexShrink: 0,
              width: { xs: "100%", sm: "50%", md: "25%" },
              scrollSnapAlign: "start",
              px: 1,
            }}
          >
            <Box
              sx={{
                transition: isMobile
                  ? "none"
                  : "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
                height,
                width,
                display: "flex",
                cursor: "pointer",
                background: "linear-gradient(20deg, #4442E5 0%, #8330E5 100%)",
                borderRadius: theme.shape.borderRadius,
                padding: theme.spacing(2),
                alignItems: "center",
                justifyContent: "center",
              }}
              onClick={() => setAddTaskDialogOpen(true)}
            >
              <Typography
                variant="h4"
                color={"#fff"}
                sx={{ textAlign: "center" }}
              >
                <b>Create your first task</b>
              </Typography>
            </Box>
          </Box>
        ) : (
          todoItem.map((item, index) => (
            <Box
              key={index}
              sx={{
                flexShrink: 0,
                width: { xs: "100%", sm: "50%", md: "25%" },
                scrollSnapAlign: "start",
                px: 1,
              }}
            >
              <Box
                sx={{
                  transition: isMobile
                    ? "none"
                    : "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
                  "&:hover": isMobile
                    ? {}
                    : {
                        transform: "translateY(-10px)",
                        boxShadow: "0 10px 20px rgba(0,0,0,0.2)",
                      },
                  height: "100%",
                  display: "flex",
                }}
              >
                <ProjectCard
                  todoIndex={index}
                  todoId={item._id}
                  todoDate={item.dueDate}
                  todoName={item.title}
                />
              </Box>
            </Box>
          ))
        )}
      </Box>

      <Box
        component={motion.div}
        variants={itemVariants}
        sx={{
          display: "flex",
          justifyContent: "center",
          marginTop: theme.spacing(2),
        }}
      >
        {todoItem &&
          todoItem.length > 0 &&
          todoItem.map((_, index) => {
            const dotPosition = index / (todoItem.length - 1);
            const distance = Math.abs(dotPosition - scrollPosition);
            const scale = 1 - Math.min(distance * 2, 0.5);
            return (
              <Box
                key={index}
                sx={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  backgroundColor: theme.palette.primary.main,
                  mx: 0.5,
                  transform: `scale(${scale})`,
                  opacity: scale,
                  transition: "transform 0.3s ease, opacity 0.3s ease",
                }}
              />
            );
          })}
      </Box>

      <Box
        component={motion.div}
        variants={itemVariants}
        sx={{ marginTop: theme.spacing(4) }}
      >
        <Typography variant="h3">Progress</Typography>
        <Box component={motion.div} variants={itemVariants}>
          <TaskCard
            navigateTo="myTasks"
            title="My Tasks"
            subtitle="2 days ago"
          />
        </Box>
        <Box component={motion.div} variants={itemVariants}>
          <TaskCard
            navigateTo="teamTasks"
            title="Team Tasks"
            subtitle="1 day ago"
          />
        </Box>
      </Box>

      <AddTask
        open={addTaskDialogOpen}
        onClose={() => setAddTaskDialogOpen(false)}
        onTaskAdded={() => {
          setAddTaskDialogOpen(false);
          getAllToDoRequest();
        }}
      />
    </Box>
  );
};

export default Home;
