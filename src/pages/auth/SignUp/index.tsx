/* Imports */
import { Box, Container, Typography } from "@mui/material";

/* Relative Imports */
import AuthPage from "components/AuthPage";
import SignUpForm from "./SignUpForm";

/* Local Imports */
import styles from "../index.style";
// ----------------------------------------------------------------------

const SignUp = () => {
  /* Output */
  return (
    <AuthPage title="Sign Up">
      <Box sx={styles.rootStyle}>
        <Container>
          <Typography variant="h3" mb={3}>
            Sign Up
          </Typography>
          <SignUpForm />
        </Container>
      </Box>
    </AuthPage>
  );
};

export default SignUp;
