/* Imports */
import { Box, Button, Container, Typography } from "@mui/material";

/* Relative Imports */

/* Local Imports */
import styles from "./index.style";
import AuthPage from "components/AuthPage";

// ----------------------------------------------------------------------

/**
 * Component to create the 400 Error or not found page.
 *
 * @component
 * @return {JSX.Element}
 */
const PageNotFound = (): JSX.Element => {
  /* Output */
  return (
    <AuthPage height="100%">
      <Box sx={styles.rootStyle}>
        <Container maxWidth={false}>
          <Box sx={{ maxWidth: 480, margin: "auto", textAlign: "center" }}>
            <Typography variant="h3" gutterBottom>
              Sorry, page not found!
            </Typography>
            <Typography sx={{ color: "text.secondary" }}>
              Sorry, we couldn’t find the page you’re looking for. Perhaps
              you’ve mistyped the URL? Be sure to check your spelling.
            </Typography>

            <Button href="/" size="large" variant="contained" color="secondary">
              Go to Home
            </Button>
          </Box>
        </Container>
      </Box>
    </AuthPage>
  );
};

export default PageNotFound;
