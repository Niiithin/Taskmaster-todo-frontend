/* Imports */
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { Box, Stack, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";

/* Relative Imports */
import { User } from "context/SessionContext";
import { showToast } from "utility/toast";
import { PAGE_ROOT } from "routes/paths";
import { toastMessages } from "constants/appConstants";
import TextInput from "components/InputFields/TextInput";
import PasswordInput from "components/InputFields/PasswordInput";
import { getUserProfileRequest, loginUserRequest } from "services/auth";

// ----------------------------------------------------------------------

/* Types/Interfaces */
/**
 * Interface used to create sign In form to validate the credentials.
 *
 * @interface Props
 * @property {function} onSubmitSuccess - callback function on successful submission of sign in form
 */
export interface Props {
  onSubmitSuccess: (token: string, user: User) => void;
}

const SignInForm = ({ onSubmitSuccess }: Props): JSX.Element => {
  /* States */
  const [initialValues] = useState({
    txtEmail: "",
    txtPassword: "",
  });

  const navigate = useNavigate();

  /* Functions */
  const handleFormSubmit = async (values: any) => {
    try {
      const response = await loginUserRequest(
        values.txtEmail,
        values.txtPassword
      );
      console.log(response, "res");
      if (response.status === 200) {
        const profileResponse = await getUserProfileRequest(
          response.data.token
        );
        if (
          response.data.token &&
          profileResponse.status === 200 &&
          profileResponse.data
        ) {
          const user = {
            id: profileResponse.data.userId || "",
            username: profileResponse.data.username || "",
            email: profileResponse.data.email || "",
          };

          onSubmitSuccess(response.data.token, user);
          showToast(toastMessages.success.auth.login, "success");
        }
      } else if (response.status === 204) {
        showToast(toastMessages.error.auth.invalidCredentials, "error");
      } else {
        showToast(toastMessages.error.common, "error");
      }
    } catch (error: any) {
      if (error.response?.status === 400)
        showToast(toastMessages.error.auth.invalidCredentials, "error");
      console.log(error, "error");
    }
  };

  /* Form validation schema */
  const validationSchema = Yup.object().shape({
    txtEmail: Yup.string()
      .email("Please enter a valid email address.")
      .required("Please enter your registered email address."),
    txtPassword: Yup.string().required("Please enter your login password."),
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
                  name="txtEmail"
                  label="Email Address"
                  placeholder="Enter email address"
                  value={values.txtEmail}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={Boolean(touched.txtEmail && errors.txtEmail)}
                  helperText={String(touched.txtPassword && errors.txtPassword)}
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
                >
                  Sign In
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
              <Typography>Don't have an account? </Typography>
              <Link
                to="#"
                onClick={(e) => {
                  e.preventDefault();
                  navigate(PAGE_ROOT.signUp.absolutePath);
                }}
              >
                Register
              </Link>
            </Stack>
          </>
        )}
      </Formik>
    </>
  );
};

export default SignInForm;
