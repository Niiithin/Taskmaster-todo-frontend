/*Imports */
import { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Stack,
  useTheme,
  useMediaQuery,
} from "@mui/material";

/* Relative Imports */
import breakpoints from "theme/breakpoints";
import { formatDate } from "helper/todoHealper";
import TaskDialogBox from "components/TaskCardTemplate/components/TaskDialogBox";

/* Local Imports */
import styles from "./index.style";

// ----------------------------------------------------------------------

/* Interface */
interface ProjectCardProps {
  todoIndex: number;
  todoId: string;
  todoName: string;
  todoDate: string;
}

// ----------------------------------------------------------------------

const ProjectCard = ({
  todoIndex,
  todoId,
  todoName,
  todoDate,
}: ProjectCardProps): JSX.Element => {
  /* Hooks */
  const theme = useTheme();
  const isXs = useMediaQuery(
    theme.breakpoints.between(0, breakpoints.values.sm - 1)
  );
  const isSm = useMediaQuery(
    theme.breakpoints.between(breakpoints.values.sm, breakpoints.values.md - 1)
  );
  const isMd = useMediaQuery(
    theme.breakpoints.between(breakpoints.values.md, breakpoints.values.lg - 1)
  );

  /* States */
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  /* Functions */
  const handleCardClick = () => {
    setIsDialogOpen(true);
  };

  const getCardSize = () => {
    if (isXs) return { width: 350, height: 250 };
    if (isSm) return { width: 350, height: 250 };
    if (isMd) return { width: 350, height: 250 };
    return { width: 350, height: 250 }; // default size for lg and above
  };

  const { width, height } = getCardSize();

  /* Output */
  return (
    <>
      <Card
        sx={{ ...styles.cardStyles(theme), width, height, cursor: "pointer" }}
        onClick={handleCardClick}
      >
        {/* Top-right quarter circle */}
        <Box
          sx={{
            position: "absolute",
            top: -height / 2,
            right: -width / 2,
            width: width,
            height: height,
            borderRadius: "100%",
            background: "rgba(0, 0, 0, 0.1)",
          }}
        />

        {/* Bottom-left quarter circle */}
        <Box
          sx={{
            position: "absolute",
            bottom: -height / 2,
            left: -width / 2,
            width: width,
            height: height,
            borderRadius: "50%",
            background: "rgba(0, 0, 0, 0.1)",
          }}
        />

        <CardContent sx={styles.cardContentStyles}>
          <Stack spacing={1}>
            <Stack direction="row" alignItems="center" spacing={1}>
              <Box
                component="img"
                alt="calendar icon"
                src="/icons/project_icon.svg"
                sx={styles.cardBox}
              />
              <Typography
                variant="subtitle1"
                component="div"
                noWrap
                sx={styles.cardHeading}
              >
                Task {todoIndex + 1}
              </Typography>
            </Stack>
            <Typography variant="h3" sx={styles.todoName} noWrap>
              {todoName}
            </Typography>
          </Stack>
          <Typography
            variant="body1"
            sx={{ color: "rgba(255, 255, 255, 0.7)" }}
          >
            {formatDate(todoDate)}
          </Typography>
        </CardContent>
      </Card>
      <TaskDialogBox
        open={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        todoId={todoId}
      />
    </>
  );
};

export default ProjectCard;
