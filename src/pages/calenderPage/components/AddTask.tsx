/*Imports */
import { Box, Dialog, DialogContent, DialogTitle, Stack } from "@mui/material";
import React, { useState } from "react";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { LoadingButton } from "@mui/lab";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

/* Relative Imports */
import TextInput from "components/InputFields/TextInput";
import CustomField from "components/InputFields/CustomField";
import { addToDo } from "services/todo";
import { showToast } from "utility/toast";
import { toastMessages } from "constants/appConstants";

// ----------------------------------------------------------------------

/* Interface */
interface AddTaskProps {
  open: boolean;
  onClose: () => void;
  onTaskAdded: () => void;
}

// ----------------------------------------------------------------------

const AddTask: React.FC<AddTaskProps> = ({
  open,
  onClose,
  onTaskAdded,
}): JSX.Element => {
  /* States */
  const [initialValues, setInitialValues] = useState({
    txtTitle: "",
    txtDescription: "",
    scheduledDate: null,
    dueDate: null,
  });

  /* Functions */
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

  const handleFormSubmit = async (values: any, { setSubmitting }: any) => {
    try {
      const response = await addToDo(
        values.txtTitle,
        values.txtDescription,
        values.scheduledDate,
        values.dueDate
      );
      if (response.status === 201) {
        console.log(response, "res");
        showToast(toastMessages.success.task.added, "success");
      }
      onTaskAdded();
    } catch (error) {
      showToast(toastMessages.error.common, "error");
      console.log(error, "error");
    }
    setSubmitting(false);
    onClose();
  };

  /* Output */
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle id="responsive-dialog-title">{"Create a task"}</DialogTitle>
      <DialogContent>
        <Formik
          enableReinitialize
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleFormSubmit}
          validateOnChange={false}
          validateOnBlur={false}
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
                      value={values.scheduledDate}
                      onChange={(newValue: any) => {
                        setFieldValue("scheduledDate", newValue);
                      }}
                      slotProps={{
                        textField: (params: any) => ({
                          ...params,
                          fullWidth: true,
                          size: "medium",
                          name: "txtStartDate",
                          value: values.scheduledDate,
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
                      value={values.dueDate}
                      onChange={(newValue: any) => {
                        setFieldValue("dueDate", newValue);
                      }}
                      slotProps={{
                        textField: (params: any) => ({
                          ...params,
                          fullWidth: true,
                          size: "medium",
                          name: "dueDate",
                          value: values.dueDate,
                          error: Boolean(touched.dueDate && errors.dueDate),
                        }),
                      }}
                    />
                  </CustomField>
                </LocalizationProvider>
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
                    sx={{
                      backgroundColor: "primary.main",
                      color: "white",
                      "&:hover": {
                        backgroundColor: "black",
                        color: "white",
                      },
                    }}
                  >
                    Add Task
                  </LoadingButton>
                </Box>
                <Box>
                  <LoadingButton
                    fullWidth
                    size="large"
                    variant="contained"
                    onClick={onClose}
                    sx={{
                      backgroundColor: "primary.light",
                      color: "black",
                      "&:hover": {
                        backgroundColor: "black",
                        color: "white",
                      },
                    }}
                  >
                    Cancel
                  </LoadingButton>
                </Box>
              </Stack>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
};

export default AddTask;
