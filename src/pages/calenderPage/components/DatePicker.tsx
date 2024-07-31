/*Imports */
import React, { useState, useRef, useEffect } from "react";
import {
  Box,
  Typography,
  useMediaQuery,
  useTheme,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { Dayjs } from "dayjs";

/* Relative Imports */
import { monthsList } from "constants/appConstants";

/* Local Imports */
import styles from "./index.style";
import AddTask from "./AddTask";

// ----------------------------------------------------------------------

/* Interface */
interface LinearDatePickerProps {
  selectedDate: Dayjs;
  onDateChange: (date: Dayjs) => void;
  onTaskAdded: () => void;
}

// ----------------------------------------------------------------------

const LinearDatePicker: React.FC<LinearDatePickerProps> = ({
  selectedDate,
  onDateChange,
  onTaskAdded,
}) => {
  /* States */
  const [currentMonth, setCurrentMonth] = useState(
    selectedDate.startOf("month")
  );
  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  /* Hooks */
  const theme = useTheme();

  /* Constants */
  const isXs = useMediaQuery(theme.breakpoints.only("xs"));
  const isSm = useMediaQuery(theme.breakpoints.only("sm"));

  const daysInMonth = currentMonth.daysInMonth();
  const dates = Array.from({ length: daysInMonth }, (_, i) =>
    currentMonth.add(i, "day")
  );

  const handleMonthChange = (event: SelectChangeEvent<number>) => {
    setCurrentMonth(currentMonth.month(event.target.value as number));
  };

  const handleYearChange = (event: SelectChangeEvent<number>) => {
    setCurrentMonth(currentMonth.year(event.target.value as number));
  };

  const getDateBoxSize = () => {
    if (isXs) return 50;
    if (isSm) return 60;
    return 70;
  };

  const dateBoxSize = getDateBoxSize();

  const currentYear = new Date().getFullYear();
  const years = Array.from(
    { length: currentYear - 1979 },
    (_, i) => currentYear - i
  );

  /*Side-Effects*/
  useEffect(() => {
    if (scrollRef.current) {
      const selectedDateElement = scrollRef.current.querySelector(
        `[data-date="${selectedDate.format("YYYY-MM-DD")}"]`
      ) as HTMLElement;
      if (selectedDateElement) {
        const containerWidth = scrollRef.current.offsetWidth;
        const dateElementWidth = selectedDateElement.offsetWidth;
        const dateElementLeft = selectedDateElement.offsetLeft;
        const scrollPosition =
          dateElementLeft - containerWidth / 2 + dateElementWidth / 2;

        scrollRef.current.scrollLeft = scrollPosition;
      }
    }
  }, [selectedDate]);

  /* Output */
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box sx={styles.rootStyles}>
        <Box sx={styles.monthPickerStyles}>
          <Box sx={styles.selectRoot}>
            <Select
              value={currentMonth.month()}
              onChange={handleMonthChange}
              sx={styles.selectStyles}
              renderValue={(value) => (
                <Typography
                  variant={isXs ? "h2" : "h1"}
                  component="span"
                  sx={styles.monthText}
                >
                  {monthsList[value as number]},
                </Typography>
              )}
            >
              {monthsList.map((month, index) => (
                <MenuItem key={month} value={index}>
                  {month}
                </MenuItem>
              ))}
            </Select>
            <Select
              value={currentMonth.year()}
              onChange={handleYearChange}
              sx={styles.selectStyles}
              renderValue={(value) => (
                <Typography
                  variant={isXs ? "h2" : "h1"}
                  component="span"
                  sx={styles.monthText}
                >
                  {value as number}
                </Typography>
              )}
            >
              {years.map((year) => (
                <MenuItem key={year} value={year}>
                  {year}
                </MenuItem>
              ))}
            </Select>
          </Box>
          <Box
            component="button"
            onClick={() => setIsAddTaskOpen(true)}
            sx={{ ...styles.addTaskButton(theme), cursor: "pointer" }}
          >
            <Typography variant="body1" sx={styles.addTaskButtonText}>
              + Add Task
            </Typography>
          </Box>
        </Box>
        <Box ref={scrollRef} sx={styles.datesRootStyles}>
          {dates.map((date) => (
            <Box
              key={date.toISOString()}
              onClick={() => onDateChange(date)}
              data-date={date.format("YYYY-MM-DD")}
              sx={{
                ...styles.datesStyles(theme),
                flex: `0 0 ${dateBoxSize}px`,
                height: dateBoxSize,
                bgcolor: date.isSame(selectedDate, "day")
                  ? theme.palette.primary.dark
                  : "transparent",
                color: date.isSame(selectedDate, "day")
                  ? theme.palette.secondary.dark
                  : "text.primary",
              }}
            >
              <Typography
                variant="subtitle1"
                sx={{ fontSize: isXs ? "0.8rem" : "0.875rem" }}
              >
                {date.format("dd")}
              </Typography>
              <Typography
                variant="body1"
                sx={{ fontSize: isXs ? "0.9rem" : "1rem" }}
              >
                {date.format("D")}
              </Typography>
            </Box>
          ))}
        </Box>
        <AddTask
          open={isAddTaskOpen}
          onClose={() => setIsAddTaskOpen(false)}
          onTaskAdded={() => {
            onTaskAdded();
            setIsAddTaskOpen(false);
          }}
        />
      </Box>
    </LocalizationProvider>
  );
};

export default LinearDatePicker;
