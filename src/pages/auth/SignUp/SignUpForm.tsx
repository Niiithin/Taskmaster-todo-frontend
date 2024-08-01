/*Imports */
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Box, Stack, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { Form, Formik } from "formik";
import * as Yup from "yup";

/* Relative Imports */
import PasswordInput from "components/InputFields/PasswordInput";
import { registerUserRequest } from "services/auth";
import { PAGE_ROOT, ROOT_PATH } from "routes/paths";
import { showToast } from "utility/toast";
import { toastMessages } from "constants/appConstants";
import TextInput from "components/InputFields/TextInput";

// ----------------------------------------------------------------------
const SignUpForm = (): JSX.Element => {
  /* Hooks */
  const navigate = useNavigate();

  /* Constants */
  const [initialValues] = useState({
    txtName: "",
    txtEmail: "",
    txtPassword: "",
  });

  /* Functions */
  const handleFormSubmit = async (values: any) => {
    try {
      const response = await registerUserRequest(
        values.txtName,
        values.txtEmail,
        values.txtPassword
      );
      if (response.status === 201) {
        showToast(toastMessages.success.auth.register, "success");

        navigate(PAGE_ROOT.signIn.absolutePath);
      } else {
        showToast(toastMessages.error.common, "error");
      }
    } catch (error: any) {
      if (error.response.status === 400)
        showToast(toastMessages.error.auth.alreadyRegistered, "error");
      else showToast(toastMessages.error.common, "error");
      console.log(error);
    }
  };

  const validationSchema = Yup.object().shape({
    txtName: Yup.string().required("Please enter your name"),
    txtEmail: Yup.string()
      .email("Please enter the valid email address.")
      .required("Please enter your registered email address."),
    txtPassword: Yup.string()
      .min(6, "Password must be at least 6 characters long")
      .required("Please enter your login password."),
  });

  /* Output */
  return (
    <>
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
          isSubmitting,
          touched,
          values,
        }) => (
          <>
            <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
              <Box mb={3}>
                <TextInput
                  name="txtName"
                  label="User Name"
                  placeholder="Enter user name"
                  value={values.txtName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={Boolean(touched.txtName && errors.txtName)}
                  helperText={String(touched.txtName && errors.txtName)}
                />
              </Box>
              <Box mb={3}>
                <TextInput
                  name="txtEmail"
                  label="Email Address"
                  placeholder="Enter email address"
                  value={values.txtEmail}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={Boolean(touched.txtEmail && errors.txtEmail)}
                  helperText={String(touched.txtEmail && errors.txtEmail)}
                />
              </Box>
              <Box mb={2}>
                <PasswordInput
                  name="txtPassword"
                  label="Password"
                  placeholder="Enter password"
                  value={values.txtPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={Boolean(touched.txtPassword && errors.txtPassword)}
                  helperText={String(touched.txtPassword && errors.txtPassword)}
                />
              </Box>
              <Box>
                <LoadingButton
                  fullWidth
                  type="submit"
                  size="large"
                  variant="contained"
                  loading={isSubmitting}
                  sx={{
                    "&:hover": {
                      bgcolor: "#000000",
                      color: "#ffffff",
                    },
                  }}
                >
                  Sign Up
                </LoadingButton>
              </Box>
            </Form>
            <Stack
              flexDirection={"row"}
              justifyContent={"center"}
              alignItems={"center"}
              gap={1}
              mt={2}
            >
              <Typography>Already have an account?</Typography>
              <Link
                to="#"
                onClick={(e) => {
                  e.preventDefault();
                  navigate(PAGE_ROOT.signIn.absolutePath);
                }}
              >
                Login
              </Link>
            </Stack>
          </>
        )}
      </Formik>
    </>
  );
};

export default SignUpForm;
