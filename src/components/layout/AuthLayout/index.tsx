/*Imports */
import React from "react";
import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import { motion } from "framer-motion";

/* Local Imports */
import styles from "./index.style";

export interface AuthLayoutProps {
  children: React.ReactNode;
}

//-------------------------------------------------------------------------------

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }): JSX.Element => {
  /* Constants */
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        when: "beforeChildren",
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  /* Output */
  return (
    <Box sx={styles.wrapperStyle}>
      <Box
        component={motion.div}
        sx={styles.mainStyle(theme)}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <Box sx={styles.leftPanel(theme)}>
          <Box
            component={motion.div}
            variants={itemVariants}
            sx={styles.logoContainer}
          >
            <img
              src="/images/researchify_labs_logo.jpg"
              alt="Logo"
              style={styles.logo(theme)}
            />
          </Box>
          <Box component={motion.div} variants={itemVariants}>
            <Typography
              variant={isMobile ? "h5" : "h4"}
              sx={styles.welcomeText}
            >
              Welcome to TaskMaster
            </Typography>
          </Box>
          <Box component={motion.div} variants={itemVariants}>
            <Typography variant="body1" sx={styles.subText(theme)}>
              Organize, collaborate, and achieve more with TaskMaster
            </Typography>
          </Box>
        </Box>
        <Box sx={styles.rightPanel(theme)}>
          <Box
            component={motion.div}
            variants={itemVariants}
            sx={styles.formContainer(theme)}
          >
            {children}
          </Box>
        </Box>
      </Box>
      <Box
        component={motion.div}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        <Typography variant="body2" sx={styles.footer(theme)}>
          © 2023 TaskMaster. All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
};

export default AuthLayout;
