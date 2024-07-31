// NotiTemplate.tsx

import { Box, ButtonBase, Stack, Typography } from "@mui/material";
import React, { useContext, useState } from "react";

import { handleInviteNotifications } from "services/notification";
import SessionContext from "context/SessionContext";
import { User } from "models/notificationModel";
import { timeAgo } from "helper/todoHealper";
import { toastMessages } from "constants/appConstants";
import { showToast } from "utility/toast";
import { ConfirmDialog } from "components/Dialog";

import styles from "./index.style";

interface NotiTemplateProps {
  id: string;
  status: string;
  senderDetails: User;
  recieverDetails: User;
  taskName: string;
  time: string;
  onUpdate: () => void;
}

const NotiTemplate = ({
  id,
  status,
  senderDetails,
  recieverDetails,
  taskName,
  time,
  onUpdate,
}: NotiTemplateProps): JSX.Element => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const user = useContext(SessionContext).user;

  const handleClick = () => {
    const { openDialog } = getNotificationText(
      status,
      senderDetails,
      recieverDetails,
      taskName
    );
    if (openDialog) {
      setDialogOpen(true);
    }
  };

  const handleCollabAccept = async () => {
    try {
      const response = await handleInviteNotifications(id, "accepted");
      if (response.status === 200) {
        showToast(toastMessages.success.task.acceptedRequest, "success");
        onUpdate();
      }
      setDialogOpen(false);
    } catch (error) {
      showToast(toastMessages.error.common, "error");
      console.log(error);
    }
  };

  const handleCollabReject = async () => {
    try {
      const response = await handleInviteNotifications(id, "rejected");
      showToast(toastMessages.success.task.rejectedRequest, "success");
      onUpdate();
      setDialogOpen(false);
    } catch (error) {
      showToast(toastMessages.error.common, "error");
      console.log(error);
    }
  };

  const handleCollabCancel = () => {
    setDialogOpen(false);
  };

  const getNotificationText = (
    status: string,
    senderUserId: User,
    recieverUserId: User,
    taskName: string
  ): { text: JSX.Element; openDialog: boolean } => {
    const BoldSpan = ({ children }: { children: React.ReactNode }) => (
      <span style={{ fontWeight: "bold" }}>{children}</span>
    );

    if (status === "invited") {
      if (senderUserId._id === user?.id) {
        return {
          text: (
            <>
              You have invited <BoldSpan>{recieverDetails.username}</BoldSpan>{" "}
              to collaborate on the task <BoldSpan>{taskName}</BoldSpan>
            </>
          ),
          openDialog: false,
        };
      } else {
        return {
          text: (
            <>
              <BoldSpan>{senderUserId.username}</BoldSpan> has invited you to
              collaborate on the task <BoldSpan>{taskName}</BoldSpan>
            </>
          ),
          openDialog: true,
        };
      }
    } else if (status === "accepted") {
      if (senderUserId._id === user?.id) {
        return {
          text: (
            <>
              <BoldSpan>{recieverUserId.username}</BoldSpan> has accepted your
              request to collaborate on task <BoldSpan>{taskName}</BoldSpan>
            </>
          ),
          openDialog: false,
        };
      } else {
        return {
          text: (
            <>
              You have accepted the collaboration request sent by{" "}
              <BoldSpan>{senderUserId.username}</BoldSpan> on task{" "}
              <BoldSpan>{taskName}</BoldSpan>
            </>
          ),
          openDialog: false,
        };
      }
    } else if (status === "rejected") {
      if (senderUserId._id === user?.id) {
        return {
          text: (
            <>
              <BoldSpan>{recieverUserId.username}</BoldSpan> has rejected your
              request to collaborate on task <BoldSpan>{taskName}</BoldSpan>
            </>
          ),
          openDialog: false,
        };
      } else {
        return {
          text: (
            <>
              You have rejected the collaboration request sent by{" "}
              <BoldSpan>{senderUserId.username}</BoldSpan> on task{" "}
              <BoldSpan>{taskName}</BoldSpan>
            </>
          ),
          openDialog: false,
        };
      }
    }
    return { text: <></>, openDialog: false };
  };

  return (
    <>
      <ButtonBase
        onClick={handleClick}
        sx={{
          display: "block",
          width: "100%",
          textAlign: "left",
        }}
      >
        <Box
          sx={(theme) => ({
            ...styles.rootStyles(theme),
            transition: "background-color 0.3s",
            "&:hover": {
              backgroundColor: theme.palette.action.hover,
            },
          })}
        >
          <Typography variant="subtitle2">
            {
              getNotificationText(
                status,
                senderDetails,
                recieverDetails,
                taskName
              ).text
            }
          </Typography>
          <Stack
            flexDirection="row"
            justifyContent="flex-start"
            alignItems="center"
            gap={2}
          >
            <Typography variant="overline" sx={styles.time}>
              {timeAgo(time)}
            </Typography>
          </Stack>
        </Box>
      </ButtonBase>
      <ConfirmDialog
        open={dialogOpen}
        description="Do you want to accept this request?"
        agreeText="Accept"
        agreeText2="Reject"
        disagreeText="Cancel"
        agreeButton2={true}
        disagreeButton={true}
        onAgreeAction={handleCollabAccept}
        onAgreeAction2={handleCollabReject}
        onDisAgreeAction={handleCollabCancel}
      />
    </>
  );
};

export default NotiTemplate;
