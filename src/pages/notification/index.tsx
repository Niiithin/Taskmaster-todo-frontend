// Notification.tsx

import { useEffect, useState } from "react";
import { Box, Divider, Typography, CircularProgress } from "@mui/material";
import { motion } from "framer-motion";

import NotiTemplate from "./components/NotiTemplate";
import { NotificationModel } from "models/notificationModel";
import { getNotifications } from "services/notification";

import styles from "./index.style";

const Notification = () => {
  const [allNotifications, setAllNotifications] = useState<NotificationModel[]>(
    []
  );
  const [isLoading, setIsLoading] = useState(true);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const getNotificationsList = async () => {
    setIsLoading(true);
    try {
      const response = await getNotifications("1", "10");
      if (response.status === 200) {
        setAllNotifications(response.data.notifications);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNotificationUpdate = () => {
    setRefreshTrigger((prev) => prev + 1);
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
        {allNotifications.map((item) => (
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
                onUpdate={handleNotificationUpdate}
              />
            </Box>
          </motion.div>
        ))}
      </Box>
    );
  };

  useEffect(() => {
    getNotificationsList();
  }, [refreshTrigger]);

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
