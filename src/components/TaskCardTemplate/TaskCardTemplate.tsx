/*Imports */
import React, { useEffect, useState } from "react";
import {
  Box,
  Stack,
  Typography,
  Button,
  Menu,
  MenuItem,
  Divider,
  TextField,
  Dialog,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import { useTheme } from "@mui/material/styles";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { LoadingButton } from "@mui/lab";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import CustomField from "components/InputFields/CustomField";
import dayjs from "dayjs";
import TaskIcon from "@mui/icons-material/Task";

/* Relative Imports */
import { FormDialog } from "components/Dialog";
import { sendCollabInvite } from "services/notification";
import { updateTodoStatus, getTodoById, editToDo } from "services/todo";
import { TaskCardTemplateProps, TodoItem } from "models/todo";
import TaskDialogBox from "./components/TaskDialogBox";
import { formatDate } from "helper/todoHealper";
import { showToast } from "utility/toast";
import { toastMessages } from "constants/appConstants";
import TextInput from "components/InputFields/TextInput";

/* Local Imports */
import styles from "./index.style";

// ----------------------------------------------------------------------

const TaskCardTemplate = ({
  todoId,
  todoStatus,
  title,
  description,
  dueDate,
  onStatusChange,
  onTaskUpdated,
}: TaskCardTemplateProps): JSX.Element => {
  /* Hooks */
  const theme = useTheme();

  /* States */
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [collaborateOpen, setCollaborateOpen] = useState(false);
  const [collaborateEmail, setCollaborateEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editTaskData, setEditTaskData] = useState<TodoItem | null>(null);
  const open = Boolean(anchorEl);

  /* Functions */
  const getCardStyle = () => {
    const baseStyle = {
      ...styles.taskCardRootStyles(theme),
      position: "relative",
      overflow: "hidden",
      boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
      "&::before": {
        content: '""',
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        height: "10px",
      },
    };

    switch (todoStatus) {
      case "Completed":
        return {
          ...baseStyle,
          "&::before": {
            ...baseStyle["&::before"],
            backgroundColor: "#B4E380",
          },
        };
      case "NotCompleted":
        return {
          ...baseStyle,
          "&::before": {
            ...baseStyle["&::before"],
            backgroundColor: "#FFFFFF",
          },
        };
      case "Cancelled":
        return {
          ...baseStyle,
          "&::before": {
            ...baseStyle["&::before"],
            backgroundColor: "#FF7777",
          },
        };
      case "Postponed":
        return {
          ...baseStyle,
          "&::before": {
            ...baseStyle["&::before"],
            backgroundColor: "#FFFF00", // Yellow color for Postponed status
          },
        };
      default:
        return baseStyle;
    }
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCardClick = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleCollaborate = () => {
    setCollaborateOpen(!collaborateOpen);
    setCollaborateEmail("");
    setEmailError("");
  };

  const handleCollabSubmit = async () => {
    if (!collaborateEmail.trim()) {
      setEmailError("Email is required");
      return;
    }
    if (!validateEmail(collaborateEmail)) {
      setEmailError("Please enter a valid email address");
      return;
    }
    if (emailError === "" && collaborateEmail) {
      try {
        const response = await sendCollabInvite(collaborateEmail, todoId);
        if (response.status === 201) {
          setCollaborateOpen(false);
          setCollaborateEmail("");
          setEmailError("");
          handleClose();
          showToast(toastMessages.success.task.sentRequest, "success");
        }
      } catch (error: any) {
        if (error.response.status === 404) {
          showToast(toastMessages.error.collab.userNotRegistered, "error");
        } else {
          showToast(toastMessages.error.common, "error");
        }
        handleClose();
        console.error("Error sending collaboration invite:", error);
      }
    }
  };

  const handleCollabCancel = () => {
    setCollaborateOpen(false);
    setCollaborateEmail("");
    setEmailError("");
  };

  const handleCompleted = async () => {
    try {
      const newStatus: TodoItem["status"] =
        todoStatus === "Completed" ? "NotCompleted" : "Completed";
      const response = await updateTodoStatus(todoId, newStatus);
      if (response.status === 200) {
        onStatusChange(todoId, newStatus);
        handleClose();
        showToast(toastMessages.success.task.completed, "success");
      }
    } catch (error) {
      handleClose();
      showToast(toastMessages.error.common, "error");
      console.error("Error updating todo status:", error);
    }
  };

  const handleDeleteTask = async () => {
    try {
      const newStatus: TodoItem["status"] = "Cancelled";
      const response = await updateTodoStatus(todoId, newStatus);
      if (response.status === 200) {
        onStatusChange(todoId, newStatus);
        handleClose();
        showToast(toastMessages.success.task.deleted, "success");
      }
    } catch (error) {
      handleClose();
      showToast(toastMessages.error.common, "error");
      console.error("Error updating todo status:", error);
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCollaborateEmail(e.target.value);
    if (emailError) {
      setEmailError("");
    }
  };

  const handleEditTodo = async () => {
    try {
      const response = await getTodoById(todoId);
      if (response.status === 200) {
        setEditTaskData(response.data.todo);
        setEditDialogOpen(true);
        handleClose();
      }
    } catch (error) {
      showToast(toastMessages.error.common, "error");
      console.error("Error fetching todo details:", error);
    }
  };
  const handleEditSubmit = async (values: any, { setSubmitting }: any) => {
    try {
      const response = await editToDo(
        todoId,
        values.txtTitle,
        values.txtDescription,
        values.scheduledDate,
        values.dueDate
      );
      if (response.status === 200) {
        setEditDialogOpen(false);
        showToast(toastMessages.success.task.updated, "success");
        onStatusChange(todoId, response.data.todo.status);
        onTaskUpdated();
      }
    } catch (error) {
      showToast(toastMessages.error.common, "error");
      console.error("Error updating todo:", error);
    }
    setSubmitting(false);
  };

  const validationSchema = Yup.object().shape({
    txtTitle: Yup.string().required("Title is required"),
    txtDescription: Yup.string().required("Description is required"),
    scheduledDate: Yup.date().nullable().required("Scheduled date is required"),
    dueDate: Yup.date()
      .nullable()
      .required("Due date is required")
      .min(
        Yup.ref("scheduledDate"),
        "Due date cannot be before scheduled date"
      ),
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Cancelled":
        return "#FF7777";
      case "Completed":
        return "#B4E380";
      case "NotCompleted":
        return "#FFFFFF";
      case "Postponed":
        return "#FFFF00";
      default:
        return "#FFFFFF";
    }
  };

  /*Side-Effects*/
  useEffect(() => {
    if (!collaborateOpen) {
      setEmailError("");
    }
  }, [collaborateOpen]);

  /* Output */
  return (
    <>
      <Stack
        flexDirection="row"
        alignItems="center"
        justifyContent="center"
        sx={{ ...getCardStyle(), cursor: "pointer" }}
        gap={2}
        onClick={handleCardClick}
      >
        <Box component="img" alt="i" src="/icons/task_square.svg" width={50} />
        <Stack justifyContent="center" alignItems="flex-start" flex={1}>
          <Typography sx={styles.taskName} variant="subtitle1">
            {title}
          </Typography>
          <Typography sx={styles.taskDesc} variant="body2">
            <b>Due on :</b> {formatDate(dueDate)}
          </Typography>
        </Stack>
        {todoStatus !== "Cancelled" && (
          <Button
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
            sx={{ padding: 0, minWidth: "auto" }}
          >
            <Box component="img" alt="options" src="/icons/options_icon.svg" />
          </Button>
        )}
      </Stack>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        sx={styles.menuContainerStyles}
      >
        <MenuItem onClick={handleCompleted} sx={styles.menuItemStyles}>
          {todoStatus === "Completed" ? (
            <>
              <TaskIcon />
              <Typography variant="subtitle2" ml={2} sx={{ flex: 1 }}>
                Resume Task
              </Typography>
              <Box
                sx={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  backgroundColor: getStatusColor("NotCompleted"),
                  marginLeft: 1,
                }}
              />
            </>
          ) : (
            <>
              <TaskIcon />
              <Typography variant="subtitle2" ml={2} sx={{ flex: 1 }}>
                Complete
              </Typography>
              <Box
                sx={{
                  width: 10,
                  height: 10,
                  borderRadius: "50%",
                  backgroundColor: getStatusColor("Completed"),
                  marginLeft: 1,
                }}
              />
            </>
          )}
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleEditTodo} sx={styles.menuItemStyles}>
          <EditIcon />
          <Typography variant="subtitle2" ml={2} sx={{ flex: 1 }}>
            Edit
          </Typography>
          <Box
            sx={{
              width: 10,
              height: 10,
              borderRadius: "50%",
              backgroundColor: getStatusColor("Postponed"),
              marginLeft: 1,
            }}
          />
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleDeleteTask} sx={styles.menuItemStyles}>
          <DeleteIcon />
          <Typography variant="subtitle2" ml={2} sx={{ flex: 1 }}>
            Delete
          </Typography>
          <Box
            sx={{
              width: 10,
              height: 10,
              borderRadius: "50%",
              backgroundColor: getStatusColor("Cancelled"),
              marginLeft: 1,
            }}
          />
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleCollaborate} sx={styles.menuItemStyles}>
          <GroupAddIcon />
          <Typography variant="subtitle2" ml={2} sx={{ flex: 1 }}>
            Collaborate
          </Typography>
        </MenuItem>
      </Menu>
      <FormDialog
        open={collaborateOpen}
        title="Collaborate"
        description="Enter the email you want to collaborate with"
        submitText="Collaborate"
        cancelText="Cancel"
        onSubmitAction={handleCollabSubmit}
        onCancelAction={handleCollabCancel}
      >
        <TextField
          fullWidth
          label="Email"
          variant="outlined"
          type="email"
          value={collaborateEmail}
          onChange={handleEmailChange}
          error={!!emailError}
          helperText={emailError}
          margin="normal"
        />
      </FormDialog>
      <TaskDialogBox
        open={dialogOpen}
        onClose={handleDialogClose}
        todoId={todoId}
      />
      <Dialog
        open={editDialogOpen}
        onClose={() => setEditDialogOpen(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Edit Task</DialogTitle>
        <DialogContent>
          {editTaskData && (
            <Formik
              initialValues={{
                txtTitle: editTaskData.title,
                txtDescription: editTaskData.description,
                scheduledDate: editTaskData.scheduleDate,
                dueDate: editTaskData.dueDate,
              }}
              validationSchema={validationSchema}
              onSubmit={handleEditSubmit}
            >
              {({
                errors,
                handleBlur,
                handleChange,
                handleSubmit,
                setFieldValue,
                isSubmitting,
                touched,
                values,
              }) => (
                <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
                  <Box mb={3}>
                    <TextInput
                      name="txtTitle"
                      label="Enter Title"
                      placeholder="Enter task title"
                      value={values.txtTitle}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      multiline
                      maxRows={2}
                      error={Boolean(touched.txtTitle && errors.txtTitle)}
                      helperText={String(touched.txtTitle && errors.txtTitle)}
                    />
                  </Box>
                  <Box mb={3}>
                    <TextInput
                      name="txtDescription"
                      label="Enter Description"
                      placeholder="Enter task Description"
                      value={values.txtDescription}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      multiline
                      rows={3}
                      maxRows={10}
                      error={Boolean(
                        touched.txtDescription && errors.txtDescription
                      )}
                      helperText={String(
                        touched.txtDescription && errors.txtDescription
                      )}
                    />
                  </Box>
                  <Stack
                    sx={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <CustomField
                        name="scheduledDate"
                        label="Start Date"
                        error={Boolean(
                          touched.scheduledDate && errors.scheduledDate
                        )}
                        helperText={String(
                          touched.scheduledDate && errors.scheduledDate
                        )}
                      >
                        <DatePicker
                          openTo="day"
                          format="DD/MM/YYYY"
                          value={
                            values.scheduledDate
                              ? dayjs(values.scheduledDate)
                              : null
                          }
                          onChange={(newValue: any) => {
                            setFieldValue("scheduledDate", newValue);
                          }}
                          slotProps={{
                            textField: (params: any) => ({
                              ...params,
                              fullWidth: true,
                              size: "medium",
                              name: "txtStartDate",
                              error: Boolean(
                                touched.scheduledDate && errors.scheduledDate
                              ),
                            }),
                          }}
                        />
                      </CustomField>
                    </LocalizationProvider>

                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <CustomField
                        name="dueDate"
                        label="Due Date"
                        error={Boolean(touched.dueDate && errors.dueDate)}
                        helperText={String(touched.dueDate && errors.dueDate)}
                      >
                        <DatePicker
                          openTo="day"
                          format="DD/MM/YYYY"
                          value={values.dueDate ? dayjs(values.dueDate) : null}
                          onChange={(newValue: any) => {
                            setFieldValue("dueDate", newValue);
                          }}
                          slotProps={{
                            textField: (params: any) => ({
                              ...params,
                              fullWidth: true,
                              size: "medium",
                              name: "dueDate",
                              error: Boolean(touched.dueDate && errors.dueDate),
                            }),
                          }}
                        />
                      </CustomField>
                    </LocalizationProvider>

                    {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <CustomField
                        name="scheduledDate"
                        label="Start Date"
                        error={Boolean(
                          touched.scheduledDate && errors.scheduledDate
                        )}
                        helperText={String(
                          touched.scheduledDate && errors.scheduledDate
                        )}
                      >
                        <DatePicker
                          openTo="day"
                          format="DD/MM/YYYY"
                          value={
                            values.scheduledDate
                              ? dayjs(values.scheduledDate)
                              : null
                          }
                          onChange={(newValue: any) => {
                            setFieldValue("scheduledDate", newValue);
                          }}
                          slotProps={{
                            textField: (params: any) => ({
                              ...params,
                              fullWidth: true,
                              size: "medium",
                              name: "scheduledDate",
                              error: Boolean(
                                touched.scheduledDate && errors.scheduledDate
                              ),
                            }),
                          }}
                        />
                      </CustomField>
                    </LocalizationProvider>

                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <CustomField
                        name="dueDate"
                        label="Due Date"
                        error={Boolean(touched.dueDate && errors.dueDate)}
                        helperText={String(touched.dueDate && errors.dueDate)}
                      >
                        <DatePicker
                          openTo="day"
                          format="DD/MM/YYYY"
                          value={values.dueDate ? dayjs(values.dueDate) : null}
                          onChange={(newValue: any) => {
                            setFieldValue("dueDate", newValue);
                          }}
                          slotProps={{
                            textField: (params: any) => ({
                              ...params,
                              fullWidth: true,
                              size: "medium",
                              name: "dueDate",
                              error: Boolean(touched.dueDate && errors.dueDate),
                            }),
                          }}
                        />
                      </CustomField>
                    </LocalizationProvider> */}
                  </Stack>
                  <Stack
                    flexDirection={"row"}
                    justifyContent={"flex-end"}
                    alignItems={"center"}
                    gap={6}
                    mt={2}
                  >
                    <Box>
                      <LoadingButton
                        fullWidth
                        type="submit"
                        size="large"
                        variant="contained"
                        loading={isSubmitting}
                      >
                        Update Task
                      </LoadingButton>
                    </Box>
                    <Box>
                      <Button
                        fullWidth
                        size="large"
                        variant="contained"
                        onClick={() => setEditDialogOpen(false)}
                      >
                        Cancel
                      </Button>
                    </Box>
                  </Stack>
                </Form>
              )}
            </Formik>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default TaskCardTemplate;
