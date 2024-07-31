/* Imports */
import { useContext } from "react";
import { Box, Container, Typography } from "@mui/material";

/* Relative Imports */
import SessionContext, { User } from "context/SessionContext";
import AuthPage from "components/AuthPage";

/* Local Imports */
import SignInForm from "./SignInForm";
import styles from "../index.style";
// ----------------------------------------------------------------------

const SignIn = () => {
  /* Hooks */
  const context = useContext(SessionContext);

  /* Functions */
  const handleSignIn = (token: string, user: User): void => {
    context.LoginUser(token, user);
  };
  /* Output */
  return (
    <AuthPage title="Sign In">
      <Box sx={styles.rootStyle}>
        <Container>
          <Typography variant="h3" mb={3}>
            Sign In
          </Typography>
          <SignInForm onSubmitSuccess={handleSignIn} />
        </Container>
      </Box>
    </AuthPage>
  );
};

export default SignIn;
