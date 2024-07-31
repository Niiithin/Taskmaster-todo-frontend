/*Imports */
import { useEffect, useState } from "react";
import { Box, Divider, Typography, CircularProgress } from "@mui/material";
import { motion } from "framer-motion";

/* Relative Imports */
import NotiTemplate from "./components/NotiTemplate";
import { NotificationModel } from "models/notificationModel";
import { getNotifications } from "services/notification";

/* Local Imports */
import styles from "./index.style";

// ----------------------------------------------------------------------
const Notification = () => {
  /* States */
  const [allNotifications, setAllNotifications] = useState<NotificationModel[]>(
    []
  );
  const [isLoading, setIsLoading] = useState(true);

  /* Functions */
  const getNotificationsList = async () => {
    setIsLoading(true);
    try {
      const response = await getNotifications("1", "10");
      if (response.status === 200) {
        setAllNotifications(response.data.notifications);
      }
      console.log(response, "noti");
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const renderContent = () => {
    if (isLoading) {
      return (
        <Box sx={styles.loaderContainer}>
          <CircularProgress size={40} />
        </Box>
      );
    }

    if (allNotifications.length === 0) {
      return (
        <Box sx={styles.noNotificationsContainer}>
          <Typography variant="h5">No notifications</Typography>
        </Box>
      );
    }

    return (
      <Box sx={styles.notificationsRootBox}>
        {allNotifications.map((item, index) => (
          <motion.div
            key={item._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <Box sx={styles.notificationsBox}>
              <NotiTemplate
                id={item._id}
                status={item.inviteStatus}
                senderDetails={item.senderUserId}
                recieverDetails={item.receiverUserId}
                taskName={item.todoId.title}
                time={item.updatedAt}
              />
            </Box>
          </motion.div>
        ))}
      </Box>
    );
  };

  useEffect(() => {
    getNotificationsList();
  }, []);
  return (
    <Box sx={styles.rootStyles}>
      <Typography variant="h3" sx={styles.rootStyles}>
        Notifications
      </Typography>
      <Divider />
      {renderContent()}
    </Box>
  );
};

export default Notification;
